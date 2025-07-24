import React from 'react';
import drivers from '../../assets/data/drivers.json';
import './SingleChoiceQuestion.css';

export default function SingleChoiceQuestion({q, value, disabled, onAnswer}) {
    const driverById = (id) => drivers.find((d) => d.id === id) || null;

    const choose = (id) => {
        if (disabled) return;
        onAnswer(id === value ? null : id);
    };

    return (
        <section className="scq-wrap">
            {/* columns auto-adapt to #options (2-4) */}
            <ul
                className={`scq-grid scq-${q.options.length}-cols`}
                role="radiogroup"
                aria-label="Answer choices"
            >
                {q.options.map((id) => {
                    const d = driverById(id);
                    const selected = id === value;
                    const cls =
                        'scq-btn' +
                        (selected ? ' selected' : '') +
                        (disabled ? ' disabled' : '');

                    return (
                        <li key={id}>
                            <button
                                type="button"
                                className={cls}
                                role="radio"
                                aria-checked={selected}
                                disabled={disabled}
                                onClick={() => choose(id)}
                            >
                                {d ? (
                                    <>
                                        <img
                                            src={`/images/racers/${d.image}`}
                                            alt={`${d.firstName} ${d.lastName}`}
                                            className="scq-avatar"
                                        />
                                        <span className="scq-name">
                      {d.lastName.toUpperCase()}
                    </span>
                                        <span className="scq-team">{d.team}</span>
                                    </>
                                ) : (
                                    <span className="scq-name">{id}</span>
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}