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
                        <Grid item className='card' xs={5} md={3} onClick={() => handleClick(recipe.id)} 
                        style={{
                            padding: '0px',
                            margin: '4px'
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
                                            <CardContent className="card-content" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>

                                                <Typography className="title" style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    fontFamily: 'inter',
                                                    color: 'black',
                                                    fontSize: '18px',
                                                    margin: '0px'
                                                }}
                                                    variant="h4"
                                                    component="div"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        mb: 2
                                                    }}>{recipe.title}</Typography>
                                                
                                                <Typography className="notes" style={{
                                                    alignItems: 'baseline',
                                                    justifyContent: 'center',
                                                    height: '100%',
                                                    fontFamily: 'inter',
                                                    color: 'black',
                                                    fontSize: '13px',
                                                    marginTop: '5px',
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