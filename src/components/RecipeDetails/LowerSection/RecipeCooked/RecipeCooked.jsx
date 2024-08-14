import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './RecipeCooked.css';
function RecipeCooked({ isCooked, setIsCooked, id, dispatch }) {
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
            <p className='recipe-details__p--cooked pointer'>
                {!isCooked ? (<span className='display-flex align-center' onClick={e => toggleCooked(e, true)}>
                    <CheckCircleOutlineIcon className='fill-black' /> Mark as cooked
                </span>) : (<span onClick={e => toggleCooked(e, false)}>
                    <CheckCircleIcon className='fill-black' /> Yes I have
                </span>)}
            </p>
        </div>
    )
}
export default RecipeCooked;