# ReferMakkale - Tamil Business Directory

A modern, community-driven business directory for Tamil businesses in Melbourne, built with Next.js 15 and TypeScript.

## Features

- **Clean, Simple Design**: Blue backgrounds with white text, white backgrounds with black text
- **Mobile Responsive**: Tailwind CSS for optimal mobile experience
- **Community Driven**: Built for Tamil families in Melbourne
- **Search & Filter**: Easy business discovery
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ (currently using v24.8.0)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export for GitHub Pages)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and prepare for GitHub Pages deployment

## Deployment to GitHub Pages

This project is configured for GitHub Pages deployment with automatic static export.

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "GitHub Actions" as the source
5. The workflow will automatically deploy on every push to main branch

### Manual Deployment

1. Build the static export:
```bash
npm run build
```

2. The static files will be generated in the `out/` directory

3. Deploy the `out/` directory to GitHub Pages

### GitHub Pages URL

Your site will be available at: `https://[username].github.io/[repository-name]/`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/        # Reusable components (to be added)
└── lib/              # Utility functions (to be added)
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Linting**: ESLint with Next.js config

## Next Steps

1. Add Google Sheets integration for business data
2. Implement search functionality
3. Create business detail pages
4. Add category filtering
5. Mobile optimization enhancements

## Contributing

This project is built for the Tamil community in Melbourne. Feel free to contribute with business listings and feature suggestions.
