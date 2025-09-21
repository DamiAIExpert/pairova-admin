# Pairova Admin Dashboard

A modern, full‑stack **Next.js (App Router)** admin dashboard for the Pairova platform. It provides comprehensive management capabilities for job seekers, NGOs, applications, feedback, and system analytics — all built with **TypeScript**, **Tailwind CSS**, and integrated with a powerful **NestJS backend API**.

> This repository was bootstrapped with `create-next-app` and enhanced with complete API integration, authentication, and real-time data management.

---

## Table of Contents

- [Quick Start](#quick-start)
- [API Integration](#api-integration)
- [Features](#features)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [API Services](#api-services)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

### Prerequisites

- **Node.js 18+** (20+ recommended)
- **Backend API** running on `http://localhost:3001`
- **AI Microservice** running on `http://localhost:8000` (for intelligent job matching)
- **PostgreSQL Database** for data storage and prediction caching

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn
# or
bun install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Pairova Admin Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Start the Development Server

```bash
npm run dev
# Server will be available at http://localhost:3000
```

### 4. Login

- Navigate to `http://localhost:3000`
- Use admin credentials to login
- Access the full admin dashboard

---

## API Integration

This admin dashboard is **fully integrated** with the Pairova backend API, providing:

### ✅ Real-time Data
- **Dashboard Statistics**: Live metrics and KPIs
- **Performance Analytics**: Time-series data and trends
- **Activity Feeds**: Real-time platform activity
- **User Management**: Complete CRUD operations
- **AI Predictions**: Intelligent job matching and recommendations

### ✅ Authentication
- **JWT Token Management**: Automatic token storage and refresh
- **Role-based Access**: Admin-only functionality
- **Session Persistence**: Maintains login state across browser refreshes

### ✅ Error Handling
- **Network Error Recovery**: Automatic retry mechanisms
- **User-friendly Messages**: Clear error communication
- **Loading States**: Smooth loading indicators

---

## Features

### 📊 Dashboard
- **Real-time Statistics**: User counts, job metrics, application trends
- **Performance Charts**: Visual analytics with Chart.js/Recharts
- **Activity Feed**: Live platform activity stream
- **AI Recommendations**: Smart insights and suggestions powered by ML microservice
- **Prediction Analytics**: AI model performance and accuracy metrics

### 👥 User Management
- **Job Seekers**: Complete applicant profile management
- **NGOs**: Organization management and job statistics
- **User Verification**: Account verification and status management
- **Bulk Operations**: Mass user management capabilities

### 📋 Application Pipeline
- **Status Tracking**: Application progress monitoring
- **Pipeline Management**: Visual workflow management
- **Candidate Evaluation**: Detailed applicant assessment
- **Hiring Analytics**: Success rate tracking

### 💬 Feedback System
- **User Feedback**: Platform feedback collection and management
- **Moderation Tools**: Feedback review and response
- **Analytics**: Feedback trends and insights
- **Priority Management**: Feedback categorization and routing

### 🔍 Audit & Logging
- **System Logs**: Complete audit trail
- **User Actions**: Track all administrative actions
- **Security Monitoring**: Login attempts and security events
- **Data Export**: Log export capabilities

### ⚙️ Settings Management
- **Email Configuration**: SMTP and email provider settings
- **SMS Settings**: SMS provider configuration
- **Frontend CMS**: Page content management
- **System Preferences**: Platform-wide settings

---

## Scripts

| Script           | Description                                   |
|------------------|-----------------------------------------------|
| `dev`            | Run the Next.js development server            |
| `build`          | Create an optimized production build          |
| `start`          | Start the production server                   |
| `lint`           | Run ESLint                                    |
| `typecheck`      | Run TypeScript type checks                    |

---

## Tech Stack

- **Next.js 14+ (App Router)** – File‑system routing, server actions
- **TypeScript** – Type safety and better development experience
- **Tailwind CSS** – Utility‑first styling
- **Lucide React** – Modern icon library
- **Chart.js/Recharts** – Data visualization
- **Custom API Client** – Robust API integration
- **JWT Authentication** – Secure user management

---

## Project Structure

```
src/
  app/
    layout.tsx                    # Root layout with providers
    page.tsx                      # Admin login page
    admin/
      dashboard/
        page.tsx                  # Main dashboard with real-time data
      job-seekers/
        page.tsx                  # Job seekers management
        [candidateId]/
          page.tsx                # Candidate profile view
          edit/
            page.tsx              # Edit candidate profile
      ngos/
        page.tsx                  # NGO management
        [id]/
          page.tsx                # NGO profile view
          jobs/
            page.tsx              # NGO job listings
      applications/
        page.tsx                  # Application pipeline
      feedback/
        page.tsx                  # Feedback management
      track/
        page.tsx                  # Audit logs
      settings/
        page.tsx                  # System settings
  lib/
    api.ts                        # Base API client configuration
    services/
      admin.service.ts            # Admin API services
      auth.service.ts             # Authentication services
  hooks/
    useApi.ts                     # Custom React hooks for API
  components/
    dashboard/                    # Dashboard components
    ui/                          # Reusable UI components
  styles/
    globals.css                   # Global styles
    fonts.css                     # Font declarations (Poppins)
```

---

## Authentication

The admin dashboard uses JWT-based authentication:

### Login Process
1. **Email/Password Authentication**: Secure admin login
2. **Token Storage**: JWT tokens stored in localStorage
3. **Automatic Refresh**: Token renewal handling
4. **Protected Routes**: Admin-only access control

### Security Features
- **Role-based Access**: Admin-only functionality
- **Session Management**: Automatic logout on token expiration
- **CSRF Protection**: Built-in security measures
- **Secure Headers**: API request security

---

## Environment Variables

Create a `.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# App Configuration
NEXT_PUBLIC_APP_NAME=Pairova Admin Dashboard
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

**Important**: Never commit `.env.local` to version control. Use your platform's secret manager in production.

---

## API Services

### AdminService
Complete admin functionality with methods for:
- **Dashboard**: `getDashboardStats()`, `getPerformanceMetrics()`
- **Users**: `getUsers()`, `updateUser()`, `deleteUser()`
- **Job Seekers**: `getJobSeekers()`, `updateJobSeeker()`
- **NGOs**: `getNgos()`, `updateNgo()`, `getNgoStatistics()`
- **Applications**: `getApplications()`, `updateApplicationStatus()`
- **Feedback**: `getFeedback()`, `updateFeedback()`

### AuthService
Authentication management:
- **Login**: `login(email, password)`
- **Logout**: `logout()`
- **Profile**: `getCurrentUser()`
- **Token Management**: Automatic JWT handling

### Custom Hooks
- **`useApi`**: Generic hook for API calls with loading/error states
- **`useMutation`**: Hook for POST/PUT/DELETE operations
- **`usePaginatedApi`**: Hook for paginated data management

---

## API Endpoints

The dashboard integrates with **25+ backend endpoints**:

### Dashboard
- `GET /admin/dashboard-stats` - Main statistics
- `GET /admin/dashboard/performance` - Performance metrics
- `GET /admin/dashboard/activity` - Activity feed
- `GET /admin/dashboard/recommendations` - AI insights

### User Management
- `GET /admin/users` - User listing with pagination
- `GET /admin/job-seekers` - Job seekers management
- `GET /admin/ngos` - NGO management
- `PUT /admin/users/:id` - User updates
- `DELETE /admin/users/:id` - User deletion

### Applications & Feedback
- `GET /admin/applications` - Application pipeline
- `PUT /admin/applications/:id/status` - Status updates
- `GET /admin/feedback` - Feedback management
- `GET /admin/audit/logs` - Audit logs

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Import on Vercel**
3. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   NEXT_PUBLIC_APP_NAME=Pairova Admin Dashboard
   ```
4. **Deploy**: Automatic deployment on push

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## Troubleshooting

### Common Issues

#### API Connection Errors
- **Symptom**: "Network error" or 404s
- **Solution**: Ensure backend is running on `http://localhost:3001`
- **Check**: Verify `NEXT_PUBLIC_API_URL` in `.env.local`

#### Authentication Issues
- **Symptom**: Login fails or redirects
- **Solution**: Check JWT token validity and backend authentication
- **Debug**: Check browser console for API errors

#### Font Loading Issues
- **Symptom**: `GET /fonts/Poppins-*.ttf 404`
- **Solution**: Ensure fonts are in `public/fonts/` directory
- **Fix**: Update `fonts.css` paths if needed

#### TypeScript Errors
- **Solution**: Run `npm run typecheck` for diagnostics
- **Fix**: Ensure all API types are properly imported

### Development Tips

1. **API Testing**: Use browser dev tools to monitor API calls
2. **State Management**: Check React DevTools for component state
3. **Error Boundaries**: Implement error boundaries for better error handling
4. **Loading States**: Always provide loading indicators for API calls

---

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- **TypeScript**: Maintain type safety throughout
- **API Integration**: Use existing API services and hooks
- **Error Handling**: Implement proper error boundaries
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes

---

## License

Copyright © Pairova. All rights reserved.

For licensing inquiries, please contact the development team.

---

## Support

For technical support or questions:

- **Documentation**: Check this README and inline code comments
- **API Documentation**: Available at `http://localhost:3001/api-docs` (Swagger)
- **Issues**: Create GitHub issues for bugs or feature requests

---

**Built with ❤️ by the Pairova Team**