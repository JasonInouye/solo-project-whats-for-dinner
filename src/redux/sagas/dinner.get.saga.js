import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get all items from the DB 
function* retrieveFavorites (){
    
    try {
        const item = yield axios.get('/dinner');
        console.log('get all:', item.data);
        yield put({ type: 'SET_FAVORITES', payload: item.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

function* getFavorites() {
    yield takeLatest('GET_FAVORITES', retrieveFavorites);
}

export default getFavorites; 