import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import responseReducer from './response.reducer';
import recipeReducer from './recipe.reducer';
import recipeDetailsReducer from './recipeDetails.reducer';
import commentsReducer from './comments.reducer';
import recipeListsReducer from './recipeLists.reducer';
import recipeListPhotos from './recipeListPhotos.reducer';
import recipeListPhotosReducer from './recipeListPhotos.reducer';
import recipeListNameReducer from './recipeListName.reducer';
import groceryList from './groceries.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  responseReducer,
  recipeReducer,
  recipeDetailsReducer,
  commentsReducer,
  recipeListsReducer,
  recipeListPhotosReducer,
  recipeListNameReducer,
  groceryList,
});

export default rootReducer;
