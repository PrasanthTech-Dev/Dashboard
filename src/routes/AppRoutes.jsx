import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/Layout/DashboardLayout';

// Auth Pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import LockScreen from '../pages/Auth/LockScreen';

// Main Dashboard Pages
import Dashboard from '../pages/Dashboard/Dashboard';
import Products from '../pages/Ecommerce/Products';
import Orders from '../pages/Ecommerce/Orders';
import Customers from '../pages/Ecommerce/Customers';
import Calendar from '../pages/Calendar/Calendar';
import Inbox from '../pages/Mail/Inbox';
import TaskBoard from '../pages/ProjectManagement/TaskBoard';
import Chat from '../pages/Chat/Chat';
import Projects from '../pages/ProjectManagement/Projects';
import FileManager from '../pages/FileManager/FileManager';
import Notes from '../pages/Notes/Notes';
import ContactList from '../pages/Contacts/ContactList';
import MyProfile from '../pages/Profile/MyProfile';

// Helper inline component to keep workspaces clean
const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', minHeight: '60vh' }}>
    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>{title} Component</h2>
    <p style={{ color: '#64748b', fontSize: '14px' }}>This is a placeholder page container for the {title.toLowerCase()} system.</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/lock-screen" element={<LockScreen />} />

      {/* Protected Dashboard Routes wrapped under Layout route */}
      <Route 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } 
      >
        <Route path="/" element={<Dashboard />} />
        
        {/* Core sub-routes */}
        <Route path="/ecommerce/products" element={<Products />} />
        <Route path="/ecommerce/orders" element={<Orders />} />
        <Route path="/ecommerce/customers" element={<Customers />} />
        
        {/* Inline placeholders for secondary routes to prevent compile errors */}
        <Route path="/projects/tasks" element={<TaskBoard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/mail/inbox" element={<Inbox />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/contacts" element={<ContactList />} />
        <Route path="/profile" element={<MyProfile />} />

        {/* 404 fallback */}
        <Route path="*" element={<PlaceholderPage title="404 Page Not Found" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
