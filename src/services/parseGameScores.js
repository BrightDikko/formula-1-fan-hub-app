import Parse from 'parse';

let _lastSig = '';

export async function saveGameScore(score) {
    const user = Parse.User.current();
    const userId = user?.id ?? 'anon';

    const bucket = Math.floor(Date.now() / 1000);
    const sig = `${userId}-${score}-${bucket}`;

    if (process.env.NODE_ENV === 'development' && sig === _lastSig) return;
    _lastSig = sig;

    const row = new Parse.Object('GameScore');
    row.set('score', score);
    if (user) row.set('user', user);

    await row.save();
}


export async function fetchLastScores(limit = 5) {
    const user = Parse.User.current();
    if (!user) return [];

    const query = new Parse.Query('GameScore')
        .equalTo('user', user)
        .descending('createdAt')
        .limit(limit * 3);

    const rows = await query.find();
    const seen = new Set();
    const unique = [];

    for (const r of rows) {
        const sc = r.get('score');
        if (seen.has(sc)) continue;
        seen.add(sc);

        unique.push({
            id: r.id,
            score: sc,
            date: r.createdAt,
        });
        if (unique.length === limit) break;
    }
    return unique;
}