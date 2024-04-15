// Imports necessary hooks from React and Redux for state management, and effects.
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
// Imports custom CSS for styling this component.
import './RecipeItems.css';
// Imports from Material-UI for UI components with responsive capabilities.
import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Typography, useTheme, useMediaQuery } from "@mui/material";
// useHistory hook from React Router for programmatically navigating to different routes.
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Custom components for displaying headers and new recipe list forms.
import Header from '../Header/Header';

// Imports Material-UI components for buttons and icons.
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

import { useInView } from 'react-intersection-observer'; // Import the hook
import SavedRecipesSidebar from "./SavedRecipesSidebar/SavedRecipesSidebar";
import Popup from "../Popup/Popup";

// Imports Material-UI components for buttons and icons.
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import './RecipeItems.css';

// Define a functional component for an individual recipe card that fades in
function FadeIn({ children }) {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.48,    // Trigger when 48% of the element is in the viewport
    });

    return (
        <div
            ref={ref}
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
        >
            {children}
        </div>
    );
}

function RecipeItems(props) {
    // Initialize dispatch and history for Redux actions and navigation.
    const dispatch = useDispatch();
    const history = useHistory();
    const [buttonPopup, setButtonPopup] = useState(false);
    const [addingToFolder, setAddingToFolder] = useState(false);
    const [editedRecipeId, setEditedRecipeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [listToDisplay, setlistToDisplay] = useState(document.title);

    const recipeLists = useSelector(store => store.recipeListsReducer);
    if (props.path === '/recipe-box') {
        document.title = 'Saved Recipes';
    } else if (props.path === '/recipe-box/cooked') {
        document.title = 'Cooked Recipes';
    } else if (props.path === '/recipe-box/recent') {
        document.title = 'Recently Viewed Recipes';
    } else if (props.path === '/recipe-box/grocery') {
        document.title = 'Grocery List';
    } else {
        document.title = 'Saved Recipes';
    }

    const recipes = useSelector(store => store.recipeReducer); // Retrieves the recipes from the Redux store using useSelector hook.
    const numOfRecipes = recipes.length; // Gets the number of recipes in the recipes array.

    // Handles click events on recipe items, dispatching an action to set the selected recipe ID and navigating to the recipe's detail view.
    // If the buttonPopup state is true, it sets the buttonPopup state to false.
    const handleClick = (id) => {
        if (!buttonPopup) {
            dispatch({ type: 'SET_SELECTED_RECIPE_ID', payload: id });
            history.push(`/recipes/${id}`);
        } else {
            setButtonPopup(false);
        }
    };

    // Remove recipe
    const removeRecipe = () => {
        dispatch({ type: 'REMOVE_RECIPE', payload: editedRecipeId, });
        dispatch({ type: 'FETCH_RECIPES' });
    };

    // Add recipe to folder
    const addRecipeToFolder = (id) => {
        dispatch({ type: 'ADD_RECIPE_TO_FOLDER', payload: { listId: id, recipeId: editedRecipeId, }, });
    };

    // Fetch recipes with search filter
    useEffect(() => {
        if (listToDisplay === 'Saved Recipes') {
            dispatch({ type: 'FETCH_RECIPES', payload: searchQuery });
        } else if (listToDisplay === 'Cooked Recipes') {
            dispatch({ type: 'FETCH_COOKED_RECIPES', payload: searchQuery });
        } else if (listToDisplay === 'Recently Viewed Recipes') {
            dispatch({ type: 'FETCH_RECENT_RECIPES', payload: searchQuery });
        }
    }, [searchQuery, listToDisplay, dispatch]);

    // Utility function to replace '@' symbols with commas, used for displaying recipe notes.
    const replaceWithCommas = str => str.replace(/@/g, ',');

    // Use Material-UI hooks to check for screen size for responsive layout design.
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // Function to handle the opening of the popup and prevent event propagation
    const handleOpenPopup = (e, id) => {
        e.stopPropagation(); // Prevent the click from reaching the card's onClick
        setEditedRecipeId(id); // Set the recipe ID to the one that was clicked
        setButtonPopup(true);
    };

    return (
        // Sets padding and margin based on screen size for responsive design.
        <div style={{
            marginTop: isSmScreen || isXsScreen ? '7%' : '1%',
            margin: '0 auto',
        }}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row', }}>
                <SavedRecipesSidebar />
                {/* Grid container to display recipes in a responsive layout. */}
                <Grid container spacing={2} minHeight={'5vh'} className="container"
                    style={{
                        marginTop: '0px',
                        margin: '0 auto',
                        padding: '20px 10px',
                        backgroundColor: '#FAF9F6',
                    }}
                >
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <h2 style={{ marginLeft: 'inherit', color: '#222', margin: 0 }}>
                                    {props.path === '/recipe-box' ? 'Saved Recipes' : props.path === '/recipe-box/cooked' ? 'Cooked Recipes' : props.path === '/recipe-box/recent' ? 'Recently Viewed' : props.path === '/recipe-box/grocery' ? 'Grocery List' : 'Saved Recipes'}</h2>
                                <p style={{ marginTop: 0, color: '#717171' }}>{numOfRecipes} recipes</p>
                            </div>
                            <div className="search__input" style={{
                                display: 'flex', flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                {/* <Button variant="text" className="header__button search" startIcon={ */}
                                <SearchIcon className='icon--black search' />
                                {/* }></Button> */}
                                <input
                                    type="text"
                                    placeholder="Search your saved recipes"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                                {searchQuery ?
                                    // <Button variant="text" className="header__button" onClick={() => setSearchQuery('')} startIcon={
                                    <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' />
                                    // }></Button> 
                                    : null}
                            </div>
                        </div>
                        {/* Maps through the recipes array and creates a Grid item for each recipe. */}
                        <div style={{
                            marginTop: '0px',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'left',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            {recipes.map((recipe, index) => (
                                // Maps each recipe to a Grid item for a card-like display. Each card is clickable and navigates to the recipe's detail view on click.
                                <Grid item className='card' xs={11} md={2.5}
                                    onClick={() => handleClick(recipe.id)}
                                    style={{ padding: '0px', margin: '4px', minWidth: 250 }}
                                    id={recipe.id} key={index}
                                >
                                    <FadeIn>
                                        <Paper elevation={5}>
                                            <Card>
                                                <div key={recipe.id}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component={'img'}
                                                            height={'194'}
                                                            image={`${recipe.display_photo}`}
                                                            alt={`${recipe.title} dish`}
                                                        />
                                                        <CardContent className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                                            {/* Typography for recipe title with responsive font size. */}
                                                            <Typography className="title" style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-start',
                                                                fontFamily: 'inter',
                                                                color: 'black',
                                                                fontSize: '18px',
                                                                margin: '0px',
                                                                paddingTop: '0px',
                                                            }}
                                                                variant="h4"
                                                                component="div"
                                                                sx={{
                                                                    fontWeight: 'bold',
                                                                    mb: 2
                                                                }}>{recipe.title}</Typography>
                                                            {/* Typography for recipe notes with dynamic font size based on screen size. */}
                                                            <Typography className="notes" style={{
                                                                alignItems: 'baseline',
                                                                justifyContent: 'center',
                                                                fontFamily: 'inter',
                                                                color: 'black',
                                                                fontSize: isXsScreen || isSmScreen ? '16px' : '13px',
                                                                marginTop: '5px',
                                                                overflow: 'auto'
                                                            }}
                                                                variant="h4"
                                                                component="div"
                                                            >Prep time: {replaceWithCommas(recipe.prep_time)}</Typography>
                                                            <div className="notes__button">
                                                                <Typography className="notes" style={{
                                                                    alignItems: 'baseline',
                                                                    justifyContent: 'center',
                                                                    fontFamily: 'inter',
                                                                    color: 'black',
                                                                    fontSize: isXsScreen || isSmScreen ? '16px' : '13px',
                                                                    marginTop: '5px',
                                                                    overflow: 'auto'
                                                                }}
                                                                    variant="h4"
                                                                    component="div"
                                                                >Cook time: {replaceWithCommas(recipe.cook_time)}</Typography>

                                                                <Button variant="text" className="header__button"
                                                                    startIcon={<MoreHorizIcon className='icon--black' />} onClick={(e) => handleOpenPopup(e, recipe.id)}></Button>
                                                                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                                                    <Dialog open={buttonPopup} onClose={() => setButtonPopup(false)}
                                                                        PaperProps={{
                                                                            component: 'form',
                                                                            onSubmit: (event) => {
                                                                                event.preventDefault();
                                                                                // saveToFolder(listName);
                                                                                setButtonPopup(false);
                                                                            },
                                                                        }}>
                                                                        <DialogContent className="dialog__buttons">
                                                                            <Button onClick={() => removeRecipe()}><BookmarkBorderIcon /> Unsave from Recipe Box</Button>
                                                                            <Button onClick={() => setAddingToFolder(true)}><FolderOpenIcon /> Add to folder</Button>
                                                                            <Dialog open={addingToFolder} onClose={() => setAddingToFolder(false)}
                                                                                PaperProps={{
                                                                                    component: 'form',
                                                                                    onSubmit: (event) => {
                                                                                        event.preventDefault();
                                                                                        // saveToFolder(listName);
                                                                                        setAddingToFolder(false);
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <DialogTitle style={{ borderBottom: '2px solid gray', }}>Add to Folder <Button onClick={() => setAddingToFolder(false)}>Close</Button></DialogTitle>
                                                                                <DialogContent>
                                                                                    {recipeLists && recipeLists.map((list, index) => (
                                                                                        <p className="gray-background" key={list.id} onClick={() => addRecipeToFolder(list.id)} style={{ color: 'black' }}>
                                                                                            {list.list_name} <AddIcon onClick={() => addRecipeToFolder(list.id)} />
                                                                                        </p>
                                                                                    ))}
                                                                                    <Button>Done</Button>
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </Popup>
                                                            </div>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </div>
                                            </Card>
                                        </Paper>
                                    </FadeIn>
                                </Grid>
                            ))}
                        </div>
                    </div>
                </Grid>
            </div>
        </div>
    )
}

export default RecipeItems; // Export the RecipeItems component for use in other parts of the application.