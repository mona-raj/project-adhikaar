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