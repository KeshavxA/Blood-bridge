# BloodBridge 🩸

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![CodeIgniter 4](https://img.shields.io/badge/CodeIgniter-%23EF4223.svg?style=for-the-badge&logo=codeigniter&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

BloodBridge is a fully responsive Blood Bank Management System that connects hospitals with receivers. Hospitals can add available blood samples, while users (receivers) can view inventory and request blood samples based on compatibility. The system features secure role-based authentication, real-time validations, and a clean, dynamic user interface.

## 🚀 Features

- **Role-Based Access**: Separate dashboards for Hospitals and Receivers.
- **Blood Sample Management**: Hospitals can securely add and manage their available blood units.
- **Smart Requests**: Receivers can only request blood groups that are medically compatible with their own.
- **Real-Time Feedback**: Toast notifications and loading spinners for all async actions.
- **Secure Authentication**: Passwords hashed securely using bcrypt; session-based auth endpoints.

## 🛠 Setup Instructions

### Prerequisites
- PHP 8.1+
- Composer
- Node.js & npm
- MySQL

### 1. Database Setup
1. Create a MySQL database named `bloodbridge`.
2. Import the database schema from `database/bloodbridge.sql`:
   ```bash
   mysql -u root -p bloodbridge < database/bloodbridge.sql
   ```

### 2. Backend Setup (CodeIgniter 4)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install PHP dependencies:
   ```bash
   composer install
   ```
3. Copy the environment configuration:
   ```bash
   cp env .env
   ```
4. Open the `.env` file and configure your database settings (uncomment if necessary):
   ```ini
   database.default.hostname = localhost
   database.default.database = bloodbridge
   database.default.username = your_db_username
   database.default.password = your_db_password
   database.default.DBDriver = MySQLi
   ```
   *(Note: Never commit your `.env` file with actual credentials!)*
5. Start the backend development server:
   ```bash
   php spark serve
   ```
   *(The API will run at http://localhost:8080)*

### 3. Frontend Setup (React/Vite)
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The app will run at http://localhost:5173)*

## 📸 Screenshots

*(Add screenshots of your application here!)*

### Mobile Responsive Cards
<img src="placeholder-mobile.png" width="300" alt="Mobile View" />

### Desktop Dashboard
<img src="placeholder-desktop.png" width="800" alt="Desktop View" />
