const recipeReducer = (state = [], action) => {
    if (action.type === 'GET_RECIPES') {
        return action.payload;
    } else if (action.type === 'GET_COOKED_RECIPES') {
        return action.payload;
    }  else if (action.type === 'GET_RECENT_RECIPES') {
        return action.payload;
    }
    return state;
};

export default recipeReducer;