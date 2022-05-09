import ingredients from './ingredients.reducer'
describe ('INGREDIENTS REDUCER TESTS', () => {
    it('should return refrigerator contents', () => {
        let action = {type: 'SET_REFRIGERATOR' };
        let returnedState = ingredients([], action);
        expect(returnedState).toEqual();
    })
})