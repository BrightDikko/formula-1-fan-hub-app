import React from 'react';
import drivers from '../../assets/data/drivers.json';
import './DnfPrediction.css';


export default function DnfPrediction({q, value, disabled, onAnswer}) {
    const selected = Array.isArray(value) ? value : [];

    const toggle = (id) => {
        if (disabled) return;
        const next = selected.includes(id)
            ? selected.filter((d) => d !== id)
            : [...selected, id];
        onAnswer(next);
    };

    const roster = q.options
        .map((id) => drivers.find((d) => d.id === id))
        .filter(Boolean);

    return (
        <section className="dnf-wrap">
            <h3 className="q-text">Select <strong>all</strong> drivers you think will DNF.</h3>

            <ul className="dnf-grid">
                {roster.map((d) => {
                    const isSel = selected.includes(d.id);
                    return (
                        <li key={d.id}>
                            <button
                                type="button"
                                className={`dnf-card ${isSel ? 'selected' : ''}`}
                                onClick={() => toggle(d.id)}
                                disabled={disabled}
                                aria-pressed={isSel}
                            >
                                <img
                                    src={`/images/racers/${d.image}`}
                                    alt={`${d.firstName} ${d.lastName}`}
                                    className="dnf-img"
                                    loading="lazy"
                                />
                                <span className="dnf-name">
                  {d.firstName} <strong>{d.lastName.toUpperCase()}</strong>
                </span>
                                <span className="dnf-team">{d.team}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}