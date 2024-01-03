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
        setNewComment('');
    };

    const image = details ? details.photo : '';
    const instructions = details ? details.instructions : '';

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
    }, [details]);

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
                    onClick={() => history.push('/recipes')} style={{ color: 'white', backgroundColor: 'orange', borderColor: 'white' }}>Back to recipes</Button>
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
                <Button variant="outlined" startIcon={<DeleteIcon />}
                    onClick={() => removeRecipe(id)} style={{ color: 'white', backgroundColor: 'red', borderColor: 'white' }}>
                    Delete recipe
                </Button>
            </div>
            <img src={`images/${image}`}
                height={'100'}
                width={'100'}
                style={{ borderRadius: '75%' }}
            />
            <p style={{ color: 'black' }}>{instructions}</p>
            {comments.map(comment => <p style={{ color: 'black' }}>{comment.comment}</p>)}

            <div style={{ display: 'flex' }}>
                <TextField label="Add a comment" variant="outlined" onChange={e => setNewComment(e.target.value)} />
                <Button variant="outlined"
                    onClick={() => addComment(newComment, id)}
                    style={{ color: 'orange', backgroundColor: 'lightgray', borderColor: 'white' }}
                >Save comment</Button>
            </div>
        </>

    )

}

export default RecipeDetails;