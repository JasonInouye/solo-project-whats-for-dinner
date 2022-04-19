import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

//get all Days of the week from the DB 
// for drop down on various components
function* retrieveDow (){
    
    try {
        const dow = yield axios.get('/api/dow');
        //console.log('SAGA GET DOW LOG', dow.data);
        yield put({ type:'SET_DOW', payload: dow.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

function* addMenuDow(action) {
    console.log( 'here is the payload for my POST', action.payload );
}

// This is for getting Days of The Week in the drop down in the dinnerhome component
function* getDow() {
    yield takeLatest('GET_DOW', retrieveDow);
    yield takeLatest('SET_MENU_DOW', addMenuDow);
}

export default getDow;  