# Architecture

## Overview

Project Adhikaar follows a layered architecture that separates business rules from infrastructure concerns. The domain model remains independent of the database, web framework, or external services.

```
┌───────────────────────────────┐
│          API Layer            │
│  HTTP routes, controllers     │
└──────────────┬────────────────┘
               │
┌──────────────▼────────────────┐
│        Application Layer      │
│ Use cases and business logic  │
└──────────────┬────────────────┘
               │
┌──────────────▼────────────────┐
│         Domain Layer          │
│ Entities and domain rules     │
└──────────────┬────────────────┘
               │
┌──────────────▼────────────────┐
│      Infrastructure Layer     │
│ Prisma, database, external    │
│ integrations                  │
└───────────────────────────────┘
```

## Responsibilities

### API Layer

Receives requests, validates input, invokes application services, and returns responses. It should contain no business logic.

Request validation is performed using Zod schemas. Public API responses are returned through endpoint-specific response contracts to avoid exposing persistence models directly.

### Application Layer

Implements the platform's use cases by coordinating domain entities and repositories. Examples include creating Help Requests, generating Recommendations, and creating Referrals.

### Domain Layer

Contains the core business concepts and rules of Project Adhikaar. Domain concepts and relationships are documented in [`domain.md`](./2_Domain.md).

### Infrastructure Layer

Provides implementations for persistence and external integrations. Prisma is used as the ORM for data access, while the underlying database remains an implementation detail.

## Persistence

The database schema is implemented using Prisma ORM. Catalog entities such as `Role`, `Service`, and `Language` are managed by the platform and seeded during application setup.

## File Naming Conventions

| Layer      | Export Type      | File Naming        | Example                       |
| ---------- | ---------------- | ------------------ | ----------------------------- |
| Repository | Class            | PascalCase         | `HelpRequestRepository.ts`    |
| Service    | Class            | PascalCase         | `CreateHelpRequestService.ts` |
| Controller | Class            | PascalCase         | `HelpRequestController.ts`    |
| Middleware | Function         | camelCase + suffix | `validate.middleware.ts`      |
| Validation | Schema/Object    | camelCase          | `helpRequest.ts`              |
| Routes     | Router           | camelCase          | `helpRequest.routes.ts`       |
| Utils      | Functions        | camelCase          | `date.ts`                     |
| Types      | Types/Interfaces | camelCase          | `helpRequest.ts`              |
