# 📚 Library Management API

A RESTful API for managing books and borrowing operations in a library system. Built using **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- 📖 **CRUD operations** on books
- 👤 **Borrowing system** with availability checks
- 📊 Borrow summary using **MongoDB Aggregation**
- ✅ **Validation** with Zod and Mongoose
- 🔒 Unique ISBN enforcement
- 🧠 Business logic with static & instance methods
- 🔄 Mongoose **middleware** for password hashing and availability control
- 🌐 Filtering, sorting, and pagination support
- 🔐 **dotenv** for hide db password

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB use MongoDB Compass
- **Language:** TypeScript(dev dependencies)
- **Validation:** Zod + Mongoose schema validation
- **Deployment:** Vercel
- **For Continuously Running server:** ts-node-dev

---

## 📁 Project Structure

Assignment-3/<br>
├─ src/<br>
│ ├─ app/<br>
│ │ ├─ controllers/<br>
│ │ ├─ interfaces/<br>
│ │ ├─ models/<br>
│ ├─ app.ts<br>
│ └─ server.ts<br>
├─ package.json<br>
├─ tsconfig.json(rootDir:'./src';outDir:'./dist')<br>
├─ .gitignore(node_modules,.env,.vercel)<br>

---

## For installing dependencies

npm install
or
npm i

---

## Server and APIs

All server related work like connecting server, define port is handled by server.ts file. app.ts file handel APIs.

Create a .evn file and give your DB_USER= "YOUR_DB_USER_NAME" and DB_PASS = "YOUR_DB_PASSWORD"

---

## APIS endpoint


*📗BOOKS API*

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/books`         | Create a new book                        |
| GET    | `/api/books`         | Get all books (with filter, sort, limit) |
| GET    | `/api/books/:bookId` | Get a book by ID                         |
| PUT    | `/api/books/:bookId` | Update a book                            |
| DELETE | `/api/books/:bookId` | Delete a book                            |

*📗BORROW API*

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| POST   | `/api/borrow` | Borrow a book          |
| GET    | `/api/borrow` | Borrowed books summary |

---

## 💡Logics

Books cannot be borrowed if not enough copies are available.

If book copies become 0, available is set to false.

Unique ISBN enforced.

Borrow summary is calculated using $group and $lookup.

---

## Important Links

🔴 Live API: https://library-management-mu-six.vercel.app

🟢 GitHub Repo: https://github.com/Istiaque-Mahbub/Assignment-3

