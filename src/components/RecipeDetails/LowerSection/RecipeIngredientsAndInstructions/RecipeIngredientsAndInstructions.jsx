import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions/RecipeInstructions";
import './RecipeIngredientsAndInstructions.css';
function RecipeIngredientsAndInstructions({ ingredients, instructions, servings, replaceWithCommas, isInGroceryList, title, id, user }) {
    return (
        <div className={`ingredients-instructions display-flex mobile-only-column mobile-only-align-center`}>
            <RecipeIngredients ingredients={ingredients} servings={servings} replaceWithCommas={replaceWithCommas} 
            isInGroceryList={isInGroceryList} title={title} id={id} user={user} />
            <RecipeInstructions instructions={instructions} replaceWithCommas={replaceWithCommas} />
        </div>
    );
}

export default RecipeIngredientsAndInstructions;