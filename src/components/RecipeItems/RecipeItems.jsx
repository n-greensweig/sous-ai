import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './RecipeItems.css';

import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RecipeItems() {

    const dispatch = useDispatch();
    const history = useHistory();

    // Get recipes from Redux store
    const recipes = useSelector(store => store.recipeReducer);

    const handleClick = id => {
        console.log('hi', id);
        dispatch({ type: 'SET_SELECTED_RECIPE_ID', payload: id });
        history.push(`/recipes/${id}`);
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (

        <>
            <Grid container spacing={2} minHeight={'5vh'} className="container"
                style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
                    alignItems: 'center', marginTop: '0px'
                }}
            >

                {recipes.map(recipe => (
                        <Grid item className='card' xs={10} md={3} onClick={() => handleClick(recipe.id)} 
                        style={{
                            padding: '0px'
                        }} 
                        >
                            <Paper elevation={5}>
                                <Card>
                                    <div key={recipe.id}>
                                        <CardActionArea>
                                            <CardMedia
                                                component={'img'}
                                                height={'194'}
                                                image={`images/${recipe.photo}`}
                                                alt={`${recipe.title} dish`}
                                            />
                                            <CardContent>

                                                <Typography style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    fontFamily: 'inter',
                                                    color: 'black',
                                                    fontSize: '20px'
                                                }}
                                                    variant="h4"
                                                    component="div"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        mb: 2
                                                    }}>{recipe.title}</Typography>
                                                
                                                <Typography style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    fontFamily: 'inter',
                                                    color: 'black',
                                                    fontSize: '13px'
                                                }}
                                                    variant="h4"
                                                    component="div"
                                                    >{recipe.notes}</Typography>

                                            </CardContent>
                                        </CardActionArea>
                                    </div>
                                </Card>
                            </Paper>
                        </Grid>
                ))}

            </Grid>
        </>

    )

}

export default RecipeItems;