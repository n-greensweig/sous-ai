import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function RecipeDetails() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const details = useSelector(store => store.recipeDetailsReducer);
    console.log(details);

    const title = details[0] ? details[0].title : '';
    const image = details[0] ? details[0].photo : '';
    const instructions = details[0] ? details[0].instructions : '';

    // use Effect fetching recipe info
    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: id });
    }, [id]);

    return (
        <>
            <h1 style={{ color: "black" }}>{title}</h1>
            <img src={`images/${image}`} />
            <p style={{ color: 'black' }}>{instructions}</p>

            <Button variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => history.push('/recipes')}>Back to recipes</Button>
        </>
    )

}

export default RecipeDetails;