# Creative Upaay Dashboard - Task Management System

Submission for the Creative Upaay Full Stack Development Assignment. This project is a functional task management dashboard built with React, focusing on state persistence, authentication, and detailed task tracking.

## Implementation Overview

### Level 1 (Compulsory)
*   **Kanban Layout:** 3-stage sectioning (To Do, In Progress, Done).
*   **Task CRUD:** Full functionality to add, move, and delete tasks.
*   **Filtering:** Priority-based filtering system.
*   **Persistence:** Local Storage integration to maintain state across sessions.
*   **Drag and Drop:** Interactive task movement using `@dnd-kit`.

### Level 2 (Advanced Features)
*   **Authentication:** User login and sign-up implemented via **Clerk**.
*   **Due Dates:** Functionality to assign deadlines with automated toast notifications for overdue items.
*   **Subtasks:** Nested checklist management within individual task cards.
*   **Activity Log:** Automated event tracking (status changes, subtask updates) with a timestamped timeline view.

## Tech Stack
*   **Frontend:** React (Vite)
*   **Styling:** Chakra UI
*   **State Management:** Redux Toolkit
*   **Auth:** Clerk
*   **Icons:** Lucide React

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/tushar73-jet/creative-upaay-dashboard.git
    cd creative-upaay-dashboard/client
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env.local` file in the `client` directory:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
    ```

4.  **Launch the application**
    ```bash
    npm run dev
    ```
