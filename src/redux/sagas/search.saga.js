import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// This is the MANY ingredients search
function* fetchMany(action){
    try {
        const response = yield axios.get(`/api/stock/${action.payload}`)
        console.log( 'this is the results of API', response.data);
        yield put ({
            type: 'SET_MANY_SEARCH', payload: response.data
        })
    } catch(err) {
        console.log(err);
    }
}

function* fetchSingle(action){
    try {
        const response = yield axios.get(`/api/search/${action.payload}`)
        yield put ({
            type: 'SET_SINGLE_SEARCH', payload: response.data
        })
    } catch(err) {
        console.log(err);
    }
}

function* getApiItems() {
    yield takeLatest('GET_SINGLE', fetchSingle);
    yield takeLatest('GET_MANY', fetchMany);
}

export default getApiItems;