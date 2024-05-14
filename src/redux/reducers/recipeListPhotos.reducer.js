const recipeListPhotosReducer = (state = [], action) => {
    if (action.type === 'GET_RECIPE_LIST_PHOTOS') {
        return action.payload;
    }
    return state;
};

export default recipeListPhotosReducer;