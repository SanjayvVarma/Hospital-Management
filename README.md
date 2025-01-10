
# Hospital Management System

A comprehensive web application designed to manage various hospital-related functionalities such as user management (Doctors, Patients, Admins), appointment scheduling, messaging system, and more.

## Features

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

## Tech Stack

- **Frontend**: ReactJS (Not included in this backend repository)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ORM)
- **File Storage**: Cloudinary (for storing doctor avatars)
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB database (either local or cloud instance like MongoDB Atlas)
- Cloudinary account (for image storage)

### Steps to Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hospital-management-system.git
