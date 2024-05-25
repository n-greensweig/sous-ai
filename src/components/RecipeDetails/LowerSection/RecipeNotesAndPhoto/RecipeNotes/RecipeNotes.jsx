import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import swal from 'sweetalert';

function RecipeNotes({ isXsScreen, isSmScreen, comments, dispatch, id }) {

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
        <div id="recipe-notes" style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            margin: isSmScreen || isXsScreen ? '0 10% 5% 10%' : null,
            marginRight: '50px',
            justifyContent: 'flex-end', alignSelf: 'flex-start',
            width: isSmScreen || isXsScreen ? '80%' : null,
        }}>
            <p style={{
                color: 'black', marginTop: isSmScreen || isXsScreen ? '30px' : '0px',
                paddingBottom: '0px',
                fontWeight: 'bold',
                borderTop: '2px solid black',
                textAlign: isSmScreen || isXsScreen ? 'left' : null
            }}>RECIPE NOTES</p>

            {
                comments.map(comment => <p
                    id={comment.id}
                    style={{
                        color: 'black',
                        borderBottom: '1px solid lightgray',
                        marginTop: '0px',
                        paddingTop: '0px',
                        padding: '10px 0px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>
                    <span style={{ width: '65%' }}>{comment.comment}</span>
                    <span style={{ fontSize: '.8rem', }}><i>Commented on {formatDate(comment.commented_at)}</i></span>
                    <Button style={{
                        padding: '0px', alignSelf: 'flex-start',
                        display: 'flex', flexDirection: 'row', justifyContent: 'end'
                    }}
                        onClick={() => removeComment(comment.id, id)}
                    >
                        <DeleteIcon style={{ fontSize: '', padding: '0px' }} />
                    </Button>
                </p>)
            }
            <div style={{
                display: 'flex', flexDirection: 'row', width: '100%'
            }}>
                <form style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} onSubmit={() => addComment(newComment, id)}>

                    <TextField label="Add a recipe note" variant="outlined"
                        className="custom-textfield"
                        style={{ width: '90%', }}
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)} />

                    <Button variant="outlined"
                        type="submit"
                        style={{ color: '#DAA520', border: '1px solid #DAA520', borderColor: '#DAA520' }}
                    >Save note</Button>
                </form>
            </div>
        </div>
    );
}

export default RecipeNotes;