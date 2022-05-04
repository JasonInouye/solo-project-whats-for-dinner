const searchMany = (state = [], action) => {
    switch (action.type) {
        case 'SET_MANY':
            return action.payload;
        default:
            return state;
    }
}

export default searchMany; 