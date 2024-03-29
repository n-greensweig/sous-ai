import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

function RecipeRating({ rating, updateRating }) {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, }}>
                <p>Your rating</p>
                <span style={{ cursor: 'pointer', color: '#DAA520', textDecoration: 'underline', }} onClick={e => updateRating(e, 0)}>Clear</span>
            </div>
            <p style={{ cursor: 'pointer', marginTop: 0, }}>{!rating ? <span><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 1)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 2)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 3)} />
                <StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 5)} /></span> :
                rating === 1 ? <span><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 1)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 2)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 3)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 5)} /></span> :
                    rating === 2 ? <span><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 2)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 3)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 5)} /></span> :
                        rating === 3 ? <span><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 2)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 3)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 5)} /></span> :
                            rating === 4 ? <span><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 2)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 3)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 4)} /><StarBorderIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 5)} /></span> :
                                <span><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 1)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 2)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 3)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 4)} /><StarIcon style={{ fill: '#DAA520', }} onClick={e => updateRating(e, 5)} /></span>}
            </p>
        </>
    )
}

export default RecipeRating;