const recipeDetailsReducer = (state = {}, action) => {
    if (action.type === 'GET_DETAILS') {
        console.log('hello', action.payload);
        return action.payload;
    }
    return state;
};

export default recipeDetailsReducer;