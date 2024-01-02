import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';
import { useState } from "react";

function RecipeDetails() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();
    console.log('id', id);

    const details = useSelector(store => store.recipeDetailsReducer);
    const [title, setTitle] = useState(details[0] ? details[0].title : '');
    console.log(details);

    const realTitle = details[0] ? details[0].title : '';
    const image = details[0] ? details[0].photo : '';
    const instructions = details[0] ? details[0].instructions : '';

    const saveEditedTitle = (e, id) => {
        e.preventDefault();
        const action = { type: 'UPDATE_TITLE', payload: { id: id, title: title } };
        dispatch(action);
    };


    // Remove recipe from DB onClick of 'Delete Recipe' button
    const removeRecipe = id => {

        swal({
            title: 'Are you sure',
            text: 'Are you sure you want to delete this recipe from your recipe box?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        })
            .then(willDelete => {
                if (willDelete) {
                    console.log(id);
                    dispatch({ type: 'REMOVE_RECIPE', payload: id });
                    swal({
                        title: 'Deleted!',
                        text: 'This recipe has been deleted',
                        icon: 'success',
                        timer: 1000,
                    });
                    setTimeout(() => {
                    }, 1000);
                    history.push('/recipes');
                }
            });

    };

    // use Effect fetching recipe info
    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: id });
    }, [id]);

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >
                <h1 style={{ color: "black" }}
                    contentEditable={true}
                    suppressContentEditableWarning
                    onInput={e => {
                        if (e.currentTarget.textContent !== '') {
                            setTitle(e.currentTarget.textContent);
                        }
                    }}
                    onBlur={e => saveEditedTitle(e, id)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            saveEditedTitle(e, id);
                        }
                    }}
                >{title}</h1>
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