import axios from "axios"
import { put, takeLatest } from "redux-saga/effects";

function* saveRecipeList(action) {
    try {
        yield axios.post('/api/recipe/list', action.payload);
    } catch (error) {
        console.error('Error posting recipe list', error);
        alert('Something went wrong.');
        throw error;
    }
}

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
        const comments = yield axios.get(`/api/recipe/comments/${id}`);
        yield put({ type: 'GET_DETAILS', payload: details.data });
        yield put({ type: 'GET_COMMENTS', payload: comments.data });
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

function* deleteComment(action) {
    const id = action.payload.id;
    const recipeId = action.payload.recipeId;
    try {
        yield axios.delete(`/api/recipe/${id}/comment/${recipeId}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Something went wrong.');
        throw error;
    }
}


function* editRecipeTitle(action) {
    const id = action.payload.id;
    const title = action.payload.title;
    try {
        axios.put(`/api/recipe/${id}`, { title });
    } catch (error) {
        console.error('Error updating recipe title:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* postComment(action) {
    const id = action.payload.id;
    try {
        axios.post(`/api/recipe/comments/${id}`, action.payload);
    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* changeRating(action) {
    const id = action.payload.id;
    const rating = action.payload.rating;
    console.log('rating:', rating, id);
    try {
        axios.put(`/api/recipe/rating/${id}`, { rating });
    } catch (error) {
        console.error('Error updating recipe rating:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* changeCooked(action) {
    const id = action.payload.id;
    const isCooked = action.payload.isCooked;
    try {
        axios.put(`/api/recipe/cooked/${id}`, { isCooked });
    } catch (error) {
        console.error('Error updating recipe cooked:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* recipeSaga() {
    yield takeLatest('SAVE_RECIPE_LIST', saveRecipeList);
    yield takeLatest('SAVE_RECIPE', saveRecipe);
    yield takeLatest('FETCH_RECIPES', getRecipes);
    yield takeLatest('FETCH_DETAILS', getRecipeDetails);
    yield takeLatest('REMOVE_RECIPE', deleteRecipe);
    yield takeLatest('UPDATE_TITLE', editRecipeTitle);
    yield takeLatest('ADD_COMMENT', postComment);
    yield takeLatest('REMOVE_COMMENT', deleteComment);
    yield takeLatest('UPDATE_RATING', changeRating);
    yield takeLatest('UPDATE_COOKED', changeCooked);
}

export default recipeSaga;