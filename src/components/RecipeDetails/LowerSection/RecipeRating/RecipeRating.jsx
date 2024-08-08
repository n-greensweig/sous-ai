import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

function RecipeRating({ rating, setRating, id, dispatch}) {

    // Function to update rating
    const updateRating = (e, num) => {
        e.preventDefault();
        const action = { type: 'UPDATE_RATING', payload: { id, rating: num } };
        dispatch(action);
        setRating(num);
    };
    return (
        <div style={{marginBottom: '10%'}}>
            <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, }}>
                <p>Your rating</p>
                <span style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline', }} onClick={e => updateRating(e, 0)}>Clear</span>
            </div>
            <p style={{ cursor: 'pointer', marginTop: 0, }}>{!rating ? <span><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 1)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 2)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 3)} />
                <StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 5)} /></span> :
                rating === 1 ? <span><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 1)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 2)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 3)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 5)} /></span> :
                    rating === 2 ? <span><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 2)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 3)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 5)} /></span> :
                        rating === 3 ? <span><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 2)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 3)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 5)} /></span> :
                            rating === 4 ? <span><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 2)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 3)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 5)} /></span> :
                                <span><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 2)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 3)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 4)} /><StarIcon style={{ fill: '#df321b', }} onClick={e => updateRating(e, 5)} /></span>}
            </p>
        </div>
    )
}

export default RecipeRating;