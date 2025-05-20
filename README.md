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

