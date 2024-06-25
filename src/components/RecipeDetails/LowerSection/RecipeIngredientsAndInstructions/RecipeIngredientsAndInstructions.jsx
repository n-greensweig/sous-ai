import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipeInstructions from "./RecipeInstructions/RecipeInstructions";

function RecipeIngredientsAndInstructions({ ingredients, instructions, servings, isXsScreen, isSmScreen, replaceWithCommas, isInGroceryList }) {
    return (
        <div className="ingredients-instructions" style={{
            display: 'flex',
            flexDirection: isSmScreen || isXsScreen ? 'column' : 'row',
            textAlign: isSmScreen || isXsScreen ? 'center' : null,
        }}>
            <RecipeIngredients ingredients={ingredients} servings={servings} isXsScreen={isXsScreen} isSmScreen={isSmScreen} replaceWithCommas={replaceWithCommas} isInGroceryList={isInGroceryList} />
            <RecipeInstructions instructions={instructions} isXsScreen={isXsScreen} isSmScreen={isSmScreen} replaceWithCommas={replaceWithCommas} />
        </div>
    );
}

export default RecipeIngredientsAndInstructions;