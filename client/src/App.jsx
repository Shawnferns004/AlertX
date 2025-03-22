import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReactForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from './context/VerifyEmail';
import ReportsChart from './components/PyChart';
import Documentation from './components/Policy';
import Settings from './pages/Settings';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};



function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/report" element={<ReportForm/>} />
                    
                    <Route path="/calendar" element={<div>Calendar Page</div>} />
                    
                    <Route path="/analytics" element={<ReportsChart />} />
                                        
                    <Route path="/documents" element={<Documentation/>} />
                    
                    <Route path="/settings" element={<Settings/>} />
                    
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;