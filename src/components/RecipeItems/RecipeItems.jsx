// Imports necessary hooks from React and Redux for state management, and effects.
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// Imports custom CSS for styling this component.
import './RecipeItems.css';
// Imports from Material-UI for UI components with responsive capabilities.
import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Typography, useTheme, useMediaQuery } from "@mui/material";
// useHistory hook from React Router for programmatically navigating to different routes.
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Custom components for displaying headers and new recipe list forms.
import Header from '../Header/Header';
import NewRecipeList from "../NewRecipeList/NewRecipeList";

import { useInView } from 'react-intersection-observer'; // Import the hook

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

function RecipeItems() {
    // Initialize dispatch and history for Redux actions and navigation.
    const dispatch = useDispatch();
    const history = useHistory();

    // Retrieves the recipes from the Redux store using useSelector hook.
    const recipes = useSelector(store => store.recipeReducer);
    // Sets the document title to 'Saved Recipes'.
    document.title = 'Saved Recipes';

    // Handles click events on recipe items, dispatching an action to set the selected recipe ID and navigating to the recipe's detail view.
    const handleClick = id => {
        dispatch({ type: 'SET_SELECTED_RECIPE_ID', payload: id });
        history.push(`/recipes/${id}`);
    };

    // Fetches recipes from the backend on component mount.
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    // Utility function to replace '@' symbols with commas, used for displaying recipe notes.
    const replaceWithCommas = str => str.replace(/@/g, ',');

    // Use Material-UI hooks to check for screen size for responsive layout design.
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        // Sets padding and margin based on screen size for responsive design.
        <div style={{ paddingBottom: isSmScreen || isXsScreen ? '28%' : '8%', marginTop: isSmScreen || isXsScreen ? '7%' : '1%' }}>
            <Header text={'Saved Recipes'} />

            <NewRecipeList />
            {/* Grid container to display recipes in a responsive layout. */}
            <Grid container spacing={2} minHeight={'5vh'} className="container"
                style={{
                    marginTop: '0px',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '20px 10px',
                }}
            >
                {recipes.map((recipe, index) => (
                    // Maps each recipe to a Grid item for a card-like display. Each card is clickable and navigates to the recipe's detail view on click.
                    <Grid item className='card' xs={11} md={3} onClick={() => handleClick(recipe.id)}
                        style={{ padding: '0px', margin: '4px', }}
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
                                                >{replaceWithCommas(recipe.notes)}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </div>
                                </Card>
                            </Paper>
                        </FadeIn>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default RecipeItems; // Export the RecipeItems component for use in other parts of the application.