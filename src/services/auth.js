import Parse from 'parse';

/* Create a new Parse user record */
export const register = async ({firstName, lastName, email, password}) => {
    const user = new Parse.User();

    // Standard Parse columns
    user.set('username', email);
    user.set('password', password);
    user.set('email', email);

    // Custom profile data
    user.set('firstName', firstName);
    user.set('lastName', lastName);

    return user.signUp(); // throws Parse.Error on failure
};


/* Log an existing user in (session token is stored by the SDK) */
export const login = (email, password) => Parse.User.logIn(email, password);


/* Destroy the current session token and remove user from memory / localStorage */
export const logout = () => Parse.User.logOut();


/* Return the current Parse.User instance or null */
export const current = () => Parse.User.current();


/* Boolean shortcut used by route guards */
export const isAuthed = () => !!Parse.User.current();