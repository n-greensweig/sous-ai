import './RecipePhotos.css';
function RecipePhotos({ imageList }) {
    return (
        <div className='recipe-photos__container display-flex flex-column justify-fe'>
            <p className='recipe-notes__subheader color-black mt-0 pb-0 bold'>RECIPE PHOTOS</p>
            <div className='recipe-details__user-photos display-flex flex-row flex-wrap align-center justify-fs of-cover'>
                {imageList.length > 0 ?
                    (imageList.map(image => (
                        <img key={image.id} className='recipe-details__user-photo' src={image.path} alt='Recipe photo' />))) : 
                        (<p className='recipe-details__p--no-images'>No images yet</p>)}
            </div>
        </div>
    );
}
export default RecipePhotos;