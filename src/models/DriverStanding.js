import Parse from 'parse';

export const DriverStanding = Parse.Object.extend('DriverStanding');

// Fetch the latest driver-standings table
DriverStanding.getCurrentTable = () => {
    return new Parse.Query(DriverStanding)
        .include('driver')
        .ascending('position')
        .find();
}