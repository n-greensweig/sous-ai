import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import swal from 'sweetalert';
import './RecipeNotes.css';
function RecipeNotes({ comments, dispatch, id }) {
    const [newComment, setNewComment] = useState([]);
    // Function to add a comment to a recipe
    const addComment = (comment, id) => {
        if (comment.trim()) {
            dispatch({ type: 'ADD_COMMENT', payload: { comment: comment, id: id } });
            dispatch({ type: 'FETCH_DETAILS', payload: id });
            setNewComment('');
        }
    };
    // Format date in M/D/YYYY format
    const formatDate = date => {
        const newDate = new Date(date);
        const m = newDate.getMonth() + 1;
        const d = newDate.getDate();
        const y = newDate.getFullYear();
        return `${m}/${d}/${y}`;
    };
    // Remove comment from DB onClick of button
    const removeComment = (recipeId, id) => {
        swal({
            title: 'Are you sure',
            text: 'Are you sure you want to delete this comment from your recipe?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    dispatch({ type: 'REMOVE_COMMENT', payload: { recipeId: recipeId, id } });
                    dispatch({ type: 'FETCH_DETAILS', payload: id });
                }
            });
    };
    return (
        <div id='recipe-notes-container' className='display-flex flex-column justify-fe'>
            <p className='recipe-notes__subheader pb-0 bold'>RECIPE NOTES</p>

            {comments.map(comment => <p key={comment.id} id={comment.id}
                    className='recipe-details__comments-wrapper display-flex flex-row justify-sb align-fs color-black mt-0 pt-0'>
                    <span className='recipe-details__comments--comment-text'>{comment.comment}</span>
                    <span className='recipe-details__comments--comment-timestamp'><i>Commented on {formatDate(comment.commented_at)}</i></span>
                    <Button className='recipe-details__comments--button-delete display-flex flex-row justify-end' onClick={() => removeComment(comment.id, id)}>
                        <DeleteIcon className='recipe-details__comments--icon-delete' />
                    </Button>
                </p>)
            }
            <div className='width-100 display-flex flex-row'>
                <form className='width-100 display-flex flex-row justify-sb' onSubmit={() => addComment(newComment, id)}>
                    <TextField label='Add a recipe note' variant='outlined'
                        className='recipe-details__comments--text-field custom-textfield' value={newComment}
                        onChange={e => setNewComment(e.target.value)} />
                    <Button className='recipe-details__comments--button-save' variant='outlined'
                        type='submit'>Save note</Button>
                </form>
            </div>
        </div>
    );
}
export default RecipeNotes;