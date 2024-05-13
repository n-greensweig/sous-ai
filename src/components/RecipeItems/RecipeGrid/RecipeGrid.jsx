import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from "@mui/material";
import RecipeCard from './RecipeCard/RecipeCard';

function RecipeGrid({ recipes, listName, numOfRecipes, searchQuery, setSearchQuery, isXsScreen, isSmScreen}) {
    return (
        <Grid container spacing={2} minHeight={'5vh'} className="full-width-background"
            style={{
                marginTop: '0px', margin: '0 auto',
                padding: '20px 10px', backgroundColor: '#FFF', flexGrow: 1,
            }}
        >
            <div className='div__recipeGrid--container' style={{ display: 'flex', flexDirection: 'column', paddingLeft: '2%', }}>
                {isXsScreen || isSmScreen ? null :
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <div style={{ display: 'flex', flexDirection: 'column', }}>
                            <h2 style={{ marginLeft: 'inherit', color: '#222', margin: 0 }}>{listName}</h2>
                            {numOfRecipes > 0 ? <p style={{ marginTop: 0, color: '#717171' }}>{numOfRecipes} {numOfRecipes === 1 ? 'recipe' : 'recipes'}</p> :
                                <p style={{ marginTop: 0, color: '#717171' }}>No recipes yet</p>}
                        </div>
                        <div className="search__input" style={{
                            display: 'flex', flexDirection: 'row',
                            alignItems: 'center', position: 'absolute', right: '2%',
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
                }
                {/* Maps through the recipes array and creates a Grid item for each recipe. */}
                <div style={{
                    marginTop: '0px', display: 'flex', flexDirection: 'row',
                    flexWrap: 'wrap', justifyContent: 'left', alignItems: 'center', gap: '16px',
                }}>
                    {recipes.map((recipe, index) => (
                        // Maps each recipe to a Grid item for a card-like display. Each card is clickable and navigates to the recipe's detail view on click.
                        <Grid item className='card' xs={11} md={2.5}
                            style={{ padding: '0px', margin: '4px', minWidth: 250, }}
                            id={recipe.id} key={index}
                        >
                            <RecipeCard key={recipe.id} recipe={recipe} listName={listName} />
                        </Grid>
                    ))}
                </div>
            </div>
        </Grid>
    )
}

export default RecipeGrid; // Export the RecipeGrid component for use in other parts of the application.