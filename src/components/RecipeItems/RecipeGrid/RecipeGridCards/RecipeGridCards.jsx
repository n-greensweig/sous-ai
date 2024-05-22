import { Grid } from "@mui/material";
import RecipeCard from '../RecipeCard/RecipeCard';
function RecipeGridCards({ recipes, listName, isXsScreen, isSmScreen }) {
    return (
        <div style={{
            marginTop: '0px', display: 'flex', flexDirection: 'row',
            flexWrap: 'wrap', justifyContent: 'left', alignItems: 'center', gap: '8px 16px',
        }}>
            {recipes.map((recipe, index) => (
                // Maps each recipe to a Grid item for a card-like display. Each card is clickable and navigates to the recipe's detail view on click.
                <Grid item className='card recipeCard' xs={isXsScreen || isSmScreen ? 5 : 11} sm={5} md={2} lg={1} xl={1}
                    style={{ padding: '0px', margin: '4px', minWidth: 200, }}
                    id={recipe.id} key={index}
                >
                    <RecipeCard key={recipe.id} recipe={recipe} listName={listName} />
                </Grid>
            ))}
        </div>
    )
}

export default RecipeGridCards; // Export the RecipeGridCards component for use in other parts of the application.