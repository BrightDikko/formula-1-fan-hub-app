import React from 'react';

export default function AuthForm({ data, onChange, onSubmit, isLogin = false }) {
    const handle = (e) => onChange(e.target.name, e.target.value);

    return (
        <div className="auth-container">
            <form className="auth-card" onSubmit={onSubmit} autoComplete="off">
                {/* name fields appear only on Register */}
                {!isLogin && (
                    <>
                        <div className="auth-field">
                            <label htmlFor="firstName">First name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                value={data.firstName}
                                onChange={handle}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                value={data.lastName}
                                onChange={handle}
                                required
                            />
                        </div>
                    </>
                )}

                {/* e-mail & password */}
                <div className="auth-field">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handle}
                        required
                    />
                </div>

                <div className="auth-field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handle}
                        required
                    />
                </div>

                <button className="auth-submit">
                    {isLogin ? 'Log in' : 'Create account'}
                </button>
            </form>
        </div>
    );
}