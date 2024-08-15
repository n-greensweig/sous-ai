import './RecipeProfilePhotoAndNotes.css';
function RecipeProfilePhotoAndNotes({ imageList, image, notes, replaceWithCommas}) {
    return (
        <div className='recipe-details__profile-photo-and-notes-container display-flex flex-column height-auto'>
            <img
                key={imageList.length > 0 ? imageList[0].id : null} className="profile-photo"
                src={imageList.length > 0 ? imageList[0].path : `${image}`
                } alt='Recipe photo' />
            <div className="notes">
                <p className='recipe-details__profile-photo-and-notes--p-notes color-black justify-se'>{notes ? replaceWithCommas(notes) : ''}</p>
            </div>
        </div>
    );
}
export default RecipeProfilePhotoAndNotes;