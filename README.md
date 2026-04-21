🏨 Hotel Booking App

A full-stack hotel booking application where users can browse hotels, apply filters, view details, add to cart, place orders, write reviews, and admins can manage everything.

---

🚀 Live Demo

- Frontend: https://your-netlify-app.netlify.app
- Backend: https://your-koyeb-app.koyeb.app

---

🧠 Tech Stack

Frontend

- React.js
- React Router
- Tailwind CSS
- TanStack Query
- Axios
- Headless UI

Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication (httpOnly cookies)
- Cloudinary (image upload)
- bcrypt
- express-fileupload

Deployment

- Netlify (Frontend)
- Koyeb (Backend)
- MongoDB Atlas (Database)

---

📁 Project Structure

hotel-booking-app/
├── client/          # React frontend
├── server/          # Express backend
├── .gitignore
└── README.md

---

⚙️ Setup

1. Clone Repo

git clone https://github.com/your-username/hotel-booking-app.git
cd hotel-booking-app

---

2. Setup Backend

cd server
npm install
npm run dev

---

3. Setup Frontend

cd client
npm install
npm run dev

---

🔐 Environment Variables

Server (.env)

PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

Client (.env)

VITE_API_URL=http://localhost:3000/api/v1

---

✨ Features

- User authentication (login/register/logout) with role-based access (user/admin)
- Hotel posts (CRUD, exactly 3 images, categories, facilities, nearby places)
- Search & filter hotels (keyword, price range, amenities)
- Infinite scrolling on search results
- Hotel details page with image carousel (auto-rotate on hover)
- Add to cart with check-in date
- Cart management (remove items, clear cart)
- Order checkout (simulated payment)
- Review system (pending approval by admin)
- Trips management (admin)
- User management (admin role promotion/demotion)
- Responsive UI with dark mode support

---

📄 License

MIT License