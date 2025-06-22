# Library Management API

A robust Library Management System built with **Express**, **TypeScript**, and **MongoDB (via Mongoose)**. This API allows users to manage books, track borrowing, and retrieve summaries of borrowed books.

## Features

- **Book Management**: Create, read, update, and delete books with proper validation.
- **Borrowing System**: Borrow books with availability checks and automatic updates to book status.
- **Aggregation Pipeline**: Summarize borrowed books with total quantities.
- **Mongoose Features**: Includes static/instance methods and middleware for business logic.
- **Filtering**: Filter books by genre and sort by various fields.
- **Error Handling**: Comprehensive error responses for invalid inputs and edge cases.

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- TypeScript
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/Sabuj-Chowdhury/Library-Management-API-with-Express-TypeScript-MongoDB>
   cd Library-Management-API-with-Express-TypeScript-MongoDB

   ```

2. Install dependencies:
   ```bash
   yarn install
   ```
   or
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/library
   ```
4. Compile TypeScript to JavaScript:
   ```bash
   yarn tsc
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Books

- **POST /api/books**: Create a new book
- **GET /api/books**: Retrieve all books (supports filtering, sorting, and limiting)
- **GET /api/books/:bookId**: Retrieve a book by ID
- **PUT /api/books/:bookId**: Update a book
- **DELETE /api/books/:bookId**: Delete a book

### Borrowing

- **POST /api/borrow**: Borrow a book (updates book availability)
- **GET /api/borrow**: Get a summary of borrowed books

## Example Requests

### Create Book

```bash
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: application/json" \
-d '{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}'
```

### Borrow Book

```bash
curl -X POST http://localhost:3000/api/borrow \
-H "Content-Type: application/json" \
-d '{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}'
```

### Get Borrowed Books Summary

```bash
curl -X GET http://localhost:3000/api/borrow
```

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {...}
}
```

## Bonus Features

- **Code Quality**: Clean, modular code with TypeScript interfaces.
- **Mongoose Middleware**: Pre-save hooks to enforce business logic.
- **Instance Method**: `updateAvailability` method for books.
- **Aggregation**: Used for borrowed books summary.
- **Documentation**: Comprehensive README with setup and API details.

## Dependencies

- express
- mongoose
- typescript
- dotenv
- @types/express
- @types/mongoose
- @types/node
