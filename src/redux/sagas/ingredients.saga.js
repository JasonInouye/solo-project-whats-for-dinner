import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getRefrigerator (){
    try {
        const refrigerator = yield axios.get('/api/ingredients/refrigerator');
        yield put({ type:'SET_REFRIGERATOR', payload: refrigerator.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

function* getPantry (){
    try {
        const pantry = yield axios.get('/api/ingredients/pantry');
        yield put({ type:'SET_PANTRY', payload: pantry.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

function* getSpices (){
    try {
        const spices = yield axios.get('/api/ingredients/spices');
        yield put({ type:'SET_SPICES', payload: spices.data });

    } catch (err){
        console.log('get all error', err);
    }   
}

// This is the Saga for Refrigerator
function* addIngredient(action) {
    // console.log( 'here is the payload for my Add Ingredient', action.payload );
    // let type = '';
    // if (action.payload.location == 'Refrigerator') {
    //     return type = 'GET_REFRIGERATOR'
    // } else if (action.payload.location == 'Pantry') {
    //     return type = 'GET_PANTRY'
    // } else if (action.payload.location == 'Spices') {
    //     return type = 'GET_SPICES'
    // }

    // console.log( "this is the TYPE", type);

    try{
        yield axios.post('/api/ingredients', action.payload);
        // my attempt to keep this as a single saga
        //yield put({ type: type })
        yield put({ type: 'GET_REFRIGERATOR' })
        // yield put({ type: 'GET_PANTRY' })
        // yield put({ type: 'GET_SPICES' })
    } catch(err){
        console.log(err);
    }
}

function* addPantry(action) {
    try{
        yield axios.post('/api/ingredients', action.payload);
        yield put({ type: 'GET_PANTRY' })
    } catch(err){
        console.log(err);
    }
}

function* addSpice(action) {
    try{
        yield axios.post('/api/ingredients', action.payload);
        yield put({ type: 'GET_SPICES' })
    } catch(err){
        console.log(err);
    }
}

// This is the delete for refrigerator
function* deleteIngredient(action) {
    console.log( 'LOG FROM DELETE INGREDIENT SAGA', action.payload);
    try {
        yield axios.delete(`/api/ingredients/${action.payload}`)
        yield put({ type: 'GET_REFRIGERATOR' })
    } catch(err) {
        console.log(err);
    }
}

function* deletePantry(action) {
    console.log( 'LOG FROM DELETE INGREDIENT SAGA', action.payload);
    try {
        yield axios.delete(`/api/ingredients/${action.payload}`)
        yield put({ type: 'GET_PANTRY' })
    } catch(err) {
        console.log(err);
    }
}

function* deleteSpice(action) {
    console.log( 'LOG FROM DELETE INGREDIENT SAGA', action.payload);
    try {
        yield axios.delete(`/api/ingredients/${action.payload}`)
        yield put({ type: 'GET_SPICES' })
    } catch(err) {
        console.log(err);
    }
}

// This is for getting Ingredients for the refrigerator, pantry, spice
function* getIngredients() {
    yield takeLatest('GET_REFRIGERATOR', getRefrigerator);
    yield takeLatest('GET_PANTRY', getPantry);
    yield takeLatest('GET_SPICES', getSpices);
    yield takeLatest('DELETE_INGREDIENT', deleteIngredient);
    yield takeLatest('DELETE_PANTRY', deletePantry);
    yield takeLatest('DELETE_SPICE', deleteSpice);
    yield takeLatest('ADD_REF_ITEM', addIngredient);
    yield takeLatest('ADD_PANTRY_ITEM', addPantry);
    yield takeLatest('ADD_SPICES_ITEM', addSpice);
}

export default getIngredients;  