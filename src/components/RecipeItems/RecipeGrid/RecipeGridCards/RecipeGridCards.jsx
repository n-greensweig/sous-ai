import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeGridCards.css';
function RecipeGridCards({ recipes, listName }) {
    return (
        <div className="recipe-grid-container">
            {recipes.map((recipe, index) => (
                <div className="recipe-card" key={index}>
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} listName={listName} />
                </div>
            ))}
        </div>
    );
}

export default RecipeGridCards;