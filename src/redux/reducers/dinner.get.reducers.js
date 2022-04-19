
// This is the reducer to grab the favorited list from database
const favorite = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITE':
            return action.payload;
        default:
            return state;
    }
}



export default favorite; 