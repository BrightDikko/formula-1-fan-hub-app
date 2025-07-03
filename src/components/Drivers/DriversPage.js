import React, {useState, useEffect, useMemo} from 'react';
import {getDrivers} from '../../services/F1';
import DriverCard from './DriverCard';

// Fixed order used to group + sort driver cards by constructor
const TEAM_SORT_ORDER = [
    'mclaren',
    'mercedes',
    'red bull racing',
    'ferrari',
    'williams',
    'haas',
    'racing bulls',
    'aston martin',
    'kick sauber',
    'alpine',
];

// Translate a team name - its index in TEAM_SORT_ORDER
const getTeamSortIndex = (name) => {
    const idx = TEAM_SORT_ORDER.indexOf(name.toLowerCase());
    return idx === -1 ? TEAM_SORT_ORDER.length : idx;
};

export default function DriversPage() {
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTeam, setActiveTeam] = useState('all');
    const [pendingTeam, setPendingTeam] = useState('all');

    useEffect(() => {
        const fetchDrivers = async () => {
            const data = await getDrivers();
            setDrivers(data);
            setIsLoading(false);
        };
        fetchDrivers();
    }, []);

    // Unique team names for the dropdown, alphabetical
    const teamOptions = useMemo(
        () => Array.from(new Set(drivers.map((d) => d.team))).sort(),
        [drivers],
    );

    // Visible driver cards after search & filter, sorted by team then points
    const visibleDrivers = useMemo(() => {
        const trimmedQuery = searchQuery.trim().toLowerCase();

        const matches = drivers.filter((d) => {
            const teamMatch = activeTeam === 'all' || d.team.toLowerCase() === activeTeam;
            const nameMatch =
                trimmedQuery === '' ||
                `${d.firstName} ${d.lastName}`.toLowerCase().includes(trimmedQuery);
            return teamMatch && nameMatch;
        });

        return matches.sort((a, b) => {
            const teamDiff = getTeamSortIndex(a.team) - getTeamSortIndex(b.team);
            return teamDiff !== 0 ? teamDiff : b.points - a.points; // tie-break by points
        });
    }, [drivers, activeTeam, searchQuery]);

    if (isLoading) {
        return (
            <main>
                <p style={{textAlign: 'center'}}>Loading…</p>
            </main>
        );
    }

    const applyDisabled = pendingTeam === activeTeam;

    return (
        <main>
            <header className="page-heading">
                <h2>F1 Drivers 2025</h2>
                <p className="sub">Browse every confirmed driver for the 2025 season</p>
            </header>

            {/* ---------------- Filter ---------------- */}
            <form
                className="driver-filter"
                onSubmit={(e) => {
                    e.preventDefault();
                    setActiveTeam(pendingTeam);
                }}
            >
                {/* free-text search */}
                <div>
                    <label htmlFor="search">Search:</label>
                    <input
                        id="search"
                        type="search"
                        placeholder="e.g. Driver's Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* team dropdown */}
                <div>
                    <label htmlFor="teamSelect">Team:</label>
                    <select
                        id="teamSelect"
                        value={pendingTeam}
                        onChange={(e) => setPendingTeam(e.target.value)}
                    >
                        <option value="all">All</option>
                        {teamOptions.map((team) => (
                            <option key={team} value={team.toLowerCase()}>
                                {team}
                            </option>
                        ))}
                    </select>
                </div>

                {/* apply button */}
                <div>
                    <button
                        type="submit"
                        disabled={applyDisabled}
                        style={applyDisabled ? {opacity: 0.5, cursor: 'not-allowed'} : {}}
                    >
                        Apply
                    </button>
                </div>
            </form>

            {/* ---------------- Drivers grid ---------------- */}
            <section className="drivers-grid">
                {visibleDrivers.map((driver) => (
                    <DriverCard key={driver.id} driver={driver}/>
                ))}
            </section>
        </main>
    );
}