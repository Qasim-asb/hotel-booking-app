🎨 Frontend (Client)

This is the React frontend of the Hotel Booking App, deployed on Netlify.

---

🧠 Tech Stack

- React.js
- React Router
- Tailwind CSS
- TanStack Query
- Axios
- Headless UI (Listbox, Combobox)

---

⚙️ Setup

cd client
npm install
npm run dev

---

🔐 Environment Variables

Create a ".env" file for local development:

VITE_API_URL=http://localhost:3000/api/v1

For production (Netlify), set VITE_API_URL to:
https://hotel-booking-app-production-a000.up.railway.app/api/v1

Add this variable in Netlify site settings → Environment variables.

---

📁 Important Folders

src/
├── api/           # API call functions
├── components/    # Reusable UI components
├── pages/         # Route pages
├── hooks/         # Custom TanStack Query hooks
├── context/       # AuthProvider
├── utils/         # Helpers (global ticker for image rotation)
└── routes/        # Admin & user route definitions

---

🚀 Build

npm run build

---

🌐 Deployment

Deploy on Netlify with:

- Base directory: client
- Build command: npm run build
- Publish directory: dist

---

⚠️ Notes

- The app uses cookie‑based authentication (withCredentials: true)
- Ensure `VITE_API_URL` points to the deployed backend URL with `/api/v1`
- Dark mode is supported (Tailwind CSS dark mode)
- Hotel images auto‑rotate every 3 seconds when visible and not hovered
- Admin approval required for reviews to appear on product pages