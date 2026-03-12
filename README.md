
# Patient Directory Application
A high-performance, single-page web application built with Next.js, TypeScript, and TailwindCSS for managing and presenting patient data.

## 🚀 Setup Instructions
### Prerequisites- Node.js (v18.0.0 or higher)- npm or yarn

### Installation.
cd patient-directory

Install dependencies:
Run - npm install


For development server:
Run - npm run dev


Open the application: Navigate to http://localhost:3000 in your browser.



🏛️ Architectural Decisions
1. Framework & Pattern
Next.js (App Router): Utilized for its robust routing, server-side capabilities, and seamless API route integration.
Component-Based Architecture: The application is broken down into small, reusable, and focused components (Table, CardList, Controls, Pagination) to ensure maintainability and testability.

2. Data Management
Local API Route Handlers: Created a custom API at /api/patients to serve data from a JSON file. This simulates a real-world backend with support for:
Server-side pagination.
Multi-field search (ID, Name, Email).
Categorical filtering (Medical Issues).
Dynamic sorting (Name, Age).
Custom Hook (usePatients): Encapsulates all data fetching logic, state management (loading, error, data), and debouncing logic. This separates the "how" of data retrieval from the "what" of the UI.

3. Performance Optimizations
Debounced Search: Implemented a 500ms debounce on search inputs to minimize API requests and prevent UI stuttering during rapid typing.
Memoization: Extensive use of React.memo, useMemo, and useCallback to prevent unnecessary re-renders of heavy list components and expensive calculations.
TailwindCSS: Used for utility-first styling, ensuring a minimal CSS bundle and fast styling iterations.

4. User Experience (UX)
Dual View Modes: Seamless toggling between Table and Card views to accommodate different user preferences and screen sizes.
Robust Error Handling: Dedicated error states with "Try Again" functionality and clear user feedback for loading and empty states.
Responsive Design: A mobile-first approach ensuring the directory is usable across all devices.