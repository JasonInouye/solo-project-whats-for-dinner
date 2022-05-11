const searchData = (state = [], action) => {
    console.log('DOES LOG WORK HERE?', action.payload);
    switch (action.type) {
        case 'SET_SINGLE_SEARCH':
            return action.payload;
        default:
            return state;
    }
}

export default searchData; 