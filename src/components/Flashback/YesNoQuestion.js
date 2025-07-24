// src/components/Flashback/YesNoQuestion.jsx
import React from 'react';
import './YesNoQuestion.css';

export default function YesNoQuestion({q, value, disabled, onAnswer}) {
    const handle = (opt) => {
        if (disabled || value === opt) return;
        onAnswer(opt);
    };

    return (
        <section className="yn-wrap">
            <div className="yn-btns" role="radiogroup" aria-labelledby={`q-${q.id}`}>
                {['yes', 'no'].map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        className={`yn-btn ${opt === value ? 'selected' : ''}`}
                        onClick={() => handle(opt)}
                        disabled={disabled}
                        aria-pressed={opt === value}
                    >
                        {opt.toUpperCase()}
                    </button>
                ))}
            </div>
        </section>
    );
}