import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeGridCards.css';
function RecipeGridCards({ recipes, listName, path }) {
    return (
        <div className={`recipe-grid-container ${path !== '/recipe-box' ? 'grid' : 'flex'}
        ${path === '/recipe-box' || path === '/recipe-box/cooked' || path === '/recipe-box/recent' ?
                'mt-175' : 'mt-225'}
        `}>
            {recipes.map((recipe, index) => (
                // index > 0 ? null :
                    <div className='recipe-card' key={index}>
                        <RecipeCard key={recipe.id} recipe={recipe} index={index} listName={listName} />
                    </div>

            ))}
        </div>
    );
}

export default RecipeGridCards;