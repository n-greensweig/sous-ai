const recipeListNameReducer = (state = '', action) => {
    if (action.type === 'FETCH_LIST_NAME_BY_ID_SUCCESS') {
        return action.payload;
    }
    return state;
};

export default recipeListNameReducer;