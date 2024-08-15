import RecipePhotos from "./RecipePhotos/RecipePhotos";
import RecipeNotes from "./RecipeNotes/RecipeNotes";
import './RecipeNotesAndPhoto.css';
function RecipeNotesAndPhoto({ imageList, comments, dispatch, id }) {
    return (
        <div id='notes-photo-container display-flex align-fs justify-sb width-100'>
            <RecipePhotos imageList={imageList} />
            <RecipeNotes comments={comments} dispatch={dispatch} id={id} />
        </div>
    );
}

export default RecipeNotesAndPhoto;