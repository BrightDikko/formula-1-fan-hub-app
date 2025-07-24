import data from '../assets/data/questions.json';

export function loadRaceById(id) {
    for (const year of Object.keys(data)) {
        const found = data[year].find(r => r.raceId === id);
        if (found) return found;
    }
    return null;
}

export function pickRandomRace() {
    const years = Object.keys(data);
    const yearSel = years[Math.floor(Math.random() * years.length)];
    const races = data[yearSel];
    return races[Math.floor(Math.random() * races.length)];
}

export function scoreFlashbackAnswers(race, answers) {
    if (!race || !race.questions) return {total: 0, breakdown: []};
    const breakdown = race.questions.map(q => {
        const userAnswer = answers[q.id];
        const correctAnswer = q.correctAnswer;
        const points = q.points || 0;
        let earned = 0;
        switch (q.type) {
            case 'podium_prediction':
                if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
                    const correctSet = new Set(correctAnswer);
                    const userSet = new Set(userAnswer);
                    const matches = correctAnswer.filter(id => userSet.has(id)).length;
                    if (matches === correctAnswer.length && userAnswer.length === correctAnswer.length && userAnswer.every((id, i) => id === correctAnswer[i])) {
                        earned = points * 2;
                    } else {
                        earned = Math.round(points * (matches / correctAnswer.length));
                    }
                }
                break;
            case 'dnf_prediction':
                if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
                    const correctSet = new Set(correctAnswer);
                    const userSet = new Set(userAnswer);
                    const correctPicks = userAnswer.filter(id => correctSet.has(id)).length;
                    const wrongPicks = userAnswer.filter(id => !correctSet.has(id)).length;
                    const missed = correctAnswer.filter(id => !userSet.has(id)).length;
                    earned = Math.max(0, correctPicks * (points / correctAnswer.length) - wrongPicks * (points / (2 * correctAnswer.length)));
                    earned = Math.round(earned);
                }
                break;
            case 'surprise_top5':
                if (userAnswer && Array.isArray(correctAnswer)) {
                    earned = correctAnswer.includes(userAnswer) ? points : 0;
                }
                break;
            case 'pole_position':
            case 'fastest_lap':
            case 'driver_vs_driver':
            case 'team_vs_team':
                earned = userAnswer === correctAnswer ? points : 0;
                break;
            case 'safety_car':
                earned = userAnswer === correctAnswer ? points : 0;
                break;
            default:
                earned = userAnswer === correctAnswer ? points : 0;
        }
        return {
            qid: q.id,
            type: q.type,
            text: q.text,
            userAnswer,
            correctAnswer,
            points,
            earned
        };
    });
    const total = breakdown.reduce((sum, q) => sum + q.earned, 0);
    return {total, breakdown};
}