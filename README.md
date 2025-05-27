# MeetApp - Schedule/Setup an Instant Meeting in a Click

A modern platform built with Next.js that enables instant and scheduled google meets.

## Features

- Instant video meetings
- Scheduled interviews
- User authentication
- Dashboard interface

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   # Add other required environment variables for auth providers
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import your project to [Vercel](https://vercel.com/new)
3. Configure environment variables
4. Deploy

For other platforms, ensure they support:

- Node.js runtime
- Environment variables

## Architecture Decisions

1. **Next.js App Router**

   - Leverages server components for improved performance
   - Built-in API routes for backend functionality
   - Server-side authentication with NextAuth.js

2. **Authentication Flow**

   - Server-side session management
   - Protected routes with middleware
   - Redirect to login for unauthenticated users

3. **Dashboard Architecture**
   - Component-based structure for maintainability
   - Server-side data fetching for meetings

## Assumptions

1. Single tenant architecture

## MVP Limitations

1. **Feature Constraints**
   - Authentication using different providers
   - Dark Mode Features    

2. **Technical Limitations**
   - Storage of scheduled meetings

3. **Scale Limitations**
   - Local database storage
   - Basic error handling

## Future Improvements

1. Advanced meeting features (recordings, transcription)
2. Custom branding options
3. Enhanced calendar dashboard
4. Integration with calendar services

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
