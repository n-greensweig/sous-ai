// Imports necessary hooks from React and Redux for state management, and effects.
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
// Imports custom CSS for styling this component.
import './RecipeItems.css';
// Imports from Material-UI for UI components with responsive capabilities.
import { Grid, useTheme, useMediaQuery } from "@mui/material";
// useHistory hook from React Router for programmatically navigating to different routes.
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Custom components for displaying headers and new recipe list forms.
import Header from '../Header/Header';

import RecipeCard from './RecipeGrid/RecipeCard/RecipeCard';

// Imports Material-UI components for buttons and icons.
import SavedRecipesSidebar from "./SavedRecipesSidebar/SavedRecipesSidebar";
import RecipeGrid from "./RecipeGrid/RecipeGrid";

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

    const listName = props.path === '/recipe-box' ? 'Saved Recipes' : props.path === '/recipe-box/cooked' ? 'Cooked Recipes' :
        props.path === '/recipe-box/recent' ? 'Recently Viewed' :
            props.path === '/recipe-box/grocery' ? 'Grocery List' :
                document.title.split('Your Recipe Box - ')[1];

    const recipes = useSelector(store => store.recipeReducer); // Retrieves the recipes from the Redux store using useSelector hook.
    const numOfRecipes = recipes.length; // Gets the number of recipes in the recipes array.

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
        <div style={{ marginTop: isSmScreen || isXsScreen ? '7%' : '1%', margin: '0 auto', }}>
            <Header />
            <div>
                <div className="max-width-container">
                    <SavedRecipesSidebar />
                    {/* Grid container to display recipes in a responsive layout. */}
                    <RecipeGrid 
                    recipes={recipes} listName={listName} numOfRecipes={numOfRecipes}
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    isXsScreen={isXsScreen} isSmScreen={isSmScreen}
                    />
                </div>
            </div>
        </div>
    )
}

export default RecipeItems; // Export the RecipeItems component for use in other parts of the application.