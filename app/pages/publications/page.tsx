// app/pages/publications/page.tsx
import { headers } from 'next/headers';
import './Publications.css';
import PublicationsClient from './PublicationsClient';

// Types shared between server and client
export interface ScholarProfile {
  /** Full name from Google Scholar */
  name: string;
  /** Profile photo URL from Scholar (can be null) */
  avatarUrl: string | null;
  /** Primary affiliation text */
  affiliation: string | null;
  /** Verified email text, if available */
  email?: string | null;
  /** Optional country / location if your API provides it */
  country?: string | null;
  /** Total citation count */
  citations: number;
  /** h-index */
  hIndex: number;
  /** i10-index */
  i10Index: number;
  /** List of research interests / topics */
  interests: { name: string }[];
  /** Link to your public Scholar / ResearchGate profile */
  profileUrl: string;
  /** Last time the data was updated (ISO string) */
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

// Static fallback publications list (you can extend this array as you publish more)
const staticPublications: Publication[] = [
  {
    id: 'reshad-2021-curcuminoids-wound-healing',
    title:
      'In silico investigations on curcuminoids from Curcuma longa as positive regulators of the Wnt/β‑catenin signaling pathway in wound healing',
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
      'Curcuminoids from Curcuma longa were investigated via molecular docking as positive regulators of key proteins in the Wnt/β‑catenin signaling pathway, highlighting their potential in promoting wound healing.',
    citations: 15,
    altmetricScore: 13,
    tags: ['wound-healing', 'curcumin', 'computational-biology'],
  },
];

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    // Revalidate every 6 hours
    next: { revalidate: 21600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

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

async function getBaseUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}`;
}
// Fetch data at build time with ISR (Incremental Static Regeneration).
// 
// ISR Behavior:
// 1. Initial build: Fetches data and generates static page
// 2. Every 6 hours (revalidate: 21600): Tries to fetch fresh data in the background
// 3. On success: Updates the cached page with new data
// 4. On failure: Serves the last successfully generated page (no errors shown to users)
// 5. If APIs fail forever: Continues showing the last successful data indefinitely
//
// This ensures users always see data (even if stale) rather than error pages.
async function getPublicationsData() {
  try {
    let scholar: ScholarProfile;
    let orcid: OrcidProfile;

    // Build absolute URL for the internal Scholar API so it works
    // both locally and in production (no hard-coded localhost).
    const baseUrl = await getBaseUrl();

    const scholarRes = await fetch(`${baseUrl}/api/scholar`, {
      // Revalidate every 6 hours; on failure the previous snapshot is kept.
      next: { revalidate: 21600 },
    });

    if (!scholarRes.ok) {
      throw new Error(`Scholar API failed with status ${scholarRes.status}`);
    }

    interface ScholarApiResponse {
      name?: string;
      profile_picture?: string | null;
      affiliation?: string | null;
      email?: string | null;
      citations?: number;
      h_index?: number;
      i10_index?: number;
      interests?: Array<string | { title?: string }>;
      profile_url?: string;
      updated_at?: string;
    }

    const scholarJson: ScholarApiResponse = await scholarRes.json();

    scholar = {
      name: scholarJson.name ?? 'Unknown',
      avatarUrl: scholarJson.profile_picture ?? null,
      affiliation: scholarJson.affiliation ?? null,
      email: scholarJson.email ?? null,
      country: undefined,
      citations: typeof scholarJson.citations === 'number' ? scholarJson.citations : 0,
      hIndex: typeof scholarJson.h_index === 'number' ? scholarJson.h_index : 0,
      i10Index: typeof scholarJson.i10_index === 'number' ? scholarJson.i10_index : 0,
      interests: Array.isArray(scholarJson.interests)
        ? scholarJson.interests.map((i: string | { title?: string }) => ({ name: typeof i === 'object' && i.title ? i.title : String(i) }))
        : [],
      profileUrl: scholarJson.profile_url ?? '',
      updatedAt: scholarJson.updated_at ?? new Date().toISOString(),
    };

    // ORCID profile – fetched from public ORCID API (JSON)
    const orcidId = '0009-0007-9072-8458';
    const orcidRes = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/person`, {
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 21600 }, // 6‑hour ISR window
    });

    if (!orcidRes.ok) {
      throw new Error(`ORCID request failed with status ${orcidRes.status}`);
    }

    interface OrcidApiResponse {
      name?: {
        'given-names'?: { value?: string };
        'family-name'?: { value?: string };
      };
      'last-modified-date'?: { value?: number };
      biography?: { personal?: { value?: string } };
      keywords?: { keyword?: Array<{ content: string }> };
    }

    const orcidJson: OrcidApiResponse = await orcidRes.json();

    const givenName: string | undefined = orcidJson?.name?.['given-names']?.value;
    const familyName: string | undefined =
      orcidJson?.['name']?.['family-name']?.value ?? orcidJson?.name?.['family-name']?.value;
    const fullName = [givenName, familyName].filter(Boolean).join(' ');

    const lastModifiedValue: number | undefined = orcidJson?.['last-modified-date']?.value;
    const lastActiveYear =
      typeof lastModifiedValue === 'number'
        ? new Date(lastModifiedValue).getUTCFullYear()
        : undefined;

    // Extract biography and keywords from person API
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

    orcid = {
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

    // Publications list – currently static, but you can later swap this to a fetch as well
    const publications = staticPublications;

    return { scholar, orcid, publications };
  } catch (error) {
    // For ISR: rethrow so Next.js keeps serving the last successful static snapshot
    // This ensures that if API calls fail during revalidation, users still see
    // the last successfully fetched data (no errors shown to users)
    throw error;
  }
}

export default async function PublicationsPage() {
  try {
    const { scholar, orcid, publications } = await getPublicationsData();

    return (
      <PublicationsClient
        initialScholar={scholar}
        initialOrcid={orcid}
        initialPublications={publications}
      />
    );
  } catch (error) {
    // If this is the initial build and it fails, Next.js will retry
    // If this is a revalidation and it fails, Next.js serves the cached version
    // Re-throw to let Next.js handle ISR fallback behavior
    throw error;
  }
}

