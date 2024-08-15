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
function RecipeIngredients({ ingredients, servings, isSmScreen, isXsScreen, replaceWithCommas, isInGroceryList, title, id, user }) {

    const dispatch = useDispatch();
    const [inGroceryList, setInGroceryList] = useState(isInGroceryList);
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
        if (typeof user.id === 'Number') {
            dispatch({ type: 'FETCH_GROCERY_LIST' });
            setInGroceryList(isInGroceryList);
        }
    }, [user.id, dispatch, isInGroceryList, groceryIngredients]);


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
        <div className='recipe-details__ingredients'>
            <p className='recipe-details__ingredients-subheader color-black bold'>
                <span>INGREDIENTS</span></p>
            <p className='recipe-details__ingredients--p-servings color-black'><strong>Yield:</strong> {!servings ? '' : isNaN(servings) ? servings : <span>{servings} servings</span>}</p>
            <ul className='recipe-details__ingredients-list list-none'>
                {Array.isArray(ingredients) && ingredients.map((ingredient, index) => ingredient.length > 2 ? <li key={index} className='recipe-details__ingredients--li color-black'>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
            </ul>
            {typeof user.id === 'Number' ? <><p>{inGroceryList ? <span>Added! <button className='pointer underline' onClick={e => toggleViewing(e)}>Open grocery list</button></span> :
                <button className='underline' onClick={e => updateGroceryList(e)}>Add ingredients to your grocery list</button>}</p>
                <Dialog open={isViewing}
                    onClose={e => toggleViewing(e)}
                    maxWidth="sm" // Set the maximum width to large
                    fullWidth={true}
                    PaperProps={{ component: 'form', }}>
                    <DialogTitle><strong className='recipe-details__p--your-grocery-list'>Your grocery list</strong> |
                        <span>
                            {groceryList.length === 1 ? `${groceryList.length} recipe` : `${groceryList.length} recipes`}
                        </span>
                    </DialogTitle>
                    <div className='recipe-details__grocery-list-wrapper'>
                        <ul>
                            {groceryList.length > 0 && groceryList.map((recipe, idx) => (
                                <Accordion key={idx} expanded={expanded.includes(idx)} onChange={handleExpandClick(idx)}>
                                    <AccordionSummary aria-controls={`panel${idx}-content`} id={`panel${idx}-header`}>
                                        <div className='display-flex align-center width-100'>
                                            {expanded.includes(idx) ? <ExpandMoreIcon className='pointer' /> : <KeyboardArrowRight className='pointer' />}
                                            <h3 className='flex-1'>{recipe.recipe_title}</h3>
                                            <p className='recipe-details__grocery-list--p-remove pointer underline'
                                                onClick={(e) => removeRecipeFromGroceryList(e, recipe.recipe_id)}>Remove</p>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul>
                                            {cleanIngredients(recipe.recipe_ingredients).map((ingredient, index) => (
                                                ingredient !== '' ?
                                                    <div key={index} className='recipe-details__grocery-list--ingredient display-flex justify-sb'>
                                                        <li className='recipe-details__grocery-list--ingredient-li'>{ingredient.trim().replace(/@/g, ',').split(',')[0]}</li>
                                                        <ClearIcon
                                                            onClick={(e) => removeIngredientFromGroceryList(e, recipe.recipe_id, ingredient, idx)}
                                                        />
                                                    </div> : null))}
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>))}
                        </ul>
                    </div>
                </Dialog></> : null}
        </div>);
}
export default RecipeIngredients;