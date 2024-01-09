import { Button, TextField } from "@mui/material";
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

    const details = useSelector(store => store.recipeDetailsReducer);
    const comments = useSelector(store => store.commentsReducer);
    const [title, setTitle] = useState(details ? details.title : '');

    const [newComment, setNewComment] = useState([]);

    const addComment = (comment, id) => {
        dispatch({ type: 'ADD_COMMENT', payload: { comment: comment, id: id } });
        dispatch({ type: 'FETCH_DETAILS', payload: id });
        setNewComment('');
    };

    const image = details ? details.photo : '';
    const instructions = details ? details.instructions : '';
    const ingredients = instructions ? instructions.split('Instructions:')[0].replace(/[,.]/g, '').split('-').filter(ingredient => ingredient.trim() !== '') : '';

    console.log(instructions ? ingredients[8].split('Instructions:')[0] : null);

    const recipeSteps = instructions ? instructions.split('Instructions:')[1].split(/\d+\./).filter(step => step.trim() !== '') : '';

    const saveEditedTitle = (e, id) => {
        e.preventDefault();
        if (title !== details?.title) {
            const action = { type: 'UPDATE_TITLE', payload: { id, title } };
            dispatch(action);
        }
        e.currentTarget.blur();
    };


    // Remove recipe from DB onClick of 'Delete Recipe' button
    const removeRecipe = id => {

        swal({
            title: 'Are you sure',
            text: 'Are you sure you want to delete this recipe from your recipe box?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
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
        if (details && details.title) {
            setTitle(details.title);
        }
    }, [details, instructions]);

    // use Effect fetching recipe info
    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: id });
    }, [id]);

    return (
        <>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >
                <Button variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => history.push('/recipes')} style={{ color: 'white', backgroundColor: '#orange', borderColor: 'white' }}></Button>
                <input style={{ color: "black" }}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    defaultValue={title}
                    onChange={e => setTitle(e.target.value.trim())}
                    onBlur={e => saveEditedTitle(e, id)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            saveEditedTitle(e, id);
                        }
                    }}
                />
                <Button variant="outlined" startIcon={<DeleteIcon sx={{ fill: 'white' }} />}
                    onClick={() => removeRecipe(id)} style={{ color: 'white', backgroundColor: 'red', borderColor: 'white' }}>
                    Delete recipe
                </Button>
            </div>
            <img src={`images/${image}`}
                height={'100'}
                width={'100'}
                style={{ borderRadius: '75%' }}
            />
            <p style={{ color: 'black' }}>Ingredients:</p>
            <ul>
                {instructions ? ingredients.map(ingredient => ingredient.length > 2 ? <li style={{ color: "black" }}>{ingredient.replace(' \n', '').trim()}</li> : '') : null}
            </ul>

            <p style={{ color: 'black' }}>Instructions:</p>
            <ol>
                {instructions ? recipeSteps.map(step => step.length > 2 ? <li style={{ color: "black" }}>{step}</li> : '') : null}
            </ol>

            {comments.map(comment => <p style={{ color: 'black' }}>{comment.comment}</p>)}

            <div style={{ display: 'flex' }}>
                <form onSubmit={() => addComment(newComment, id)}>
                    <TextField label="Add a comment" variant="outlined" value={newComment} onChange={e => setNewComment(e.target.value)} />
                    <Button variant="outlined"
                        type="submit"
                        style={{ color: 'orange', backgroundColor: 'lightgray', borderColor: 'white' }}
                    >Save comment</Button>
                </form>
            </div>
        </>

    )

}

export default RecipeDetails;