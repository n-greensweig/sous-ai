import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function RecipeCooked({ isCooked, toggleCooked }) {
    return (
        <div>
            <strong>Have you cooked this?</strong>
            <p style={{ cursor: 'pointer' }}>
                {!isCooked ? (
                    <span onClick={e => toggleCooked(e, true)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircleOutlineIcon style={{ fontSize: '200%', fill: 'black' }} /> Mark as cooked
                    </span>
                ) : (
                    <span onClick={e => toggleCooked(e, false)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircleIcon style={{ fontSize: '200%', fill: '#DAA520' }} /> Yes I have
                    </span>
                )}
            </p>
        </div>
    )
}

export default RecipeCooked;