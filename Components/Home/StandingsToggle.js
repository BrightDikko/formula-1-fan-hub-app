import { html } from "https://unpkg.com/htm/preact/standalone.mjs";

const StandingsToggle = ({ view, setView }) => html`
  <div class="standings-toggle">
    <a
      class="tab ${view === "drivers" ? "active" : ""}"
      href="javascript:void(0)"
      onClick=${() => setView("drivers")}
      >Driver Standings</a
    >
    <a
      class="tab ${view === "constructors" ? "active" : ""}"
      href="javascript:void(0)"
      onClick=${() => setView("constructors")}
      >Constructor Standings</a
    >
  </div>
`;

export default StandingsToggle;
