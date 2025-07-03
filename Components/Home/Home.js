import {
  html,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.mjs";

import StandingsToggle from "./StandingsToggle.js";
import StandingsCard from "./StandingsCard.js";
import { getStandings, getDrivers, getTeams } from "../../Services/F1.js";

const Home = () => {
  /* ---------- data ---------- */
  const [standingsData, setStandingsData] = useState(null);
  const [driverList, setDriverList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------- UI state ---------- */
  const [currentView, setCurrentView] = useState("drivers"); // 'drivers' | 'teams'

  /* Fetch all JSON files in parallel on first mount */
  useEffect(() => {
    Promise.all([getStandings(), getDrivers(), getTeams()]).then(
      ([standingsResponse, driversResponse, teamsResponse]) => {
        setStandingsData(standingsResponse);
        setDriverList(driversResponse);
        setTeamList(teamsResponse);
        setIsLoading(false);
      }
    );
  }, []);

  /* ---------- render ---------- */
  if (isLoading) {
    return html`<main><p style="text-align:center;">Loading…</p></main>`;
  }

  const tableRows =
    currentView === "drivers"
      ? standingsData.driverStandings
      : standingsData.constructorStandings;

  return html`
    <main>
      <header class="page-heading">
        <h2>F1 Drivers 2025</h2>
        <p class="sub">Browse every confirmed driver for the 2025 season</p>
      </header>

      <!-- DRIVERS / TEAMS TOGGLE -->
      <${StandingsToggle} view=${currentView} setView=${setCurrentView} />

      <!-- STANDINGS CARD -->
      <${StandingsCard}
        type=${currentView}
        rows=${tableRows}
        drivers=${driverList}
        teams=${teamList}
      />
    </main>
  `;
};

export default Home;
