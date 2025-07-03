import React from 'react';

// Map a constructor name to CSS helper class used for its colour theme.
const TEAM_CSS_CLASS = {
    'red bull racing': 'team-redbull',
    'racing bulls': 'team-bulls',
    'aston martin': 'team-aston',
    'kick sauber': 'team-kick',
    mclaren: 'team-mclaren',
    mercedes: 'team-mercedes',
    ferrari: 'team-ferrari',
    williams: 'team-williams',
    haas: 'team-haas',
    alpine: 'team-alpine',
};

// Semi-transparent pattern that overlays every driver card.
const backgroundPatternStyle = {
    position: 'absolute',
    inset: 0,
    background:
        'url("/images/pattern/background_pattern.webp") center/350px repeat',
    opacity: 0.5,
    mixBlendMode: 'overlay',
    zIndex: 0,
};

export default function DriverCard({driver}) {
    const handleLinkClick = (e) => e.preventDefault();

    const {
        firstName,
        lastName,
        team,
        number,
        image,
        code,
        country,
    } = driver;

    const teamClass = TEAM_CSS_CLASS[team.toLowerCase()] ?? '';

    return (
        <a
            className={`driver-card ${teamClass}`}
            href="#/"
            onClick={handleLinkClick}
            aria-label={`${firstName} ${lastName}`}
        >
            {/* overlay pattern */}
            <span style={backgroundPatternStyle}/>

            {/* driver photo (bottom-right, absolutely positioned via CSS) */}
            <img
                className="driver-photo"
                src={`/images/racers/${image}`}
                alt=""
            />

            {/* text / stats block */}
            <div className="info">
                <h3>
                    {firstName} {lastName}
                </h3>
                <p className="team">{team}</p>
                <span className="number">{number}</span>
                <img
                    className="flag flag-margin-left"
                    src={`/images/flags/${code}.jpg`}
                    alt={country}
                />
            </div>
        </a>
    );
}