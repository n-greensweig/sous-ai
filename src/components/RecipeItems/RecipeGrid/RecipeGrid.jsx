import { Grid } from "@mui/material";
import RecipeGridCards from './RecipeGridCards/RecipeGridCards';
import RecipeGridSubheading from './RecipeGridSubheading/RecipeGridSubheading';
import './RecipeGrid.css';
function RecipeGrid({ recipes, listName, numOfRecipes, searchQuery, setSearchQuery, id, path }) {
    return (
        <Grid container spacing={2}
            className={`recipe-grid__container ${numOfRecipes === 0 ? 'padding-left-ten' : null} ${numOfRecipes !== 0 ? 'recipe-grid__container--center' : ''}`}>
                <div className='recipe-grid__subheading-wrapper'>
                    {listName && (
                        <RecipeGridSubheading listName={listName} numOfRecipes={numOfRecipes} searchQuery={searchQuery} setSearchQuery={setSearchQuery} id={id} />
                    )}
                </div>
            <div className='recipe-grid__subcontainer'>
                <RecipeGridCards recipes={recipes} listName={listName} path={path} />
            </div>
        </Grid>
    )
}

export default RecipeGrid;