import userReducer from './user.reducer';
describe ('USER REDUCER TESTS', () => {
    it('should have an empty object initial state', () => {
        let action = {};
        let returnedState = userReducer(undefined, action);
        expect(returnedState).toEqual({});
    })
    
    it('should remove user info on logout', () => {
        let action = {type: 'UNSET_USER'};
        let returnedState = userReducer({username: 'dane'}, action);
        expect(returnedState).toEqual({});
    })
})