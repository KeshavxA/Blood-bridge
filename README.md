# BloodBridge

BloodBridge is a full-stack Blood Bank Management System.

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS application.
- `backend/`: PHP CodeIgniter 4 REST API.
- `database/`: Database schemas and dumps.

## Setup Instructions

### Backend Setup
1. Navigate to `backend/`.
2. Copy `env` to `.env` and configure your database settings.
3. Run `php spark serve` to start the backend server.

### Frontend Setup
1. Navigate to `frontend/`.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the frontend server.

### Database Setup
1. Create a MySQL database named `bloodbridge`.
2. Import the `database/bloodbridge.sql` file into your database.
