import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions/RecipeInstructions";
import './RecipeIngredientsAndInstructions.css';
function RecipeIngredientsAndInstructions({ ingredients, instructions, servings, isXsScreen, isSmScreen, replaceWithCommas, isInGroceryList, title, id, user }) {
    return (
        <div className={`ingredients-instructions display-flex mobile-only-column mobile-only-align-center`}>
            <RecipeIngredients ingredients={ingredients} servings={servings} isXsScreen={isXsScreen} isSmScreen={isSmScreen}
                replaceWithCommas={replaceWithCommas} isInGroceryList={isInGroceryList} title={title} id={id} user={user} />
            <RecipeInstructions instructions={instructions} isXsScreen={isXsScreen} isSmScreen={isSmScreen} replaceWithCommas={replaceWithCommas} />
        </div>
    );
}

export default RecipeIngredientsAndInstructions;