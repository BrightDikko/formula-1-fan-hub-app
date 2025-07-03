/* eslint-disable no-console */
/**
 * Seed Back4App with local JSON data.
 * Run with:  `node src/services/dbScript.js`
 * (Relies only on the JS-key user; no master-key operations.)
 */
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import Parse from 'parse/node.js';
import Env from '../environment.js'; // App keys

// Parse initialisation
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

// File helpers
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../public/data');

const readJson = async (filename) =>
    JSON.parse(await fs.readFile(path.join(dataDir, filename), 'utf8'));

// Remove every row from a class. Requires the JS-key user to have delete permission.
const purgeClassRows = async (className) => {
    const ClassObj = Parse.Object.extend(className);
    const rows = await new Parse.Query(ClassObj).limit(9999).find();
    await Parse.Object.destroyAll(rows);
    console.log(`Cleared ${rows.length} rows from ${className}`);
};

/* ---------- Main seeder ------------------------------------------ */
async function seed() {
    // Start with a clean slate
    await purgeClassRows('DriverStanding');
    await purgeClassRows('ConstructorStanding');
    await purgeClassRows('Driver');
    await purgeClassRows('Team');

    /* ---------- 1. Teams ---------- */
    const teamRaw = await readJson('teams.json');
    const Team = Parse.Object.extend('Team');
    const teamById = {};

    for (const t of teamRaw) {
        const team = new Team();
        team.set({
            name: t.name,
            country: t.country,
            points: t.points,
            logo: t.logo, // filename placeholder (convert to Parse.File later)
        });
        await team.save();
        teamById[t.id] = team;
    }
    console.log(`Saved ${teamRaw.length} teams`);

    /* ---------- 2. Drivers ---------- */
    const driverRaw = await readJson('drivers.json');
    const Driver = Parse.Object.extend('Driver');
    const driverById = {};

    for (const d of driverRaw) {
        const driver = new Driver();
        driver.set({
            firstName: d.firstName,
            lastName: d.lastName,
            number: d.number,
            code: d.code,
            country: d.country,
            points: d.points,
            image: d.image,
            team: teamById[d.teamId], // pointer
        });
        await driver.save();
        driverById[d.id] = driver;
    }
    console.log(`Saved ${driverRaw.length} drivers`);

    /* ---------- 3. Standings ---------- */
    const standingsRaw = await readJson('standings.json');
    const DriverStanding = Parse.Object.extend('DriverStanding');
    const ConstructorStanding = Parse.Object.extend('ConstructorStanding');

    for (const row of standingsRaw.driverStandings) {
        await new DriverStanding().save({
            position: row.position,
            points: row.points,
            driver: driverById[row.driverId],
        });
    }
    console.log(`Saved ${standingsRaw.driverStandings.length} driver-standing rows`);

    for (const row of standingsRaw.constructorStandings) {
        await new ConstructorStanding().save({
            position: row.position,
            points: row.points,
            team: teamById[row.teamId],
        });
    }
    console.log(`Saved ${standingsRaw.constructorStandings.length} constructor-standing rows`);

    console.log('All data imported to Back4App without master key.');
}

// Run script
seed()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });