# React-Python-Productivity-Suite

## Project Overview

This is a modern, full-stack web application designed as a **To-Do List alternative** focusing on simplicity and performance. It serves as a practical demonstration of integrating a modern JavaScript frontend (React) with a powerful Python-based backend.

The application allows users to create, manage, and track entries through a seamless and intuitive interface.

---

## 🚀 Live Deployment Status & Limitations

Is the website accessible to the world? **Yes.**
Do you need to keep your computer on? **No**, Render handles the hosting.

However, because this project is hosted on the **Render Free Tier** using a local **SQLite** database, there are two critical limitations you must be aware of:

### 1. The "Sleep" Mode (Spin Down)
* **What happens:** If no one visits the website for about **15 minutes**, Render puts the server to "sleep" to save resources.
* **The Effect:** When you (or a visitor) access the link after a break, it may take **30-60 seconds** to load while the server wakes up.
* **The Result:** The site is 24/7, but the first visitor after inactivity will experience a slow start.

### 2. The Data Reset (Ephemeral File System)
* **What happens:** Every time the website "goes to sleep" (spins down) or a new change is deployed, the file system is wiped clean.
* **The Effect:** Because we are using **SQLite (`friends.db`)**, any new data or "friends" added to the list will be **deleted** when the server restarts.
* **The Result:** The website will frequently reset to its initial empty state. To fix this in a production environment, you would need to upgrade to a paid persistent disk or switch to a cloud database like PostgreSQL (Supabase/Neon).

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
* **SQLite:** For local storage of data during development (`friends.db`).
* **Git & GitHub:** Used for version control and collaborative development.

---

## Architecture and Functionality

The application follows a standard component-based architecture:

1.  **Client-Side (React):** Manages the UI, user input, and state. It makes asynchronous requests to the backend API.
2.  **Server-Side (Python):** Listens for requests, executes business logic, performs CRUD (Create, Read, Update, Delete) operations on the database, and returns data.
3.  **Data Flow:** Inputs created on the React frontend are sent to the Python API, which saves them to the **friends.db**. The Python server then retrieves and sends updated lists back to React.

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


