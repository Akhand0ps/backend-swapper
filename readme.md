# Backend-swapper

Backend-swapper is a Node.js/TypeScript backend API for user authentication, built with Express, Prisma, PostgreSQL, and JWT.

## Features

- User signup and login with hashed passwords
- JWT-based authentication
- Prisma ORM with PostgreSQL
- Modular code structure

## Project Structure

```
.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── index.ts
│   ├── config/
│   │   └── prisma.ts
│   ├── controllers/
│   │   └── authController.ts
│   ├── middlewares/
│   ├── routes/
│   │   └── authRoutes.ts
│   ├── services/
│   │   └── authService.ts
│   └── utils/
│       └── jwt.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/Backend-swapper.git
   cd Backend-swapper
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run Prisma migrations:**
   ```sh
   npx prisma migrate deploy
   ```

5. **Start the server:**
   ```sh
   npx ts-node-dev src/index.ts
   ```

## API Endpoints

### Auth

- `POST /api/auth/signup`
  - Body: `{ "name": string, "email": string, "password": string }`
  - Response: `{ "user": { "token": string, "user": { ... } } }`

- `POST /api/auth/login`
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "result": { "token": string, "user": { ... } } }`

## License

ISC

---

**Note:** Update the `DATABASE_URL` and `JWT_SECRET` in your `.env` file as per your environment.