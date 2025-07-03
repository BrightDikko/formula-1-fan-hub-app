import {
  html,
  useState,
  useEffect,
  useMemo,
} from "https://unpkg.com/htm/preact/standalone.mjs";

import { getTeams } from "../../Services/F1.js";
import TeamRow from "./TeamRow.js";

const COUNTRY_OPTIONS = [
  "United Kingdom",
  "Germany",
  "Italy",
  "Austria",
  "United States",
  "Switzerland",
  "France",
];

const TeamsPage = () => {
  /* ---------- data ---------- */
  const [teamList, setTeamList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeams().then((data) => {
      setTeamList(data);
      setIsLoading(false);
    });
  }, []);

  /* ---------- UI state ---------- */
  const [searchTerm, setSearchTerm] = useState("");

  const [activeCountry, setActiveCountry] = useState("all"); // filter in effect
  const [pendingCountry, setPendingCountry] = useState("all"); // current dropdown

  const isApplyDisabled = pendingCountry === activeCountry;

  /** Apply button handler – only country filter is deferred */
  const handleApply = (e) => {
    e.preventDefault();
    setActiveCountry(pendingCountry);
  };

  /* ---------- derived list ---------- */
  const visibleTeams = useMemo(() => {
    return teamList.filter((team) => {
      const matchesCountry =
        activeCountry === "all" ||
        team.country.toLowerCase() === activeCountry.toLowerCase();

      const matchesSearch =
        searchTerm.trim() === "" ||
        team.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

      return matchesCountry && matchesSearch;
    });
  }, [teamList, searchTerm, activeCountry]);

  /* ---------- render ---------- */
  if (isLoading) {
    return html`<main><p style="text-align:center;">Loading…</p></main>`;
  }

  return html`
    <main>
      <header class="page-heading">
        <h2>F1 Teams 2025</h2>
        <p class="sub">Explore every constructor on the 2025 grid</p>
      </header>

      <!-- FILTER FORM -->
      <form id="teamFilterForm" class="driver-filter" onSubmit=${handleApply}>
        <div>
          <label for="teamSearch">Search:</label>
          <input
            id="teamSearch"
            type="search"
            placeholder="e.g. Ferrari"
            value=${searchTerm}
            onInput=${(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label for="countrySelect">Country:</label>
          <select
            id="countrySelect"
            value=${pendingCountry}
            onChange=${(e) => setPendingCountry(e.target.value)}
          >
            <option value="all">All</option>
            ${COUNTRY_OPTIONS.map(
              (c) => html`<option value="${c}">${c}</option>`
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

      <!-- TEAMS TABLE -->
      <section class="card">
        <h2>Teams</h2>

        <div class="table-wrapper">
          <table class="teams-table">
            <thead>
              <tr>
                <th>Insignia</th>
                <th>Team</th>
                <th>Driver</th>
                <th>Driver</th>
              </tr>
            </thead>
            <tbody>
              ${visibleTeams.map((team) => html`<${TeamRow} team=${team} />`)}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  `;
};

export default TeamsPage;
