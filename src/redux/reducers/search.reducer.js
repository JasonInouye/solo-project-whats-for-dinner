const searchData = (state = [], action) => {
    switch (action.type) {
        case 'SET_SINGLE_SEARCH':
            return action.payload;
        case 'SET_MANY_SEARCH':
            return action.payload;
        default:
            return state;
    }
}

export default searchData; 