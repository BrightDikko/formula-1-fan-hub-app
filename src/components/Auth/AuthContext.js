import React, {createContext, useContext, useEffect, useState} from 'react';
import * as auth from '../../services/auth';

// Centralised authentication context.
// Holds the current Parse user, exposes auth actions, and indicates whether we’re still restoring a saved session.

const AuthContext = createContext(null);   // exported via useAuth()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(auth.current());
        setLoading(false);
    }, []);

    const register = async (data) => setUser(await auth.register(data));
    const login = async (credentials) => setUser(await auth.login(
        credentials.email,
        credentials.password,
    ));
    const logout = async () => {
        await auth.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={
            {
                user,
                loading,
                register,
                login,
                logout
            }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);