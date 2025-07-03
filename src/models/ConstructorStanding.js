import Parse from 'parse';

export const ConstructorStanding = Parse.Object.extend('ConstructorStanding');

// Get the latest constructor-standings table.
ConstructorStanding.getCurrentTable = () => {
    return new Parse.Query(ConstructorStanding)
        .include('team')
        .ascending('position')
        .find();
}