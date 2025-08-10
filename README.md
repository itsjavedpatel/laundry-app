# 🧺 E-Dhobi

E-Dhobi is a full-stack laundry management system built with React (Vite + Tailwind CSS) on the frontend and Node.js + Express on the backend. MongoDB is used as the database.

## 🚀 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Mongoose

### Others
- dotenv
- cookie-parser
- cors
- and more
## 📁 Project Structure

```
e-dhobi/
  ├── backend/          # Express backend
  │   └── .env         # Backend environment variables
  └── frontend/        # React frontend with Vite + Tailwind
      └── .env        # Frontend environment variables
```

## ✅ Prerequisites

- Node.js
- MongoDB (local or Atlas)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```
git clone https://github.com/itsjavedpatel/laundry-app
cd e-dhobi
```

### 2. Backend Setup
```
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
EMAIL=your email to send otp/password
APP_PASSWORD= your app password associated with the EMAIL to send otp/password
```

Start the backend server:
```
npm start
or
nodemon start
```

### 3. Frontend Setup
```
cd ../frontend
npm install
```

Create a `.env` file inside the frontend folder:
```
VITE_API_URL=http://localhost:5000
```
Note: All frontend environment variables must be prefixed with VITE_ (required by Vite).

Start the frontend development server:
```
npm run dev
```

## 🌐 URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📬 Support

If you encounter any issues, feel free to reach out or open an issue in the repository.
