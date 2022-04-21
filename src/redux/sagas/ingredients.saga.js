import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRefrigerator (){
    try {
        const refrigerator = yield axios.get('/api/ingredients/refrigerator');
        console.log('SAGA GET REFRIGERATOR LOG', refrigerator.data);
        yield put({ type:'SET_REFRIGERATOR', payload: refrigerator.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

// function* addMenuDow(action) {
//     console.log( 'here is the payload for my POST', action.payload );
//     try{
//         yield axios.post('/api/dow', action.payload);
//     } catch(err){
//         console.log(err);
//     }
// }

function* deleteIngredient(action) {
    console.log( 'LOG FROM DELETE INGREDIENT SAGA', action.payload);
    try {
        yield axios.delete(`/api/ingredients/${action.payload}`)
        yield put({ type: 'GET_REFRIGERATOR' })
    } catch(err) {
        console.log(err);
    }
}

// This is for getting Ingredients for the refrigerator, pantry, spice
function* getIngredients() {
    yield takeLatest('GET_REFRIGERATOR', getRefrigerator);
    yield takeLatest('DELETE_INGREDIENT', deleteIngredient);
}

export default getIngredients;  