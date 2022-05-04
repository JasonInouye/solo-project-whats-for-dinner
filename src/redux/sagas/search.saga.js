import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// This is the single Search API
function* fetchSingle(action){
    try {
        const response = yield axios.get(`/api/search/${action.payload}`)
        console.log( 'this is the results', response.data);
        yield put ({
            type: 'SET_SEARCH', payload: response.data
        })
    } catch(err) {
        console.log(err);
    }
}
// This is the many Search API
// function* fetchMany(action){
//     try {
//         const response = yield axios.get(`/api/stockResults/${action.payload}`)
//         console.log( 'This is the Response', response.data);
//         yield put ({
//             type: 'SET_MANY', payload: response.data
//         })
//     } catch(err) {
//         console.log(err);
//     }
// }

function* getApiItems() {
    yield takeLatest('GET_SEARCH', fetchSingle);
    // yield takeLatest('GET_MANY', fetchMany);
}

export default getApiItems;