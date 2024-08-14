import RecipeTitle from "./RecipeTitle/RecipeTitle";
import RecipeEditButton from "./RecipeEditButton/RecipeEditButton";
function RecipeTitleAndEditButton({ title, isEditing, toggleEditing, isSmScreen, isXsScreen, user }) {
    return (
        <div className='display-flex flex-column'>
            <RecipeTitle title={title} isSmScreen={isSmScreen} isXsScreen={isXsScreen} />
            {user.id ? <RecipeEditButton isEditing={isEditing} toggleEditing={toggleEditing} isSmScreen={isSmScreen} isXsScreen={isXsScreen} /> : null}
        </div>
    );
}

export default RecipeTitleAndEditButton;