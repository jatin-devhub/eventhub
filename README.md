# EventHub

This is a take home assignment for interview candidates. Read this file carefully and do as expected.
Create a simplified web app where users can:
1. View a list of upcoming events (e.g., tech meetups, webinars, workshops)
2. View details about a specific event
3. Register for an event

## Project Overview

**Features:**
- List and filter events
- View event details
- Register for an event
- Admin analytics: popular events & daily stats

**Tech Stack:**
- Next.js (API routes + frontend)
- Sqlite (in memory database)
  - So that project can run without any additional setup
- Candidate may use raw SQL or libraries of choice

## Tasks for Candidate

- Implement frontend pages (like `/events`, `/events/[id]` and other if required)
- Develop backend API routes
- Optimize SQL queries and document them (`Document.md`) (with pros & cons of each optimization)
  - Assume there will be 1 million events
  - Basic structure of tables are given in sql/schema.sql. Candidate do relevant changes if required.
- Create FE components (using react + tailwind css)
  - focus should be more on structure & code quality. Highlight important decision factors in a document (`Document.md`)

## Setup

1. Configure `.env.local` with DB credentials
2. Run SQL schema from `sql/schema.sql`
3. Start dev server: `npm run dev`

## Evaluation

- Code quality and structure
- System performance with large data & more concurrent users
- Clean, documented approach
- AI shoudln't be used (i.e. no Vibe Coding)
- Further rounds will be done on shared codebase + few general technical discussions.