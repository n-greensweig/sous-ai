const userPreferencesReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_PREFERENCES':
            return action.payload;
        default:
            return state;
    }
};

export default userPreferencesReducer;
