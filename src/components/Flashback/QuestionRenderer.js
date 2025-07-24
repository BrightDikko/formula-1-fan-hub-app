/* ========================================================== *
 * QuestionRenderer – minimal templates per type              *
 * ========================================================== */

/* ---------------------------------------------------------- *
 * renderLabel – maps IDs to human-readable names             *
 * (simple placeholder – extend with driver/team helpers)     *
 * ---------------------------------------------------------- */
import PodiumPrediction from "./PodiumPrediction";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import YesNoQuestion from "./YesNoQuestion";
import DnfPrediction from "./DnfPrediction";
import SurpriseTop5Question from "./SurpriseTop5Question";

function renderLabel(idOrCode) {
    // For now just echo; later you can look up driver / team info here.
    return idOrCode;
}

function QuestionRenderer({q, value, onAnswer, disabled}) {
    if (!q) return null;

    const clickOpt = (opt) => !disabled && onAnswer(opt);

    switch (q.type) {
        case 'pole_position':
        case 'fastest_lap':
        case 'driver_vs_driver':
        case 'team_vs_team':
            return (
                <SingleChoiceQuestion
                    q={q}
                    value={value}
                    disabled={disabled}
                    onAnswer={onAnswer}
                    renderLbl={renderLabel}    // <- your helper
                />
            );

        case 'safety_car':
            return (
                <YesNoQuestion
                    q={q}
                    value={value}
                    disabled={disabled}
                    onAnswer={onAnswer}
                />
            );

        case 'podium_prediction':
            return (
                <PodiumPrediction
                    q={q}
                    value={value}
                    disabled={disabled}
                    onAnswer={onAnswer}
                    renderLbl={renderLabel}   /* ← your existing helper */
                />
            );

        case 'dnf_prediction':
            return (
                <DnfPrediction
                    q={q}
                    value={value}
                    disabled={disabled}
                    onAnswer={onAnswer}
                />
            );

        case 'surprise_top5':
            return (
                <SurpriseTop5Question
                    q={q}
                    value={value}
                    disabled={disabled}
                    onAnswer={onAnswer}
                />
            );


        default:
            return <p>Unsupported question type: {q.type}</p>;
    }
}

export default QuestionRenderer;