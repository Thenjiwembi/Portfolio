# Thenjiwe Mbi Portfolio

A modern portfolio website and personal product showcase built with React, Vite, Express, and TypeScript. The app presents a developer portfolio with project highlights, education, certificates, a polished contact form, and an AI-assisted interface for interactions.

## Overview

This project combines a React front end with an Express server and tRPC API layer. It is designed as a portfolio and product-focused personal site with:

- a responsive landing page and personal branding
- project and education sections
- certificate showcase pages
- a contact form connected to Formspree
- theming support with a light/dark toggle
- AI assistant and backend integrations
- storage and OAuth-ready server setup

## Tech Stack

- Frontend: React 19, Vite, TypeScript
- Styling: Tailwind CSS, custom CSS, Framer Motion
- UI: shadcn-inspired component system
- Backend: Express.js, tRPC
- Database: Drizzle ORM with MySQL
- Testing: Vitest
- Package Manager: pnpm

## Project Structure

```bash
.
├── client/                 # Frontend React app
│   ├── public/            # Static assets
│   └── src/              # Application source
├── server/                # Express + tRPC backend
│   ├── _core/            # Core server utilities
│   └── routers.ts        # API router config
├── drizzle/               # Drizzle schema + migrations
├── shared/                # Shared constants and types
├── patches/               # pnpm patch files
├── package.json           # Scripts and dependencies
├── vite.config.ts         # Vite config
├── vitest.config.ts       # Vitest config
├── drizzle.config.ts      # Drizzle config
├── tsconfig.json          # TypeScript config
├── .gitignore             # Git ignore rules
├── pnpm-lock.yaml         # Dependency lockfile
└── README.md              # Project documentation
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- pnpm installed
- a MySQL-compatible database if you plan to use DB-backed features
- environment variables configured for the server

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd Portfolio
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a local environment file:

```bash
copy NUL .env
```

Then add the required variables, for example:

```env
VITE_APP_ID=
JWT_SECRET=
DATABASE_URL=
OAUTH_SERVER_URL=
OWNER_OPEN_ID=
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
PORT=3000
```

> These variables match the configuration used in the server environment helpers.

## Available Scripts

```bash
pnpm dev
```

Starts the development server with Vite in a local Express runtime.

```bash
pnpm build
```

Builds the frontend and bundles the server for production.

```bash
pnpm start
```

Runs the production build.

```bash
pnpm check
```

Runs TypeScript type checking without emitting files.

```bash
pnpm test
```

Runs the project test suite with Vitest.

```bash
pnpm db:push
```

Generates and applies Drizzle migrations.

## Running the App

For local development:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

The server automatically picks a nearby open port if port 3000 is already in use.

## Features

### Portfolio Experience
- strong personal branding and portfolio layout
- multiple sections for home, education, and certificates
- project showcase cards with visual presentation
- responsive navigation and mobile menu support

### Contact and Communications
- a working contact form using Formspree
- toast notifications for form success/error states
- direct CV download and preview links

### App Integrations
- AI assistant pattern and backend API routing
- OAuth-ready auth infrastructure
- storage proxy and file handling setup
- fits a product-focused portfolio or startup-style personal brand

## Notes

This portfolio is configured as a full-stack app rather than a simple static site. The server handles runtime logic, API endpoints, and asset routing while the client delivers the user-facing experience.

If you plan to deploy the site, make sure your environment variables are correctly set in the hosting environment, and ensure the database and any external API credentials are available to the server at runtime.

## License

This project is licensed under the MIT License.
