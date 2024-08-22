import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import './SavedRecipesSidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Importing Dialog components from Material UI for modal dialog functionality.
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// Importing Button and TextField components from Material UI for UI elements.
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function SavedRecipesSidebar() {
    // Hooks for dispatching actions and selecting a slice of the Redux store.
    const dispatch = useDispatch();
    const history = useHistory();
    const recipeLists = useSelector(store => store.recipeListsReducer);
    const recipeListPhotos = useSelector(store => store.recipeListPhotosReducer);
    const groceryList = useSelector(store => store.groceryListReducer);

    // State to toggle the editing mode for the recipe details
    const [isViewing, setIsViewing] = useState(false);
    const [expanded, setExpanded] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to toggle the editing mode for the recipe details
    const toggleViewing = e => {
        if (isViewing) {
            setIsViewing(false);
        } else {
            setIsViewing(true);
        }
    };
    // State hooks for managing the creation process and input value of the new recipe list.
    const [isCreating, setIsCreating] = useState(false); // Controls the dialog's visibility.
    const [listName, setListName] = useState(''); // Stores the new recipe list's name.
    const [activeItem, setActiveItem] = useState(null);

    // Function to save the new recipe list. Dispatches actions to the store and resets local state.
    const saveRecipeList = listName => {
        if (!listName.trim()) return; // Prevents saving an empty list name.
        else {
            dispatch({ type: 'SAVE_RECIPE_LIST', payload: { listName } });
            toggleCreating();
            setListName('');
            dispatch({ type: 'FETCH_RECIPE_LISTS' }); // Triggers a fetch for the updated lists.
        }
    };

    // Effect hook to fetch recipe lists when the component mounts.
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_LISTS' });
        dispatch({ type: 'FETCH_RECIPE_LIST_PHOTOS' });
    }, []); // Dependency array is empty, so this runs once on mount.

    // Toggles the isCreating state, controlling the visibility of the creation dialog.
    const toggleCreating = () => setIsCreating(!isCreating);

    const removeRecipeFromGroceryList = (e, recipe_id) => {
        e.preventDefault();
        dispatch({ type: 'REMOVE_RECIPE_FROM_GROCERY_LIST', payload: { recipe_id: recipe_id } });
    };
    const handleExpandClick = (panel) => (event, isExpanded) => {
        setExpanded(prevExpanded => isExpanded ? [...prevExpanded, panel] : prevExpanded.filter(item => item !== panel));
    };

    const handleSetActiveItem = (itemId) => setActiveItem(itemId);

    const handleClearActiveItem = () => setActiveItem(null);

    const navigateTo = (path) => {
        history.push(path);
        handleClearActiveItem();
    };

    // Function to handle the drag start event
    const handleDragStart = (event, target) => {
        if (target === 'saved') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/recipe-box'); // Set the URL to drag
        } else if (target === 'cooked') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/recipe-box/cooked'); // Set the URL to drag
        } else if (target === 'recent') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/recipe-box/recent'); // Set the URL to drag
        } else {
            event.dataTransfer.setData('text/plain', `https://www.sousai.io/recipe-box/${target}`); // Set the URL to drag
        }
    };

    const handleDragOver = (event) => event.preventDefault();

    const handleDrop = (event, listId) => {
        event.preventDefault();
        const recipeId = event.dataTransfer.getData('recipeId'); // Get the recipe ID from the data transfer object
        if (recipeId) {
            dispatch({ type: 'ADD_RECIPE_TO_FOLDER', payload: { recipeId, listId } }); // Dispatch the action to add the recipe to the folder
        }
    };

    const handleDropGroceryList = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Show loading overlay

        const recipeId = event.dataTransfer.getData('recipeId');
        const ingredients = event.dataTransfer.getData('ingredients');
        const title = event.dataTransfer.getData('title');
        const isInGroceryList = event.dataTransfer.getData('isInGroceryList') === 'true';

        if (recipeId && ingredients && title) {
            await dispatch({
                type: 'UPDATE_GROCERY_LIST', payload: {
                    id: recipeId,
                    ingredients,
                    title,
                    isInGroceryList: !isInGroceryList
                }
            });
        }
        await dispatch({ type: 'FETCH_GROCERY_LIST' });

        setIsLoading(false); // Hide loading overlay
    };

    const cleanIngredients = (ingredientsString) => {
        if (!ingredientsString) return [];
        const cleanedString = ingredientsString
            .replace(/\\/g, '') // Remove backslashes
            .replace(/\"/g, '') // Remove quotes

        const ingredientsArray = cleanedString.split(','); // Split by comma into an array
        if (ingredientsArray.length > 0) {
            // Remove leading curly brace from the first item
            ingredientsArray[0] = ingredientsArray[0].replace(/^{/, '');
            // Remove trailing curly brace from the last item
            ingredientsArray[ingredientsArray.length - 1] = ingredientsArray[ingredientsArray.length - 1].replace(/}$/, '');
        }
        return ingredientsArray;
    };


    const removeIngredientFromGroceryList = (e, recipe_id, ingredient, idx) => {
        e.preventDefault();
        const newGroceryItem = cleanIngredients(groceryList[idx].recipe_ingredients.replace(ingredient, ''));
        dispatch({ type: 'REMOVE_INGREDIENT_FROM_GROCERY_LIST', payload: { recipe_id, newGroceryItem } });
    };

    return (
        <div className='sidebar__container'>
            {isLoading && <div className="loading-overlay">Loading...</div>}
            <div className="recipe-items__sidebar--content">
                <p className={`recipe-items__sidebar--p-first recipe-items__sidebar--margin-right ${document.title === 'Saved Recipes' ? 'paper-background-bold' : 'inherit-background'}`} onClick={() => navigateTo('/recipe-box')}
                    onMouseDown={() => handleSetActiveItem('saved')}
                    onMouseUp={handleClearActiveItem} onDragEnd={handleClearActiveItem} draggable>
                    <BookmarkIcon className={`recipe-items__sidebar--icon ${activeItem === 'saved' ? 'gray-fill' : 'black-fill'}`} /> Saved Recipes
                </p>
                <p onClick={() => navigateTo('/recipe-box/cooked')}
                    onMouseDown={() => handleSetActiveItem('cooked')}
                    onMouseUp={handleClearActiveItem}
                    onDragEnd={handleClearActiveItem}
                    draggable
                    className={`recipe-items__sidebar--margin-right ${document.title === 'Cooked Recipes' ? 'paper-background-bold' : 'inherit-background'}`}>
                    <CheckCircleIcon className={`recipe-items__sidebar--icon ${activeItem === 'cooked' ? 'gray-fill' : 'black-fill'}`} /> Cooked Recipes
                </p>
                <p onClick={() => navigateTo('/recipe-box/recent')}
                    onMouseDown={() => handleSetActiveItem('recent')}
                    onMouseUp={handleClearActiveItem}
                    onDragEnd={handleClearActiveItem}
                    draggable
                    className={`recipe-items__sidebar--margin-right ${document.title === 'Recently Viewed Recipes' ? 'paper-background-bold' : 'inherit-background'}`}>
                    <AccessTimeIcon className={`recipe-items__sidebar--icon ${activeItem === 'recent' ? 'gray-fill' : 'black-fill'}`} /> Recently Viewed
                </p>
                <p
                    onClick={e => toggleViewing(e)}
                    onMouseDown={() => handleSetActiveItem('grocery')}
                    onMouseUp={handleClearActiveItem}
                    onMouseLeave={handleClearActiveItem}
                    onDragEnd={handleClearActiveItem}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDropGroceryList(event)}
                    draggable
                    className='recipe-items__sidebar--margin-right'>
                    <ListAltIcon className='recipe-items__sidebar--icon fill-black' /> Grocery List
                </p>
                <span className='recipe-items__sidebar-span--your-folders recipe-items__sidebar--margin-right'>Your folders</span>
                <div onClick={toggleCreating} className='recipe-items__div-icon-span--new-folder'>
                    <Button className='icon--gray-border' aria-label='new-folder'
                    ><AddIcon className='recipe-items__sidebar--icon recipe-items__sidebar--icon-add' /></Button>
                    <span className='span__new-folder'>New Folder</span>
                </div>
                {recipeLists && recipeLists.map((list) => {
                    const photo = recipeListPhotos.find(photo => photo.list_id.includes(list.id));
                    return (
                        <div key={list.id} className="recipe-items__sidebar--lists-wrapper"
                            onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, list.id)}>
                            <div className={`recipe-items__sidebar--user-folders ${document.title.includes(list.list_name) ? 'paper-background-bold' : 'inherit-background'}`}
                                onClick={() => {
                                    document.title = `Your Recipe Box - ${list.list_name}`;
                                    history.push(`/recipe-box/${list.id}`);
                                }}
                                draggable
                                onMouseDown={() => handleSetActiveItem(list.list_name)}
                                onMouseUp={handleClearActiveItem}
                                onDragStart={event => handleDragStart(event, `${list.id}`)}
                                onDragEnd={handleClearActiveItem}
                            >
                                {photo ? (
                                    <img key={photo.id} src={photo.display_photo} alt={list.list_name} className="folder__photo" />
                                ) : (
                                    <img src={'images/empty-folder/empty-folder.webp'} alt={list.list_name} className="folder__photo" />
                                )}
                                <p className="recipe-items__sidebar--folder-name" onClick={() => {
                                    document.title = `Your Recipe Box - ${list.list_name}`;
                                    history.push(`/recipe-box/${list.id}`);
                                }}>{list.list_name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Dialog for creating a new recipe folder. */}
            <Dialog open={isCreating}
                onClose={toggleCreating}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        saveRecipeList(listName);
                        toggleCreating(event);
                    },
                }}>
                <div className="recipe-items__sidebar--dialog-header">
                    <DialogTitle className="recipe-items__sidebar--dialog-title">New Folder</DialogTitle>
                    <Button className="recipe-items__sidebar--dialog-header-button" onClick={() => setIsCreating(false)}>Cancel</Button>
                </div>
                <DialogContent>
                    <TextField
                        className='recipe-items__sidebar--dialog-textfield'
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        fullWidth
                        variant="standard"
                        defaultValue={listName}
                        placeholder='Enter folder name'
                        onChange={e => setListName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <div className="recipe-items__sidebar--dialog-actions">
                        <div className="recipe-items__sidebar--dialog-actions-first-row">
                            <Button className="recipe-items__sidebar--button-create-new-folder" variant="outlined" type="submit">Create</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
            <Dialog open={isViewing}
                onClose={e => toggleViewing(e)}
                maxWidth="sm" // Set the maximum width to large
                fullWidth={true}
                PaperProps={{ component: 'form', }}>
                <DialogTitle><strong className="grocery-list-title">Your grocery list</strong> |
                    <span className="grocery-list-count">{groceryList.length === 1 ? `${groceryList.length} recipe` : `${groceryList.length} recipes`}</span>
                </DialogTitle>
                <div className="grocery-list-accordion">
                    <ul>
                        {groceryList.length > 0 && groceryList.map((recipe, idx) => (
                            <Accordion key={idx} expanded={expanded.includes(idx)} onChange={handleExpandClick(idx)}>
                                <AccordionSummary
                                    aria-controls={`panel${idx}-content`}
                                    id={`panel${idx}-header`}>
                                    <div className="grocery-list-summary">
                                        {expanded.includes(idx) ? <ExpandMoreIcon className="grocery-list-summary-icon" /> : <KeyboardArrowRight className="grocery-list-summary-icon" />}
                                        <h3 className="grocery-list__recipe-title">{recipe.recipe_title}</h3>
                                        <p className="grocery-list__remove-button" onClick={(e) => removeRecipeFromGroceryList(e, recipe.recipe_id)}>Remove</p>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        {cleanIngredients(recipe.recipe_ingredients).map((ingredient, index) => (
                                            ingredient !== '' ?
                                                <div className="grocery-list__clear-icon-container" key={index}>
                                                    <li className="grocery-list__ingredient">{ingredient.trim().replace(/@/g, ',').split(',')[0]}</li>
                                                    <ClearIcon className="grocery-list__clear-icon"
                                                        onClick={(e) => removeIngredientFromGroceryList(e, recipe.recipe_id, ingredient, idx)}
                                                    />
                                                </div> : null))}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>))}
                    </ul>
                </div>
            </Dialog>
        </div>
    )
}

export default SavedRecipesSidebar;