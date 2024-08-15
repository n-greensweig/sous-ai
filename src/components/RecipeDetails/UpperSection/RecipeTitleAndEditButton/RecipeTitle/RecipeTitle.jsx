import './RecipeTitle.css';
function RecipeTitle({ title, isSmScreen, isXsScreen}) {
    return (
        <p className='recipe-details__recipe-title text-center color-black bold'> {title ? title : ''}</p>
    );
}

export default RecipeTitle;