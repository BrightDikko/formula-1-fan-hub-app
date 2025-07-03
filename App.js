import {
  html,
  render,
  useState,
  useEffect,
} from "https://unpkg.com/htm/preact/standalone.mjs";

import Nav from "./Components/Nav/Nav.js";
import Home from "./Components/Home/Home.js";
import DriversPage from "./Components/Drivers/DriversPage.js";
import TeamsPage from "./Components/Teams/TeamsPage.js";

/* ---------- client-side routes ---------- */
const ROUTE_MAP = {
  "": Home,
  "#/drivers": DriversPage,
  "#/teams": TeamsPage,
};

/* ---------- top-level component ---------- */
function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const CurrentPage = ROUTE_MAP[route] ?? Home;

  useEffect(() => window.scrollTo(0, 0), [route]);

  return html`
    <${Nav} currentRoute=${route} />
    <${CurrentPage} />
  `;
}

render(html`<${App} />`, document.getElementById("app"));
