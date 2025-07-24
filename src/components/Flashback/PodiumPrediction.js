import React, {useState} from 'react';
import DriverPickerModal from './DriverPickerModal';
import driversData from '../../assets/data/drivers.json';   // same list you already have
import './PodiumPrediction.css';

export default function PodiumPrediction({
                                             q,
                                             value,
                                             disabled,
                                             onAnswer,
                                             renderLbl,
                                         }) {
    const selected = Array.isArray(value) ? value : [];
    const [openSlot, setOpenSlot] = useState(null);

    const setDriverForSlot = (slotIdx, driverId) => {
        const next = [...selected];
        next[slotIdx] = driverId;
        onAnswer(next.slice(0, 3));       // keep at most 3
    };

    const slotContent = (idx) => {
        const id = selected[idx];
        if (id != null) {
            const driver = driversData.find(d => d.id === id);
            if (driver) {
                return (
                    <img
                        src={`/images/racers/${driver.image}`}
                        alt={`${driver.firstName} ${driver.lastName}`}
                        className="podium-driver-img"
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                        }}
                    />
                );
            }
        }
        return <span className="plus">＋</span>;
    };

    const slotCls = (idx) =>
        selected[idx] != null ? 'slot filled' : 'slot';

    return (
        <>
            <section className="podium-wrap">
                <div className="columns">
                    {/* Silver */}
                    <div className="column silver">
                        <button
                            className={slotCls(1)}
                            onClick={() => !disabled && setOpenSlot(1)}
                        >{slotContent(1)}</button>
                        <span className="pos-label">2<sup>nd</sup></span>
                    </div>

                    {/* Gold */}
                    <div className="column gold">
                        <button
                            className={slotCls(0)}
                            onClick={() => !disabled && setOpenSlot(0)}
                        >{slotContent(0)}</button>
                        <span className="pos-label">1<sup>st</sup></span>
                    </div>

                    {/* Bronze */}
                    <div className="column bronze">
                        <button
                            className={slotCls(2)}
                            onClick={() => !disabled && setOpenSlot(2)}
                        >{slotContent(2)}</button>
                        <span className="pos-label">3<sup>rd</sup></span>
                    </div>
                </div>
            </section>

            {/* modal */}
            {openSlot != null && (
                <DriverPickerModal
                    slot={openSlot}
                    drivers={driversData.filter(d => q.options.includes(d.id))}
                    onPick={(id) => setDriverForSlot(openSlot, id)}
                    onClose={() => setOpenSlot(null)}
                    selectedIds={selected}
                />
            )}
        </>
    );
}