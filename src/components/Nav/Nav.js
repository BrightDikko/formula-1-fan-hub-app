import {Link, NavLink} from 'react-router-dom';
import {useAuth} from '../Auth/AuthContext';

import {FaUserCircle} from 'react-icons/fa';

// Main navigation bar — rendered on every page.
// Shows Log in when no session exists, otherwise shows Log out.
// Clicking Log out clears the Parse session (via useAuth) and redirects home.
export default function Nav() {
    const {user: currentUser} = useAuth();

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
                    <li>
                        <Link to="/account" title="Account">
                            <FaUserCircle size={28} />
                        </Link>
                    </li>
                ) : (
                    <li><Link to="/auth/login">Log&nbsp;in</Link></li>
                )}
            </ul>
        </nav>
    );
}