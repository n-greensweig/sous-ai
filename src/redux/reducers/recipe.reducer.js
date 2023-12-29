const recipeReducer = (state = [], action) => {
    if (action.type === 'GET_RECIPES') {
        return action.payload;
    }
    return state;
};

export default recipeReducer;