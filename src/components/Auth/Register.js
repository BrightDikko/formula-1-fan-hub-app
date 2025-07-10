import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import AuthForm from './AuthForm';
import FormMessage from './FormMessage';

export default function Register() {
    const [registrationData, setRegistrationData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');  // banner message

    const { register: registerAccount } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await registerAccount(registrationData);
            navigate('/', { replace: true });
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleFieldChange = (key, value) => {
        setRegistrationData((current) => ({ ...current, [key]: value }));
        if (message) setMessage('');
    };

    return (
        <main>
            <header className="page-heading">
                <h2>Create account</h2>
                <p className="sub">Join the F1 Fan Hub</p>
            </header>

            <FormMessage>{message}</FormMessage>

            <AuthForm
                data={registrationData}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
            />

            <div className="auth-footer">
                Already have an account? <Link to="/auth/login">Log in →</Link>
            </div>
        </main>
    );
}