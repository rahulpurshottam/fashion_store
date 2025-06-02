# 🛍️ Fashion Store

A full-stack e-commerce application for fashion products, built using the MERN stack. Users can browse products, manage their cart, and securely purchase items using Razorpay.

### 🔗 Live Demo
[Live Site](https://voltex-1.vercel.app/)  
[Backend Repo](https://github.com/rahulpurshottam/fashion_store)

---

## Features

- Product listings with filtering and pagination
- User authentication using JWT
- Secure payment integration with Razorpay
- Cart and order management
- Admin dashboard for managing inventory
- Cloud image storage via Cloudinary

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT
- **File Uploads:** Multer, Cloudinary
- **Payments:** Razorpay
- **Hosting:** Vercel (frontend), Render (backend)

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas URI
- Razorpay API Keys
- Cloudinary API Keys

### Run Locally

```bash
# Clone frontend and backend
git clone https://github.com/rahulpurshottam/fashion_store.git
cd fashion_store

# Install dependencies
npm install

# Set environment variables in a `.env` file
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Start development
npm start
