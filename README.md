# PrimeTrade - Scalable REST API with Authentication & Role-Based Access

A full-stack application demonstrating secure, scalable backend APIs with JWT authentication, role-based access control, and a React frontend for testing and interaction.

## 🚀 Features

### Backend
- ✅ User registration & login with password hashing (bcrypt)
- ✅ JWT-based authentication
- ✅ Role-based access control (User vs Admin)
- ✅ CRUD APIs for Products entity
- ✅ API versioning (v1)
- ✅ Comprehensive error handling & validation
- ✅ Swagger API documentation
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Input sanitization & validation

### Frontend
- ✅ React.js with modern hooks
- ✅ User registration & login UI
- ✅ Protected dashboard (JWT required)
- ✅ Product CRUD operations
- ✅ Error/success message handling
- ✅ Responsive design

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PrimeTrade
```

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Create a .env file from the example
cp env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=primetrade_db
# DB_USER=postgres
# DB_PASSWORD=your_password
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb primetrade_db

# Or using psql:
psql -U postgres
CREATE DATABASE primetrade_db;
\q
```

### 4. Seed Database (Optional)

```bash
# Create sample users and products for testing
node scripts/seed.js
```

This will create:
- Admin user: `admin@primetrade.com` / `Admin123`
- Regular user: `user@primetrade.com` / `User123`
- Sample products

### 5. Start Backend Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3000`
API Documentation (Swagger) will be available at `http://localhost:3000/api-docs`

### Alternative: Docker Setup

```bash
# Start PostgreSQL and Backend using Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### 5. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will run on `http://localhost:3001`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| GET | `/api/v1/auth/me` | Get current user profile | Yes |

### Products

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/v1/products` | Get all products (with pagination & filters) | Yes | User/Admin |
| GET | `/api/v1/products/:id` | Get single product | Yes | User/Admin |
| POST | `/api/v1/products` | Create new product | Yes | User/Admin |
| PUT | `/api/v1/products/:id` | Update product | Yes | Owner/Admin |
| DELETE | `/api/v1/products/:id` | Delete product | Yes | Owner/Admin |

### Users (Admin Only)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/v1/users` | Get all users | Yes | Admin |
| GET | `/api/v1/users/:id` | Get user by ID | Yes | Admin |

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Example Request

```bash
curl -X GET http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🗄️ Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `role` (Enum: 'user', 'admin')
- `isActive` (Boolean)
- `createdAt`, `updatedAt` (Timestamps)

### Products Table
- `id` (UUID, Primary Key)
- `name` (String)
- `description` (Text)
- `price` (Decimal)
- `stock` (Integer)
- `category` (String)
- `userId` (UUID, Foreign Key → Users)
- `createdAt`, `updatedAt` (Timestamps)

## 🏗️ Project Structure

```
PrimeTrade/
├── config/
│   ├── database.js          # Database configuration
│   └── swagger.js           # Swagger documentation setup
├── middleware/
│   ├── auth.js              # Authentication & authorization middleware
│   └── errorHandler.js      # Global error handler
├── models/
│   ├── User.js              # User model
│   └── Product.js           # Product model
├── routes/
│   └── v1/
│       ├── auth.js          # Authentication routes
│       ├── products.js      # Product CRUD routes
│       └── users.js         # User management routes (Admin)
├── utils/
│   └── jwt.js               # JWT utility functions
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React context (Auth)
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   └── App.js
│   └── package.json
├── server.js                # Express server entry point
├── package.json
└── README.md
```

## 🔒 Security Features

1. **Password Hashing**: bcrypt with salt rounds (10)
2. **JWT Tokens**: Secure token-based authentication
3. **Input Validation**: express-validator for request validation
4. **SQL Injection Protection**: Sequelize ORM with parameterized queries
5. **XSS Protection**: Helmet.js security headers
6. **Rate Limiting**: 100 requests per 15 minutes per IP
7. **CORS**: Configured for frontend origin
8. **Role-Based Access**: Middleware for admin and owner checks

## 📖 API Documentation

### Swagger UI
Interactive API documentation is available via Swagger UI:

```
http://localhost:3000/api-docs
```

### Postman Collection
Import the provided Postman collection for easy API testing:

1. Open Postman
2. Click "Import"
3. Select `postman_collection.json`
4. The collection includes:
   - Pre-configured requests for all endpoints
   - Automatic JWT token handling
   - Environment variables for base URL
   - Test scripts to save tokens automatically

## 🧪 Testing the API

### Using cURL

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
```

**Create a product (replace TOKEN with your JWT):**
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Sample Product",
    "description": "This is a sample product",
    "price": 29.99,
    "stock": 100,
    "category": "Electronics"
  }'
```

## 🚀 Deployment Considerations

### Environment Variables
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET` (at least 32 characters)
- Configure production database credentials
- Set appropriate `FRONTEND_URL`

### Database
- Use connection pooling in production
- Set up database migrations (instead of `sync`)
- Enable SSL for database connections
- Regular backups

### Security
- Enable HTTPS
- Use environment variables for secrets
- Implement request logging
- Set up monitoring and alerting

## 📝 Scalability Notes

See [SCALABILITY.md](./SCALABILITY.md) for detailed scalability considerations including:
- Microservices architecture
- Caching strategies (Redis)
- Load balancing
- Database optimization
- API gateway patterns

## 👤 Default Admin User

To create an admin user, you can either:
1. Manually update the database after registration
2. Use a database seed script
3. Register and update via SQL: `UPDATE users SET role = 'admin' WHERE email = 'your@email.com';`

## 🐳 Docker Deployment

### Using Docker Compose

The project includes `docker-compose.yml` for easy deployment:

```bash
# Start all services (PostgreSQL + Backend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (clean database)
docker-compose down -v
```

### Manual Docker Build

```bash
# Build image
docker build -t primetrade-backend .

# Run container
docker run -p 3000:3000 \
  -e DB_HOST=your_db_host \
  -e DB_NAME=primetrade_db \
  -e DB_USER=postgres \
  -e DB_PASSWORD=your_password \
  -e JWT_SECRET=your_secret \
  primetrade-backend
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration
- Verify token format in Authorization header

## 📄 License

This project is created for educational purposes as part of a backend developer intern assignment.

## 👨‍💻 Author

Backend Developer Intern - PrimeTrade Assignment

---

**Note**: This is a demonstration project. For production use, implement additional security measures, comprehensive testing, logging, monitoring, and follow best practices for your specific use case.

