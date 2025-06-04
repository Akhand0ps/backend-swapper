# Backend-swapper

Backend-swapper is a Node.js/TypeScript backend API for user authentication, session management, and feedback, built with Express, Prisma, PostgreSQL, and JWT.

## Features

- User signup and login with hashed passwords
- JWT-based authentication (token stored in HTTP-only cookie)
- Session scheduling and management
- User feedback system (rate and comment on sessions)
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
│   │   ├── authController.ts
│   │   ├── feedbackController.ts
│   │   └── sessionController.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── feedbackRoutes.ts
│   │   └── sessionRoutes.ts
│   ├── services/
│   │   ├── authService.ts
│   │   ├── feedbackService.ts
│   │   └── sessionService.ts
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

5. **Generate the Prisma client (required if you change schema or switch OS):**
   ```sh
   npx prisma generate
   ```

6. **Start the server:**
   ```sh
   npx ts-node-dev src/index.ts
   ```
   Or, if you are running the compiled code:
   ```sh
   node dist/index.js
   ```

## API Endpoints

### Auth

- `POST /api/auth/signup`
  - **Body:**  
    ```json
    { "name": "string", "email": "string", "password": "string" }
    ```
  - **Response:**  
    ```json
    { "user": { "id": "string", "name": "string", "email": "string" } }
    ```
  - **Notes:**  
    - Sets a `token` cookie (HTTP-only, 7 days).

- `POST /api/auth/login`
  - **Body:**  
    ```json
    { "email": "string", "password": "string" }
    ```
  - **Response:**  
    ```json
    { "user": { "id": "string", "name": "string", "email": "string" } }
    ```
  - **Notes:**  
    - Sets a `token` cookie (HTTP-only, 7 days).

- `POST /api/auth/logout`
  - **Response:**  
    ```json
    { "message": "Logged out successfully" }
    ```
  - **Notes:**  
    - Clears the `token` cookie.

### Sessions

- `POST /api/sessions/`
  - **Body:**  
    ```json
    {
      "teacherId": "string",
      "learnerId": "string",
      "subject": "string",
      "startTime": "ISODateString",
      "endTime": "ISODateString"
    }
    ```
  - **Response:**  
    ```json
    { "session": { ...sessionFields } }
    ```

- `GET /api/sessions/:userId`
  - **Response:**  
    ```json
    { "sessions": [ ... ] }
    ```

- `PATCH /api/sessions/status`
  - **Body:**  
    ```json
    { "sessionId": "string", "status": "SCHEDULED" | "COMPLETED" | "CANCELLED" }
    ```
  - **Response:**  
    ```json
    { "session": { ...updatedSessionFields } }
    ```

### Feedback

- `POST /api/feedback/`
  - **Body:**  
    ```json
    {
      "sessionId": "string",
      "fromUserId": "string",
      "toUserId": "string",
      "rating": number,
      "comment": "string"
    }
    ```
  - **Response:**  
    ```json
    { ...feedbackFields }
    ```

- `GET /api/feedback/:userId`
  - **Response:**  
    ```json
    {
      "feedbacks": [
        { "comment": "string" }
      ]
    }
    ```

## Troubleshooting

- **Prisma Client could not locate the Query Engine for runtime "windows":**
  - Make sure your `prisma/schema.prisma` includes:
    ```prisma
    generator client {
      provider = "prisma-client-js"
      binaryTargets = ["native", "windows"]
    }
    ```
  - Then run:
    ```sh
    npx prisma generate
    ```

## License

ISC

---

**Note:** Update the `DATABASE_URL` and `JWT_SECRET` in your `.env` file as per your environment.