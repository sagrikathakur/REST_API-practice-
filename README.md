# Simple Task Manager CRUD API

A clean and professional REST API built with Express.js.

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Setup environment**:
   Edit `.env` if needed (default port `3000`).

3. **Start the server**:
   ```bash
   npm start
   ```
   *Note: Using `node server.js` for production.*

## 🛠 API Endpoints

All endpoints use the prefix: `/api/v1`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/tasks` | List all tasks |
| **GET** | `/tasks/:id` | Get a specific task by ID |
| **POST** | `/tasks` | Create a new task (body: `title`, `description`) |
| **PUT** | `/tasks/:id` | Update an existing task (body: `title`, `description`, `completed`) |
| **DELETE** | `/tasks/:id` | Delete a task by ID |

## 📦 Tech Stack
- **Node.js** & **Express**
- **Helmet** (Security)
- **Morgan** (Logging)
- **Cors** (Cross-Origin Resource Sharing)
- **Dotenv** (Environment Variables)
