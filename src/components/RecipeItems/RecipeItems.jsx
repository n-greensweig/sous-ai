import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './RecipeItems.css';

function RecipeItems() {

    const dispatch = useDispatch();

    // Get recipes from Redux store
    const recipes = useSelector(store => store.recipeReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (
        <>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id} style={{color: 'black'}}><img src={`images/${recipe.photo}`} width={100} height={100} /> 
                    {recipe.title} {recipe.instructions}
                    </li>
                ))}
            </ul>
        </>
    )

}

export default RecipeItems;