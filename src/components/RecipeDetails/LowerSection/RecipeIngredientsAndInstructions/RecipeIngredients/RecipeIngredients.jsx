import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import './RecipeIngredients.css';
function RecipeIngredients({ ingredients, servings, isSmScreen, isXsScreen, replaceWithCommas, isInGroceryList, title, id }) {

    const dispatch = useDispatch();
    const [inGroceryList, setInGroceryList] = useState(isInGroceryList);
    // ! Needs to be updated to reflect new grocery list ingredients
    const [groceryIngredients, setGroceryIngredients] = useState(ingredients);
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

    // GET request to get recipe details for those in grocery list
    useEffect(() => {
        dispatch({ type: 'FETCH_GROCERY_LIST' });
        setInGroceryList(isInGroceryList);
    }, [dispatch, isInGroceryList, groceryIngredients]);


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


    const removeIngredientFromGroceryList = (e, recipe_id, ingredient, idx) => {
        e.preventDefault();
        const newGroceryItem = groceryList[idx].recipe_ingredients.replace(ingredient, '');
        dispatch({ type: 'REMOVE_INGREDIENT_FROM_GROCERY_LIST', payload: { recipe_id, newGroceryItem } });
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
                maxWidth="sm" // Set the maximum width to large
                fullWidth={true}
                PaperProps={{ component: 'form', }}>
                <DialogTitle>Your grocery list</DialogTitle>
                <div style={{ margin: '10px' }}>
                    <ul>
                        {groceryList.length > 0 && groceryList.map((recipe, idx) => (
                            <Accordion key={idx}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${idx}-content`}
                                    id={`panel${idx}-header`}
                                >
                                    <h3>{recipe.recipe_title}</h3>
                                </AccordionSummary>
                                {/* Needs to be updated to reflect new grocery list ingredients */}
                                <AccordionDetails>
                                    <ul>
                                        {cleanIngredients(recipe.recipe_ingredients)
                                            //    .slice(2)
                                            .map((ingredient, index) => (
                                                !/\\\\"/.test(ingredient) ?
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d3d3d3', }}>
                                                        <li key={index} style={{ padding: '10px 0' }}>{ingredient.trim().replace(/@/g, ',').split(',')[0]}</li>
                                                        <ClearIcon style={{ padding: '10px 0' }}
                                                            onClick={(e) => removeIngredientFromGroceryList(e, recipe.recipe_id, ingredient, idx)}
                                                        />
                                                    </div> : null
                                            ))}
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </ul>
                </div>
            </Dialog>
        </div >
    );
}


export default RecipeIngredients;