import RecipeTitleAndEditButton from "./RecipeTitleAndEditButton/RecipeTitleAndEditButton";
import DialogComponent from "../../DialogComponent/DialogComponent";
import RecipeProfilePhotoAndNotes from "./RecipeProfilePhotoAndNotes/RecipeProfilePhotoAndNotes";

function UpperSection({ title, isEditing, toggleEditing, isSmScreen, isXsScreen, isLoading, onFileChange, imagePath, setTitle, id, saveEditedTitle, removeRecipe, imageList, image, notes, replaceWithCommas, setIsEditing, user }) {
    return (
        <section className="upper-section" style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            flexWrap: 'wrap', justifyContent: isSmScreen || isXsScreen ? 'center' : 'space-between',
            paddingTop: isXsScreen || isSmScreen ? '13%' : null
        }}>
            <RecipeTitleAndEditButton title={title} isEditing={isEditing} toggleEditing={toggleEditing} isSmScreen={isSmScreen} isXsScreen={isXsScreen} user={user} />
            <DialogComponent isEditing={isEditing} setIsEditing={setIsEditing} toggleEditing={toggleEditing}
                isLoading={isLoading} onFileChange={onFileChange} imagePath={imagePath} title={title}
                setTitle={setTitle} id={id} saveEditedTitle={saveEditedTitle} removeRecipe={removeRecipe} />
            <RecipeProfilePhotoAndNotes isXsScreen={isXsScreen} isSmScreen={isSmScreen} imageList={imageList} image={image} notes={notes} replaceWithCommas={replaceWithCommas} />
        </section>
    )
}

export default UpperSection;