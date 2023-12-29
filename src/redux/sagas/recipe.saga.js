import axios from "axios"
import { put, takeLatest } from "redux-saga/effects";

function* saveRecipe(action) {
    try {
        yield axios.post('/api/recipe', action.payload);
    } catch (error) {
        console.error('Error posting recipe', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* getRecipes() {

    try {
        const response = yield axios.get('/api/recipe');
        const action = { type: 'GET_RECIPES', payload: response.data };
        yield put(action.payload);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Something went wrong.');
        throw error;
    }

}

function* recipeSaga() {
    yield takeLatest('SAVE_RECIPE', saveRecipe);
    yield takeLatest('FETCH_RECIPES', getRecipes);
}

export default recipeSaga;