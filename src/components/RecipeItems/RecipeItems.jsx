// Imports necessary hooks from React and Redux for state management, and effects.
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
// Imports custom CSS for styling this component.
import './RecipeItems.css';
// Imports from Material-UI for UI components with responsive capabilities.
import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, useTheme, useMediaQuery, Popover } from "@mui/material";
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
import { TypeSpecimenOutlined } from "@mui/icons-material";

import { useInView } from 'react-intersection-observer'; // Import the hook
import SavedRecipesSidebar from "./SavedRecipesSidebar/SavedRecipesSidebar";
import './RecipeItems.css';

import { useParams } from 'react-router-dom';

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
    const { id } = useParams(); // Get the list ID from URL parameter
    const dispatch = useDispatch();
    const history = useHistory();
    const [listName, setListName] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorFolder, setAnchorFolder] = useState(null);
    const [editedRecipeId, setEditedRecipeId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [listToDisplay, setlistToDisplay] = useState(document.title);

    const recipeLists = useSelector(store => store.recipeListsReducer);
    const currentList = recipeLists.find(list => list.id === id);

    if (props.path === '/recipe-box') {
        document.title = 'Saved Recipes';
    } else if (props.path === '/recipe-box/cooked') {
        document.title = 'Cooked Recipes';
    } else if (props.path === '/recipe-box/recent') {
        document.title = 'Recently Viewed Recipes';
    } else if (props.path === '/recipe-box/grocery') {
        document.title = 'Grocery List';
    }

    const recipes = useSelector(store => store.recipeReducer); // Retrieves the recipes from the Redux store using useSelector hook.
    const numOfRecipes = recipes.length; // Gets the number of recipes in the recipes array.

    // Handles click events on recipe items, dispatching an action to set the selected recipe ID and navigating to the recipe's detail view.
    const handleClick = (id) => {
        dispatch({ type: 'SET_SELECTED_RECIPE_ID', payload: id });
        history.push(`/recipes/${id}`);
    };

    // Handle the pop-overs for adding or removing recipes
    const handleFolderPopover = (e) => {
        setAnchorFolder(e.currentTarget)
    }

    const handleFolderPopoverClose = () => {
        setAnchorFolder(null);
        handleClose();
    }

    const handlePopover = (e) => {
        setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    // For popover operations
    const open = Boolean(anchorEl);
    const openFolder = Boolean(anchorFolder)
    const popoverID = open ? 'simple-popover' : undefined;

    // Remove recipe
    const removeRecipe = () => {
        dispatch({ type: 'REMOVE_RECIPE', payload: editedRecipeId, });
        dispatch({ type: 'FETCH_RECIPES' });
    };

    // Add recipe to folder
    const addRecipeToFolder = (id) => {
        dispatch({ type: 'ADD_RECIPE_TO_FOLDER', payload: { listId: id, recipeId: editedRecipeId, }, });
        handleFolderPopoverClose();
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_LIST_NAME', payload: id }); // Fetch the list name from the server if not available in the state
    }, [id, dispatch]);

    // Fetch recipes with search filter
    useEffect(() => {
        if (id) {
            dispatch({ type: 'FETCH_RECIPES_FROM_FOLDER', payload: { id, searchQuery: searchQuery } });
        } else if (listToDisplay === 'Saved Recipes') {
            dispatch({ type: 'FETCH_RECIPES', payload: searchQuery });
        } else if (listToDisplay === 'Cooked Recipes') {
            dispatch({ type: 'FETCH_COOKED_RECIPES', payload: searchQuery });
        } else if (listToDisplay === 'Recently Viewed Recipes') {
            dispatch({ type: 'FETCH_RECENT_RECIPES', payload: searchQuery });
        }
    }, [searchQuery, listToDisplay, dispatch]);

    // Utility function to replace '@' symbols with commas, used for displaying recipe notes.
    const replaceWithCommas = str => str.replace(/@/g, ',');

    // Utility function to format time strings in minutes to hours and minutes
    const formatTime = timeString => {
        // Convert string to an integer
        const timeInMinutes = parseInt(timeString, 10);

        // Check if time is 60 minutes or more
        if (timeInMinutes >= 60) {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;

            // Return a formatted string in terms of hours and remaining minutes
            if (minutes === 0) {
                return `${hours} hour${hours > 1 ? 's' : ''}`;
            } else {
                return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 || minutes === 0 ? 's' : ''}`;
            }
        } else {
            // Return in minutes if less than 60
            return `${timeInMinutes} minute${timeInMinutes > 1 || timeInMinutes === 0 ? 's' : ''}`;
        }
    };

    // Use Material-UI hooks to check for screen size for responsive layout design.
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2%', }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <h2 style={{ marginLeft: 'inherit', color: '#222', margin: 0 }}>
                                    {props.path === '/recipe-box' ? 'Saved Recipes' : props.path === '/recipe-box/cooked' ? 'Cooked Recipes' :
                                        props.path === '/recipe-box/recent' ? 'Recently Viewed' :
                                            props.path === '/recipe-box/grocery' ? 'Grocery List' :
                                                document.title.split('Your Recipe Box - ')[1]}</h2>
                                {numOfRecipes > 0 ? <p style={{ marginTop: 0, color: '#717171' }}>{numOfRecipes} recipes</p> :
                                    <p style={{ marginTop: 0, color: '#717171' }}>No recipes yet</p>}
                            </div>
                            <div className="search__input" style={{
                                display: 'flex', flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <SearchIcon className='icon--black search' />
                                <input
                                    type="text"
                                    placeholder="Search your saved recipes"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                />
                                {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' /> : null}
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
                                    style={{ padding: '0px', margin: '4px', minWidth: 250 }}
                                    id={recipe.id} key={index}
                                >
                                    <FadeIn>
                                        <Paper elevation={5}>
                                            <Card>
                                                <div key={recipe.id}>
                                                    <CardActionArea onClick={() => handleClick(recipe.id)}>
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
                                                                }}>{recipe.title} ID: {recipe.id}</Typography>
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
                                                            >{formatTime((Number(replaceWithCommas(recipe.prep_time).split(' ')[0])) + Number(replaceWithCommas(recipe.cook_time).split(' ')[0]))}</Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>
                                                        <Button variant="text" className="header__button options_menu"
                                                            startIcon={<MoreHorizIcon className='icon--black' />} onClick={(event) => { handlePopover(event); setEditedRecipeId(recipe.id) }}></Button>
                                                        <Popover
                                                            id={popoverID}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <ul className={`dropdown`}>
                                                                <li>
                                                                    <button onClick={handleFolderPopover}>Add to Folder</button>
                                                                    <Popover
                                                                        open={openFolder}
                                                                        anchorEl={anchorFolder}
                                                                        onClose={handleFolderPopoverClose}
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'right',
                                                                        }}>
                                                                        {recipeLists.map((folder, i) => (
                                                                            <><button onClick={() => addRecipeToFolder(folder.id)} key={i}>{folder.list_name}</button><br /></>
                                                                        ))}

                                                                    </Popover>
                                                                </li>
                                                                <li>
                                                                    <button onClick={() => removeRecipe()}>Remove recipe</button>
                                                                </li>
                                                            </ul>
                                                        </Popover>
                                                    </CardActions>
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