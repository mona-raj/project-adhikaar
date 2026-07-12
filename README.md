# Project Adhikaar

> Everyone has the right to live freely, safely, and with dignity.

Project Adhikaar is an open-source platform that helps vulnerable individuals safely connect with trusted organizations that can provide support such as housing, legal aid, mental health services, employment assistance, and other essential resources.

## Project Status

🚧 **Current Phase:** Backend development and API design

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- Git
- Node.js (v22 or later recommended)
- npm

### Installation

Clone the repository and move into the backend project:

```bash
git clone https://github.com/mona-raj/project-adhikaar.git

cd project-adhikaar/backend
```

Install the project dependencies:

```bash
npm install
```

Initialize the development database:

```bash
npm run db:setup
```

This command automatically:

- Applies all existing Prisma migrations
- Generates the Prisma Client
- Generates the Entity Relationship (ER) diagram
- Seeds the database with development data

### Running the Project

If required, create a `.env` file in the `backend` directory.

Start the development server:

```bash
npm run dev
```

The backend will be available at:

```text
http://localhost:3000
```

## Development Commands

| Command                    | Description                        |
| -------------------------- | ---------------------------------- |
| `npm run dev`              | Start the development server       |
| `npm run build`            | Build the project                  |
| `npm run test`             | Run all tests                      |
| `npm run test:watch`       | Run tests in watch mode            |
| `npm run test:coverage`    | Generate the test coverage report  |
| `npm run db:migrate`       | Apply pending database migrations  |
| `npm run db:seed`          | Seed the database                  |
| `npm run db:studio`        | Open Prisma Studio                 |
| `npm run generate:openapi` | Generate the OpenAPI specification |

## Documentation

| Resource                        | Location                                     |
| ------------------------------- | -------------------------------------------- |
| Swagger UI                      | http://localhost:3000/docs                   |
| OpenAPI Specification           | http://localhost:3000/openapi.json           |
| Versioned OpenAPI Specification | [docs/openapi.json](./docs/openapi.json)     |
| Entity Relationship Diagram     | [docs/er-diagram.svg](./docs/er-diagram.svg) |
| Project Documentation           | [`docs/`](./docs/README.md)                            |

The OpenAPI specification is generated directly from the Zod validation schemas and response contracts, ensuring that the API documentation stays synchronized with the implementation.

The Entity Relationship (ER) diagram is generated automatically from the Prisma schema during Prisma Client generation.

## Repository Structure

```text
├── backend/     Backend API (Express + Prisma)
├── frontend/    Web application (planned)
├── mobile/      Mobile application (planned)
└── docs/        Product, architecture, and design documentation
```
