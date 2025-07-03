import { html } from "https://unpkg.com/htm/preact/standalone.mjs";

/* Maps a team (lower-case) to its colour-theme CSS class */
const TEAM_COLOR_CLASS_MAP = {
  "red bull racing": "team-redbull",
  "racing bulls": "team-bulls",
  "aston martin": "team-aston",
  "kick sauber": "team-kick",
  mclaren: "team-mclaren",
  mercedes: "team-mercedes",
  ferrari: "team-ferrari",
  williams: "team-williams",
  haas: "team-haas",
  alpine: "team-alpine",
};

/* Prevent anchors from navigating for now */
const preventNavigation = (event) => event.preventDefault();

const DriverCard = ({ driver }) => html`
  <a
    class="driver-card ${TEAM_COLOR_CLASS_MAP[driver.team.toLowerCase()]}"
    href="#"
    onClick=${preventNavigation}
    aria-label="${driver.firstName} ${driver.lastName}"
  >
    <img
      class="driver-photo"
      src="public/images/racers/${driver.image}"
      alt=""
    />
    <div class="info">
      <h3>${driver.firstName} ${driver.lastName}</h3>
      <p class="team">${driver.team}</p>
      <span class="number">${driver.number}</span>
      <img
        class="flag flag-margin-left"
        src="public/images/flags/${driver.code}.jpg"
        alt="${driver.country}"
      />
    </div>
  </a>
`;

export default DriverCard;
