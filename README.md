# EDUERP (FSAD Review)

A role-based Education ERP frontend built with React, Vite, React Router, and Tailwind CSS.

## 1. Project Purpose
EDUERP simulates an institutional portal where different user roles work on the same system with different permissions:
- Student
- Teacher
- Admin
- Administrator

The project demonstrates role-based access control (RBAC), dashboard-driven UI, and modular feature pages for academics and operations.

## 2. Core Theory (How the System Is Designed)

### 2.1 Role-Based Access Control (RBAC)
- Authentication state is stored in `AuthContext`.
- Login validates mock credentials and role.
- Protected routes are wrapped by `PrivateRoute`.
- If a user is not logged in, they are redirected to role-specific login.
- If role does not match route requirement, user is redirected to home.

### 2.2 State and Session Theory
- User session is persisted in browser `localStorage`:
  - `eduerp_user`
  - `eduerp_role`
  - `eduerp_token`
- On refresh, context rehydrates state from storage.
- Logout clears state and storage.

### 2.3 Data Flow Theory
- Current implementation uses local mock datasets in `src/mock/*`.
- Pages compute UI statistics from these datasets using React state/effects.
- This structure mirrors real API-driven architecture and can be replaced later with backend calls.

### 2.4 UI Architecture Theory
- `DashboardLayout` composes common shell:
  - Sidebar (role-aware navigation)
  - Topbar (breadcrumb, user info, notifications)
  - Main content area
- Every role page plugs into this shared layout for consistency and maintainability.

## 3. Tech Stack
- React 18
- Vite 5
- React Router DOM 6
- Tailwind CSS 3
- Lucide React icons

## 4. Folder Structure (Important)
```text
FSAD REVIEW/
|- eduerp/
|  |- frontend/
|     |- src/
|     |  |- components/      # Shared UI blocks (layout, table, modal, etc.)
|     |  |- context/         # Auth context and session handling
|     |  |- mock/            # Local mock datasets
|     |  |- pages/           # Role-based feature pages
|     |- package.json
```

## 5. Step-by-Step Setup Guide

### 5.1 Prerequisites
- Node.js 18+ (recommended)
- npm 9+ (recommended)

### 5.2 Install and Run
1. Open terminal in project root.
2. Move to frontend:
   ```powershell
   cd eduerp/frontend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start development server:
   ```powershell
   npm run dev
   ```
5. Open URL shown by Vite (usually `http://localhost:5173`).

### 5.3 Build for Production
```powershell
npm run build
npm run preview
```

## 6. Step-by-Step Functional Flow (User Journey)

### 6.1 Home Entry
1. User opens `/`.
2. Home page shows 4 role cards.
3. User selects a role.
4. App navigates to `/login/:role`.

### 6.2 Login Flow
1. User enters email and password.
2. App validates credentials against mock data in `AuthContext`.
3. If valid:
   - Create mock token
   - Save user, role, token to localStorage
   - Redirect to `/{role}/dashboard`
4. If invalid: show error.

### 6.3 Route Protection Flow
1. User tries to access protected route.
2. `PrivateRoute` checks authentication and role.
3. If unauthenticated -> redirect to `/login/{requiredRole}`.
4. If wrong role -> redirect to `/`.
5. If valid -> render requested page.

### 6.4 In-Dashboard Flow
1. Sidebar renders role-specific menu.
2. Topbar shows breadcrumb/user actions.
3. Main page loads module-specific mock data.
4. User navigates across modules without full reload (SPA routing).

### 6.5 Logout Flow
1. User clicks logout (sidebar or topbar).
2. Auth context clears state and localStorage.
3. User returns to `/`.

## 7. Role-Wise Modules

### 7.1 Student
- Dashboard
- Announcements
- Assignments
- Grades
- Attendance
- Schedule
- Messages
- Profile

### 7.2 Teacher
- Dashboard
- Announcements
- Create Assignment
- Submissions
- Mark Attendance
- Grades
- Students
- Messages
- Profile

### 7.3 Admin
- Dashboard
- User Management
- Roles and Permissions
- System Announcements
- Audit Logs
- Settings
- Profile

### 7.4 Administrator
- Dashboard
- Institutional Overview
- Resource Management
- Reports
- Department Management
- Finance Overview
- Notices
- Profile

## 8. Demo Credentials
Use these in login pages:
- Student: `student@eduerp.com` / `student123`
- Teacher: `teacher@eduerp.com` / `teacher123`
- Admin: `admin@eduerp.com` / `admin123`
- Administrator: `administrator@eduerp.com` / `admin123`

## 9. Current Project Status and Limitations
- Backend is intentionally not included in this workspace right now; it will be connected later.
- Most data is mock/static and intended for prototype/demo flow.

## 10. How to Extend (Recommended Next Steps)
1. Replace mock datasets with REST APIs.
2. Add real JWT auth and refresh-token flow.
3. Add form validation and error handling at each module.
4. Add test coverage (unit + integration + route protection tests).
5. Normalize navigation paths between sidebar and route definitions.

---
This README is intended as both a practical runbook and a theory note for FSAD review, viva, and demonstration.


