import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function RecipeCooked({ isCooked, setIsCooked, id, dispatch}) {
    // Function to toggle the cooked state of the recipe
    const toggleCooked = (e, cooked) => {
        e.preventDefault();
        setIsCooked(cooked);
        const action = { type: 'UPDATE_COOKED', payload: { id, isCooked: cooked } };
        dispatch(action);
    };
    return (
        <div>
            <strong>Have you cooked this?</strong>
            <p style={{ cursor: 'pointer', marginBottom: '10%' }}>
                {!isCooked ? (
                    <span onClick={e => toggleCooked(e, true)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircleOutlineIcon style={{ fontSize: '200%', fill: 'black' }} /> Mark as cooked
                    </span>
                ) : (
                    <span onClick={e => toggleCooked(e, false)} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircleIcon style={{ fontSize: '200%', fill: 'black', }} /> Yes I have
                    </span>
                )}
            </p>
        </div>
    )
}

export default RecipeCooked;