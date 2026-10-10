# SupportDesk

SupportDesk frontend (React/Vite) and Express/MySQL backend.

## Run locally with XAMPP

1. Start **MySQL** in XAMPP.
2. Import `backend/database.sql` in phpMyAdmin. It creates the `supportdesk` database, users table, and tickets table. If the database already exists, import it again to create the new tickets table.
3. In `backend`, copy `.env.example` to `.env` and set the XAMPP database credentials plus a strong `JWT_SECRET` (at least 32 characters).
4. Run `npm install` and `npm run dev` inside `backend`.
5. In the project root, copy `.env.example` to `.env`, set `VITE_API_URL=http://localhost:4000/api`, run `npm install`, then `npm run dev`.
6. Open the Vite URL displayed in the terminal.

## Authentication and roles

Public registration always creates a `customer`. To give an account administrator access, first register that account, then run this in phpMyAdmin:

```sql
USE supportdesk;
UPDATE users SET role = 'admin' WHERE email = 'the-admin-email@example.com';
```

Sign out and sign back in so the API issues a JWT containing the updated role. Admin users land on the Admin Dashboard after login.

## Implemented endpoints

- `GET /api/health` — health check
- `POST /api/auth/register` — create customer account
- `POST /api/auth/login` — authenticate and issue JWT
- `GET /api/auth/me` — get authenticated account
- `GET /api/tickets` — list tickets (customers see their own; admins see all; agents see assigned and unassigned tickets)
- `POST /api/tickets` — create a ticket for the authenticated user

Ticket creation and ticket listing are persisted in MySQL. Ticket replies, assignment changes, and status updates in the existing detail UI are not yet persisted by API.
