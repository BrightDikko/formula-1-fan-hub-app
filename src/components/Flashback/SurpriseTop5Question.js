import React from 'react';
import driversData from '../../assets/data/drivers.json';
import './SurpriseTop5Question.css';

export default function SurpriseTop5Question({q, value, disabled, onAnswer}) {
    // helper – returns driver meta
    const lookup = (id) => driversData.find((d) => d.id === id) ?? {firstName: '?', lastName: '', image: '', team: ''};

    const choose = (id) => !disabled && onAnswer(id === value ? null : id);

    return (
        <section className="surprise-wrap">

            <h3 className="q-text"
                dangerouslySetInnerHTML={{__html: "Who will spring a surprise and finish in the top 5"}}/>

            <ul className={`top5-grid top5-grid-${q.options.length}-cols`}>
                {q.options.map((id) => {
                    const d = lookup(id);
                    const sel = id === value;
                    return (
                        <li key={id}>
                            <button
                                className={`top5-card${sel ? ' selected' : ''}`}
                                onClick={() => choose(id)}
                                disabled={disabled}
                            >
                                <img
                                    src={`/images/racers/${d.image}`}
                                    alt={`${d.firstName} ${d.lastName}`}
                                    className="top5-img"
                                />
                                <span className="top5-name">
                  <strong>{d.firstName}</strong> {d.lastName.toUpperCase()}
                </span>
                                <span className="top5-team">{d.team}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>

        </section>
    );
}