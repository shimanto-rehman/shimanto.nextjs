# Portfolio Website - S.M. Obaydur Rahman

A modern, feature-rich portfolio website built with Next.js 16, showcasing professional achievements, projects, publications, and more. This portfolio features smooth animations, 3D elements, and integrations with various APIs for dynamic content.

## 🚀 Features

### Core Pages
- **Home**: Animated landing page with interactive elements and confetti celebration
- **About**: Comprehensive profile with experience, education, skills visualization, and resume download
- **Blog**: Dynamic blog posts with rich content formatting
- **Publications**: Google Scholar integration displaying research publications and metrics
- **Projects**: Filterable project showcase with categories and search functionality
- **Repositories**: GitHub integration showing repositories with statistics
- **Certifications**: Certificate gallery with detailed views
- **Resources**: Educational resources and PDF downloads
- **People**: Testimonials and collaborations
- **Teaching**: Course materials and teaching experience
- **Gallery**: Photo gallery with Cloudinary integration and lightbox modal
- **Contact**: Contact form with email notifications

### Technical Highlights
- ✨ Smooth page transitions and animations (GSAP, Framer Motion)
- 🎨 Modern, responsive UI design
- 🖼️ 3D interactive elements using Three.js and React Three Fiber
- 📊 Data visualizations (Chart.js, Recharts)
- 🔍 Dynamic content from external APIs (GitHub, Google Scholar)
- ☁️ Cloudinary integration for optimized image delivery
- 📧 Contact form with Nodemailer email service
- ⚡ Server-side rendering and Incremental Static Regeneration (ISR)
- 🎯 TypeScript for type safety
- 📱 Fully responsive design

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.10
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: CSS Modules, Tailwind CSS 4
- **Animations**: 
  - Framer Motion 12.23.26
  - GSAP 3.14.2
- **3D Graphics**: 
  - Three.js 0.181.2
  - @react-three/fiber 9.4.2
  - @react-three/drei 10.7.7
  - OGL 1.0.11

### Data Visualization
- Chart.js 4.5.1
- react-chartjs-2 5.3.1
- Recharts 3.5.1

### APIs & Services
- **Image Optimization**: next-cloudinary 6.17.5
- **Email**: nodemailer 7.0.12
- **HTTP Client**: axios 1.13.2
- **External APIs**: 
  - GitHub API
  - Google Scholar API (via SerpAPI)

### Development Tools
- ESLint 9
- TypeScript
- Next.js ESLint Config

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- A code editor (VS Code recommended)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shimanto.nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   
   # Google Scholar API (for publications page)
   SCHOLAR_AUTHOR_ID=your-google-scholar-author-id
   SERPAPI_KEY=your-serpapi-key
   
   # GitHub API (optional, for higher rate limits)
   GITHUB_TOKEN=your-github-personal-access-token
   
   # Site URL (for production)
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   
   # Cloudinary (if using Cloudinary features)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=your-api-secret
   ```

   **Important Notes:**
   - For Gmail, you need to create an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password)
   - Get SerpAPI key from [serpapi.com](https://serpapi.com)
   - Get GitHub token from [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Cloudinary setup is optional if you're not using Cloudinary for images

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
shimanto.nextjs/
├── app/
│   ├── api/                    # API routes
│   │   ├── contact/            # Contact form endpoint
│   │   └── scholar/            # Google Scholar data endpoint
│   ├── components/             # Reusable React components
│   │   ├── ColorBends.tsx      # Animated gradient component
│   │   ├── ErrorBoundary.tsx   # Error handling component
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Preloader.tsx       # Page loading animation
│   │   ├── Prism.tsx           # 3D prism component
│   │   ├── RotatingDesignation.tsx
│   │   ├── SocialLinks.tsx
│   │   └── TagList.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCrowdSimulation.ts  # GSAP crowd animation
│   │   ├── usePageDataLoaded.ts   # Page load tracking
│   │   └── useScriptLoader.ts     # Dynamic script loading
│   ├── pages/                  # Page components
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog posts
│   │   ├── certifications/     # Certifications gallery
│   │   ├── contact/            # Contact form
│   │   ├── gallery/            # Photo gallery
│   │   ├── people/             # Testimonials
│   │   ├── projects/           # Projects showcase
│   │   ├── publications/       # Research publications
│   │   ├── repositories/       # GitHub repositories
│   │   ├── resources/          # Resources and PDFs
│   │   └── teaching/           # Teaching materials
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── error.tsx               # Error page
│   ├── loading.tsx             # Loading page
│   └── not-found.tsx           # 404 page
├── public/                     # Static assets
│   ├── fonts/                  # Font files
│   ├── images/                 # Image assets
│   ├── js/                     # JavaScript files
│   └── pdfs/                   # PDF documents
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎯 Key Features Explained

### 1. Preloader Animation
Custom preloader component that displays during page initialization, waiting for critical resources to load before showing content.

### 2. GitHub Integration
The repositories page fetches real-time data from the GitHub API, displaying:
- User profile information
- Repository list with stats (stars, forks, languages)
- Automatic revalidation every 6 hours (ISR)

### 3. Google Scholar Integration
Publications page integrates with Google Scholar via SerpAPI to display:
- Research publications
- Citation metrics (citations, h-index, i10-index)
- Author profile information

### 4. Contact Form
Contact form sends emails using Nodemailer:
- Client-side form validation
- Toast notifications for success/error
- Server-side email sending via Gmail SMTP

### 5. 3D Animations
- Interactive 3D elements using Three.js
- GSAP animations for smooth transitions
- Crowd simulation on the people page

### 6. Image Optimization
- Cloudinary integration for optimized image delivery
- Next.js Image component for automatic optimization
- Lazy loading and responsive images

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📦 Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

3. **Or deploy to Vercel** (Recommended)
   - Push your code to GitHub
   - Import your repository on [Vercel](https://vercel.com)
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Gmail address for contact form | Yes (for contact) |
| `EMAIL_PASS` | Gmail App Password | Yes (for contact) |
| `SCHOLAR_AUTHOR_ID` | Google Scholar author ID | Yes (for publications) |
| `SERPAPI_KEY` | SerpAPI key for Scholar API | Yes (for publications) |
| `GITHUB_TOKEN` | GitHub Personal Access Token | Optional (for higher rate limits) |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Optional |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
| `NEXT_PUBLIC_CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |

## 🎨 Customization

### Updating Personal Information
- **About Page**: Edit `app/pages/about/aboutData.ts`
- **Home Page**: Edit `app/page.tsx`
- **Projects**: Edit `app/pages/projects/projectData.ts`
- **Certifications**: Edit `app/pages/certifications/certificateData.ts`
- **Resources**: Edit `app/pages/resources/resourcesData.ts`
- **Gallery**: Edit `app/pages/gallery/galleryData.ts`

### Styling
- Global styles: `app/globals.css`
- Component styles: Each component has its corresponding `.module.css` or `.css` file
- Responsive breakpoints are defined in component CSS files

### Navigation
Edit the navigation items in `app/components/Navbar.tsx`:
```typescript
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/pages/about' },
  // Add or modify items here
];
```

## 🐛 Troubleshooting

### Preloader not finishing
- Ensure all images are properly loaded
- Check browser console for errors
- Verify Cloudinary configuration if using Cloudinary images

### Email not sending
- Verify Gmail App Password is correct (not regular password)
- Check that 2-factor authentication is enabled on Gmail
- Verify `EMAIL_USER` and `EMAIL_PASS` environment variables

### API errors
- **GitHub API**: Check rate limits (60 requests/hour without token)
- **SerpAPI**: Verify API key and check usage limits
- Check browser console and server logs for detailed error messages

### Build errors
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## 📝 License

This project is private and proprietary. All rights reserved.

## 👤 Author

**S.M. Obaydur Rahman (Shimanto Rehman)**
- Portfolio: [shimanto.info](https://shimanto.info)
- Email: shimanto.rehman.bd@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- React Three Fiber community for 3D components
- All open-source libraries used in this project

---

Built with ❤️ using Next.js and React
