// src/components/Flashback/PlayRound.js
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {loadRaceById} from '../../utils/flashbackData';
import TimerBar from './TimerBar';
import QuestionRenderer from './QuestionRenderer';
import './FlashbackPlay.css';
import ProgressStepper from "./ProgressStepper";

export default function PlayRound() {
    const navigate = useNavigate();
    const {raceId} = useParams();
    const {state} = useLocation();

    const [race, setRace] = useState(state?.race ?? null);
    const [idx, setIdx] = useState(0);
    const [answers, setAns] = useState({});
    const [timeUp, setTimeUp] = useState(false);

    /* hydrate race if user refreshed on play page */
    useEffect(() => {
        if (!race) setRace(loadRaceById(raceId));
    }, [race, raceId]);

    if (!race) {
        return (
            <div className="flashback-play loading">
                <span className="loading-flag" role="img" aria-label="F1 flag">🏁</span>
            </div>
        );
    }

    const qTotal = race.questions.length;
    const question = race.questions[idx];
    const answered = answers.hasOwnProperty(question.id);
    const isLast = idx === qTotal - 1;

    const pills = race.questions.map((_, i) =>
        i < idx ? 'done' : i === idx ? 'active' : ''
    );

    const recordAnswer = val =>
        setAns(prev => ({...prev, [question.id]: val}));

    const handleTimeout = () => setTimeUp(true);

    const advance = () => {
        if (!answered && !timeUp) return;
        if (isLast) {
            navigate('/flashback/score', {state: {race, answers}});
        } else {
            setIdx(i => i + 1);
            setTimeUp(false);
        }
    };

    const skip = () => {
        recordAnswer(null);
        advance();
    };
    const goPrev = () => {
        if (idx) setIdx(i => i - 1);
    };

    return (
        <div className="flashback-game-bg">
            {/* Sticky black header */}
            <header className="flashback-header">
                <button className="header-back" onClick={() => navigate(-1)} aria-label="Back">
                    ←
                </button>
                <div className="header-gp-meta">
                    {/* TODO: Replace with flag asset if available */}
                    <span className="gp-flag" role="img" aria-label="flag">🏁</span>
                    <span className="gp-name">{race.grandPrix}</span>
                </div>
                <div className="header-timer">
                    <TimerBar
                        key={question.id}
                        duration={30}
                        onExpire={handleTimeout}
                        paused={answered}
                        digital
                    />
                </div>
            </header>

            <main className="flashback-play-card">
                <div className="play-card-inner">
                    {/* Question number */}
                    <div className="play-qnum">Q{String(idx + 1)}</div>

                    {/* Question text */}
                    <div className="play-qtext">
                        <strong>{question.text}</strong>
                        {question.subtext && (
                            <div className="play-qsub">{question.subtext}</div>
                        )}
                    </div>

                    {/* Question body (podium/answer area) */}
                    <div className="play-qbody">
                        <QuestionRenderer
                            q={question}
                            value={answers[question.id] ?? null}
                            disabled={timeUp}
                            onAnswer={recordAnswer}
                            gameStyle
                        />
                    </div>
                </div>
            </main>


            {/* Footer */}
            <footer className="play-footer-container">

                {/* Progress tracker */}
                <ProgressStepper total={qTotal} current={idx}/>

                {/* Controls */}
                <div className="play-footer-nav">
                    <button className="footer-btn ghost pill" onClick={goPrev} disabled={!idx}>
                        ← Previous
                    </button>
                    <button className="footer-btn ghost" onClick={skip} disabled={answered || timeUp}>
                        Skip
                    </button>
                    <button
                        className="footer-btn primary pill"
                        onClick={advance}
                        disabled={!answered && !timeUp}
                    >
                        {isLast ? 'Submit Round →' : 'Next →'}
                    </button>
                </div>
            </footer>
        </div>
    );
}