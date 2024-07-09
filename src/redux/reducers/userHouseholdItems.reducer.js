const userHouseholdItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_HOUSEHOLD_ITEMS':
            return action.payload;
        default:
            return state;
    }
}

export default userHouseholdItemsReducer;