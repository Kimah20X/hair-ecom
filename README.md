# HairLux E-commerce

A modern, full-stack e-commerce web application for premium hair products, built with React, Node.js, Express, and MongoDB. Features a beautiful UI, user authentication, cart, order management, and Paystack payment integration.

---

## Features
- Product catalog with filtering and search
- User authentication (register, login)
- Shopping cart and checkout
- Paystack payment integration (NGN)
- Order management
- Responsive, modern UI (Tailwind CSS, Radix UI)
- Admin-ready backend (Express, MongoDB)

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Radix UI, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Paystack
- **Payments:** Paystack (test and live keys supported)

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/hair-ecom.git
cd hair-ecom
```

### 2. Install dependencies
#### Root (frontend):
```bash
npm install
```
#### Backend:
```bash
cd server
npm install
```

### 3. Environment Variables
Create a `.env` file in both the root and `/server` directories.

#### **Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
```

#### **Backend (/server/.env)**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=your_jwt_secret
```

---

## Running the App

### **Start Backend**
```bash
cd server
npm run dev
```

### **Start Frontend**
```bash
cd ..
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## Paystack Payment Setup
- Get your test and live keys from [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer).
- Use the public key in the frontend, secret key in the backend.
- For local testing, use Paystack test cards.

---

## MongoDB Setup
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance.
- Whitelist your IP in Atlas.
- Update `MONGO_URI` in your backend `.env`.

---

## Development Tips
- Use separate terminals for frontend and backend.
- If you change environment variables, restart the servers.
- For production, update callback URLs and secure your secrets.

---

## License
MIT 