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

function* getSchedule (){
    
    try {
        const schedule = yield axios.get('/api/dow/schedule');
        console.log('SAGA GET SCHEDULE LOG', schedule.data);
        yield put({ type:'SET_SCHEDULE', payload: schedule.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

function* addMenuDow(action) {
    console.log( 'here is the payload for my POST', action.payload );
    try{
        yield axios.post('/api/dow', action.payload);
    } catch(err){
        console.log(err);
    }
}

function* deleteScheduleRecipe(action) {
    console.log( 'LOG FROM DELETE SAGA', action.payload);
    try {
        yield axios.delete(`/api/dow/${action.payload}`)
        yield put({ type: 'GET_SCHEDULE' })
    } catch(err) {
        console.log(err);
    }
}

// This is for getting Days of The Week in the drop down in the dinnerhome component
function* getDow() {
    yield takeLatest('GET_DOW', retrieveDow);
    yield takeLatest('SET_MENU_DOW', addMenuDow);
    yield takeLatest('GET_SCHEDULE', getSchedule);
    yield takeLatest('DELETE_SCHEDULE_RECIPE', deleteScheduleRecipe);
}


export default getDow;  