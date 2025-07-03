import React, {useState, useEffect, useMemo} from 'react';
import {getTeams} from '../../services/F1';
import TeamRow from './TeamRow';

// Country filter options for drop-down
const COUNTRY_OPTIONS = [
    'United Kingdom',
    'Germany',
    'Italy',
    'Austria',
    'United States',
    'Switzerland',
    'France',
];

export default function TeamsPage() {
    const [allTeams, setAllTeams] = useState([]);   // full dataset
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');   // immediate search box value
    const [activeCountry, setActiveCountry] = useState('all'); // filter currently applied
    const [pendingCountry, setPendingCountry] = useState('all'); // select box value

    useEffect(() => {
        getTeams().then((teams) => {
            setAllTeams(teams);
            setIsLoading(false);
        });
    }, []);

    const filteredTeams = useMemo(() => {
        return allTeams.filter((team) => {
            const matchesCountry =
                activeCountry === 'all' ||
                team.country.toLowerCase() === activeCountry.toLowerCase();

            const matchesSearch =
                searchTerm.trim() === '' ||
                team.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

            return matchesCountry && matchesSearch;
        });
    }, [allTeams, activeCountry, searchTerm]);

    if (isLoading) {
        return (
            <main>
                <p style={{textAlign: 'center'}}>Loading…</p>
            </main>
        );
    }

    const applyDisabled = pendingCountry === activeCountry;

    return (
        <main>
            <header className="page-heading">
                <h2>F1 Teams 2025</h2>
                <p className="sub">Explore every constructor on the 2025 grid</p>
            </header>

            {/* Filter form */}
            <form
                className="driver-filter"
                onSubmit={(e) => {
                    e.preventDefault();
                    setActiveCountry(pendingCountry);
                }}
            >
                {/* free-text search */}
                <div>
                    <label htmlFor="teamSearch">Search:</label>
                    <input
                        id="teamSearch"
                        type="search"
                        placeholder="e.g. Ferrari"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* country dropdown */}
                <div>
                    <label htmlFor="countrySelect">Country:</label>
                    <select
                        id="countrySelect"
                        value={pendingCountry}
                        onChange={(e) => setPendingCountry(e.target.value)}
                    >
                        <option value="all">All</option>
                        {COUNTRY_OPTIONS.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* apply button */}
                <div>
                    <button
                        type="submit"
                        disabled={applyDisabled}
                        style={
                            applyDisabled
                                ? {opacity: 0.5, cursor: 'not-allowed'}
                                : undefined
                        }
                    >
                        Apply
                    </button>
                </div>
            </form>

            {/* Results table */}
            <section className="card">
                <h2>Teams</h2>
                <div className="table-wrapper">
                    <table className="teams-table">
                        <thead>
                        <tr>
                            <th>Insignia</th>
                            <th>Team</th>
                            <th>Driver</th>
                            <th>Driver</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTeams.map((team) => (
                            <TeamRow key={team.id} team={team}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}