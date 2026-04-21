🎨 Frontend (Client)

This is the React frontend of the Hotel Booking App.

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

Create a ".env" file:

VITE_API_URL=http://localhost:3000/api/v1

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

- Build command: npm run build
- Publish directory: dist

---

⚠️ Notes

- The app uses cookie‑based authentication (withCredentials: true)
- Ensure `VITE_API_URL` points to the deployed backend URL with `/api/v1`
- Dark mode is supported (Tailwind CSS dark mode)
- Hotel images auto‑rotate every 3 seconds when visible and not hovered
- Admin approval required for reviews to appear on product pages