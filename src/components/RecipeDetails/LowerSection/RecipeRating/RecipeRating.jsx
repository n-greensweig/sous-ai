import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import './RecipeRating.css';
function RecipeRating({ rating, setRating, id, dispatch }) {
    // Function to update rating
    const updateRating = (e, num) => {
        e.preventDefault();
        const action = { type: 'UPDATE_RATING', payload: { id, rating: num } };
        dispatch(action);
        setRating(num);
    };
    return (
        <div className='recipe-details__recipe-rating-container'>
            <div className='recipe-details__recipe-rating-container--top-section'>
                <p>Your rating</p>
                <span className='recipe-details__reicpe-rating-container--clear-button' onClick={e => updateRating(e, 0)}>Clear</span>
            </div>
            <p className='recipe-rating'>{!rating ? <span><StarBorderIcon onClick={e => updateRating(e, 1)} /><StarBorderIcon onClick={e => updateRating(e, 2)} /><StarBorderIcon onClick={e => updateRating(e, 3)} />
                <StarBorderIcon onClick={e => updateRating(e, 4)} /><StarBorderIcon onClick={e => updateRating(e, 5)} /></span> :
                rating === 1 ? <span><StarIcon onClick={e => updateRating(e, 1)} /><StarBorderIcon onClick={e => updateRating(e, 2)} /><StarBorderIcon onClick={e => updateRating(e, 3)} /><StarBorderIcon onClick={e => updateRating(e, 4)} /><StarBorderIcon onClick={e => updateRating(e, 5)} /></span> :
                    rating === 2 ? <span><StarIcon onClick={e => updateRating(e, 1)} /><StarIcon onClick={e => updateRating(e, 2)} /><StarBorderIcon onClick={e => updateRating(e, 3)} /><StarBorderIcon onClick={e => updateRating(e, 4)} /><StarBorderIcon onClick={e => updateRating(e, 5)} /></span> :
                        rating === 3 ? <span><StarIcon onClick={e => updateRating(e, 1)} /><StarIcon onClick={e => updateRating(e, 2)} /><StarIcon onClick={e => updateRating(e, 3)} /><StarBorderIcon onClick={e => updateRating(e, 4)} /><StarBorderIcon onClick={e => updateRating(e, 5)} /></span> :
                            rating === 4 ? <span><StarIcon onClick={e => updateRating(e, 1)} /><StarIcon onClick={e => updateRating(e, 2)} /><StarIcon onClick={e => updateRating(e, 3)} /><StarIcon onClick={e => updateRating(e, 4)} /><StarBorderIcon onClick={e => updateRating(e, 5)} /></span> :
                                <span><StarIcon onClick={e => updateRating(e, 1)} /><StarIcon onClick={e => updateRating(e, 2)} /><StarIcon onClick={e => updateRating(e, 3)} /><StarIcon onClick={e => updateRating(e, 4)} /><StarIcon onClick={e => updateRating(e, 5)} /></span>}
            </p>
        </div>
    )
}

export default RecipeRating;