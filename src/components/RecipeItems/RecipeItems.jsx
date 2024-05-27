import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme, useMediaQuery } from "@mui/material";
import Header from '../Header/Header';
import SavedRecipesSidebar from "./SavedRecipesSidebar/SavedRecipesSidebar";
import RecipeGrid from "./RecipeGrid/RecipeGrid";
import './RecipeItems.css';

function RecipeItems(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [listToDisplay, setListToDisplay] = useState(document.title);
    const [listName, setListName] = useState('');

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

    return (
        <div style={{ marginTop: isSmScreen || isXsScreen ? '0%' : '1%', margin: '0 auto' }}>
            <Header />
            <div>
                <div className="max-width-container">
                    <SavedRecipesSidebar />
                    {listName && (
                        <RecipeGrid recipes={recipes} listName={listName} numOfRecipes={numOfRecipes}
                            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                            isXsScreen={isXsScreen} isSmScreen={isSmScreen} id={id} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipeItems;
