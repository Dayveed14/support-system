<<<<<<< HEAD
=======
<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
>>>>>>> 9604213 (sync)
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
<<<<<<< HEAD
=======
>>>>>>> daddf48 (linked backend)
>>>>>>> 9604213 (sync)
