# **User Management System**

A **full-stack User Management System** built using the **MERN (MongoDB, Express.js, React, Node.js) stack** with **TypeScript**. It provides secure authentication, role-based access control (RBAC), and a clean UI for managing users, roles, and permissions.

## **🚀 Features**

### 🔐 **Authentication & Security**

✅ JWT Authentication (Secure Login & API Access)  
✅ Password Hashing (Bcrypt for Secure Password Storage)  
✅ Role-Based Access Control (RBAC)

### 👥 **User Management**

✅ CRUD Operations (Create, Read, Update, Delete Users)  
✅ Role Assignment (Assign Different Roles to Users)  
✅ Secure API Endpoints

### 🏷️ **Role & Permission Management**

✅ Add, Edit, View, and Delete Roles  
✅ Assign Permissions to Roles  
✅ Dynamic Role-Based UI

### 📦 **Product Management (Optional Module)**

✅ CRUD Operations on Products  
✅ Authorization Middleware to Restrict Unauthorized Access

---

## **🛠️ Tech Stack**

### **Backend (Server-Side)**

- **Node.js** & **Express.js** – Backend Framework
- **MongoDB with Mongoose** – NoSQL Database
- **TypeScript** – Strongly Typed JavaScript
- **JWT & Bcrypt.js** – Authentication & Security

### **Frontend (Client-Side)**

- **React with TypeScript** – Modern Frontend Framework
- **Redux Toolkit Query** – API State Management
- **React Router DOM** – Client-Side Navigation
- **Tailwind CSS** – Responsive & Modern UI
- **Formik & Yup** – Form Handling & Validation

---

## **📩 Postman API Collection**

The API request collection is available in the repository.

1. **Import into Postman** – Open Postman and import the JSON collection file.
2. **Setup Environment Variables** – Configure:
   - `baseUrl`: Set this to your backend URL.
   - `token`: Use the JWT token after login to authenticate API requests.

---

## **🚀 Setup & Run the Backend**

1. cd backend
2. npm install # Install dependencies
3. npm run dev # Start development server

   - it will run the backend on port 5000.

## **🚀 Setup & Run the Frontend**

1. cd frontend
2. npm install # Install dependencies
3. npm run start # Start development

   - it will run the frontend on port 3000.

## **Accounts**

# _Admin_

    email - admin@gmail.com
    password - admin123

# *Manager*
    email - manager@gmail.com
    password - manager123

# *User*
    email - user@gmail.com
    password - user123