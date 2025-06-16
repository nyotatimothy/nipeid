# Nipe ID: Lost & Found Identity Document App

A Next.js application for managing lost and found identity documents in Kenya. This platform connects document finders with owners through a network of verified kiosks.

## Features

- Document search and claim system
- Role-based access control (Visitor, User, Poster, Kiosk Manager, Admin)
- Kiosk management and document handover tracking
- Email notifications
- Mobile-responsive design
- Secure document handling

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TailwindCSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Deployment:** Vercel
- **Email:** Nodemailer

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/MyIDApp.git
   cd MyIDApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/myidapp"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # Email (for production)
   SMTP_HOST="your-smtp-host"
   SMTP_PORT="587"
   SMTP_USER="your-smtp-user"
   SMTP_PASSWORD="your-smtp-password"
   SMTP_FROM="noreply@myidapp.com"

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npx prisma db seed
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Sample Credentials

For testing purposes, you can use the following sample accounts:

### Admin Account
- **Email:** admin@myidapp.com
- **Password:** Admin@123
- **Role:** Admin
- **Access:** Full system access including user management, kiosk approval, and analytics

### Regular User Account
- **Email:** user@myidapp.com
- **Password:** User@123
- **Role:** User
- **Access:** Can search and claim documents, view claimed documents, and report disputes

### Kiosk Manager Account
- **Email:** kiosk@myidapp.com
- **Password:** Kiosk@123
- **Role:** Kiosk Manager
- **Access:** Can manage kiosk inventory and document handover

### Document Poster Account
- **Email:** poster@myidapp.com
- **Password:** Poster@123
- **Role:** Poster
- **Access:** Can upload found documents and manage uploads

> **Note:** These are sample credentials for development and testing. In production, these accounts should be changed or removed for security reasons.

## Deployment Steps

1. **Prepare the project:**
   - Ensure all environment variables are set in your Vercel project settings
   - Update `next.config.js` to include necessary configurations:
     ```js
     /** @type {import('next').NextConfig} */
     const nextConfig = {
       reactStrictMode: true,
       swcMinify: true,
       output: 'standalone',
       env: {
         NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development'
       },
       eslint: {
         ignoreDuringBuilds: true,
         dirs: ['src']
       },
       typescript: {
         ignoreBuildErrors: true
       },
       images: {
         domains: ['lh3.googleusercontent.com'],
       },
       async headers() {
         return [
           {
             source: '/api/:path*',
             headers: [
               { key: 'Access-Control-Allow-Credentials', value: 'true' },
               { key: 'Access-Control-Allow-Origin', value: '*' },
               { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
               { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
             ]
           }
         ]
       }
     };
     ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Configure the following settings in Vercel:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`
     - Install Command: `npm install`
     - Development Command: `next dev`
   - Add all required environment variables in Vercel's project settings
   - Deploy the project

3. **Set up Continuous Deployment:**
   - In your Vercel project dashboard, go to Settings > Git
   - Ensure "Auto Deploy" is enabled
   - Configure branch deployments:
     - Production Branch: `main` (or your default branch)
     - Preview Branches: `feature/*`, `develop`, etc.
   - Set up deployment protection (optional):
     - Go to Settings > Git > Deployment Protection
     - Enable "Require password for deployment" if needed
   - Configure deployment notifications:
     - Go to Settings > Notifications
     - Enable email notifications for deployment status
   - Set up deployment checks:
     - Go to Settings > Git > Deployment Protection
     - Enable "Require passing checks before deploying"

4. **GitHub Integration:**
   - Ensure your repository has branch protection rules:
     - Go to GitHub repository > Settings > Branches
     - Add rule for `main` branch:
       - Require pull request reviews before merging
       - Require status checks to pass before merging
       - Include administrators in these restrictions
   - Set up GitHub Actions (optional) for additional checks:
     ```yaml
     # .github/workflows/ci.yml
     name: CI
     on:
       push:
         branches: [ main, develop ]
       pull_request:
         branches: [ main, develop ]
     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - uses: actions/setup-node@v2
             with:
               node-version: '18'
           - run: npm ci
           - run: npm run build
           - run: npm run lint
     ```

5. **Post-deployment:**
   - Run database migrations on the production database
   - Verify all API routes are working
   - Test authentication flows
   - Monitor error logs in Vercel dashboard

## User Roles & Access

- **Visitor:** Can search for documents, must log in to claim
- **User:** Can claim documents, view claimed docs, report disputes
- **Poster:** Can upload found documents and manage uploads
- **Kiosk Manager:** Manages kiosk inventory and document handover
- **Admin:** Approves posters/kiosks, manages users, views analytics

## Development Guidelines

1. **Code Style:**
   - Follow TypeScript best practices
   - Use ESLint for code linting
   - Write meaningful commit messages

2. **Testing:**
   - Test all API routes
   - Verify role-based access
   - Check mobile responsiveness

3. **Security:**
   - Never commit sensitive data
   - Use environment variables for secrets
   - Implement proper authentication checks

## Troubleshooting

- If you see errors about `nodemailer` or `tls`, ensure email settings are correct
- For database connection issues, verify your DATABASE_URL
- If authentication fails, check your OAuth credentials

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
