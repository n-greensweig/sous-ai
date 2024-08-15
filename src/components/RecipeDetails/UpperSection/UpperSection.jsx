import RecipeTitleAndEditButton from "./RecipeTitleAndEditButton/RecipeTitleAndEditButton";
import DialogComponent from "../../DialogComponent/DialogComponent";
import RecipeProfilePhotoAndNotes from "./RecipeProfilePhotoAndNotes/RecipeProfilePhotoAndNotes";
import './UpperSection.css';
function UpperSection({ title, isEditing, toggleEditing, isLoading, onFileChange, imagePath, setTitle, id, saveEditedTitle, removeRecipe, imageList, image, notes, replaceWithCommas, setIsEditing, user }) {
    return (
        <section className='recipe-details__upper-section display-flex flex-row flex-wrap align-center'>
            <RecipeTitleAndEditButton title={title} isEditing={isEditing} toggleEditing={toggleEditing} user={user} />
            <DialogComponent isEditing={isEditing} setIsEditing={setIsEditing} toggleEditing={toggleEditing}
                isLoading={isLoading} onFileChange={onFileChange} imagePath={imagePath} title={title}
                setTitle={setTitle} id={id} saveEditedTitle={saveEditedTitle} removeRecipe={removeRecipe} />
            <RecipeProfilePhotoAndNotes imageList={imageList} image={image} notes={notes} replaceWithCommas={replaceWithCommas} />
        </section>
    );
}
export default UpperSection;