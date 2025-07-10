import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../Auth/AuthContext';

// Main navigation bar — rendered on every page.
// Shows Log in when no session exists, otherwise shows Log out.
// Clicking Log out clears the Parse session (via useAuth) and redirects home.
export default function Nav() {
    const {user: currentUser, logout: logoutUser} = useAuth();
    const navigate = useNavigate();

    // Clear session token then take the user to the landing page
    const handleLogoutClick = async (event) => {
        event.preventDefault();
        await logoutUser();
        navigate('/', {replace: true});
    };

    return (
        <nav>
            {/* Brand / logo */}
            <div className="brand">
                <img src="/images/teams/F1.svg" alt="F1 logo" width="60" height="40"/>
                <h1 className="site-title">Formula&nbsp;1 – Fan Hub</h1>
            </div>

            {/* Primary navigation links */}
            <ul className="nav-links">
                <li><NavLink to="/" end>Home </NavLink></li>
                <li><NavLink to="/drivers">Drivers</NavLink></li>
                <li><NavLink to="/teams">Teams </NavLink></li>

                {currentUser ? (
                    // Logged-in: replace “Log in” with a styled “Log out” pseudo-link
                    <li>
                        <a
                            href="/"
                            type="button"
                            onClick={handleLogoutClick}
                            style={{cursor: "pointer"}}
                        >
                            Log out
                        </a>
                    </li>
                ) : (
                    // Logged-out: normal link to the auth flow
                    <li><Link to="/auth/login">Log&nbsp;in</Link></li>
                )}
            </ul>
        </nav>
    );
}