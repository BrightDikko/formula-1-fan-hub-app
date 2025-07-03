import {NavLink} from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <div className="brand">
                <img src="/images/teams/F1.svg" alt="F1 logo" width="60" height="40"/>
                <h1 className="site-title">Formula 1 – Fan Hub</h1>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home </NavLink>
                </li>
                <li>
                    <NavLink to="/drivers" className={({isActive}) => isActive ? 'active' : ''}>Drivers</NavLink>
                </li>
                <li>
                    <NavLink to="/teams" className={({isActive}) => isActive ? 'active' : ''}>Teams </NavLink>
                </li>
            </ul>
        </nav>
    );
}