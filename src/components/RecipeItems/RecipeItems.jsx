import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './RecipeItems.css';

import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography } from "@mui/material";

function RecipeItems() {

    const dispatch = useDispatch();

    // Get recipes from Redux store
    const recipes = useSelector(store => store.recipeReducer);

    const handleClick = (e, id) => {

        e.preventDefault();
        console.log(id);

    };

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (

        <>
            {/* <h1 color="black">{firstPhoto}</h1> */}
            <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} minHeight={'5vh'}>

                {recipes.map(recipe => (
                    <Grid item xs={10} md={6} onClick={e => handleClick(e, recipe.id)} >
                        <Paper elevation={5}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component={'img'}
                                        height={'194'}
                                        image={`images/${recipe.photo}`}
                                        alt={`${recipe.title} dish`}
                                    />
                                    <CardContent>
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
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Paper>
                    </Grid>
                ))}

            </Grid>
        </>

    )

}

export default RecipeItems;