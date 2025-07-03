import Parse from 'parse';

export const Team = Parse.Object.extend('Team');

// Fetch all teams ordered alphabetically by name
Team.getAll = () => {
    return new Parse.Query(Team)
        .ascending('name')   // order by name ascending
        .find();
}

// Convenience helper — fetch a single team by its `objectId`
Team.getById = (id) => {
    return new Parse.Query(Team)
        .get(id);
}