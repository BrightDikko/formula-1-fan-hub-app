import React, { useMemo } from 'react';

export default function StandingsCard({ type, rows, drivers, teams }) {
    // Build lookup maps, so we don’t loop for every row
    const driverById = useMemo(
        () => Object.fromEntries(drivers.map((d) => [d.id, d])),
        [drivers],
    );

    const teamById = useMemo(
        () => Object.fromEntries(teams.map((t) => [t.id, t])),
        [teams],
    );

    // Compose table body according to selected type
    const tableBody =
        (type === 'drivers')
            ? rows.map((r) => {
                const driver = driverById[r.driverId] || {};
                const team   = teamById[driver.teamId] || {};

                return (
                    <tr key={r.driverId}>
                        <td>{r.position}</td>
                        <td>{driver.firstName} {driver.lastName}</td>
                        <td>
                            <img
                                src={`/images/flags/${driver.code}.jpg`}
                                alt={driver.country}
                                width="24"
                                height="16"
                            />
                        </td>
                        <td>{team.name}</td>
                        <td>{r.points}</td>
                    </tr>
                );
            })
            : rows.map((r) => {
                const team = teamById[r.teamId] || {};
                return (
                    <tr key={r.teamId}>
                        <td>{r.position}</td>
                        <td>{team.name}</td>
                        <td>{r.points}</td>
                    </tr>
                );
            });

    const tableHeader =
        (type === 'drivers') ? (
            <tr>
                <th>Pos.</th>
                <th>Driver</th>
                <th>Flag</th>
                <th>Team</th>
                <th>Pts.</th>
            </tr>
        ) : (
            <tr>
                <th>Pos.</th>
                <th>Team</th>
                <th>Points</th>
            </tr>
        );

    const title =
        (type === 'drivers')
            ? '2025 Driver Standings'
            : '2025 Constructor Standings';

    return (
        <section className="card">
            <h2>{title}</h2>

            <div className="table-wrapper">
                <table>
                    <thead>{tableHeader}</thead>
                    <tbody>{tableBody}</tbody>
                </table>
            </div>
        </section>
    );
}