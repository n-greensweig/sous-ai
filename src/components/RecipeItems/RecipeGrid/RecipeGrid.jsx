import { Grid } from "@mui/material";
import RecipeGridCards from './RecipeGridCards/RecipeGridCards';
import RecipeGridSubheading from './RecipeGridSubheading/RecipeGridSubheading';

function RecipeGrid({ recipes, listName, numOfRecipes, searchQuery, setSearchQuery, isXsScreen, isSmScreen, id }) {
    return (
        <Grid container spacing={2} minHeight={'5vh'} className="full-width-background"
            style={{
                marginTop: '0px', margin: '0 auto',
                padding: '20px 10px', backgroundColor: '#FFF', flexGrow: 1,
                width: isXsScreen || isSmScreen ? '100vw' : null, justifyContent: 'center'
            }}
        >
            <div className='div__recipeGrid--container' style={{ display: 'flex', flexDirection: 'column', 
            paddingLeft: isXsScreen || isSmScreen ? null : '2%', }}>
                {listName && (
                    <RecipeGridSubheading listName={listName} numOfRecipes={numOfRecipes} searchQuery={searchQuery} setSearchQuery={setSearchQuery} id={id}
                    isXsScreen={isXsScreen} isSmScreen={isSmScreen} />
                )}
                <RecipeGridCards recipes={recipes} listName={listName} isXsScreen={isXsScreen} isSmScreen={isSmScreen} />
            </div>
        </Grid>
    )
}

export default RecipeGrid;
