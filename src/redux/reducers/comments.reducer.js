const commentsReducer = (state = [], action) => {
    if (action.type === 'GET_COMMENTS') {
        return action.payload;
    }
    return state;
};

export default commentsReducer;