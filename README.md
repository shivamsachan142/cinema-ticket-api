# Cinema Ticket Purchasing Platform API

This is a Node.js + TypeScript REST API for a cinema ticket booking system that supports safe, concurrent seat purchases at scale.

---

## Features

- Create a cinema with configurable number of seats
- Purchase a specific seat
- Purchase first two available **consecutive** seats
- Concurrency-safe booking logic using **PostgreSQL row-level locking**
- Built using **Express**, **Prisma**, and **PostgreSQL**

---

## Tech Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL

---

## env

DATABASE_URL="postgresql://shivamsachan:*****@localhost:5432/cinema"

---

## APIs

1. POST /api/cinemas
Body: {
  "seatCount": 10
}

2. POST /api/cinemas/:id/seats/:seatNumber/purchase

3. POST /api/cinemas/:id/seats/consecutive/purchase

---

## Assumptions
1. Seat numbers are unique per cinema.
2. Seat availability is determined only by the isBooked flag.
3. Booking is immediate and irreversible (no cancel/reserve logic). #(not in the scope)
4. No user authentication/authorization included (kept out for simplicity).

---
## Concurrency & Scalability
1. To ensure safe booking under concurrent traffic and across multiple instances:
2. Booking logic uses SELECT ... FOR UPDATE in PostgreSQL via raw SQL queries.
3. Prisma’s $transaction() ensures all operations are atomic and isolated.
4. This prevents race conditions and double-booking.

