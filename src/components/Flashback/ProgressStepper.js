import React from 'react';
import './ProgressStepper.css';

/**
 * ProgressStepper
 * @param total   number of steps
 * @param current 0-based index of the active step
 */
export default function ProgressStepper({ total, current }) {
    const percent = (current / (total - 1)) * 100;

    return (
        <div
            className="stepper"
            role="progressbar"
            aria-valuenow={current + 1}
            aria-valuemin={1}
            aria-valuemax={total}
        >
            <span
                className="stepper__fill"
                style={{ width: `${percent}%` }}
                aria-hidden
            />

            {Array.from({ length: total }).map((_, i) => (
                <span
                    key={i}
                    className={`stepper__node ${i < current ? 'done' : i === current ? 'active' : ''}`}
                    aria-label={`Step ${i + 1}`}
                />
            ))}
        </div>
    );
}