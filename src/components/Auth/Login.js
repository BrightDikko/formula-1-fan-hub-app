import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import AuthForm from './AuthForm';
import FormMessage from './FormMessage';

export default function Login() {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');  // banner message

    const {login} = useAuth();
    const navigate = useNavigate();
    const {state: redirectState} = useLocation();  // where the user tried to go

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(credentials);  // Parse.User.logIn
            navigate(redirectState?.from?.pathname || '/', {replace: true});
        } catch (error) {
            setMessage(error.message); // surface Parse error text
        }
    };

    const handleFieldChange = (key, value) => {
        setCredentials((current) => ({...current, [key]: value}));
        if (message) setMessage('');  // clear banner when editing
    };

    return (
        <main>
            <header className="page-heading">
                <h2>Welcome back</h2>
                <p className="sub">Log in to access this page</p>
            </header>

            <FormMessage>{message}</FormMessage>

            <AuthForm
                data={credentials}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
                isLogin
            />

            <div className="auth-footer">
                New here? <Link to="/auth/register">Create an account →</Link>
            </div>
        </main>
    );
}