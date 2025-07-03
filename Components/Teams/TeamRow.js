import { html } from "https://unpkg.com/htm/preact/standalone.mjs";

const preventNavigation = (event) => event.preventDefault();

const TeamRow = ({ team }) => html`
  <tr>
    <!-- Insignia / logo -->
    <td>
      <a class="row-link" href="#" onClick=${preventNavigation}>
        <img
          class="team-logo"
          src="public/images/teams/${team.logo}"
          alt="${team.name}"
        />
      </a>
    </td>

    <!-- Team name -->
    <td>
      <a class="row-link" href="#" onClick=${preventNavigation}>
        ${team.name}
      </a>
    </td>

    <!-- Driver columns (render nothing if fewer than two) -->
    <td>
      ${team.drivers[0]
        ? html`<a class="row-link" href="#" onClick=${preventNavigation}>
            ${team.drivers[0]}
          </a>`
        : ""}
    </td>
    <td>
      ${team.drivers[1]
        ? html`<a class="row-link" href="#" onClick=${preventNavigation}>
            ${team.drivers[1]}
          </a>`
        : ""}
    </td>
  </tr>
`;

export default TeamRow;
