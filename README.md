# Hospital Management System

## Overview

The **Hospital Management System** is a web application designed to streamline hospital operations by offering various features like user management, appointment scheduling, and messaging systems. The system allows patients to book appointments with doctors, communicate through messages, and provides an admin dashboard to manage users (patients, doctors, and admins). 
It aims to provide a seamless experience for both hospital staff (doctors, admins) and patients by integrating essential features required to run a hospital efficiently.

### Features

- **User Authentication & Authorization**: 
  - Registration and login for patients, doctors, and admin users.
  - JWT authentication for secure login.
  - Role-based access control (Admin, Doctor, Patient).
  
- **Appointment Management**:
  - Schedule appointments for patients with doctors.
  - View all appointments, update statuses, and delete appointments.

- **Message Management**:
  - Send and view messages from patients to the hospital or vice versa.
  - Admin can delete messages.

- **Admin and Doctor Dashboard**:
  - Admin can register new users (patients, doctors, and admins).
  - Admin can view all registered doctors and manage their details.
  - Doctor can manage their appointment schedule.

### Tech Stack

- **Frontend**: ReactJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary (for images)

---

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB database (either local or cloud instance like MongoDB Atlas)
- Cloudinary account (for image storage)

### Setup Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hospital-management-system.git
   ```

2. Navigate to the project folder:

   ```bash
   cd hospital-management-system
   ```

3. Install dependencies for both frontend and backend:

   - **For Backend**:

     ```bash
     cd backend
     npm install
     ```

   - **For Frontend**:

     ```bash
     cd frontend
     npm install
     ```

4. Create a `.env` file in the root directory and add your environment variables for both frontend and backend.

   - **Backend**:

     ```bash
     MONGO_URL=your_mongo_database_url
     JWT_SECRET_KEY=your_jwt_secret_key
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

   - **Frontend** (if necessary):

     ```bash
     REACT_APP_API_URL=http://localhost:5000/api/v1
     ```

5. Start the development server for both frontend and backend:

   - **Backend**:

     ```bash
     cd backend
     npm start
     ```

   - **Frontend**:

     ```bash
     cd frontend
     npm start
     ```

    - **Dashboard**:

     ```bash
     cd dashboard
     npm start
     ```


6. Your API will be running on `http://localhost:5000` and frontend on `http://localhost:3000`.

---

## API Endpoints

### Authentication Routes

- **POST** `/api/v1/login`: Login a user (Admin, Patient, Doctor).
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "confirmPassword": "password123",
      "role": "Patient"
    }
    ```

- **POST** `/api/v1/patient/register`: Register a new patient.
  - Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "password": "password123",
      "gender": "Male",
      "dob": "1990-01-01",
      "nic": "1234567890123",
      "role": "Patient"
    }
    ```

- **POST** `/api/v1/admin/logout`: Admin logout (clear admin token).

- **POST** `/api/v1/patient/logout`: Patient logout (clear patient token).

### User Management Routes

- **POST** `/api/v1/admin/register`: Register a new admin.
  - Request Body:
    ```json
    {
      "firstName": "Admin",
      "lastName": "User",
      "email": "admin@example.com",
      "phone": "1234567890",
      "password": "password123",
      "gender": "Male",
      "dob": "1985-05-15",
      "nic": "9876543210123"
    }
    ```

- **GET** `/api/v1/doctors`: Get all doctors.
  - Response: List of all registered doctors.

- **GET** `/api/v1/user`: Get logged-in user details.

- **POST** `/api/v1/doctor/register`: Add a new doctor (admin only).
  - Request Body:
    ```json
    {
      "firstName": "Dr. Jane",
      "lastName": "Smith",
      "email": "dr.jane@example.com",
      "phone": "0987654321",
      "password": "password123",
      "gender": "Female",
      "dob": "1980-07-25",
      "nic": "5678901234567",
      "doctorDepartment": "Cardiology"
    }
    ```

### Appointment Routes

- **POST** `/api/v1/appointment`: Book an appointment for a patient.
  - Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "nic": "1234567890123",
      "dob": "1990-01-01",
      "gender": "Male",
      "appointment_date": "2025-01-15",
      "department": "Cardiology",
      "doctor_firstName": "Dr. Jane",
      "doctor_lastName": "Smith",
      "hasVisited": false,
      "address": "123 Street, City"
    }
    ```

- **GET** `/api/v1/appointments`: Get all appointments (admin only).

- **PUT** `/api/v1/appointment/:id`: Update an appointment status.
  - Request Body:
    ```json
    {
      "status": "Accepted"
    }
    ```

- **DELETE** `/api/v1/appointment/:id`: Delete an appointment.

### Message Routes

- **POST** `/api/v1/message`: Send a message from a patient to the admin or hospital.
  - Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "1234567890",
      "message": "I would like to schedule an appointment."
    }
    ```

- **GET** `/api/v1/messages`: Get all messages (admin only).

- **DELETE** `/api/v1/message/:id`: Delete a message.

---

## Error Handling

The system uses a custom error handler to catch errors and return meaningful responses. Common error scenarios are:

- **400** - Bad Request (Invalid input or missing fields).
- **404** - Resource Not Found (e.g., user, appointment, or message not found).
- **500** - Internal Server Error (unexpected errors).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Steps to Use:

1. **Save** the content above into a `README.md` file in the root directory of your project.
2. **Update** any project-specific details such as repository links and Cloudinary settings.
3. **Share** the `README.md` with your team or public repository users for easy setup, installation, and usage instructions.