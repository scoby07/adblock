# AdBlock Pro Backend API

A comprehensive backend API for the AdBlock Pro SaaS platform.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication with refresh tokens
  - Email verification
  - Password reset
  - Google OAuth integration
  - Role-based access control (User, Admin, Super Admin)

- 👤 **User Management**
  - User registration and login
  - Profile management
  - Settings and preferences
  - Blocking statistics tracking

- 💳 **Subscription Management**
  - Multiple plans (Free, Pro, Teams)
  - Stripe integration for payments
  - Automatic billing
  - Invoice management

- 📊 **Admin Dashboard**
  - User management
  - Subscription oversight
  - Content management
  - Analytics and reporting

- 🔒 **Security**
  - Helmet.js for security headers
  - Rate limiting
  - CORS protection
  - Input validation
  - Password hashing with bcrypt

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js
- **Payments**: Stripe
- **Email**: Nodemailer
- **Validation**: express-validator
- **Logging**: Winston

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB 5.0 or higher
- Stripe account (for payments)
- SMTP server (for emails)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adblock-pro-backend.git
cd adblock-pro-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adblockpro
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

5. Start the development server:
```bash
npm run dev
```

### Database Seeding

To seed the database with sample data:
```bash
npm run seed
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |
| GET | `/api/auth/verify-email` | Verify email address |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/settings` | Update settings |
| PUT | `/api/users/stats` | Update stats |
| DELETE | `/api/users/account` | Delete account |

### Subscription Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subscriptions/me` | Get current subscription |
| GET | `/api/subscriptions/history` | Get subscription history |
| GET | `/api/subscriptions/invoices` | Get invoices |
| POST | `/api/subscriptions/cancel` | Cancel subscription |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get dashboard stats |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:id` | Get single user |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/subscriptions` | Get all subscriptions |

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── server.js       # Entry point
├── tests/              # Test files
├── docs/               # Documentation
├── logs/               # Log files
├── .env.example        # Environment template
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | Yes |
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_REFRESH_SECRET` | JWT refresh secret | Yes |
| `STRIPE_SECRET_KEY` | Stripe API key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | Yes |
| `SMTP_HOST` | SMTP server host | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASS` | SMTP password | No |

## Deployment

### Using Docker

```bash
docker build -t adblock-pro-backend .
docker run -p 5000:5000 --env-file .env adblock-pro-backend
```

### Using PM2

```bash
npm install -g pm2
pm2 start src/server.js --name adblock-pro-api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@adblockpro.com or join our Discord community.
