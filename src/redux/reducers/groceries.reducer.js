const groceryList = (state = [], action) => {
    if (action.type === 'GET_GROCERY_LIST') {
        return action.payload;
    }
    return state;
};

export default groceryList;