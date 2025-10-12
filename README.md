# 🛍️ Fashion Store

A full-stack e-commerce application for fashion products, built using the MERN stack. Users can browse products, manage their cart, and securely purchase items using Razorpay.

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://voltex-1.vercel.app/)

---
### 🔥 Why Fashion Store?
This project serves as a complete full-stack application with:

- ✅ **Comprehensive E-Commerce Platform:** Display fashion products and manage your shopping cart efficiently.
- 🔒 **User Authentication:** Secure login and registration processes enhance user trust and data protection.
- 💳 **Payment Processing:** Integrated with Razorpay API to support live transactions, addressing real-world use cases.
- 📦 **Admin Dashboard:** Simplifies inventory management and order tracking for administrators.
- 📱 **Responsive Design:** Ensures a seamless shopping experience across devices, enhancing user engagement.

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

## 📋 Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Managers:** `npm`

## 💾 Installation

Clone the repository, install dependencies, and get started:

```bash
# Clone the repository
git clone https://github.com/rahulpurshottam/fashion_store.git

# Navigate to project root
cd fashion_store

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

## 💡 Usage
Run the frontend and backend servers:
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start

```

## Project Structure
```
.
/quickcard
├── .gitignore
├── README.md
├── package.json              # Project dependencies and scripts
├── next.config.mjs          
├── postcss.config.mjs        
├── tailwind.config.js        
├── vercel.json               
│
├── /app
│   ├── layout.jsx           
│   ├── page.jsx             
│   │
│   ├── /api                 
│   │   └── /cards
│   │       └── route.js    
│   │
│   ├── /components           # Reusable UI components
│   │   ├── Card.jsx          # Displays individual task cards
│   │   ├── EditCardForm.jsx  
│   │   ├── PriorityDisplay.jsx
│   │   ├── StatusDisplay.jsx  
│   │   └── DeleteBlock.jsx   
│   │
│   ├── /lib                  # Utility and helper functions
│   │   ├── db.js             # Cached MongoDB (Mongoose) connection
│   │   ├── api.js           
│   │   └── formatters.js    
│   │
│   ├── /styles              
│   └── globals.css           
│
├── /models
│   └── Card.js               
│
├── /public
│   ├── favicon.ico          
│   ├── logo.png              
│   └── manifest.json         # Web app manifest for PWA support (optional)
│
└── /utils
    └── constants.js          # Common constants like statuses, priorities, etc.

```

---
