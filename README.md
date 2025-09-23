# Alex's Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and TailwindCSS, featuring smooth animations and a clean design aesthetic.

## Features

- **Responsive Design**: Mobile-first approach with seamless tablet and desktop experiences
- **Smooth Animations**: Powered by Framer Motion for engaging user interactions
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Performance Focused**: Optimized images, lazy loading, and fast loading times
- **Individual Project Pages**: Detailed case studies for each portfolio piece
- **Contact Form**: Functional contact form with validation
- **Editable Content**: Easy content management through JSON data files

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and theme
│   ├── page.tsx            # Homepage with all sections
│   └── work/[slug]/        # Individual project pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx          # Navigation header
│   ├── hero-section.tsx    # Hero with motivational quote
│   ├── works-section.tsx   # Portfolio grid
│   ├── about-section.tsx   # About me with timeline
│   ├── contact-section.tsx # Contact form and info
│   └── project-detail.tsx  # Individual project layout
├── lib/
│   └── data.json          # Editable content data
└── public/                # Static assets and images
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd alex-portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Content Management

Edit the content in `lib/data.json`:

- **Personal Info**: Name, title, bio, contact details
- **Projects**: Add/edit portfolio projects with descriptions, images, and tags
- **Experience**: Update timeline with work history
- **Tools**: Modify the tools and technologies list

### Styling

The design system uses CSS custom properties defined in `app/globals.css`. Key customization areas:

- **Colors**: Modify the color palette in the `:root` and `.dark` selectors
- **Typography**: Fonts are configured in `app/layout.tsx`
- **Spacing**: Uses Tailwind's spacing scale
- **Animations**: Framer Motion configurations in individual components

### Adding New Projects

1. Add project data to `lib/data.json` in the `projects` array
2. Add project images to the `public/` directory
3. The project detail page will automatically generate based on the project ID

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### GitHub Pages (Subfolder Setup)

1. Update `next.config.mjs`:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
\`\`\`

2. Build and export:
\`\`\`bash
npm run build
\`\`\`

3. Deploy the `out/` folder to GitHub Pages

### Other Platforms

The site can be deployed to any static hosting service:
- Netlify
- Cloudflare Pages  
- AWS S3 + CloudFront

## Performance Optimization

- **Images**: Use Next.js Image component with optimization
- **Fonts**: Self-hosted Google Fonts with font-display: swap
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Intersection Observer for animations
- **Bundle Analysis**: Run `npm run analyze` to check bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, reach out via:
- Email: alex@example.com
- GitHub: [@alex](https://github.com/alex)
- LinkedIn: [Alex](https://linkedin.com/in/alex)
\`\`\`

```json file="" isHidden
