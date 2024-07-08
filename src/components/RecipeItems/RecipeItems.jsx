import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme, useMediaQuery } from "@mui/material";
import Header from '../Header/Header';
import SavedRecipesSidebar from "./SavedRecipesSidebar/SavedRecipesSidebar";
import RecipeGrid from "./RecipeGrid/RecipeGrid";
import './RecipeItems.css';
import { useHistory } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
function RecipeItems(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [listToDisplay, setListToDisplay] = useState(document.title);
    const [listName, setListName] = useState('');
    const history = useHistory();
    const recipeLists = useSelector(store => store.recipeListsReducer);
    const recipeListPhotos = useSelector(store => store.recipeListPhotosReducer);
    const groceryList = useSelector(store => store.groceryList);
    const [expanded, setExpanded] = useState([]);
    const [isViewing, setIsViewing] = useState(false);

    const toggleViewing = e => {
        if (isViewing) {
            setIsViewing(false);
        } else {
            setIsViewing(true);
        }
    };

    // State hooks for managing the creation process and input value of the new recipe list.
    const [isCreating, setIsCreating] = useState(false); // Controls the dialog's visibility.
    const [activeItem, setActiveItem] = useState(null);

    // Function to save the new recipe list. Dispatches actions to the store and resets local state.
    const saveRecipeList = listName => {
        dispatch({ type: 'SAVE_RECIPE_LIST', payload: { listName } });
        toggleCreating();
        setListName('');
        dispatch({ type: 'FETCH_RECIPE_LISTS' }); // Triggers a fetch for the updated lists.
    };

    // Effect hook to fetch recipe lists when the component mounts.
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_LISTS' });
        dispatch({ type: 'FETCH_RECIPE_LIST_PHOTOS' });
    }, []); // Dependency array is empty, so this runs once on mount.

    // Toggles the isCreating state, controlling the visibility of the creation dialog.
    const toggleCreating = () => setIsCreating(!isCreating);

    const handleSetActiveItem = (itemId) => {
        setActiveItem(itemId);
    };

    const handleClearActiveItem = () => {
        setActiveItem(null);
    };

    const navigateTo = (path) => {
        history.push(path);
        handleClearActiveItem();
    };

    // Function to handle the drag start event
    const handleDragStart = (event, target) => {
        if (target === 'saved') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box'); // Set the URL to drag
        } else if (target === 'cooked') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box/cooked'); // Set the URL to drag
        } else if (target === 'recent') {
            event.dataTransfer.setData('text/plain', 'https://www.sousai.io/#/recipe-box/recent'); // Set the URL to drag
        } else {
            event.dataTransfer.setData('text/plain', `https://www.sousai.io/#/recipe-box/${target}`); // Set the URL to drag
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Allow the drop event by preventing the default behavior
    };

    const handleDrop = (event, listId) => {
        event.preventDefault();
        const recipeId = event.dataTransfer.getData('recipeId'); // Get the recipe ID from the data transfer object
        if (recipeId) {
            dispatch({ type: 'ADD_RECIPE_TO_FOLDER', payload: { recipeId, listId } }); // Dispatch the action to add the recipe to the folder
        }
    };

    useEffect(() => {
        if (props.path === '/recipe-box') {
            document.title = 'Saved Recipes';
            setListToDisplay('Saved Recipes');
            setListName('Saved Recipes');
        } else if (props.path === '/recipe-box/cooked') {
            document.title = 'Cooked Recipes';
            setListToDisplay('Cooked Recipes');
            setListName('Cooked Recipes');
        } else if (props.path === '/recipe-box/recent') {
            document.title = 'Recently Viewed Recipes';
            setListToDisplay('Recently Viewed Recipes');
            setListName('Recently Viewed Recipes');
        } else if (props.path === '/recipe-box/grocery') {
            document.title = 'Grocery List';
            setListToDisplay('Grocery List');
            setListName('Grocery List');
        } else if (id) {
            // If it's a user-created folder, set listName based on the ID
            dispatch({ type: 'FETCH_LIST_NAME_BY_ID', payload: id });
            dispatch({ type: 'FETCH_GROCERY_LIST' });
        }
    }, [props.path, id, dispatch]);

    const recipes = useSelector(store => store.recipeReducer);
    const fetchedListName = useSelector(store => store.recipeListNameReducer); // Assuming you have this in your store
    const numOfRecipes = recipes.length;

    useEffect(() => {
        if (id) {
            dispatch({ type: 'FETCH_RECIPES_FROM_FOLDER', payload: { id, searchQuery } });
        } else if (listToDisplay === 'Saved Recipes') {
            dispatch({ type: 'FETCH_RECIPES', payload: searchQuery });
        } else if (listToDisplay === 'Cooked Recipes') {
            dispatch({ type: 'FETCH_COOKED_RECIPES', payload: searchQuery });
        } else if (listToDisplay === 'Recently Viewed Recipes') {
            dispatch({ type: 'FETCH_RECENT_RECIPES', payload: searchQuery });
        }
    }, [searchQuery, listToDisplay, dispatch, id]);

    useEffect(() => {
        if (id && fetchedListName) {
            setListName(fetchedListName);
        }
    }, [fetchedListName, id]);

    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cleanIngredients = (ingredientsString) => {
        if (!ingredientsString) return [];
        const cleanedString = ingredientsString
            .replace(/\\/g, '') // Remove backslashes
            .replace(/\"/g, '') // Remove quotes

        const ingredientsArray = cleanedString.split(','); // Split by comma into an array
        // console.log(ingredientsString);
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

    const removeRecipeFromGroceryList = (e, recipe_id) => {
        e.preventDefault();
        dispatch({ type: 'REMOVE_RECIPE_FROM_GROCERY_LIST', payload: { recipe_id: recipe_id } });
    };
    const handleExpandClick = (panel) => (event, isExpanded) => {
        setExpanded(prevExpanded => isExpanded ? [...prevExpanded, panel] : prevExpanded.filter(item => item !== panel));
    };

    return (
        <div style={{ marginTop: isSmScreen || isXsScreen ? '0%' : '1%', margin: '0 auto', }}>
            <Header />
            <div>
                <div className="max-width-container">
                    <SavedRecipesSidebar />
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', }}>
                        {listName && (
                            <RecipeGrid recipes={recipes} listName={listName} numOfRecipes={numOfRecipes}
                                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                                isXsScreen={isXsScreen} isSmScreen={isSmScreen} id={id} />
                        )}
                        <div>
                            {isXsScreen || isSmScreen ?
                                <div className="sidebar-content">
                                    <p className='sidebar__p--first sidebar__margin--right' onClick={() => navigateTo('/recipe-box')}
                                        onMouseDown={() => handleSetActiveItem('saved')}
                                        onMouseUp={handleClearActiveItem}
                                        onDragEnd={handleClearActiveItem}
                                        draggable
                                        style={{
                                            backgroundColor: document.title === 'Saved Recipes' ? '#F8F8F5' : 'inherit',
                                            fontWeight: document.title === 'Saved Recipes' ? 'bold' : 'normal',
                                        }}>
                                        <BookmarkIcon className='sidebar__icon' style={{ fill: activeItem === 'saved' ? '#767676' : 'black', }} /> Saved Recipes
                                    </p>
                                    <p onClick={() => navigateTo('/recipe-box/cooked')}
                                        onMouseDown={() => handleSetActiveItem('cooked')}
                                        onMouseUp={handleClearActiveItem}
                                        onDragEnd={handleClearActiveItem}
                                        draggable
                                        className='sidebar__margin--right'
                                        style={{
                                            backgroundColor: document.title === 'Cooked Recipes' ? '#F8F8F5' : 'inherit',
                                            fontWeight: document.title === 'Cooked Recipes' ? 'bold' : 'normal'
                                        }}>
                                        <CheckCircleIcon className='sidebar__icon' style={{ fill: activeItem === 'cooked' ? '#767676' : 'black' }} /> Cooked Recipes
                                    </p>
                                    <p onClick={() => navigateTo('/recipe-box/recent')}
                                        onMouseDown={() => handleSetActiveItem('recent')}
                                        onMouseUp={handleClearActiveItem}
                                        onDragEnd={handleClearActiveItem}
                                        draggable
                                        className='sidebar__margin--right'
                                        style={{
                                            backgroundColor: document.title === 'Recently Viewed Recipes' ? '#F8F8F5' : 'inherit',
                                            fontWeight: document.title === 'Recently Viewed Recipes' ? 'bold' : 'normal'
                                        }}>
                                        <AccessTimeIcon className='sidebar__icon' style={{ fill: activeItem === 'recent' ? '#767676' : 'black' }} /> Recently Viewed
                                    </p>
                                    <p
                                        onClick={e => toggleViewing(e)}
                                        onMouseDown={() => handleSetActiveItem('grocery')}
                                        onMouseUp={handleClearActiveItem}
                                        onMouseLeave={handleClearActiveItem}
                                        onDragEnd={handleClearActiveItem}
                                        draggable
                                        className='sidebar__margin--right'
                                        style={{
                                            backgroundColor: document.title === 'Grocery List' ? '#F8F8F5' : 'inherit',
                                            fontWeight: document.title === 'Grocery List' ? 'bold' : 'normal'
                                        }}>
                                        <ListAltIcon className='sidebar__icon' style={{ fill: activeItem === 'grocery' ? '#767676' : 'black' }} /> Grocery List
                                    </p>
                                    <span className='sidebar__span--your-folders sidebar__margin--right' style={{ marginLeft: '5px', }}>Your folders</span>
                                    <div onClick={toggleCreating} className='div__icon__span--new-folder' style={{ marginLeft: '10px', }}>
                                        <Button className='icon--gray-border'
                                        ><AddIcon className='sidebar__icon sidebar__icon--add' /></Button>
                                        <span className='span__new-folder'>New Folder</span>
                                    </div>
                                    {recipeLists && recipeLists.map((list) => {
                                        const photo = recipeListPhotos.find(photo => photo.list_id.includes(list.id));
                                        return (
                                            <div key={list.id} className="div__icon__p--folder div__color-change"
                                                onDragOver={handleDragOver}
                                                onDrop={(event) => handleDrop(event, list.id)}
                                                style={{ marginLeft: '10px', }}
                                            >
                                                <div className='sidebar__user-folders' style={{
                                                    display: 'flex', alignItems: 'center', cursor: 'pointer', boxSizing: 'border-box',
                                                    backgroundColor: document.title.includes(list.list_name) ? '#F8F8F5' : 'inherit',
                                                    fontWeight: document.title.includes(list.list_name) ? 'bold' : 'normal',
                                                }}
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
                                                        <img key={photo.id} src={photo.display_photo} alt={list.list_name} className="folder__photo"
                                                            style={{ height: '40px', width: '40px', borderRadius: '4px', }}
                                                        />
                                                    ) : (
                                                        <img src={'images/empty-folder/empty-folder.jpeg'} alt={list.list_name} className="folder__photo"
                                                            style={{ height: '40px', width: '40px', borderRadius: '4px', }}
                                                        />
                                                    )}
                                                    <p onClick={() => {
                                                        document.title = `Your Recipe Box - ${list.list_name}`;
                                                        history.push(`/recipe-box/${list.id}`);
                                                    }}
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                    >{list.list_name}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                : null}
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
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid gray',
                                }}>
                                    <DialogTitle sx={{ paddingBottom: '0px', marginBottom: '0px', }}>New Folder</DialogTitle>
                                    <Button style={{ color: 'gray', textTransform: 'none', paddingBottom: '0px', marginBottom: '0px', }} onClick={() => setIsCreating(false)}>Cancel</Button>
                                </div>
                                <DialogContent>
                                    <TextField autoFocus
                                        margin="dense"
                                        id="title"
                                        name="title"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={listName}
                                        placeholder='Enter folder name'
                                        onChange={e => setListName(e.target.value)}
                                        style={{ padding: '1px' }} />
                                </DialogContent>
                                <DialogActions>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                        <div className="first-row" style={{ width: '100%', marginBottom: '20px' }}>
                                            {/* Buttons for cancelling or saving the new recipe folder. */}
                                            <Button variant="outlined" type="submit" style={{ width: '50%', backgroundColor: '#df321b', color: 'white', border: '1px solid #df321b', borderRadius: '5%', textTransform: 'none' }}>Create</Button>
                                        </div>
                                    </div>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={isViewing}
                                onClose={e => toggleViewing(e)}
                                maxWidth="sm" // Set the maximum width to large
                                fullWidth={true}
                                PaperProps={{ component: 'form', }}>
                                <DialogTitle><strong style={{ marginRight: '10px', }}>Your grocery list</strong> |
                                    <span style={{ marginLeft: '10px', }}>
                                        {groceryList.length === 1 ? `${groceryList.length} recipe` : `${groceryList.length} recipes`}
                                    </span>
                                </DialogTitle>
                                <div style={{ margin: '10px' }}>
                                    <ul>
                                        {groceryList.length > 0 && groceryList.map((recipe, idx) => (
                                            <Accordion key={idx} expanded={expanded.includes(idx)} onChange={handleExpandClick(idx)}>
                                                <AccordionSummary
                                                    aria-controls={`panel${idx}-content`}
                                                    id={`panel${idx}-header`}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                        {expanded.includes(idx) ? <ExpandMoreIcon style={{ cursor: 'pointer', marginRight: '8px' }} /> : <KeyboardArrowRight style={{ cursor: 'pointer', marginRight: '8px' }} />}
                                                        <h3 style={{ flex: 1 }}>{recipe.recipe_title}</h3>
                                                        <p
                                                            onClick={(e) => removeRecipeFromGroceryList(e, recipe.recipe_id)}
                                                            style={{ cursor: 'pointer', marginLeft: '8px', textDecoration: 'underline', }}>Remove</p>
                                                    </div>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ul>
                                                        {cleanIngredients(recipe.recipe_ingredients).map((ingredient, index) => (
                                                            ingredient !== '' ?
                                                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d3d3d3', }}>
                                                                    <li style={{ padding: '10px 0' }}>{ingredient.trim().replace(/@/g, ',').split(',')[0]}</li>
                                                                    <ClearIcon style={{ padding: '10px 0' }}
                                                                        onClick={(e) => removeIngredientFromGroceryList(e, recipe.recipe_id, ingredient, idx)}
                                                                    />
                                                                </div> : null
                                                        ))}
                                                    </ul>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </ul>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeItems;
