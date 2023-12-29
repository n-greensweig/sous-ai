import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './RecipeItems.css';

function RecipeItems() {

    const dispatch = useDispatch();

    // Get recipes from Redux store
    const recipes = useSelector(store => store.recipeReducer);
    const title = recipes[0].title;

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (
        <>
            <h1>{title}</h1>
            <ul>
                {recipes.map(recipe => {
                    <li key={recipe.id}>{recipe.title}</li>
                })}
            </ul>
        </>
    )

}

export default RecipeItems;