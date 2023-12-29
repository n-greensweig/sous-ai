import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function RecipeItems() {

    const dispatch = useDispatch();

    // Get recipes from Redux store
    const recipes = useSelector(store => store.recipeReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (
        <ul>
            {recipes.map(recipe => {
                <li key={recipe.id}>{recipe.title}</li>
            })}
        </ul>
    )

}

export default RecipeItems;