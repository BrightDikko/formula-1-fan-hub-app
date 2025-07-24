import React, {useEffect, useState} from 'react';

export default function TimerBar({duration = 30, onExpire, paused = false}) {
    const [t, setT] = useState(duration);

    useEffect(() => {
        if (paused) return;
        if (t === 0) {
            onExpire();
            return;
        }

        const id = setInterval(() => setT(s => s - 1), 1000);
        return () => clearInterval(id);
    }, [t, paused, onExpire]);

    return (
        <div className="timer-bar">
            <div className="fill" style={{width: `${(t / duration) * 100}%`}}/>
        </div>
    );
}