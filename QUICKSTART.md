# Quick Start Guide

Get PrimeTrade up and running in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be 14+)
node --version

# Check PostgreSQL
psql --version

# Check npm
npm --version
```

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 2. Database Setup

```bash
# Create database
createdb primetrade_db

# Or using psql:
psql -U postgres -c "CREATE DATABASE primetrade_db;"
```

### 3. Configure Environment

```bash
# Copy example env file
cp env.example .env

# Edit .env with your database credentials
# Minimum required:
# DB_PASSWORD=your_postgres_password
# JWT_SECRET=any_random_string_at_least_32_chars
```

### 4. Seed Database (Optional but Recommended)

```bash
node scripts/seed.js
```

This creates test users:
- **Admin**: admin@primetrade.com / Admin123
- **User**: user@primetrade.com / User123

### 5. Start Backend

```bash
npm run dev
```

Backend should be running at `http://localhost:3000`
Swagger docs at `http://localhost:3000/api-docs`

### 6. Start Frontend (New Terminal)

```bash
cd frontend
npm start
```

Frontend should open at `http://localhost:3001`

## Quick Test

### Using Frontend
1. Go to `http://localhost:3001`
2. Click "Register" or use seeded credentials
3. Login and navigate to "Products"
4. Create, edit, and delete products

### Using cURL

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test123"}'

# Login (save the token from response)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123"}'

# Get Products (replace TOKEN)
curl http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Import `postman_collection.json`
2. Run "Register" or "Login" request
3. Token is automatically saved
4. Test other endpoints

## Common Issues

### Database Connection Error
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l | grep primetrade_db`

### Port Already in Use
- Change `PORT` in `.env` (backend)
- Or kill process: `lsof -ti:3000 | xargs kill`

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [SCALABILITY.md](./SCALABILITY.md) for scaling strategies
- Explore API docs at `http://localhost:3000/api-docs`

Happy coding! 🚀

