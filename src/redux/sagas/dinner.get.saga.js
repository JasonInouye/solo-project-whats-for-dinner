import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get all favorites from the DB 
function* retrieveFavorites (){
    
    try {
        const favorite = yield axios.get('/api/dinner');
        console.log('SAGA GET LOG', favorite.data);
        yield put({ type: 'SET_FAVORITE', payload: favorite.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

function* getFavorites() {
    yield takeLatest('GET_FAVORITES', retrieveFavorites);
}

export default getFavorites;