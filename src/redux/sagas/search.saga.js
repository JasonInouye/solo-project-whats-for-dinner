import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// This is the single Search API
function* fetchSingle(action){
    try {
        const response = yield axios.get(`/api/search/${action.payload}`)
        console.log( 'this is the results', response.data);
        yield put ({
            type: 'SET_SINGLE_SEARCH', payload: response.data
        })
    } catch(err) {
        console.log(err);
    }
}

function* getApiItems() {
    yield takeLatest('GET_SEARCH', fetchSingle);
}

export default getApiItems;