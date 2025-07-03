import {
    ConstructorStanding,
    Driver,
    DriverStanding,
    Team,
} from '../models';


// Convert a Parse.Object to a plain JS object and expose its objectId as `id` for React keys, etc.
const toPlainObject = (obj) => ({id: obj.id, ...obj.toJSON()});


// Fetch all teams and attach up-to-two driver names for display.
export const getTeams = async () => {
    // Fetch teams and drivers in parallel for better latency
    const [teamObjects, driverObjects] = await Promise.all([
        Team.getAll(),
        Driver.getAll(),
    ]);

    const driverNamesByTeam = {};
    driverObjects.forEach((driver) => {
        const teamObj = driver.get('team');
        if (!teamObj) return;
        const fullName = `${driver.get('firstName')} ${driver.get('lastName')}`;
        (driverNamesByTeam[teamObj.id] ??= []).push(fullName);
    });

    // Flatten Parse objects and splice driver names (max two)
    return teamObjects.map((team) => {
        const plainTeam = toPlainObject(team);
        return {
            ...plainTeam,
            drivers: (driverNamesByTeam[plainTeam.id] ?? []).slice(0, 2),
        };
    });
};


// Fetch all drivers
export const getDrivers = async () => {
    const driverObjects = await Driver.getAll();

    return driverObjects.map((driver) => {
        const plainDriver = toPlainObject(driver);
        const teamObj = driver.get('team');

        return {
            ...plainDriver,
            team: teamObj?.get('name') ?? '',
            teamId: teamObj?.id,
        };
    });
};


// Fetch driver and constructor standing tables
export const getStandings = async () => {
    const [driverRows, constructorRows] = await Promise.all([
        DriverStanding.getCurrentTable(),
        ConstructorStanding.getCurrentTable(),
    ]);

    return {
        driverStandings: driverRows.map((row) => ({
            position: row.get('position'),
            points: row.get('points'),
            driverId: row.get('driver').id,
        })),
        constructorStandings: constructorRows.map((row) => ({
            position: row.get('position'),
            points: row.get('points'),
            teamId: row.get('team').id,
        })),
    };
};