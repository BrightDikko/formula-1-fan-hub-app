import React from 'react';

// Inline banner displayed above auth forms.
// Accepts a `type` prop ('error' / 'success') to adjust styling.
// Renders nothing when there is no message to show.
export default function FormMessage({ type = 'error', children }) {
    if (!children) return null;

    return (
        <div className={`form-msg ${type}`}>
            {children}
        </div>
    );
}