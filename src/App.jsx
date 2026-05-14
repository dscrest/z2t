import React from "react"
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./features/auth/LoginPage"
import DashboardLayout from "./components/layout/DashboardLayout"
import Dashboard from "./features/migration/Dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        
        {/* Redirect root to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
