import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAuth} from './AuthContext';

// Wrap ANY routes that require login
export default function ProtectedRoute() {
    const { user, loading } = useAuth();
    const location          = useLocation();

    if (loading) return null;
    return user
        ? <Outlet />
        : <Navigate to="/auth/login" replace state={{ from: location }} />;
}