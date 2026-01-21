# Employee Dashboard Project

A responsive React-based dashboard for employee management, featuring data visualization with Chart.js, a collapsible sidebar, and a paginated employee list.

## 🚀 Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites
*   Node.js (v14 or higher recommended)
*   npm (comes with Node.js)

### Installation
1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd /path/to/Dashboard
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    To view the application, open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

## 📋 Assumptions Made

*   **Data Source**: Since there is no backend connected, all data for charts (Payroll, Attendance, Onboarding) and the employee list is **mocked/hardcoded** within the `Dashboard.jsx` component.
*   **Authentication**: No authentication system is currently implemented; the dashboard is accessible directly.
*   **Browser Compatibility**: The application is designed for modern browsers (Chrome, Firefox, Safari, Edge).
*   **Assets**: Images for profiles and icons are sourced locally from the `src/assets` folder.

## 🛠️ Design & Technical Decisions

*   **React + Vite**: Chosen for fast development and efficient bundling.
*   **CSS Modules**: Styles are scoped locally to components (`*.module.css`) to prevent class name conflicts and ensure clean modular styling.
*   **Chart.js / react-chartjs-2**: Used for implementing the Payroll and Attendance charts due to its flexibility and ease of integration with React. Custom legends and overlays were implemented to match specific visual requirements.
*   **Responsiveness**:
    *   **Media Queries**: Used extensively to adapt layouts for mobile (max-width: 768px) and tablet devices.
    *   **Collapsible Sidebar**: On mobile devices, the sidebar is hidden by default and can be toggled via a hamburger menu in the header. It slides in as an overlay to save screen space.
    *   **Grid Layouts**: CSS Grid is used for the main dashboard layout to easily switch between multi-column (desktop) and single-column (mobile) views.
*   **State Management**:
    *   `useState` is used for managing local UI state such as the sidebar toggle (`isSidebarOpen`), pagination (`currentPage`), and active tabs.
    *   Props are used to pass state handlers (e.g., `toggleSidebar`) between components like `Layout`, `Header`, and `Sidebar`.
*   **Pagination**: Implemented client-side pagination for the employee table to verify UI logic without a backend.
