# Nipe ID: Lost & Found Identity Document App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## User Roles & Dashboards

- **Visitor:** Can search for documents, but must log in to claim.
- **User:** Can claim documents, view claimed docs, and report disputes.
- **Poster:** Can upload found documents and manage their uploads.
- **Kiosk Manager:** Manages kiosk inventory and document handover.
- **Admin:** Approves posters/kiosks, manages users, and views analytics.

## Testing Role-Based Protection

- Try to access `/admin`, `/poster`, `/kiosk`, `/user` as different roles or as a visitor.
- Unauthorized access will redirect to login or the correct dashboard.

## Accessibility & Mobile

- All forms and buttons are keyboard accessible.
- ARIA labels and semantic HTML are used for screen readers.
- Layouts are responsive for mobile and desktop.

## Troubleshooting
- If you see errors about `nodemailer` or `tls`, ensure you are not using email sign-in, or set the API route runtime to `nodejs`.

---

For more, see the code comments and each dashboard page.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
