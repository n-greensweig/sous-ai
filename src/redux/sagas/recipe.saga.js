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
        yield put(action);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* getRecipeDetails(action) {

    const id = action.payload;

    try {
        const details = yield axios.get(`/api/recipe/${id}`);
        yield put({ type: 'GET_DETAILS', payload: details.data });
    } catch (error) {
        console.error('Error getting recipe details:', error);
        alert('Something went wrong');
        throw error;
    }
}

function* deleteRecipe(action) {
    const id = action.payload;
    try {
        yield axios.delete(`/api/recipe/${id}`);
    } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* editRecipeTitle(action) {
    const id = action.payload.id;
    const title = action.payload.title;
    try {
        axios.put(`/api/recipe/${id}`, {title});
    } catch (error) {
        console.error('Error updating recipe title:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* recipeSaga() {
    yield takeLatest('SAVE_RECIPE', saveRecipe);
    yield takeLatest('FETCH_RECIPES', getRecipes);
    yield takeLatest('FETCH_DETAILS', getRecipeDetails);
    yield takeLatest('REMOVE_RECIPE', deleteRecipe);
    yield takeLatest('UPDATE_TITLE', editRecipeTitle);
}

export default recipeSaga;