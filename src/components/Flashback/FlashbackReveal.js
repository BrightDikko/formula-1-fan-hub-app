// src/components/Flashback/FlashbackReveal.js
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import confetti from 'canvas-confetti';
import {pickRandomRace} from '../../utils/flashbackData';
import bgPattern from '../../assets/images/pattern/background_pattern_4.jpg';
import './FlashbackReveal.css';

export default function FlashbackReveal() {
    const navigate = useNavigate();
    const [race, setRace] = useState(null);     // chosen GP
    const [phase, setPhase] = useState('loading');// loading ▸ reveal
    const [step, setStep] = useState(0);        // 0-3
    const [showFlag, setShowFlag] = useState(false);    // pulsing flag between steps

    useEffect(() => {
        setRace(pickRandomRace());
        const timer = setTimeout(() => setPhase('reveal'), 1_200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (phase === 'reveal' && step > 0 && !showFlag) {
            confetti({particleCount: 220, spread: 80, origin: {y: 0.3}, zIndex: 9_999});
        }
    }, [phase, step, showFlag]);

    const pages = race ? [
        {
            heading: 'Ready to Predict?',
            blurb: 'Click <strong>Reveal Year</strong> to discover where (and when) you just landed.',
            cta: 'Reveal Year →'
        },
        {
            heading: `${race.season}`,
            blurb: 'A season packed with twists, turns &amp; controversy.',
            cta: 'Reveal Grand Prix →'
        },
        {
            heading: race.grandPrix,
            blurb: race.location,
            cta: 'Show Summary →'
        },
        {
            heading: 'Ready to Predict?',
            blurb: `
        <ul class="summary">
          <li>🏁 <strong>${race.season}</strong></li>
          <li>📍 <strong>${race.grandPrix}</strong></li>
          <li>🗓 ${new Date(race.date).toLocaleDateString()}</li>
          <li>🗺 ${race.track.lengthKm} km • ${race.track.laps} laps</li>
        </ul>
        Let’s see how well you remember this race. No pressure 😉
      `,
            cta: 'Start Your Round →',
            final: true
        }
    ] : [];

    const current = pages[step] || {};

    const FLAG_MS = 600;
    const pulseThen = (fn) => {
        setShowFlag(true);
        setTimeout(() => {
            setShowFlag(false);
            fn();
        }, FLAG_MS);
    };

    const next = () => {
        if (current.final) {
            navigate(`/flashback/play/${race.raceId}`, {state: {race}});
        } else {
            pulseThen(() => setStep(s => s + 1));
        }
    };
    const prev = () => {
        if (step === 0) return;
        pulseThen(() => setStep(s => s - 1));
    };

    return (
        <div className="reveal-wrapper" style={{backgroundImage: `url(${bgPattern})`}}>
            {phase === 'loading' && (
                <span className="loading-flag" role="img" aria-label="F1 flag">🏁</span>
            )}

            {phase === 'reveal' && (
                <>
                    {showFlag && (
                        <span className="inner-flag" role="img" aria-label="F1 flag">🏁</span>
                    )}

                    {!showFlag && (
                        <article className="reveal-card text-mode">
                            <h2 className="step-heading">{current.heading}</h2>
                            <p
                                className="step-blurb"
                                dangerouslySetInnerHTML={{__html: current.blurb}}
                            />
                            <div className="step-nav">
                                <button
                                    className="nav-btn"
                                    onClick={prev}
                                    disabled={step === 0}
                                    aria-label="Previous"
                                >
                                    ←
                                </button>
                                <button
                                    className="nav-btn primary"
                                    onClick={next}
                                    aria-label="Next"
                                >
                                    {current.cta}
                                </button>
                            </div>
                        </article>
                    )}
                </>
            )}
        </div>
    );
}