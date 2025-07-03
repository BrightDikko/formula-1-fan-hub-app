import Parse from 'parse';
import {Team} from './Team';

export const Driver = Parse.Object.extend('Driver');

// Get all drivers with their `team` pointer pre-fetched. Results are ordered alphabetically by last name.
Driver.getAll = () => {
    return new Parse.Query(Driver)
        .include('team')
        .ascending('lastName')
        .find();
}

// Get drivers that belong to a specific team. Accepts either a Team Parse.Object or a raw objectId string.
Driver.getByTeam = (team) => {
    // Normalise argument so we always compare against a Parse.Object
    const teamObj =
        team instanceof Parse.Object
            ? team
            : Team.createWithoutData(team);

    return new Parse.Query(Driver)
        .equalTo('team', teamObj)
        .ascending('points')
        .find();
};