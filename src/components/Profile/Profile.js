import React, {useEffect, useState} from 'react';
import {useAuth} from '../Auth/AuthContext';
import {fetchLastScores} from '../../services/parseGameScores';
import drivers from '../../assets/data/drivers.json';
import './Profile.css';

const dName = (id) =>
    drivers.find(d => d.id === id)?.lastName?.toUpperCase?.() ?? id;


export default function Profile() {
    const {user: authUser} = useAuth();
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState(null);
    const [open, setOpen] = useState({personal: true, stats: true});

    useEffect(() => {
        (async () => {
            if (authUser) {
                try {
                    setUser(await authUser.fetch());
                } catch (e) {
                    console.error('User fetch', e);
                    setUser(authUser);
                }
            }
            try {
                setScores(await fetchLastScores(5));
            } catch (e) {
                console.error('Scores fetch', e);
                setScores([]);
            }
        })();
    }, [authUser]);

    if (!user || scores === null) {
        return (
            <main className="profile-bg">
                <p className="profile-loading">Loading profile…</p>
            </main>
        );
    }

    const personalInfo = {
        name: user.get('name') ?? user.getUsername?.() ?? '—',
        country: user.get('country') ?? 'United States of America',
        email: user.getEmail?.() ?? '—',
        password: '••••••••••••',
    };

    const favDriversIds = user.get('favDrivers') ?? FALLBACK_STATS.favouriteDrivers;
    const favouriteDrivers =
        Array.isArray(favDriversIds) && favDriversIds.length
            ? favDriversIds.map(dName).join(' · ')
            : FALLBACK_STATS.favouriteDrivers.join(' · ');

    const favouriteTeam = user.get('favTeam') ?? FALLBACK_STATS.favouriteTeam;

    const highScore = scores.length
        ? Math.max(...scores.map(s => s.score))
        : '—';

    const lastFive = scores.length
        ? scores.map(s => s.score).join(' · ')
        : '—';

    const toggle = key => setOpen(o => ({...o, [key]: !o[key]}));

    return (
        <main className="profile-bg">

            {/* PERSONAL INFORMATION */}
            <section className="accordion">
                <header className="acc-head" onClick={() => toggle('personal')}>
                    <h2>PERSONAL INFORMATION</h2>
                    <span className={`acc-arrow ${open.personal ? 'open' : ''}`}/>
                </header>

                {open.personal && (
                    <div className="acc-body">
                        {Object.entries(personalInfo).map(([k, v]) => (
                            <div key={k} className="row">
                                <div className="fld">
                  <span className="label">
                    {k === 'country'
                        ? 'Country of residence'
                        : k.charAt(0).toUpperCase() + k.slice(1)}
                  </span>
                                    <span className="value">{v}</span>
                                </div>
                                <button className="edit" onClick={() => alert('Edit coming soon')}>Edit</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* FAN-HUB STATS */}
            <section className="accordion">
                <header className="acc-head" onClick={() => toggle('stats')}>
                    <h2>FAN HUB STATS</h2>
                    <span className={`acc-arrow ${open.stats ? 'open' : ''}`}/>
                </header>

                {open.stats && (
                    <div className="acc-body">
                        <div className="row">
                            <div className="fld">
                                <span className="label">Highest Flashback Score</span>
                                <span className="value">{highScore}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="fld">
                                <span className="label">Last 5 Rounds</span>
                                <span className="value">{lastFive}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="fld">
                                <span className="label">Favourite Driver(s)</span>
                                <span className="value">{favouriteDrivers}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="fld">
                                <span className="label">Team of Choice</span>
                                <span className="value">{favouriteTeam}</span>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

const FALLBACK_STATS = {
    favouriteDrivers: ['Lando Norris', 'Charles Leclerc'],
    favouriteTeam: 'Ferrari',
};