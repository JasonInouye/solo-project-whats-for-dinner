const searchData = (state = [], action) => {
    console.log( 'this is the search reducer 1', action.payload);
    switch (action.type) {
        case 'SET_SEARCH':
            return action.payload;
        default:
            return state;
    }
}

export default searchData; 