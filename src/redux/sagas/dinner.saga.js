import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get all favorites from the DB 
function* retrieveFavorites (){
    try {
        const favorite = yield axios.get('/api/dinner');
        //console.log('SAGA GET LOG', favorite.data);
        yield put({ type: 'SET_FAVORITE', payload: favorite.data });
    } catch (err){
        console.log('get all error', err);
    }   
}

function* addFavorite (action){
    try{
        yield axios.post('/api/dinner', action.payload);
    } catch(err) {
        console.log('error in addFavorite', err);
    }
}   

// This is the delete for refrigerator
function* deleteFavorite(action) {
    try {
        yield axios.delete(`/api/dinner/${action.payload}`)
        yield put({ type: 'GET_FAVORITES' })
    } catch(err) {
        console.log(err);
    }
}

// This is the details API
function* fetchDetails(action){
    try {
        const response = yield axios.get(`/api/recipeDetails/${action.payload}`)
        yield put ({
            type: 'SET_DETAILS', payload: response.data
        })
    } catch(err) {
        console.log(err);
    }
}

function* getFavorites() {
    yield takeLatest('GET_FAVORITES', retrieveFavorites);
    yield takeLatest('GET_DETAILS', fetchDetails);
    yield takeLatest('ADD_FAVORITE', addFavorite);
    yield takeLatest('DELETE_FAVORITE', deleteFavorite);
}

export default getFavorites;