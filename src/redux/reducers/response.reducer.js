const responseReducer = (state = '', action) => {
    if (action.type === 'SET_OPENAI_API_RESPONSE') {
        return action.payload;
    }
    return state;
};

export default responseReducer;