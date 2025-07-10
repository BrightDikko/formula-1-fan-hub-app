import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './AuthContext';

// Route guard: block authenticated users from the /auth area.
export default function AuthOnlyRoute() {
    const {user, loading} = useAuth();  // session state from context
    if (loading) return null;  // wait until session is restored
    return user ? <Navigate to="/" replace/> : <Outlet/>;
}