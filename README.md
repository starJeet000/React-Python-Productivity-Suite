# **React-Python-Bestfriends-Webapp**

## Project Overview

This is a modern, full-stack web application designed as a **To-Do List alternative** focusing on simplicity and performance. It serves as a practical demonstration of integrating a modern JavaScript frontend (React) with a powerful Python-based backend.

The application allows users to **create, manage, and track personal tasks** through a seamless and intuitive interface.

---

## Technical Stack

This project is built using a strong, two-part Full Stack architecture:

### Frontend (User Interface)

* **React:** Used for building a dynamic, component-based user interface.
* **JavaScript (ES6+):** Core language for frontend logic.
* **Chakra UI:** For clean, responsive styling.

### Backend (Server & API)

* **Python (Flask):** Handles server-side logic, routing, and database interactions.
* **RESTful APIs:** Provides secure and efficient communication between the React frontend and the Python backend.

### Data & Tools

* **SQLite:** For persistent storage of user tasks and data.
* **Git & GitHub:** Used for version control and collaborative development.

---

## Architecture and Functionality

The application follows a standard component-based architecture:

1. **Client-Side (React):** Manages the UI, user input, and state. It makes asynchronous requests to the backend API.
2. **Server-Side (Python):** Listens for requests, executes business logic, performs CRUD (Create, Read, Update, Delete) operations on the database, and returns data.
3. **Data Flow:** Tasks created on the React frontend are sent to the Python API, which saves them to the **friends.db**. The Python server then retrieves and sends updated task lists back to React.

> ### ⚠️ Deployment Warning: SQLite Limitation
> 
> 
> The application is currently configured to use `friends.db` (SQLite) for data storage. If you deploy this project to a platform with an ephemeral file system (like **Render's Free Tier**), your database file will be **deleted** every time the server restarts or spins down due to inactivity. For production environments, it is highly recommended to use a managed database service like PostgreSQL or MongoDB. As for practice purpose sqlite is used here.

---

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

You will need the following installed:

* Node.js (for React)
* Python 3.x
* Git

### 1. Cloning the Repository

```bash
git clone [repository-link-here]
cd React-Python-Bestfriends-Webapp

```

### 2. Setting Up the Backend (Python)

```bash
# Navigate to the backend directory
cd backend 
pip install -r requirements.txt
# Run the server
python app.py

```

### 3. Setting Up the Frontend (React)

```bash
# Navigate to the frontend directory
cd ../frontend 
npm install
npm run dev

```

The application should now be accessible in your web browser at `http://localhost:3000`.

---

## Future Enhancements

* Implement user authentication and personalized accounts.
* Add priority levels and due dates for tasks.
* Integrate drag-and-drop functionality for easier task reordering.


