import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';

function RecipeDetails() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const details = useSelector(store => store.recipeDetailsReducer);
    console.log(details);

    const title = details[0] ? details[0].title : '';
    const image = details[0] ? details[0].photo : '';
    const instructions = details[0] ? details[0].instructions : '';

    // Remove recipe from DB onClick of 'Delete Recipe' button
    const removeRecipe = id => dispatch({ type: 'REMOVE_RECIPE', payload: id });

    // use Effect fetching recipe info
    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: id });
    }, [id]);

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >
                <h1 style={{ color: "black" }}>{title}</h1>
                <Button variant="outlined" startIcon={<DeleteIcon />}
                    onClick={() => removeRecipe(id)} style={{ color: 'red' }}>
                    Delete recipe
                </Button>
            </div>
            <img src={`images/${image}`}
                height={'100'}
                width={'100'}
                style={{ borderRadius: '75%' }}
            />
            <p style={{ color: 'black' }}>{instructions}</p>

            <Button variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => history.push('/recipes')}>Back to recipes</Button>
        </>
    )

}

export default RecipeDetails;