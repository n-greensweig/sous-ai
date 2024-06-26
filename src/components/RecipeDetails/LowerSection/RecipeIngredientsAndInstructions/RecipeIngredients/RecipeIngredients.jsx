import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { BarLoader } from 'react-spinners';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './RecipeIngredients.css';

function RecipeIngredients({ ingredients, servings, isSmScreen, isXsScreen, replaceWithCommas, isInGroceryList, title, id }) {

    const dispatch = useDispatch();
    const [inGroceryList, setInGroceryList] = useState(isInGroceryList);
    const groceryList = useSelector(store => store.groceryList);

    // State to toggle the editing mode for the recipe details
    const [isViewing, setIsViewing] = useState(false);

    // Function to toggle the editing mode for the recipe details
    const toggleViewing = e => {
        if (isViewing) {
            setIsViewing(false);
        } else {
            setIsViewing(true);
        }
    };

    const updateGroceryList = e => {
        e.preventDefault();
        setInGroceryList(!inGroceryList);
        dispatch({ type: 'UPDATE_GROCERY_LIST', payload: { id, ingredients, title, isInGroceryList: !isInGroceryList } });
    };

    // const removeFromGroceryList = e => {
    //     e.preventDefault();
    //     setInGroceryList(prevState => {
    //         const newState = !prevState;
    //         dispatch({ type: 'REMOVE_FROM_GROCERY_LIST', payload: { id, ingredients, title, isInGroceryList: !isInGroceryList } });
    //         return newState;
    //     });
    // };

    // GET request to get recipe details for those in grocery list
    useEffect(() => {
        dispatch({ type: 'FETCH_GROCERY_LIST' });
        setInGroceryList(isInGroceryList);
    }, [dispatch, isInGroceryList]);

    const cleanIngredients = (ingredientsString) => {
        if (!ingredientsString) return [];
        const cleanedString = ingredientsString
            .replace(/\\/g, '') // Remove backslashes
            .replace(/\"/g, '') // Remove quotes

        const ingredientsArray = cleanedString.split(','); // Split by comma into an array

        if (ingredientsArray.length > 0) {
            // Remove leading curly brace from the first item
            ingredientsArray[0] = ingredientsArray[0].replace(/^{/, '');
            // Remove trailing curly brace from the last item
            ingredientsArray[ingredientsArray.length - 1] = ingredientsArray[ingredientsArray.length - 1].replace(/}$/, '');
        }

        return ingredientsArray;
    };

    return (
        <div className="ingredients" style={{
            borderTop: isSmScreen || isXsScreen ? '2px solid black' : null,
            marginRight: isSmScreen || isXsScreen ? null : '30px', alignSelf: isSmScreen || isXsScreen ? 'center' : null,
            width: isSmScreen || isXsScreen ? '80%' : null
        }}>
            <p style={{
                color: 'black', fontWeight: 'bold', marginTop: isSmScreen || isXsScreen ? '10px' : null,
                textAlign: isSmScreen || isXsScreen ? 'left' : null, marginTop: isSmScreen || isXsScreen ? '0px' : null
            }}><span style={{
                borderTop: isSmScreen || isXsScreen ? null : '2px solid black',
                fontSize: '1.1rem'
            }}>INGREDIENTS</span></p>

            <p style={{ color: 'black', textAlign: isSmScreen || isXsScreen ? 'left' : null }}><strong>Yield:</strong> {!servings ? '' : isNaN(servings) ? servings : <span>{servings} servings</span>}</p>

            <ul style={{ listStyleType: 'none', paddingLeft: '0px', textAlign: isSmScreen || isXsScreen ? 'left' : null }}>
                {Array.isArray(ingredients) && ingredients.map((ingredient, index) => ingredient.length > 2 ? <li key={index} style={{ color: "black", marginBottom: '10px' }}>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
            </ul>
            <p>{inGroceryList ? <span>Added!<button className='link' onClick={e => toggleViewing(e)}>Open grocery list</button></span> :
                <button onClick={e => updateGroceryList(e)}>Add ingredients to your grocery list</button>}</p>
            <Dialog open={isViewing}
                onClose={e => toggleViewing(e)}
                PaperProps={{
                    component: 'form',
                    // onSubmit: (event) => {
                    //     event.preventDefault();
                    //     saveEditedTitle(event, id);
                    //     toggleEditing(event);
                    // },
                }}>
                <DialogTitle>Your grocery list</DialogTitle>
                <div style={{ margin: '10px' }}>
                    <ul>
                        {groceryList.length > 0 && groceryList.map((recipe, idx) => (
                            <div key={idx}>
                                <h3>{recipe.recipe_title}</h3>
                                <ul>
                                    {cleanIngredients(recipe.recipe_ingredients).map((ingredient, index) => (
                                        <li key={index}>{ingredient.trim().replace(/@/g, ',')}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
            {/* <DialogActions>
                {!isLoading && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div className="first-row" style={{ width: '100%', marginBottom: '20px' }}>
                        <Button style={{ width: '50%', color: 'gray' }} onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button variant="outlined" type="submit" style={{ width: '50%', color: '#DAA520', borderColor: '#DAA520' }}>Save</Button>
                    </div>
                    <div className="second-row" style={{ width: '100%' }}>
                        <Button variant="outlined" startIcon={<DeleteIcon style={{ fill: '#DC143C' }} />}
                            onClick={() => removeRecipe(id)} style={{ color: '#DC143C', borderColor: '#DC143C', flexGrow: '1', width: '100%', alignSelf: 'stretch' }}>
                            Delete Recipe
                        </Button>
                    </div>
                </div>}
            </DialogActions> */}
        </Dialog>
        </div >
    );
}

export default RecipeIngredients;