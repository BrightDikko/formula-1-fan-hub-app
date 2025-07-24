import React, {useLayoutEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import './FlashbackIntro.css';

export const Step = ({index, isOpen, title, body, onToggle}) => {
    const bodyRef = useRef(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if (bodyRef.current) {
            setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div className={`flash-step ${isOpen ? 'open' : ''}`}>
            <button
                className="flash-step-header"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <span className="step-index">{index.toString().padStart(2, '0')}</span>
                <h3>{title}</h3>
                <span className="chevron">▼</span>
            </button>

            <div
                className="flash-step-body"
                style={{maxHeight: height}}
                aria-hidden={!isOpen}
            >
                <div
                    className="flash-step-body-inner"
                    ref={bodyRef}
                    dangerouslySetInnerHTML={{__html: body}}
                />
            </div>
        </div>
    );
};

export default function FlashbackIntro() {
    const [openIndex, setOpenIndex] = useState(0); // first panel open
    const toggle = (i) => setOpenIndex(i === openIndex ? -1 : i);

    return (
        <main className="flash-container">
            <section className="flash-hero">
                <h2>Flashback&nbsp;F1&nbsp;Challenge</h2>
                <p className="tagline">
                    Step into the mind of a strategist, historian, and superfan - all at once. <br/>
                    In <strong>Flashback F1</strong>, you’re dropped into a real Grand Prix from seasons past.<br/>
                    Make your predictions based on only what the world knew before lights-out. <br/>
                    No rewinds. No spoilers. Just memory, instinct, and glory on the line.
                </p>
                <Link to="/flashback/reveal" className="cta-btn">
                    Start Your Round →
                </Link>
            </section>

            <section className="flash-accordion">
                {steps.map((s, i) => (
                    <Step
                        key={i}
                        index={i + 1}
                        title={s.title}
                        body={s.body}
                        isOpen={openIndex === i}
                        onToggle={() => toggle(i)}
                    />
                ))}
            </section>
        </main>
    );
}

export const steps = [
    {
        title: 'Time-Warp Drop',
        body: `
        <ul>
          <li>🏁  A <strong>random Grand Prix</strong> is selected from 70 + seasons.</li>
          <li>🏁  You only see info that existed <em>pre-race</em> - zero spoilers.</li>
          <li>🏁  Think you remember 2011 Silverstone?  Prove it.</li>
        </ul>`
    },
    {
        title: 'Prediction Blitz',
        body: `
        <ul>
          <li>🏁  Eight quick-fire questions: podium, pole, fastest lap &amp; more.</li>
          <li>🏁  Beat the timer-speed means bragging rights.</li>
          <li>🏁  Drop a one-time <em>2× Chip</em> to double points.</li>
        </ul>`
    },
    {
        title: 'History Unfolds',
        body: `
        <ul>
          <li>🏁  Real results appear beside your picks in dramatic fashion.</li>
          <li>🏁  Exact matches earn <strong>double</strong> points.</li>
          <li>🏁  Instant feedback, instant hype.</li>
        </ul>`
    },
    {
        title: 'Global Ranking',
        body: `
        <ul>
          <li>🏁  Scores stored locally for now (cloud sync soon).</li>
          <li>🏁  Earn era badges, track hot streaks.</li>
          <li>🏁  Climb the worldwide top-10.</li>
        </ul>`
    }
];