# Contact Management Application Backend

## Overview
This project is a Contact Management Application Backend built using **Node.js** and **Express.js**, with **MongoDB** as the database. It provides CRUD operations to manage contacts, ensuring clean code practices, proper validation, and structured API design.

## Features
- **GET /contacts**: Fetch a list of all contacts.
- **POST /contacts**: Create a new contact.
- **PUT /contacts/:id**: Update an existing contact.
- **DELETE /contacts/:id**: Delete a contact.
- **GET /contacts/:id**: Fetch a specific contact by ID.
- **Bonus Feature**: Search contacts by name or email (optional).

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for ORM)
- **Validation:** Joi or express-validator
- **Testing:** Jest or Mocha/Chai
- **Version Control:** Git & GitHub

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)

### Steps to Run the Project
1. **Clone the repository:**
   ```
   git clone <repository_link>
   cd contact-management-backend
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Run the application:**
   ```
   npm start
   ```
   The backend will be available at `http://localhost:3001`


## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | /contacts       | Get all contacts |
| POST   | /contacts       | Create a new contact |
| GET    | /contacts/:id   | Get a contact by ID |
| PUT    | /contacts/:id   | Update a contact by ID |
| DELETE | /contacts/:id   | Delete a contact by ID |

### Request & Response Examples
#### **1. Create a Contact**
**Request:**
```json
{
  "name": "Ruban",
  "email": "12@gmail.com",
  "phone": "9234567892",
  "address": "123 Main St, City"
}

```
**Response:**
```json
{
    "name": "Ruban",
    "email": "12@gmail.com",
    "phone": "9234567892",
    "address": "123 Main St, City",
    "_id": "67ab5173e3b1accac8a653c8",
    "createdAt": "2025-02-11T13:32:35.603Z",
    "updatedAt": "2025-02-11T13:32:35.603Z",
    "contact_id": 3,
    "__v": 0
}
```

## Thought Process & Design Considerations
- **Modular Code:** Separated routes, controllers, and services for better maintainability.
- **Validation:** Used **Joi/express-validator** to ensure valid input data.
- **Error Handling:** Implemented custom middleware for consistent API responses.
- **Database:** Used **MongoDB (Mongoose)** for flexible data management.
- **Testing:** Added unit tests for core functionalities using **Jest/Mocha & Chai**.

## Future Improvements
- Implement authentication (JWT-based user management).
- Add pagination and sorting for large datasets.
- Integrate a frontend for better UI experience.

## Repository Link
[GitHub Repository](<https://github.com/rubankumarsankar/Contact_backend_task.git>)



