import axios from "axios"
import { takeLatest } from "redux-saga/effects";

function* saveRecipe(action) {
    try {
        yield axios.post('/api/recipe', action.payload);
    } catch (error) {
        console.error('Error posting recipe', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* recipeSaga() {
    yield takeLatest('SAVE_RECIPE', saveRecipe);
}

export default recipeSaga;