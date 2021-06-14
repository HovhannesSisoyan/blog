export const login = ({ state }, payload) => {
    state.isLoggedIn = true;
    state.token = payload;
}

export const logOut = ({ state }) => {
    state.isLoggedIn = false;
    state.token = null;
}

export const setUserData = ({ state }, payload) => {
    state.userData = payload;
}