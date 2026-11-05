# 📚 BookNook — Online Library Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-App%20Router-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?logo=vercel" />
</p>

<p align="center">
  A modern online library platform to discover, manage, borrow, and return books.
</p>

<p align="center">
  <a href="https://yourbook-nook.vercel.app/">
    <img src="https://img.shields.io/badge/Live_Website-Visit_BookNook-214D3D?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit BookNook" />
  </a>
</p>

---

## ✨ Features

- 🔐 **Google Authentication** — Secure login with Better Auth and Google OAuth.
- 📚 **Book Discovery** — Browse books and explore detailed information.
- 🔎 **Search & Filtering** — Search by title and filter by category.
- ➕ **Book Management** — Add, edit, and delete your own books.
- 📖 **Borrow & Return** — Borrow available books and manage returns.
- 👤 **My Books** — Manage your contributed book collection.
- 📋 **My Borrows** — Track personal borrowing records.
- 🖼️ **Image Upload** — Upload book covers using ImgBB.
- 📱 **Responsive UI** — Optimized for desktop, tablet, and mobile.

## 🛠️ Tech Stack

| Frontend     | Backend & Services |
| ------------ | ------------------ |
| Next.js      | Express.js         |
| React        | Node.js            |
| TypeScript   | MongoDB Atlas      |
| Tailwind CSS | Better Auth        |
| Zod          | ImgBB              |

## 🚀 Getting Started

**Prerequisites:** Node.js 20.9+, pnpm, and Git.

```bash
# Clone the repository
git clone https://github.com/sasamir10/booknook-client.git

# Navigate to the project
cd booknook-client

# Install dependencies
pnpm install
```

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
DB_NAME=booknook
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Configure the Google OAuth callback:

```text
http://localhost:3000/api/auth/callback/google
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔗 Related Links

- 🌐 [Live Application](https://yourbook-nook.vercel.app/)
- ⚙️ [Backend Repository](https://github.com/sasamir10/booknook-server)
- 🔌 [Backend API](https://booknook-server-sudl.onrender.com)

## 👨‍💻 Developer

**Samir** · [GitHub Profile](https://github.com/sasamir10)

---

<p align="center">
  📚 <strong>BookNook — Discover. Borrow. Read.</strong>
</p>
