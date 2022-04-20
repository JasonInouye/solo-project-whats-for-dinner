
// This is the reducer to grab the days of the week
const dow = (state = [], action) => {
    switch (action.type) {
        case 'SET_DOW':
            return action.payload;
        default:
            return state;
    }
}

export default dow; 