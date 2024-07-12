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
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import './RecipeIngredients.css';
function RecipeIngredients({ ingredients, servings, isSmScreen, isXsScreen, replaceWithCommas, isInGroceryList, title, id }) {

    const dispatch = useDispatch();
    const [inGroceryList, setInGroceryList] = useState(isInGroceryList);
    console.log(inGroceryList);
    const [groceryIngredients, setGroceryIngredients] = useState(ingredients);
    const [expanded, setExpanded] = useState([]);
    const groceryList = useSelector(store => store.groceryListReducer);

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
        dispatch({ type: 'FETCH_GROCERY_LIST' });
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
        // console.log(ingredientsString);
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
        const newGroceryItem = cleanIngredients(groceryList[idx].recipe_ingredients.replace(ingredient, ''));
        dispatch({ type: 'REMOVE_INGREDIENT_FROM_GROCERY_LIST', payload: { recipe_id, newGroceryItem } });
    };

    const removeRecipeFromGroceryList = (e, recipe_id) => {
        e.preventDefault();
        dispatch({ type: 'REMOVE_RECIPE_FROM_GROCERY_LIST', payload: { recipe_id: recipe_id } });
    };
    const handleExpandClick = (panel) => (event, isExpanded) => {
        setExpanded(prevExpanded => isExpanded ? [...prevExpanded, panel] : prevExpanded.filter(item => item !== panel));
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
                <DialogTitle><strong style={{ marginRight: '10px', }}>Your grocery list</strong> |
                    <span style={{ marginLeft: '10px', }}>
                        {groceryList.length === 1 ? `${groceryList.length} recipe` : `${groceryList.length} recipes`}
                    </span>
                </DialogTitle>
                <div style={{ margin: '10px' }}>
                    <ul>
                        {groceryList.length > 0 && groceryList.map((recipe, idx) => (
                            <Accordion key={idx} expanded={expanded.includes(idx)} onChange={handleExpandClick(idx)}>
                                <AccordionSummary
                                    aria-controls={`panel${idx}-content`}
                                    id={`panel${idx}-header`}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {expanded.includes(idx) ? <ExpandMoreIcon style={{ cursor: 'pointer', marginRight: '8px' }} /> : <KeyboardArrowRight style={{ cursor: 'pointer', marginRight: '8px' }} />}
                                        <h3 style={{ flex: 1 }}>{recipe.recipe_title}</h3>
                                        <p
                                            onClick={(e) => removeRecipeFromGroceryList(e, recipe.recipe_id)}
                                            style={{ cursor: 'pointer', marginLeft: '8px', textDecoration: 'underline', }}>Remove</p>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        {cleanIngredients(recipe.recipe_ingredients).map((ingredient, index) => (
                                            ingredient !== '' ?
                                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d3d3d3', }}>
                                                    <li style={{ padding: '10px 0' }}>{ingredient.trim().replace(/@/g, ',').split(',')[0]}</li>
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
        </div>
    );
}


export default RecipeIngredients;