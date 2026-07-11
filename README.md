# Project Adhikaar

> Everyone has the right to live freely, safely, and with dignity.

Project Adhikaar is an open-source platform that helps vulnerable individuals safely connect with trusted organizations that can provide support such as housing, legal aid, mental health services, employment assistance, and other essential resources.

## Project Status

🚧 **Current Phase:** Backend development and API design

## Documentation

All project documentation can be found in the `/docs` directory.

**Start here:** [docs/README.md](./docs/README.md)

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v22 or later recommended)
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/mona-raj/project-adhikaar.git
```

Move into the project directory:

```bash
cd project-adhikaar
```

Install backend dependencies:

```bash
cd backend
npm install
```

### Database Setup

Generate the Prisma Client and the Entity Relationship (ER) diagram:

```bash
npx prisma generate
```

Apply the database schema:

```bash
npx prisma migrate dev
```

If seed data is available:

```bash
npm run seed
```

### Running the Project

Create a `.env` file inside the `backend` directory (if required).

Start the development server:

```bash
npm run dev
```

The backend will start on:

```text
http://localhost:3000
```

Once the server is running:

- **API Documentation (Swagger):** [http://localhost:3000/docs](http://localhost:3000/docs)
- **Health Check:** [http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health)

## API Documentation

An interactive OpenAPI (Swagger) documentation is generated directly from the Zod validation schemas and response contracts.

After starting the backend, open:

```text
http://localhost:3000/docs
```

The documentation is automatically synchronized with the application's request validation and response contracts, ensuring the API specification stays consistent with the implementation.

## Database Schema

The Entity Relationship (ER) diagram is generated automatically from the Prisma schema.

**Location:** [docs/er-diagram.svg](./docs/er-diagram.svg)

To regenerate the diagram after modifying the Prisma schema:

```bash
npx prisma generate
```

The ER diagram is generated using `prisma-erd-generator` during Prisma Client generation.

## Repository Structure

```text
├── backend/     Backend API (Express + Prisma)
├── frontend/    Web application (planned)
├── mobile/      Mobile application (planned)
└── docs/        Product, architecture, and design documentation
```
