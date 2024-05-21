import { Grid } from "@mui/material";
import RecipeGridCards from './RecipeGridCards/RecipeGridCards';
import RecipeGridSubheading from './RecipeGridSubheading/RecipeGridSubheading';
function RecipeGrid({ recipes, listName, numOfRecipes, searchQuery, setSearchQuery, isXsScreen, isSmScreen, id }) {
    return (
        <Grid container spacing={2} minHeight={'5vh'} className="full-width-background"
            style={{
                marginTop: '0px', margin: '0 auto',
                padding: '20px 10px', backgroundColor: '#FFF', flexGrow: 1,
            }}
        >
            <div className='div__recipeGrid--container' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2%', }}>
                {isXsScreen || isSmScreen ? null :
                    <RecipeGridSubheading listName={listName} numOfRecipes={numOfRecipes} searchQuery={searchQuery} setSearchQuery={setSearchQuery} id={id} />}
                {/* Maps through the recipes array and creates a Grid item for each recipe. */}
                <RecipeGridCards recipes={recipes} listName={listName} />
            </div>
        </Grid>
    )
}

export default RecipeGrid; // Export the RecipeGrid component for use in other parts of the application.