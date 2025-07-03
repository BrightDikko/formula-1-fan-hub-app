import React, { useState, useEffect } from 'react';
import StandingsToggle from './StandingsToggle';
import StandingsCard   from './StandingsCard';
import { getStandings, getDrivers, getTeams } from '../../services/F1';

export default function Home() {
    const [standings, setStandings] = useState(null);   // {driverStandings, constructorStandings}
    const [drivers,   setDrivers]   = useState([]);     // flattened driver list
    const [teams,     setTeams]     = useState([]);     // flattened team list
    const [isLoading, setIsLoading] = useState(true);
    const [view,      setView]      = useState('drivers'); // 'drivers' | 'constructors'

    useEffect(() => {
        // Fetch all three resources in parallel
        (async () => {
            const [standingsRes, driversRes, teamsRes] = await Promise.all([
                getStandings(),
                getDrivers(),
                getTeams(),
            ]);
            setStandings(standingsRes);
            setDrivers(driversRes);
            setTeams(teamsRes);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <main>
                <p style={{ textAlign: 'center' }}>Loading…</p>
            </main>
        );
    }

    // Pick the correct rows for the selected view
    const tableRows =
        (view === 'drivers')
            ? standings.driverStandings
            : standings.constructorStandings;

    return (
        <main>
            <header className="page-heading">
                <h2>F1 Drivers 2025</h2>
                <p className="sub">Browse every confirmed driver for the 2025 season</p>
            </header>

            {/* toggle between driver / constructor standings */}
            <StandingsToggle view={view} setView={setView} />

            {/* reusable table component */}
            <StandingsCard
                type={view}
                rows={tableRows}
                drivers={drivers}
                teams={teams}
            />
        </main>
    );
}