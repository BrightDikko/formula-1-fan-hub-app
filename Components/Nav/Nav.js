import { html } from "https://unpkg.com/htm/preact/standalone.mjs";

/** True when the given hash matches the current route */
const isLinkActive = (currentRoute, hash) =>
  hash === ""
    ? currentRoute === "" || currentRoute === "#"
    : currentRoute === hash;

const Nav = ({ currentRoute = "" }) => html`
  <nav>
    <div class="brand">
      <img
        src="public/images/teams/F1.svg"
        alt="F1 logo"
        width="60"
        height="40"
      />
      <h1 class="site-title">F1 2025</h1>
    </div>

    <ul class="nav-links">
      <li>
        <a
          href="#"
          class=${isLinkActive(currentRoute, "") ? "active" : ""}
          aria-label="Home"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#/drivers"
          class=${isLinkActive(currentRoute, "#/drivers") ? "active" : ""}
          aria-label="Drivers"
        >
          Drivers
        </a>
      </li>
      <li>
        <a
          href="#/teams"
          class=${isLinkActive(currentRoute, "#/teams") ? "active" : ""}
          aria-label="Teams"
        >
          Teams
        </a>
      </li>
    </ul>
  </nav>
`;

export default Nav;
