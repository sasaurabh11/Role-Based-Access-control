# Role-Based Access Control (RBAC) Application

## Overview

This project is an **Role-Based Access Control (RBAC)** designed to manage users, roles, and permissions efficiently. It provides a secure and user-friendly interface to perform CRUD operations on users, assign roles to them, and manage permissions for different roles.

### Key Features:
- **User Management**:
  - View, add, edit, and delete user accounts.
  - Assign roles to users and manage their status (Active/Inactive).
- **Role Management**:
  - Create, edit, and delete roles.
  - Roles can include predefined permissions (e.g., Read, Write, Delete) or custom attributes.
- **Dynamic Permissions**:
  - Easily assign and modify permissions for roles.
  - Permissions are displayed clearly for ease of understanding and modification.
- **Custom API Simulation** (Optional):
  - Mock API calls to simulate CRUD operations on users and roles.
  - Validate functionality of the dashboard without connecting to a live server.

## Tech Stack

- **Frontend**: 
  - **React.js** - The primary framework for building the dashboard UI.
  - **Redux** - State management for storing and handling user and role data.
  - **Axios** - Making HTTP requests for interacting with the simulated backend.

- **Backend** (Optional): 
  - **Node.js** - Server-side application to simulate CRUD operations on users and roles.
  - **Express.js** - For managing RESTful routes and serving API endpoints.
  - **Mock Data** - To simulate database interactions and validate functionality.

- **Authentication**:
  - JWT (JSON Web Token) - To manage secure sessions and role-based access control (RBAC).