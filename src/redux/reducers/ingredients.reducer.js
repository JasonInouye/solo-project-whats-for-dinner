// This is the reducer to grab the ingredients from different sources
const ingredientData = (state = [], action) => {
    switch (action.type) {
        case 'SET_STOCK':
            return action.payload;
        case 'SET_REFRIGERATOR':
            return action.payload;
        case 'SET_PANTRY':
            return action.payload;
        case 'SET_SPICES':
            return action.payload;
        default:
            return state;
    }
}

export default ingredientData; 