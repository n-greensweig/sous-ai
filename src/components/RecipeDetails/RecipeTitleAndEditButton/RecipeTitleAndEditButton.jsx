import RecipeTitle from "./RecipeTitle/RecipeTitle";
import RecipeEditButton from "./RecipeEditButton/RecipeEditButton";
function RecipeTitleAndEditButton({ title, isEditing, toggleEditing, isSmScreen, isXsScreen }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <RecipeTitle title={title} isSmScreen={isSmScreen} isXsScreen={isXsScreen} />
            <RecipeEditButton isEditing={isEditing} toggleEditing={toggleEditing} isSmScreen={isSmScreen} isXsScreen={isXsScreen} />
        </div>
    );
}

export default RecipeTitleAndEditButton;