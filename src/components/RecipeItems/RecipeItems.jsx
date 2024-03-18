import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './RecipeItems.css';

import { Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from '../Header/Header';

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

    const replaceWithCommas = str => str.replace(/@/g, ',');

    document.title = 'Saved Recipes';

    // Check the screen size for responsive design
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (

        <div style={{ paddingBottom: isSmScreen || isXsScreen ? '28%' : '8%', marginTop: isSmScreen || isXsScreen ? '7%' : '5%' }}>
            <Header text={'Saved Recipes'} />
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

                {recipes.map(recipe => (
                    <Grid item className='card' xs={11} md={3} onClick={() => handleClick(recipe.id)}
                        style={{
                            padding: '0px',
                            margin: '4px',
                        }}
                    >
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
                    </Grid>
                ))}

            </Grid>
        </div>

    )

}

export default RecipeItems;