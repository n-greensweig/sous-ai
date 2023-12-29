import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './RecipeItems.css';

import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography } from "@mui/material";

function RecipeItems() {

    const dispatch = useDispatch();

    // Get recipes from Redux store
    const recipes = useSelector(store => store.recipeReducer);
    // const firstPhoto = recipes[0].photo;
    // console.log(firstPhoto);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (

        <>
        {/* <h1 color="black">{firstPhoto}</h1> */}
            <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} minHeight={'5vh'}>

                {recipes.map(recipe => (
                    <Grid item xs={10} md={6}>
                        <Paper elevation={5}>
                            <Card>
                                <CardMedia
                                component={'img'}
                                height={'194'}
                                image={`images/${recipe.photo}`}
                                alt={`${recipe.title} dish`}
                            />
                                <Typography style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    fontFamily: 'inter',
                                    color: 'black'
                                }}
                                    variant="h4"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2
                                    }}>{recipe.title}</Typography>
                            </Card>
                        </Paper>
                    </Grid>
                ))}

            </Grid>
        </>

    )

}

export default RecipeItems;