import {useLocation, useNavigate} from 'react-router-dom';
import {scoreFlashbackAnswers} from '../../utils/flashbackData';
import drivers from '../../assets/data/drivers.json';
import './FlashbackPlay.css';
import bgPattern from '../../assets/images/pattern/background_pattern_4.jpg';
import {saveGameScore} from "../../services/parseGameScores";
import {useEffect} from "react";

function getDriverMeta(id) {
    return drivers.find(d => d.id === id);
}

function renderAnswer(type, answer) {
    if (answer == null) return <span className="answer-missing">No answer</span>;
    if (Array.isArray(answer)) {
        return answer.length === 0 ? <span className="answer-missing">No answer</span> : answer.map((id) => (
            <span key={id}>{renderAnswer(type, id)}</span>
        ));
    }
    if (typeof answer === 'number') {
        const d = getDriverMeta(answer);
        return d ? (
            <span className="answer-driver">
                <img src={`/images/racers/${d.image}`} alt={d.lastName} className="answer-img"/>
                {d.firstName} {d.lastName}
            </span>
        ) : <span>{answer}</span>;
    }
    if (typeof answer === 'string') {
        return <span className="answer-string">{answer.toUpperCase()}</span>;
    }
    return <span>{String(answer)}</span>;
}

export default function Score() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const {race, answers} = state;
    const {total, breakdown} = scoreFlashbackAnswers(race, answers);

    useEffect(() => {
        saveGameScore(total).catch(console.error);
    }, [total]);

    if (!state || !state.race || !state.answers) {
        return <div className="flashback-play loading"><h2>Missing results data.</h2>
            <button onClick={() => navigate('/flashback')}>Back to Flashback</button>
        </div>;
    }

    return (
        <div className="reveal-wrapper results-bg" style={{backgroundImage: `url(${bgPattern})`}}>
            <main className="reveal-card results-card">
                <h1 className="score-title">Your Flashback Results</h1>
                <div className="score-summary">
                    <span className="score-total">Total Score: <strong>{total}</strong></span>
                    <span
                        className="score-max">/ {breakdown.reduce((sum, q) => sum + q.points * (q.type === 'podium_prediction' ? 2 : 1), 0)}</span>
                </div>
                <div className="score-breakdown">
                    {breakdown.map(q => (
                        <div key={q.qid} className="score-question">
                            <div className="score-qtext"><strong>{q.text}</strong></div>
                            <div className="score-answers-v2">
                                <div className="score-answer-block">
                                    <div className="score-label">Your answer:</div>
                                    <div className="score-answer-chips">{renderAnswer(q.type, q.userAnswer)}</div>
                                </div>
                                <div className="score-divider"/>
                                <div className="score-answer-block">
                                    <div className="score-label">Correct:</div>
                                    <div className="score-answer-chips">{renderAnswer(q.type, q.correctAnswer)}</div>
                                </div>
                            </div>
                            <div className="score-points">
                                <span className="score-label">Points:</span>
                                <strong>{q.earned}</strong> / {q.type === 'podium_prediction' ? q.points * 2 : q.points}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="footer-btn primary pill" style={{marginTop: '2rem'}}
                        onClick={() => navigate('/flashback')}>Play Again
                </button>
                <button className="footer-btn ghost pill" style={{marginTop: '1rem'}}
                        onClick={() => navigate('/profile')}>Go to Profile
                </button>
            </main>
        </div>
    );
}