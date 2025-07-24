import React, { useEffect } from 'react';
import { createPortal }     from 'react-dom';
import './DriverPickerModal.css';

export default function DriverPickerModal({ drivers, slot, onPick, onClose, selectedIds = [] }) {
    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const root = document.getElementById('modal-root') ?? document.body;

    const posLabel = ['1st', '2nd', '3rd'][slot];
    const isFilled = selectedIds[slot] != null;

    return createPortal(
        <div className="dp-backdrop" onClick={onClose}>
            <div className="dp-modal" onClick={(e) => e.stopPropagation()}>
                <header className="dp-head">
                    <h3>Choose {posLabel}</h3>
                    <button className="dp-close" onClick={onClose} aria-label="Close">✕</button>
                </header>

                <div className={`dp-slots slot-${slot}`}>
                    <div className={`dp-slot${isFilled ? ' filled' : ''}`}>{posLabel}</div>
                </div>

                <ul className="dp-list">
                    {drivers.map((d) => {
                        const isSelected = selectedIds.includes(d.id);

                        const currentSlotDriver = selectedIds[slot] === d.id;
                        const disabled = isSelected && !currentSlotDriver;
                        return (
                            <li key={d.id} className={`dp-row${disabled ? ' dp-row-disabled' : ''}`}>
                                <div className="dp-driver">
                                    <img src={`/images/racers/${d.image}`} alt="" className="dp-avatar"/>
                                    <div>
                                        <strong>{d.firstName} {d.lastName.toUpperCase()}</strong>
                                        <span className="dp-team">{d.team}</span>
                                    </div>
                                </div>
                                <span className="dp-points">{d.points} pts</span>
                                {disabled ? (
                                    <span className="dp-selected-tag">Selected</span>
                                ) : (
                                    <button
                                        className="dp-add"
                                        aria-label={`Pick ${d.lastName}`}
                                        onClick={() => { onPick(d.id); onClose(); }}
                                    >＋</button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>,
        root
    );
}