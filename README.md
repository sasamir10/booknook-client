# 📚 BookNook - Online Library Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Authentication-Better%20Auth-blueviolet" alt="Better Auth" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel" alt="Vercel" />
</p>

<p align="center">
  <strong>A modern online library platform to discover, manage, borrow, and return books.</strong>
</p>

<p align="center">
  <a href="https://yourbook-nook.vercel.app/"><strong>🌐 Visit Live Website</strong></a>
</p>

---

## 📖 About the Project

**BookNook** is a full-stack online library management platform designed to make discovering and managing books simple and convenient.

Users can explore a collection of books, search and filter by category, view detailed book information, and borrow available books. Authenticated users can also manage their own book collections and track their borrowing activities.

The application provides a responsive user interface, secure Google authentication, and an API-driven architecture connected to a dedicated backend and MongoDB database.

## ✨ Key Features

- 🔐 **Google Authentication** — Secure user authentication using Better Auth and Google OAuth.
- 📚 **Book Discovery** — Browse the available library collection and explore individual book details.
- 🔎 **Search & Category Filtering** — Find books by title and filter them by category.
- ➕ **Add New Books** — Authenticated users can add books with descriptions, categories, cover images, and copy quantities.
- ✏️ **Book Management** — Edit or delete books added by the authenticated user.
- 📖 **Borrow Books** — Borrow available books through an interactive confirmation process.
- ↩️ **Return Books** — Return borrowed books and restore available inventory.
- 👤 **My Books** — Manage and monitor books added by the current user.
- 📋 **My Borrows** — View personal borrowing records and return information.
- 🖼️ **Image Upload** — Upload book cover images using ImgBB integration.
- 🔔 **User Feedback** — Toast notifications and confirmation dialogs for important actions.
- 📱 **Responsive Design** — Optimized layouts for desktop, tablet, and mobile devices.
- 🔄 **Persistent Authentication** — Maintain the authenticated session across page refreshes.

## 🖥️ Live Application

| Resource     | Link                                                          |
| ------------ | ------------------------------------------------------------- |
| Live Website | [BookNook](https://yourbook-nook.vercel.app/)                 |
| Backend API  | [BookNook API](https://booknook-server-sudl.onrender.com/)    |
| Books API    | [GET /books](https://booknook-server-sudl.onrender.com/books) |

## 🛠️ Technology Stack

### Frontend

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| Next.js (App Router) | React framework and application routing |
| React                | Component-based user interface          |
| TypeScript           | Type safety and maintainable code       |
| Tailwind CSS         | Responsive styling                      |
| Better Auth          | Authentication and session management   |
| Zod                  | Data validation                         |
| ImgBB API            | Book cover image hosting                |

### Backend & Database Integration

| Technology      | Purpose                    |
| --------------- | -------------------------- |
| Express.js      | REST API backend           |
| MongoDB Atlas   | Database                   |
| Better Auth JWT | Authenticated API requests |
| Node.js         | Server-side runtime        |

### Development & Deployment

| Tool         | Purpose             |
| ------------ | ------------------- |
| pnpm         | Package management  |
| Git & GitHub | Version control     |
| Vercel       | Frontend deployment |
| Render       | Backend hosting     |

## 📸 Application Preview

<!-- Add your actual application screenshots here -->

### Homepage

<!-- ![BookNook Homepage](./public/screenshots/homepage.png) -->

### All Books

<!-- ![All Books](./public/screenshots/all-books.png) -->

### Book Details

<!-- ![Book Details](./public/screenshots/book-details.png) -->

### My Books & My Borrows

<!-- ![My Books](./public/screenshots/my-books.png) -->

> To display screenshots, add your images inside `public/screenshots/` and uncomment the corresponding Markdown image links.

## 🚀 Getting Started

Follow these instructions to run the client application locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — Version 20.9 or later
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/sasamir10/booknook-client
```

### 2. Navigate to the Client Directory

```bash
cd booknook-client
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the client project root directory.

Add the following environment variables:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string
DB_NAME=booknook

# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ImgBB Image Upload
IMGBB_API_KEY=your_imgbb_api_key

# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

**Important:**

- Replace all placeholder values with your actual credentials.
- Never commit `.env.local` or expose private credentials in public repositories.
- Keep `MONGODB_URI`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_SECRET`, and `IMGBB_API_KEY` private.
- Configure the Google OAuth callback URL for local development:

```text
http://localhost:3000/api/auth/callback/google
```

### 5. Start the Development Server

```bash
pnpm dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 📂 Project Structure

```text
booknook-client/
│
├── public/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── books/
│   │   ├── add-book/
│   │   ├── my-books/
│   │   ├── my-borrows/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │
│   ├── lib/
│   │
│   └── ...
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

> The structure above is a simplified overview of the client application.

## 🏗️ Application Architecture

BookNook follows a client-server architecture.

```text
                ┌──────────────────────┐
                │       User           │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   Next.js Frontend   │
                │       Vercel         │
                └──────────┬───────────┘
                           │
             ┌─────────────┼──────────────┐
             │             │              │
             ▼             ▼              ▼
       Better Auth     Express API     ImgBB API
             │             │
             │             ▼
             │      ┌───────────────┐
             └─────►│ MongoDB Atlas │
                    └───────────────┘
```

- The Next.js application handles the user interface and client-side interactions.
- Better Auth manages authentication and user sessions.
- The Express backend handles book and borrowing operations.
- MongoDB Atlas stores application data.
- ImgBB provides image hosting for book covers.

## 📦 Production Build

To create an optimized production build:

```bash
pnpm build
```

To run the production application locally:

```bash
pnpm start
```

## 🔒 Security Considerations

- Authentication is required for protected operations.
- Sensitive environment variables are kept server-side.
- Private API requests use authenticated tokens.
- Book management operations are associated with the authenticated user.
- Input validation is applied to application data.
- Production authentication and API communication use HTTPS.

## 🎯 Project Goals

BookNook was developed to demonstrate practical full-stack application development, including:

- Building a modern application with Next.js App Router.
- Implementing authentication and protected functionality.
- Integrating a frontend with a dedicated REST API.
- Working with MongoDB for persistent data storage.
- Managing application state and user interactions.
- Deploying a full-stack application to cloud hosting platforms.

## 👨‍💻 Developer

**Developed by:** Samir

<p>
  <a href="https://github.com/sasamir10">
    <img src="https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github" alt="GitHub Profile" />
  </a>
</p>

---

<p align="center">
  <strong>📚 BookNook — Discover. Borrow. Read.</strong>
</p>

<p align="center">
  If you find this project interesting, consider giving it a ⭐ on GitHub.
</p>
