// Imports necessary hooks from React and Redux for state management, and effects.
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
// Imports custom CSS for styling this component.
import './RecipeItems.css';
// Imports from Material-UI for UI components with responsive capabilities.
import { Grid, useTheme, useMediaQuery, Popover } from "@mui/material";
// useHistory hook from React Router for programmatically navigating to different routes.
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Custom components for displaying headers and new recipe list forms.
import Header from '../Header/Header';

import RecipeCard from './RecipeCard/RecipeCard';

// Imports Material-UI components for buttons and icons.
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelIcon from '@mui/icons-material/Cancel';
import SavedRecipesSidebar from "./SavedRecipesSidebar/SavedRecipesSidebar";

// Imports Material-UI components for buttons and icons.
import './RecipeItems.css';

import { useParams } from 'react-router-dom';

function RecipeItems(props) {
    // Initialize dispatch and history for Redux actions and navigation.
    const { id } = useParams(); // Get the list ID from URL parameter
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [listToDisplay, setlistToDisplay] = useState(document.title);

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
                            marginTop: '0px', display: 'flex', flexDirection: 'row',
                            flexWrap: 'wrap', justifyContent: 'left', alignItems: 'center', gap: '16px',
                        }}>
                            {recipes.map((recipe, index) => (
                                // Maps each recipe to a Grid item for a card-like display. Each card is clickable and navigates to the recipe's detail view on click.
                                <Grid item className='card' xs={11} md={2.5}
                                    style={{ padding: '0px', margin: '4px', minWidth: 250 }}
                                    id={recipe.id} key={index}
                                >
                                    <RecipeCard key={recipe.id} recipe={recipe} />
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