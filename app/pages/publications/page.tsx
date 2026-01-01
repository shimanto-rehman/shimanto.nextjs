// app/pages/publications/page.tsx
import { headers } from 'next/headers';
import Navbar, { navItems } from '../../components/Navbar';
import './Publications.css';
import PublicationsClient from './PublicationsClient';

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';
export const revalidate = 21600; // Revalidate every 6 hours

// Types shared between server and client
export interface ScholarProfile {
  name: string;
  avatarUrl: string | null;
  affiliation: string | null;
  email?: string | null;
  country?: string | null;
  citations: number;
  hIndex: number;
  i10Index: number;
  interests: { name: string }[];
  profileUrl: string;
  updatedAt: string;
}

export interface OrcidEmployment {
  roleTitle: string;
  organization: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}

export interface OrcidProfile {
  name: string;
  orcid: string;
  affiliation: string;
  country: string;
  totalWorks: number;
  lastActiveYear?: number;
  profileUrl: string;
  biography?: string;
  keywords?: string[];
  employments: OrcidEmployment[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url: string;
  type: 'journal' | 'conference' | 'preprint' | 'other';
  abstract?: string;
  citations?: number;
  altmetricScore?: number;
  tags?: string[];
}

// Static fallback publications list
const staticPublications: Publication[] = [
  {
    id: 'reshad-2021-curcuminoids-wound-healing',
    title:
      'In silico investigations on curcuminoids from Curcuma longa as positive regulators of the Wnt/β-catenin signaling pathway in wound healing',
    authors:
      'R. A. I. Reshad, S. Alam, H. B. Raihan, K. N. Meem, F. Rahman, F. Zahid, M. I. Rafid, S. M. Obaydur Rahman, S. Omit, M. H. Ali',
    year: 2021,
    venue: 'Egyptian Journal of Medical Human Genetics',
    volume: '22',
    issue: '65',
    pages: '',
    doi: '10.1186/s43042-021-00182-9',
    url: 'https://link.springer.com/article/10.1186/s43042-021-00182-9',
    type: 'journal',
    abstract:
      'Curcuminoids from Curcuma longa were investigated via molecular docking as positive regulators of key proteins in the Wnt/β-catenin signaling pathway, highlighting their potential in promoting wound healing.',
    citations: 15,
    altmetricScore: 13,
    tags: ['wound-healing', 'curcumin', 'computational-biology'],
  },
];

async function fetchXml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/xml',
    },
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

// Simple XML parser for ORCID employments
function parseOrcidEmployments(xml: string): OrcidEmployment[] {
  const employments: OrcidEmployment[] = [];
  const employmentRegex = /<employment:employment-summary[^>]*>([\s\S]*?)<\/employment:employment-summary>/g;
  let match;

  while ((match = employmentRegex.exec(xml)) !== null) {
    const content = match[1];
    const roleTitle = content.match(/<common:role-title>([^<]*)<\/common:role-title>/)?.[1]?.trim() || '';
    const orgName = content.match(/<common:name>([^<]*)<\/common:name>/)?.[1]?.trim() || '';
    const deptName = content.match(/<common:department-name>([^<]*)<\/common:department-name>/)?.[1]?.trim() || '';
    const startYear = content.match(/<common:start-date>[\s\S]*?<common:year>([^<]*)<\/common:year>/)?.[1]?.trim() || '';
    const startMonth = content.match(/<common:start-date>[\s\S]*?<common:month>([^<]*)<\/common:month>/)?.[1]?.trim() || '';
    const endYear = content.match(/<common:end-date>[\s\S]*?<common:year>([^<]*)<\/common:year>/)?.[1]?.trim() || '';
    const endMonth = content.match(/<common:end-date>[\s\S]*?<common:month>([^<]*)<\/common:month>/)?.[1]?.trim() || '';
    const city = content.match(/<common:city>([^<]*)<\/common:city>/)?.[1]?.trim() || '';
    const region = content.match(/<common:region>([^<]*)<\/common:region>/)?.[1]?.trim() || '';
    const country = content.match(/<common:country>([^<]*)<\/common:country>/)?.[1]?.trim() || '';

    const location = [city, region, country].filter(Boolean).join(', ');
    const startDate = startYear && startMonth ? `${startYear}-${startMonth.padStart(2, '0')}` : startYear || undefined;
    const endDate = endYear && endMonth ? `${endYear}-${endMonth.padStart(2, '0')}` : endYear || undefined;

    if (roleTitle && orgName) {
      employments.push({
        roleTitle,
        organization: orgName,
        department: deptName || undefined,
        startDate,
        endDate,
        location: location || undefined,
      });
    }
  }

  return employments;
}

// Fetch Google Scholar data directly from SerpAPI
async function fetchScholarData(): Promise<ScholarProfile | null> {
  try {
    if (!process.env.SCHOLAR_AUTHOR_ID || !process.env.SERPAPI_KEY) {
      console.error('Missing SCHOLAR_AUTHOR_ID or SERPAPI_KEY environment variables');
      return null;
    }

    // Use native fetch instead of axios to avoid dependency issues
    const url = new URL('https://serpapi.com/search.json');
    url.searchParams.append('engine', 'google_scholar_author');
    url.searchParams.append('author_id', process.env.SCHOLAR_AUTHOR_ID);
    url.searchParams.append('api_key', process.env.SERPAPI_KEY);
    url.searchParams.append('hl', 'en');

    const response = await fetch(url.toString(), {
      next: { revalidate: 21600 },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NextJS-Portfolio/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SerpAPI error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText.substring(0, 500)
      });
      return null;
    }

    const data = await response.json();

    if (data.error) {
      console.error('SerpAPI returned error:', data.error);
      return null;
    }

    // Extract citation metrics from cited_by.table array
    const citationsAll = data.cited_by?.table?.[0]?.citations?.all || 0;
    const hIndexAll = data.cited_by?.table?.[1]?.h_index?.all || 0;
    const i10IndexAll = data.cited_by?.table?.[2]?.i10_index?.all || 0;

    const author = data.author || {};

    return {
      name: author.name || 'Unknown',
      avatarUrl: author.thumbnail || null,
      affiliation: author.affiliations || null,
      email: author.email || null,
      country: undefined,
      citations: citationsAll,
      hIndex: hIndexAll,
      i10Index: i10IndexAll,
      interests: Array.isArray(author.interests)
        ? author.interests.map((i: string | { title?: string }) => ({
            name: typeof i === 'object' && i.title ? i.title : String(i)
          }))
        : [],
      profileUrl: author.link || `https://scholar.google.com/citations?user=${process.env.SCHOLAR_AUTHOR_ID}&hl=en`,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching Scholar data:', error);
    return null;
  }
}

// Fetch ORCID data
async function fetchOrcidData(): Promise<OrcidProfile | null> {
  try {
    const orcidId = '0009-0007-9072-8458';
    
    const orcidRes = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/person`, {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 21600 },
    });

    if (!orcidRes.ok) {
      console.error(`ORCID request failed with status ${orcidRes.status}`);
      return null;
    }

    const orcidJson: any = await orcidRes.json();

    const givenName = orcidJson?.name?.['given-names']?.value;
    const familyName = orcidJson?.name?.['family-name']?.value;
    const fullName = [givenName, familyName].filter(Boolean).join(' ');

    const lastModifiedValue = orcidJson?.['last-modified-date']?.value;
    const lastActiveYear =
      typeof lastModifiedValue === 'number'
        ? new Date(lastModifiedValue).getUTCFullYear()
        : undefined;

    const biography = orcidJson?.biography?.personal?.value || undefined;
    const keywords = orcidJson?.keywords?.keyword?.map((k: { content: string }) => k.content) || [];

    // Fetch employments from ORCID API (XML)
    const employmentsXml = await fetchXml(`https://pub.orcid.org/v3.0/${orcidId}/employments`);
    const employments = parseOrcidEmployments(employmentsXml);

    // Use 2nd employment (index 1) for affiliation, or fallback to first if available
    const secondEmployment = employments[1] || employments[0];
    const affiliation = secondEmployment
      ? `${secondEmployment.roleTitle}${secondEmployment.department ? `, ${secondEmployment.department}` : ''}, ${secondEmployment.organization}`
      : 'Affiliation not available';
    const country = secondEmployment?.location?.split(', ').pop() || '—';

    return {
      name: fullName || 'Unknown',
      orcid: orcidId,
      affiliation,
      country,
      totalWorks: staticPublications.length,
      lastActiveYear,
      profileUrl: `https://orcid.org/${orcidId}`,
      biography,
      keywords: keywords.length > 0 ? keywords : undefined,
      employments,
    };
  } catch (error) {
    console.error('Error fetching ORCID data:', error);
    return null;
  }
}

// Main data fetching function
async function getPublicationsData() {
  try {
    // Fetch Scholar and ORCID data in parallel
    const [scholarData, orcidData] = await Promise.all([
      fetchScholarData(),
      fetchOrcidData(),
    ]);

    // Create fallback Scholar data if fetch failed
    const scholar: ScholarProfile = scholarData || {
      name: 'Shimanto Rehman',
      avatarUrl: '/images/shimanto.webp',
      affiliation: 'Researcher',
      email: null,
      country: 'Bangladesh',
      citations: 0,
      hIndex: 0,
      i10Index: 0,
      interests: [
        { name: 'Computational Biology' },
        { name: 'Bioinformatics' },
        { name: 'Machine Learning' }
      ],
      profileUrl: 'https://scholar.google.com/citations?user=x-HOtR4AAAAJ&hl=en',
      updatedAt: new Date().toISOString(),
    };

    // Create fallback ORCID data if fetch failed
    const orcid: OrcidProfile = orcidData || {
      name: 'Shimanto Rehman',
      orcid: '0009-0007-9072-8458',
      affiliation: 'Researcher',
      country: 'Bangladesh',
      totalWorks: staticPublications.length,
      profileUrl: 'https://orcid.org/0009-0007-9072-8458',
      employments: [],
    };

    return {
      scholar,
      orcid,
      publications: staticPublications,
    };
  } catch (error) {
    console.error('Error in getPublicationsData:', error);
    
    // Return complete fallback data
    return {
      scholar: {
        name: 'Shimanto Rehman',
        avatarUrl: '/images/shimanto.webp',
        affiliation: 'Researcher',
        email: null,
        country: 'Bangladesh',
        citations: 0,
        hIndex: 0,
        i10Index: 0,
        interests: [{ name: 'Computational Biology' }],
        profileUrl: 'https://scholar.google.com/citations?user=x-HOtR4AAAAJ&hl=en',
        updatedAt: new Date().toISOString(),
      },
      orcid: {
        name: 'Shimanto Rehman',
        orcid: '0009-0007-9072-8458',
        affiliation: 'Researcher',
        country: 'Bangladesh',
        totalWorks: staticPublications.length,
        profileUrl: 'https://orcid.org/0009-0007-9072-8458',
        employments: [],
      },
      publications: staticPublications,
    };
  }
}

export default async function PublicationsPage() {
  const data = await getPublicationsData();
  const { scholar, orcid, publications } = data;

  return (
    <PublicationsClient
      initialScholar={scholar}
      initialOrcid={orcid}
      initialPublications={publications}
    />
  );
}