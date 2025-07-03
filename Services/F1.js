const axios = window.axios;

const CACHE = Object.create(null);

function fetchJsonCached(path) {
  if (CACHE[path]) return CACHE[path];

  CACHE[path] = axios
    .get(path)
    .then((res) => res.data)
    .catch((err) => {
      console.error(`Failed to load ${path}`, err);
      return [];
    });

  return CACHE[path];
}

/* --------------------- API --------------------- */

export const getDrivers = () => fetchJsonCached("data/drivers.json");

export const getTeams = () => fetchJsonCached("data/teams.json");

export const getStandings = () => fetchJsonCached("data/standings.json");
