
// This is the reducer to grab the days of the week
const dowData = (state = [], action) => {
    switch (action.type) {
        case 'SET_DOW':
            return action.payload;
        case 'SET_SCHEDULE':
            return action.payload;
        default:
            return state;
    }
}

export default dowData; 