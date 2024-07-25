const userIngredientsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER_INGREDIENTS':
            return action.payload;
        default:
            return state;
    }
};

export default userIngredientsReducer;