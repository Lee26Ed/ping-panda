Project Dashboard: A Next.js (App Router) and Mantine Application

This project implements a modern, responsive user and admin dashboard utilizing Next.js with the App Router, Mantine for UI components, and NextAuth for server-side role management. The architecture separates server-side logic (authentication, role checking) from client-side interactivity (state management, event handling) following best practices.

🚀 Key Features

1. Role-Based Access Control (RBAC)

The main landing page (src/app/page.tsx) acts as a server-side router. It uses getServerSession to determine the user's role and conditionally renders the appropriate dashboard:

Admin Dashboard (<AdminDashboard />): Rendered for users with the "Admin" role.

User Dashboard (<UserDashboard />): Rendered for users with the "User" role.

2. Interactive User Dashboard (Client Component)

The UserDashboard.tsx is a rich, client-side component (marked with "use client") that features real-time state management for an interactive experience.

Modules & Interactivity:

Quick Stats: Displays key metrics like "Projects Completed" and "Hours Logged This Week."

Time Logging: A button to "Log 0.5 Hours" demonstrates client-side state updates. Clicking it instantly updates the "Hours Logged" counter and its corresponding progress bar without a page reload.

Performance Ring: A visual representation of the user's performance score using Mantine's Progress.Root.

Recent Activity Table: A structured, easy-to-read table displaying the latest tasks, project affiliation, status, and priority using Mantine's Table and Badge components.

Goals/Targets Module: Tracks high-level objectives with visual progress indicators.

3. Technology Stack

Technology

Purpose

Next.js

React Framework with App Router

Mantine

Modern, comprehensive UI component library

NextAuth

Authentication and Session Management

TypeScript

Static typing for improved development stability

```
🛠 Project Structure

.
├── src/
│   ├── app/
│   │   └── page.tsx           # Server Component: RBAC routing and session verification
│   ├── components/
│   │   ├── admin/
│   │   │   └── dashboard/
│   │   │       └── AdminDashboard.tsx   # Placeholder for Admin view
│   │   ├── user/
│   │   │   └── dashboard/
│   │   │       └── UserDashboard.tsx    # Client Component: Interactive user view (with useState)
│   │   └── layouts/
│   │       └── NavBar.tsx               # Navigation component
│   └── lib/
│       └── authOptions.ts               # NextAuth configuration
```

⚙ Installation and Setup (Local Development ONLY)

These steps are for developers who wish to run the application in development mode directly on their host machine, outside of a Docker container.
```
Clone the repository:

git clone [repository-url]
cd project-dashboard


Install dependencies:

npm install
```

Configure Environment Variables:
Create a .env.local file and add necessary variables for NextAuth, such as NEXTAUTH_SECRET.

Run the development server:

npm run dev


Open http://localhost:3000 in your browser.

🐳 Dockerization (Production Deployment)

This application uses a standard multi-stage Docker build for Next.js to ensure a small, secure production image. Users running the application via Docker only need to follow these steps and do not need to run npm install or npm run dev manually.

1. Dockerfile Overview (Conceptual)

The build process is divided into three stages: base, builder, and runner.

base: Installs dependencies common to both the build and run stages.

builder: Runs npm run build to generate the static assets and the Next.js server bundle.

runner: A minimal node image that only copies the production assets (.next/standalone, public, node_modules) to run the compiled application.

2. Building the Docker Image

To create the production image (e.g., named project-dashboard):

docker build -t project-dashboard:latest .


3. Running the Container

Run the built image, exposing the application on port 3000 (or the port configured in Next.js):

docker run -d -p 3000:3000 project-dashboard:latest


The application will then be accessible at http://localhost:3000.

📝 Next Steps / Potential Enhancements

Data Persistence: Integrate the time-logging feature with a database (e.g., Firestore or PostgreSQL) instead of local React state.

Real Data: Replace the mock data arrays (initialUserStats, mockActivityData) with API calls to a backend service.

Routing: Implement client-side navigation within the dashboard (e.g., a tabbed layout for Tasks, Goals, and Reports).

Accessibility: Ensure all new components (especially the table) meet high accessibility standards.
