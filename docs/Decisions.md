# Decisions

This document records important decisions made during the design and development of Project Adhikaar.

---

## D001 - Documentation-first workflow

**Status:** Accepted

Documentation is written before implementation whenever possible.

### Rationale

- Encourages clear thinking.
- Reduces rework.
- Makes onboarding easier.

---

## D002 - MVP targets queer and transgender communities

**Status:** Accepted

The first release focuses on queer and transgender individuals while keeping the domain model extensible for future communities.

### Rationale

Building trust with one community is more feasible than serving everyone from day one.

---

## D003 - Help Seekers retain control over referrals

**Status:** Accepted

Organizations are never contacted without explicit approval from the Help Seeker.

### Rationale

Supports privacy, consent, and user agency.

---

## D004 - Anonymous help requests are supported

**Status:** Accepted

Help Seekers may request assistance without revealing their identity whenever operationally feasible.

### Rationale

Many users face risks if their identity becomes known.

---

## D005 - A Help Request may request multiple services

**Status:** Accepted

A single request may include multiple service needs.

### Rationale

Reflects real-world situations where people often require coordinated support.

---

## D006 - Cases are living records

**Status:** Accepted

A Case may evolve by adding or removing service needs while it remains active.

### Rationale

Needs often change as assistance progresses.

---

## D007 - Adopt a Monorepo structure

**Status:** Accepted

Monorepo structure with separate backend and frontend directories

### Rationale

Keep everything in one place and share necessary code

---

## D008- Help Seeker's information is not shared with the organization until they choose to.

**Status:** Accepted

- The Help Request can store contact information, but it's completely optional and remains private until the user explicitly approves sharing it.
  Contact information stored on a Help Request is not automatically visible to any organization.

- Help Requests may be submitted by authenticated or unauthenticated users. Authentication is never required to request help. If submitted by an authenticated user, user information is copied into the Help Request as a snapshot rather than referenced for historical consistency.

---

## D009 — Contact Information Before Referral

A Referral cannot be created until the Help Seeker provides at least one contact method to be shared with the selected Organization.

---

## D010 — Persistent Recommendations

Recommendations are persistent, case-scoped entities. They preserve recommendation history and the Help Seeker's decisions, and may later result in Referrals.

---

## D011 — Contact Information Before Referral

The Case owns the confirmed list of required Services. The list is derived from the Help Request through AI analysis and Help Seeker review, and may evolve throughout the Case lifecycle.

---

## D012 - OrganizationService

The relationship between Organizations and Services is modeled as a first-class domain concept because it carries business-specific attributes.

---

## D013 - RBAC

Authenticated capabilities are role-based. Help Seekers are not a dedicated role

---
