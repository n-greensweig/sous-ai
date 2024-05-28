import axios from "axios"
import { put, takeLatest } from "redux-saga/effects";

function* saveRecipeList(action) {
    try {
        yield axios.post('/api/recipe/list', action.payload);
        yield put({ type: 'FETCH_RECIPE_LISTS' });
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

function* getRecipes(action) {
    try {
        const response = yield axios.get(`/api/recipe?q=${action.payload}`);
        const newAction = { type: 'GET_RECIPES', payload: response.data };
        yield put(newAction);
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

function* fetchRecipeLists() {
    try {
        const response = yield axios.get('/api/recipe/list/recipes');
        const action = { type: 'GET_RECIPE_LISTS', payload: response.data };
        yield put(action);
    } catch (error) {
        console.error('Error fetching recipe lists:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* addRecipeToFolder(action) {
    try {
        yield axios.post('/api/recipe/list/recipes', action.payload);
        yield put({ type: 'FETCH_RECIPE_LIST_PHOTOS' }); // Fetch updated photos
    } catch (error) {
        console.error('Error adding recipe to folder:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* getCookedRecipes(action) {
    try {
        const response = yield axios.get(`/api/recipe/cooked?q=${action.payload}`);
        const newAction = { type: 'GET_COOKED_RECIPES', payload: response.data };
        yield put(newAction);
    } catch (error) {
        console.error('Error fetching cooked recipes:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* getRecentRecipes(action) {
    try {
        const response = yield axios.get(`/api/recipe/recent?q=${action.payload}`);
        const newAction = { type: 'GET_RECENT_RECIPES', payload: response.data };
        yield put(newAction);
    } catch (error) {
        console.error('Error fetching recent recipes:', error);
        alert('Something went wrong.');
        throw error;
    }
}

function* fetchRecipesFromFolder(action) {
    try {
        const response = yield axios.get(`/api/recipe/folder/${action.payload.id}?q=${action.payload.searchQuery}`);
        yield put({ type: 'GET_USER_RECIPES', payload: response.data });
    } catch (error) {
        console.error('Error fetching recipes from folder:', error);
        alert('Something went wrong.');
    }
}

function* removeRecipeFromFolder(action) {
    try {
        yield axios.delete(`/api/recipe/list/recipes/${action.payload.recipeId}/${action.payload.listId}`);
        yield put({ type: 'FETCH_RECIPE_LIST_PHOTOS' }); // Fetch updated photos
    } catch (error) {
        console.error('Error removing recipe from folder:', error);
        alert('Something went wrong.');
    }
}

function* getRecipeListPhotos() {
    try {
        const response = yield axios.get(`/api/recipe/list/recipes/photos`);
        yield put({ type: 'GET_RECIPE_LIST_PHOTOS', payload: response.data });
    } catch (error) {
        console.error('Error fetching recipe list photos:', error);
        alert('Something went wrong.');
    }
}

function* updateRecipeListName(action) {
    try {
        yield axios.put(`/api/recipe/list/${action.payload.id}`, { name: action.payload.newListName });
        yield put({ type: 'FETCH_RECIPE_LISTS' });
    } catch (error) {
        console.error('Error updating recipe list name:', error);
        alert('Something went wrong.');
    }
}

function* deleteRecipeList(action) {
    try {
        yield axios.delete(`/api/recipe/delete/list/${action.payload}`);
        yield put({ type: 'FETCH_RECIPE_LISTS' });
        yield put({ type: 'FETCH_RECIPES', payload: '' }); 
    } catch (error) {
        console.error('Error deleting recipe list:', error);
        alert('Something went wrong.');
    }
}

function* fetchListNameById(action) {
    try {
        const response = yield axios.get(`/api/recipe/list/name/${action.payload}`);
        yield put({ type: 'FETCH_LIST_NAME_BY_ID_SUCCESS', payload: response.data });
    } catch (error) {
        console.error('Error fetching list name:', error);
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
    yield takeLatest('FETCH_RECIPE_LISTS', fetchRecipeLists);
    yield takeLatest('ADD_RECIPE_TO_FOLDER', addRecipeToFolder);
    yield takeLatest('FETCH_COOKED_RECIPES', getCookedRecipes);
    yield takeLatest('FETCH_RECENT_RECIPES', getRecentRecipes);
    yield takeLatest('FETCH_RECIPES_FROM_FOLDER', fetchRecipesFromFolder);
    yield takeLatest('REMOVE_RECIPE_FROM_FOLDER', removeRecipeFromFolder);
    yield takeLatest('FETCH_RECIPE_LIST_PHOTOS', getRecipeListPhotos);
    yield takeLatest('UPDATE_RECIPE_LIST_NAME', updateRecipeListName);
    yield takeLatest('REMOVE_RECIPE_LIST', deleteRecipeList);
    yield takeLatest('FETCH_LIST_NAME_BY_ID', fetchListNameById);
}

export default recipeSaga;