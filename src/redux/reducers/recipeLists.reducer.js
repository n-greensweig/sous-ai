const recipeListsReducer = (state = [], action) => {
    if (action.type === 'GET_RECIPE_LISTS') {
        return action.payload;
    }
    return state;
};

export default recipeListsReducer;