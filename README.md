# Flexible Fare Survey Application

A full-stack web application for collecting user feedback on flexible fare options for transportation services. The application includes a React frontend with a multi-step survey form and a Node.js backend with PostgreSQL database for storing responses.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Development Workflow](#development-workflow)
- [Docker Deployment](#docker-deployment)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)
- [Making Changes](#making-changes)
- [Project Structure](#project-structure)

## Project Overview

The Flexible Fare Survey is designed to collect user feedback and preferences regarding flexible fare options in transportation services. The survey includes questions about travel habits, payment preferences, and willingness to use flexible fare models like "Set your Price" and "Show up & Hope".

## Technologies Used

- **Frontend**:
  - React.js
  - Material-UI (MUI) for component styling
  - Axios for API requests
  - Nginx for serving the built application

- **Backend**:
  - Node.js
  - Express.js framework
  - PostgreSQL database
  - UUID for generating unique response IDs
  
- **Deployment**:
  - Docker and Docker Compose for containerization
  - Nginx as a reverse proxy

## System Architecture

The application follows a three-tier architecture:

1. **Frontend (Client)**: React-based SPA served by Nginx
2. **Backend (Server)**: Node.js/Express API handling business logic
3. **Database**: PostgreSQL storing survey responses

Nginx serves the React application and proxies API requests to the Express backend.

## Prerequisites

To run this application, you need:

- Docker and Docker Compose installed
- Git (for cloning the repository)
- Basic knowledge of command-line interfaces

For development, you'll also need:

- Node.js and npm
- PostgreSQL (if developing without Docker)

## Installation and Setup

### Option 1: Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flexible-fare-survey
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PG_USER=postgres
   PG_HOST=localhost
   PG_DATABASE=survey_db
   PG_PASSWORD=your_password
   PG_PORT=5432
   PORT=5000
   REACT_APP_API_URL=
   ```

3. Build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```

4. Access the application at http://localhost:3000

### Option 2: Manual Setup (Development)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flexible-fare-survey
   ```

2. Setup the backend:
   ```bash
   cd server
   npm install
   ```

3. Setup the frontend:
   ```bash
   cd ../client
   npm install
   ```

4. Create a PostgreSQL database named `survey_db`

5. Run the database initialization script:
   ```bash
   psql -U postgres -d survey_db -f server/init.sql
   ```

6. Start the backend server:
   ```bash
   cd ../server
   npm start
   ```

7. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

8. Access the application at http://localhost:3000

## Development Workflow

### Frontend Development

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Make changes to React components in the `src` directory

4. The browser will automatically reload when you save changes

### Backend Development

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Start the server with nodemon for auto-reloading:
   ```bash
   npm run dev
   ```

3. Make changes to the Express routes and controllers

## Docker Deployment

### Building and Running Docker Containers

1. Build the Docker images:
   ```bash
   docker-compose build
   ```

2. Start the containers:
   ```bash
   docker-compose up
   ```

3. Run containers in detached mode (background):
   ```bash
   docker-compose up -d
   ```

4. Stop the containers:
   ```bash
   docker-compose down
   ```

### Viewing Container Logs

```bash
# View logs for all containers
docker-compose logs

# View logs for a specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f
```

### Accessing Containers

```bash
# Access the backend container
docker-compose exec backend sh

# Access the frontend container
docker-compose exec frontend sh

# Access the PostgreSQL database
docker-compose exec db psql -U postgres -d survey_db
```

### Rebuilding After Changes

After making changes to the code, you need to rebuild the Docker images:

```bash
docker-compose down
docker-compose build
docker-compose up
```

## Environment Variables

The application uses the following environment variables, which should be defined in the `.env` file at the root level:

```
PG_USER=postgres          # PostgreSQL user
PG_HOST=db                # Host for database (use 'db' for Docker, 'localhost' for local development)
PG_DATABASE=survey_db     # Database name
PG_PASSWORD=your_password # Database password
PG_PORT=5432              # PostgreSQL port
PORT=5000                 # Backend server port
REACT_APP_API_URL=        # Frontend API URL (leave empty for Docker setup)
```

## Database Setup

The PostgreSQL database is initialized with a table structure for storing survey responses. The initialization script is located at `server/init.sql`.

The main table `survey_responses` has the following structure:

```sql
CREATE TABLE survey_responses (
    response_id UUID PRIMARY KEY,
    lifestyle VARCHAR(100),
    q2_choice CHAR(1),
    q2a_influence VARCHAR(10),
    q2aa_frequent VARCHAR(10),
    q2b_payment VARCHAR(50),
    q2b_affect VARCHAR(10),
    q3_payment_option VARCHAR(50),
    q4_payment_influence VARCHAR(10),
    q5_flex_fare VARCHAR(10),
    q5a_try_again VARCHAR(10),
    q5aa_fairness VARCHAR(10),
    q6_show_up_hope CHAR(1),
    q6a_take_chance VARCHAR(10),
    q6aa_reaction VARCHAR(20),
    q7_courtesy_impact VARCHAR(10),
    q8_coupon_choice CHAR(1),
    q9_weather VARCHAR(20),
    q10_likelihood VARCHAR(50),
    q11_family_preference VARCHAR(50),
    q12_age_group VARCHAR(10),
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

The backend provides the following API endpoints:

### POST /api/survey and POST /survey

Both endpoints save survey responses to the database.

**Request Body:**
```json
{
  "lifestyle": "string",
  "q2_choice": "string",
  "q2a_influence": "string",
  "q2aa_frequent": "string",
  "q2b_payment": "string",
  "q2b_affect": "string",
  "q3_payment_option": "string",
  "q4_payment_influence": "string",
  "q5_flex_fare": "string",
  "q5a_try_again": "string",
  "q5aa_fairness": "string",
  "q6_show_up_hope": "string",
  "q6a_take_chance": "string",
  "q6aa_reaction": "string",
  "q7_courtesy_impact": "string",
  "q8_coupon_choice": "string",
  "q9_weather": "string",
  "q10_likelihood": "string",
  "q11_family_preference": "string",
  "q12_age_group": "string",
  "location": "string"
}
```

**Success Response (201):**
```json
{
  "message": "Survey response saved successfully",
  "response_id": "uuid-string"
}
```

**Error Response (500):**
```json
{
  "error": "Internal server error"
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot POST /survey" or "405 Not Allowed" Error

**Issue**: Form submission fails with HTTP 405 or "Cannot POST" error.

**Solution**:
- Ensure Nginx configuration in `client/nginx.conf` properly routes `/survey` to the backend
- Check that the Express server has a route handler for `/survey`
- Verify that the client is sending the request to the correct URL (`/survey`)
- Rebuild Docker containers after any configuration changes

#### 2. Database Connection Issues

**Issue**: Backend cannot connect to PostgreSQL database.

**Solution**:
- Check environment variables in `.env` file
- Ensure PostgreSQL service is running
- For Docker setup, ensure the database container is healthy
- Try connecting to the database manually to verify credentials

#### 3. Container Build Failures

**Issue**: Docker containers fail to build or start.

**Solution**:
- Check Docker and Docker Compose logs
- Ensure Docker daemon is running
- Verify that ports 3000, 5000, and 5432 are not in use by other applications
- Check for syntax errors in Dockerfiles and docker-compose.yml

## Making Changes

### Modifying the Survey Form

The survey form is defined in `client/src/Components/SurveyForm.js`. To add or modify questions:

1. Update the `formData` state to include new question fields
2. Add new question components in the appropriate conditional rendering blocks
3. Update the `handleNext` function to include logic for navigating to/from the new questions
4. Update the server's database schema and API endpoint to handle the new fields

### Styling Changes

The application uses Material-UI (MUI) for styling:

1. Global theme configuration is in the `getTheme` function at the top of `SurveyForm.js`
2. Modify component-specific styles using the `sx` prop on MUI components
3. For significant style changes, consider creating dedicated styled components

### Backend Changes

1. The main server file is `server/index.js`
2. Add new routes or middleware as needed
3. For database schema changes, update the initialization script in `server/init.sql`
4. After schema changes, you'll need to rebuild the database:
   ```bash
   # For Docker setup
   docker-compose down -v  # Removes volumes
   docker-compose up --build
   ```

## Project Structure

```
flexible-fare-survey/
│
├── client/                   # Frontend React application
│   ├── public/               # Static files
│   ├── src/                  # React source code
│   │   ├── Components/       # React components
│   │   │   └── SurveyForm.js # Main survey form component
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── Dockerfile           # Frontend Docker configuration
│   └── nginx.conf           # Nginx configuration for serving the app
│
├── server/                  # Backend Node.js application
│   ├── index.js             # Express server and API routes
│   ├── init.sql             # Database initialization script
│   └── Dockerfile           # Backend Docker configuration
│
├── .env                     # Environment variables
├── docker-compose.yml       # Docker Compose configuration
└── README.md               # Project documentation
```

---

This README provides a comprehensive guide to understanding, setting up, and deploying the Flexible Fare Survey application. For any further questions or issues, please contact the project maintainers or create an issue in the repository.