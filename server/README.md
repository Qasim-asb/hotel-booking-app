⚙️ Backend (Server)

This is the Express backend of the Hotel Booking App.

---

🧠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication (httpOnly cookies)
- Cloudinary (image upload)
- bcrypt
- express-fileupload

---

⚙️ Setup

cd server
npm install
npm run dev

---

🔐 Environment Variables

Create a ".env" file:

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

---

📁 API Routes (v1)

- /api/v1/users
- /api/v1/categories
- /api/v1/posts
- /api/v1/cart
- /api/v1/orders
- /api/v1/trips
- /api/v1/reviews

Full endpoint details available in the code.

---

🧪 Health Check

GET /health

Response:
{ "status": "OK", "database": "connected" }

---

🚀 Start Server

npm start        # production
npm run dev      # development with nodemon

---

⚠️ Notes

- MongoDB Atlas must be accessible (whitelist IP if needed)
- CORS origin must match `FRONTEND_URL`
- Cloudinary credentials are required for image uploads
- Reviews require admin approval (status: 'pending' → 'approved')
- The server uses `express-fileupload` with `/tmp` for temporary files
- Graceful shutdown (SIGINT/SIGTERM) is implemented