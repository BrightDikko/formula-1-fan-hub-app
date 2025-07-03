import React from 'react';

export default function TeamRow({ team }) {
    // Block default anchor navigation – cards are not clickable yet
    const preventNavigation = (e) => e.preventDefault();

    const driverNames = Array.isArray(team.drivers) ? team.drivers : [];

    return (
        <tr>
            {/* Insignia / logo */}
            <td>
                <a className="row-link" href="#/" onClick={preventNavigation}>
                    <img
                        className="team-logo"
                        src={`/images/teams/${team.logo}`}
                        alt={team.name}
                    />
                </a>
            </td>

            {/* Team name */}
            <td>
                <a className="row-link" href="#/" onClick={preventNavigation}>
                    {team.name}
                </a>
            </td>

            {/* Driver columns */}
            <td>
                {driverNames[0] && (
                    <a className="row-link" href="#/" onClick={preventNavigation}>
                        {driverNames[0]}
                    </a>
                )}
            </td>
            <td>
                {driverNames[1] && (
                    <a className="row-link" href="#/" onClick={preventNavigation}>
                        {driverNames[1]}
                    </a>
                )}
            </td>
        </tr>
    );
}