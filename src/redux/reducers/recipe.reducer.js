const recipeReducer = (state = [], action) => {
    if (action.type === 'GET_RECIPES') {
        return action.payload;
    } else if (action.type === 'REMOVE_RECIPE') {
        return state.filter(recipe => recipe.id !== action.payload);
    } else if (action.type === 'GET_COOKED_RECIPES') {
        return action.payload;
    } else if (action.type === 'GET_RECENT_RECIPES') {
        return action.payload;
    } else if (action.type === 'GET_USER_RECIPES') {
        return action.payload;
    }
    return state;
};

export default recipeReducer;