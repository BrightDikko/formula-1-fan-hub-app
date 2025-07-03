import {
  html,
  useState,
  useEffect,
  useMemo,
} from "https://unpkg.com/htm/preact/standalone.mjs";

import { getDrivers } from "../../Services/F1.js";
import DriverCard from "./DriverCard.js";

/* Fixed sequence that controls grid ordering */
const TEAM_DISPLAY_ORDER = [
  "mclaren",
  "mercedes",
  "red bull racing",
  "ferrari",
  "williams",
  "haas",
  "racing bulls",
  "aston martin",
  "kick sauber",
  "alpine",
];

/** Return numeric index used for stable team-order sorting */
const getTeamOrderIndex = (teamName) => {
  const idx = TEAM_DISPLAY_ORDER.indexOf(teamName.toLowerCase());
  return idx === -1 ? TEAM_DISPLAY_ORDER.length : idx;
};

const DriversPage = () => {
  /* ---------- data ---------- */
  const [allDrivers, setAllDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDrivers().then((data) => {
      setAllDrivers(data);
      setIsLoading(false);
    });
  }, []);

  /* ---------- UI state ---------- */
  const [searchTerm, setSearchTerm] = useState("");

  const [activeTeam, setActiveTeam] = useState("all"); // filter in effect
  const [pendingTeam, setPendingTeam] = useState("all"); // current dropdown

  const isApplyDisabled = pendingTeam === activeTeam;

  /* Apply button handler */
  const handleApply = (e) => {
    e.preventDefault();
    setActiveTeam(pendingTeam);
  };

  /* Unique team names for the dropdown (sorted A-Z) */
  const teamList = useMemo(() => {
    return Array.from(new Set(allDrivers.map((d) => d.team))).sort();
  }, [allDrivers]);

  /* ---------- derived grid ---------- */
  const visibleDrivers = useMemo(() => {
    // (1) filter
    const matches = allDrivers.filter((d) => {
      const matchesTeam =
        activeTeam === "all" || d.team.toLowerCase() === activeTeam;
      const matchesSearch =
        searchTerm.trim() === "" ||
        `${d.firstName} ${d.lastName}`
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
      return matchesTeam && matchesSearch;
    });

    // (2) sort (team order -> points desc)
    return matches.sort((a, b) => {
      const teamDiff = getTeamOrderIndex(a.team) - getTeamOrderIndex(b.team);
      return teamDiff !== 0 ? teamDiff : b.points - a.points;
    });
  }, [allDrivers, searchTerm, activeTeam]);

  /* ---------- render ---------- */
  if (isLoading) {
    return html`<main><p style="text-align:center;">Loading…</p></main>`;
  }

  return html`
    <main>
      <header class="page-heading">
        <h2>F1 Drivers 2025</h2>
        <p class="sub">Browse every confirmed driver for the 2025 season</p>
      </header>

      <!-- FILTERS -->
      <form id="driverFilterForm" class="driver-filter" onSubmit=${handleApply}>
        <div>
          <label for="search">Search:</label>
          <input
            id="search"
            type="search"
            placeholder="e.g. Driver's Name"
            value=${searchTerm}
            onInput=${(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label for="teamSelect">Team:</label>
          <select
            id="teamSelect"
            value=${pendingTeam}
            onChange=${(e) => setPendingTeam(e.target.value)}
          >
            <option value="all">All</option>
            ${teamList.map(
              (t) =>
                html`<option value=${t.toLowerCase()}>
                  ${t.replace("&nbsp;", " ")}
                </option>`
            )}
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled=${isApplyDisabled}
            style=${isApplyDisabled ? "opacity:0.5;cursor:not-allowed;" : ""}
          >
            Apply
          </button>
        </div>
      </form>

      <!-- DRIVER GRID -->
      <section class="drivers-grid">
        ${visibleDrivers.map(
          (driver) => html`<${DriverCard} key=${driver.id} driver=${driver} />`
        )}
      </section>
    </main>
  `;
};

export default DriversPage;
