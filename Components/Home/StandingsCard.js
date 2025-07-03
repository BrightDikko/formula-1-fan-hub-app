import { html, useMemo } from "https://unpkg.com/htm/preact/standalone.mjs";

const StandingsCard = ({ type, rows, drivers, teams }) => {
  /* ---------- look-up maps ---------- */
  const driverById = useMemo(
    () => Object.fromEntries(drivers.map((driver) => [driver.id, driver])),
    [drivers]
  );

  const teamById = useMemo(
    () => Object.fromEntries(teams.map((team) => [team.id, team])),
    [teams]
  );

  /* ---------- rows to <tr> ---------- */
  const tableRows =
    type === "drivers"
      ? rows.map((standing) => {
          const driver = driverById[standing.driverId] ?? {};
          const team = teamById[driver.teamId] ?? {};

          return html`
            <tr>
              <td>${standing.position}</td>
              <td>${driver.firstName} ${driver.lastName}</td>
              <td>
                <img
                  src="public/images/flags/${driver.code}.jpg"
                  alt=${driver.country}
                  width="24"
                  height="16"
                />
              </td>
              <td>${team.name}</td>
              <td>${standing.points}</td>
            </tr>
          `;
        })
      : rows.map((standing) => {
          const team = teamById[standing.teamId] ?? {};

          return html`
            <tr>
              <td>${standing.position}</td>
              <td>${team.name}</td>
              <td>${standing.points}</td>
            </tr>
          `;
        });

  /* ---------- table headings ---------- */
  const heading =
    type === "drivers" ? "2025 Driver Standings" : "2025 Constructor Standings";

  const headerRow =
    type === "drivers"
      ? html`
          <tr>
            <th>Pos.</th>
            <th>Driver</th>
            <th>Flag</th>
            <th>Team</th>
            <th>Pts.</th>
          </tr>
        `
      : html`
          <tr>
            <th>Pos.</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        `;

  /* ---------- render ---------- */
  return html`
    <section class="card">
      <h2>${heading}</h2>

      <div class="table-wrapper">
        <table>
          <thead>
            ${headerRow}
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </section>
  `;
};

export default StandingsCard;
