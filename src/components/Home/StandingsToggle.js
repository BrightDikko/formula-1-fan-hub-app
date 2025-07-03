import React from 'react';

export default function StandingsToggle({view, setView}) {
    return (
        <div className="standings-toggle">
            <a
                className={`tab ${view === 'drivers' ? 'active' : ''}`}
                href="#/"
                onClick={() => setView('drivers')}
            >
                Driver Standings
            </a>

            <a
                className={`tab ${view === 'constructors' ? 'active' : ''}`}
                href="#/"
                onClick={() => setView('constructors')}
            >
                Constructor Standings
            </a>
        </div>
    );
}