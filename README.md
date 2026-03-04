# Thulira - Sustainable Living Platform

A sustainable eco-friendly products e-commerce platform with separate backend (Express.js) and frontend (Next.js) modules.

## Project Structure

```
thulira/
├── backend/                 # Express.js API Server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & error handling
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│   ├── .env.example        # Environment variables template
│   ├── package.json
│   └── server.js           # Entry point
│
├── frontend/                # Next.js Client Application
│   ├── app/                # Next.js app router pages
│   ├── components/         # React components
│   ├── context/            # Auth & Cart context
│   ├── lib/                # Axios config & utilities
│   ├── public/             # Static assets
│   ├── .env.local.example  # Environment variables template
│   ├── next.config.mjs
│   └── package.json
│
└── README.md
```

## Features

### Backend (Express.js)
- **Authentication**: JWT-based authentication with email/password and Google Sign-In
- **User Management**: User registration, login, profile management
- **Order Management**: Create, view, and cancel orders
- **Admin Panel**: User management, order management, product management, analytics
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS enabled, password hashing with bcrypt

### Frontend (Next.js)
- **Authentication**: JWT stored in localStorage, automatic token injection in API calls
- **User Features**: Browse products, cart management, checkout, order history
- **Admin Dashboard**: Analytics, user management, order management
- **Responsive Design**: Mobile-first approach
- **Google Sign-In**: Firebase Auth integration

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

#### Backend (`backend/.env`)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/thulira

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### Frontend (`frontend/.env.local`)
```env
# Backend API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Firebase Configuration (for Google Sign-In)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 3. Start the Application

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google/login` | Login with Google |
| POST | `/api/auth/logout` | Logout (requires auth) |
| GET | `/api/auth/session` | Get current user (requires auth) |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile?userId={id}` | Get user profile |
| PATCH | `/api/user/profile` | Update user profile |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders?userId={id}` | Get user's orders |
| POST | `/api/orders/create` | Create new order |
| PATCH | `/api/orders/cancel` | Cancel an order |

### Admin (requires admin role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| PATCH | `/api/admin/users` | Update user status |
| GET | `/api/admin/orders` | List all orders |
| PATCH | `/api/admin/orders` | Update order status |
| GET | `/api/admin/products` | List all products |
| PATCH | `/api/admin/products` | Update product status |
| GET | `/api/admin/analytics` | Get analytics data |

## Authentication Flow

1. **Registration/Login**: User submits credentials
2. **Token Generation**: Server validates and returns JWT token
3. **Token Storage**: Frontend stores token in localStorage
4. **Authenticated Requests**: Axios interceptor adds `Authorization: Bearer {token}` header
5. **Token Validation**: Server validates JWT on protected routes
6. **Logout**: Token removed from localStorage

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd ../backend
NODE_ENV=production npm start
```

## Database Schema

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed, required for non-Google users)
- `googleId`: String (for Google Sign-In users)
- `role`: Enum ['user', 'admin']
- `isActive`: Boolean
- `shippingAddress`: Object

### Order
- `user`: Object (user info snapshot)
- `items`: Array of order items
- `totalAmount`: Number
- `shippingAddress`: Object
- `paymentMethod`: Enum ['cod', 'online']
- `status`: Enum ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

### Product
- `name`: String
- `description`: String
- `price`: Number
- `category`: String
- `image`: String
- `stock`: Number
- `isActive`: Boolean

### Blog
- `title`: String
- `slug`: String (unique)
- `content`: String
- `excerpt`: String
- `author`: String
- `isPublished`: Boolean

## License

ISC
