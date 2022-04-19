import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//get all Days of the week from the DB 
// for drop down on various components
function* retrieveDow (){
    
    try {
        const dow = yield axios.get('/api/dow');
        console.log('SAGA GET DOW LOG', dow.data);
        yield put({ type:'SET_DOW', payload: dow.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

// This is for getting Days of The Week in the drop down in the dinnerhome component
function* getDow() {
    yield takeLatest('GET_DOW', retrieveDow);
}

export default getDow;