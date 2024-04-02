import RecipePhotos from "../RecipePhotos/RecipePhotos";
import RecipeNotes from "../RecipeNotes/RecipeNotes";

function RecipeNotesAndPhoto({ imageList, isXsScreen, isSmScreen, comments, dispatch, id }) {
    return (
        <div id="notes-photo-container" style={{
            display: 'flex', flexDirection: isSmScreen || isXsScreen ? 'column' : 'row',
            marginTop: '30px',
            alignItems: 'flex-start', justifyContent: 'space-between', width: '100%',
        }}>
            <RecipePhotos imageList={imageList} isXsScreen={isXsScreen} isSmScreen={isSmScreen} />
            <RecipeNotes isXsScreen={isXsScreen} isSmScreen={isSmScreen} comments={comments} dispatch={dispatch} id={id} />
        </div>
    );
}

export default RecipeNotesAndPhoto;