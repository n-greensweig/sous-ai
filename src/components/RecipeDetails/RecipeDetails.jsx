import { Button, TextField, useTheme, useMediaQuery } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaArrowTurnDown, FaArrowTurnUp, FaTurnUp } from "react-icons/fa6";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';
import { useState } from "react";

import axios from "axios";

import Header from "../Header/Header";
import styled from "@emotion/styled";

function RecipeDetails() {

    const [imagePath, setImagePath] = useState('');

    const [imageList, setImageList] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const details = useSelector(store => store.recipeDetailsReducer);

    const comments = useSelector(store => store.commentsReducer);
    const [title, setTitle] = useState(details ? details.title : '');
    const [ingredients, setIngredients] = useState(details?.ingredients ?? []);
    const [instructions, setInstructions] = useState(details?.instructions ?? []);
    const [prepTime, setPrepTime] = useState(details ? details.prep_time : '');
    const [cookTime, setCookTime] = useState(details ? details.cook_time : '');
    const [notes, setNotes] = useState(details ? details.notes : '');
    const [servings, setServings] = useState(details ? details.number_of_servings : '');

    const [newComment, setNewComment] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const onFileChange = async (event) => {
        // Access the selected file
        const fileToUpload = event.target.files[0];

        // Limit to specific file types.
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

        // Check if the file is one of the allowed types.
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('upload_preset', process.env.REACT_APP_PRESET);
            console.log(process.env);
            let postUrl = `https://api.cloudinary.com/v1_1/` + process.env.REACT_APP_CLOUD_NAME + `/image/upload`;
            axios.post(postUrl, formData).then(response => {
                console.log('Success!', response);
                setImagePath(response.data.url);
            }).catch(error => {
                console.error('error', error);
                alert('Something went wrong.');
            });
        } else {
            alert('Please select an image');
        }
    };


    const sendPhotoToServer = e => {

        e.preventDefault();

        // Send image path to server
        axios.post('/photos', { recipeID: id, path: imagePath })
            .then(response => {
                setImagePath('');
                getImageList();
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });

    };

    const getImageList = () => {
        axios.get(`/photos/${id}`)
            .then(response => {
                setImageList(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });
    };

    const addComment = (comment, id) => {
        if (comment.trim()) {
            dispatch({ type: 'ADD_COMMENT', payload: { comment: comment, id: id } });
            dispatch({ type: 'FETCH_DETAILS', payload: id });
            setNewComment('');
        }
    };

    const image = details ? details.photo : '';

    const saveEditedTitle = (e, id) => {
        e.preventDefault();
        if (title !== details?.title) {
            const action = { type: 'UPDATE_TITLE', payload: { id, title } };
            dispatch(action);
        }
        e.currentTarget.blur();
    };

    const toggleEditing = e => {
        if (isEditing) {
            sendPhotoToServer(e);
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
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
                    swal({
                        title: 'Deleted!',
                        text: 'This comment has been deleted',
                        icon: 'success',
                        timer: 1000,
                    });
                    setTimeout(() => {
                    }, 1000);
                    dispatch({ type: 'FETCH_DETAILS', payload: id });
                }
            });

    };

    // useEffect fetching recipe info
    useEffect(() => {
        if (details && details.title && details.ingredients) {
            setTitle(details.title);
            setIngredients(details.ingredients.slice(1, -1).split(','));
            setInstructions(details.instructions.slice(1, -1).split(','));
            setPrepTime(details.prep_time);
            setCookTime(details.cook_time);
            setNotes(details.notes);
        }
    }, [details]);

    // useEffect fetching recipe info
    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: id });
        getImageList();
    }, [id]);

    const replaceWithCommas = str => str.replace(/@/g, ',');

    const formatDate = date => {
        const newDate = new Date(date);
        const m = newDate.getMonth() + 1;
        const d = newDate.getDate();
        const y = newDate.getFullYear();
        return `${m}/${d}/${y}`;
    };

    // Check the screen size for responsive design
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Header text={title ? 'Saved Recipes' : ''} to={'/recipes'} />
            <div style={isEditing ? null : { paddingBottom: '8%', marginTop: '5%' }}>


                <div className="details-body" style={{ display: 'flex', flexDirection: 'column', marginLeft: isSmScreen || isXsScreen ? '0%' : '10%' }}>
                    <div className="sections-container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="upper-section" style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            flexWrap: 'wrap', justifyContent: isSmScreen || isXsScreen ? 'center' : 'space-between'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{
                                    color: 'black', fontWeight: 'bold', fontSize: '54px',
                                    textAlign: 'center', marginBottom: isSmScreen || isXsScreen ? '10px' : '5px'
                                }}> {title ? title : ''}</p>
                                <Button variant="text" onClick={e => toggleEditing(e)} startIcon={isEditing ? null : <EditIcon />}
                                    style={{
                                        borderColor: 'white', color: "gray",
                                        marginBottom: isSmScreen || isXsScreen ? '5%' : null,
                                    }}>{isEditing ? null : 'Edit recipe'}</Button>
                            </div>

                            <Dialog open={isEditing}
                                onClose={e => toggleEditing(e)}
                                PaperProps={{
                                    component: 'form',
                                    onSubmit: (event) => {
                                        event.preventDefault();
                                        saveEditedTitle(event, id);
                                        toggleEditing(event);
                                    },
                                }}>
                                <DialogTitle>Set recipe title</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        New recipe title
                                    </DialogContentText>
                                    <TextField autoFocus
                                        margin="dense"
                                        id="title"
                                        name="title"
                                        fullWidth
                                        variant="standard"
                                        defaultValue={title}
                                        onChange={e => setTitle(e.target.value)}
                                        style={{ padding: '1px' }} />

                                    <div>
                                        <p style={{ marginBottom: 0 }}>Upload a photo of this recipe!</p>
                                        <form style={{ marginTop: 0 }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onFileChange}
                                            />
                                            <br />
                                            {
                                                // Image preview
                                                imagePath === '' ? (
                                                    null
                                                ) : (
                                                    <img style={{ maxWidth: '150px' }} src={imagePath} />
                                                )
                                            }
                                            <br />
                                        </form>
                                    </div>

                                </DialogContent>
                                <DialogActions>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div className="first-row">
                                            <Button onClick={e => toggleEditing(e)}>Cancel</Button>
                                            <Button type="submit">Save edited recipe</Button>
                                        </div>
                                        <div className="second-row">
                                            <Button variant="outlined" startIcon={<DeleteIcon style={{ fill: 'red' }} />}
                                                onClick={() => removeRecipe(id)} style={{ color: 'red', borderColor: 'red', flexGrow: '1', width: '100%', alignSelf: 'stretch' }}>
                                                Delete Recipe
                                            </Button>
                                        </div>
                                    </div>
                                </DialogActions>
                            </Dialog>

                            <div style={{
                                display: 'flex', flexDirection: 'column', maxWidth: isSmScreen || isXsScreen ? '100%' : '30%',
                                height: 'auto',
                                marginRight: isSmScreen || isXsScreen ? null : '10%'
                            }}>

                                <img
                                    key={imageList.length > 0 ? imageList[0].id : null} className="profile-photo"
                                    src={imageList.length > 0 ? imageList[0].path : `images/${image}`
                                    } alt='Recipe photo' />
                                <div className="notes">
                                    <p style={{
                                        color: 'black', marginTop: '10px', fontSize: '.9rem',
                                        margin: isSmScreen || isXsScreen ? '20px' : null,
                                        justifyContent: 'space-evenly'
                                    }}>{notes ? replaceWithCommas(notes) : ''}</p>
                                </div>
                            </div>
                        </div>

                        <div className="lower-section">

                            <div className="time" style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: isXsScreen || isSmScreen ? 'center' : 'space-between',
                            }}>
                                <div className="time" style={{ alignSelf: 'flex-start', borderTop: '1px solid #888' }}>
                                    <p style={{ color: 'black', marginBottom: '0px', fontSize: '.9rem' }}><strong style={{ marginRight: '5px' }}>Prep Time</strong> {prepTime ? replaceWithCommas(prepTime) : ''}</p>
                                    <p style={{ color: 'black', marginTop: '0px', fontSize: '.9rem' }}><strong style={{ marginRight: '5px' }}>Cook Time</strong> {cookTime ? replaceWithCommas(cookTime) : ''}</p>
                                    <p style={{
                                        color: 'black', marginTop: '0px', fontSize: '.9rem',
                                        cursor: 'pointer'
                                    }}
                                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <strong><span style={{ marginRight: '5px' }}>Notes</span> <span style={{ textDecoration: 'underline' }}>Read recipe notes</span></strong>
                                            <FaArrowTurnDown style={{ marginLeft: '3px', fill: "black", }} />
                                        </div>
                                    </p>
                                </div>
                            </div>

                            <div className="ingredients-instructions" style={{
                                display: 'flex',
                                flexDirection: isSmScreen || isXsScreen ? 'column' : 'row',
                                textAlign: isSmScreen || isXsScreen ? 'center' : null,
                            }}>
                                <div className="ingredients" style={{
                                    borderTop: isSmScreen || isXsScreen ? '2px solid black' : null,
                                    marginRight: isSmScreen || isXsScreen ? null : '10%', alignSelf: isSmScreen || isXsScreen ? 'center' : null,
                                    width: isSmScreen || isXsScreen ? '80%' : null
                                }}>
                                    <p style={{
                                        color: 'black', fontWeight: 'bold', marginTop: isSmScreen || isXsScreen ? '10px' : null,
                                        textAlign: isSmScreen || isXsScreen ? 'left' : null, marginTop: isSmScreen || isXsScreen ? '0px' : null
                                    }}><span style={{
                                        borderTop: isSmScreen || isXsScreen ? null : '2px solid black',
                                        fontSize: '1.1rem'
                                    }}>INGREDIENTS</span></p>

                                    <p style={{ color: 'black', textAlign: isSmScreen || isXsScreen ? 'left' : null }}><strong>Yield:</strong> {!servings ? '' : isNaN(servings) ? servings : <span>{servings} servings</span>}</p>

                                    <ul style={{ listStyleType: 'none', paddingLeft: '0px', textAlign: isSmScreen || isXsScreen ? 'left' : null }}>
                                        {Array.isArray(ingredients) && ingredients.map(ingredient => ingredient.length > 2 ? <li style={{ color: "black", marginBottom: '10px' }}>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
                                    </ul>
                                </div>
                                <div className="instructions" style={{
                                    textAlign: isSmScreen || isXsScreen ? 'left' : null,
                                    padding: '0 10%', marginTop: isSmScreen || isXsScreen ? '10px' : null
                                }}>
                                    <p style={{
                                        borderTop: isSmScreen || isXsScreen ? '2px solid black' : null,
                                        color: 'black', fontWeight: 'bold',
                                        textAlign: isSmScreen || isXsScreen ? 'left' : null, marginTop: isSmScreen || isXsScreen ? '0px' : null
                                    }}><span style={{ borderTop: isSmScreen || isXsScreen ? null : '2px solid black', fontSize: '1.1rem' }}>INSTRUCTIONS</span></p>
                                    <ol style={{ listStyleType: 'none', paddingLeft: '0px', marginRight: isSmScreen || isXsScreen ? null : '10%' }}>
                                        {Array.isArray(instructions) && instructions.map((instruction, index) => instruction.length > 2 ?
                                            <li key={index} style={{ color: "black", display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                                                <span style={{ color: 'black', fontWeight: 'bold' }}>
                                                    Step {index + 1}
                                                </span>
                                                {<span>{replaceWithCommas(instruction.replace(/"|\\n/g, '').trim())}</span>}
                                            </li> : '')}
                                    </ol>
                                </div>
                            </div>

                            {/* <div className="recipe-notes" style={{
                                display: 'flex', flexDirection: 'column',
                                marginTop: '30px',
                                alignItems: 'flex-start',
                            }}> */}
                            <div id="notes-photo-container" style={{
                                display: 'flex', flexDirection: isSmScreen || isXsScreen ? 'column' : 'row',
                                marginTop: '30px',
                                alignItems: 'flex-start', justifyContent: 'space-between', width: '100%',
                            }}>
                                <div id="recipe-photos" style={{
                                    display: 'flex',
                                    flex: '1',
                                    flexDirection: 'column',
                                    margin: isSmScreen || isXsScreen ? '0 10%' : null,
                                    marginLeft: isSmScreen || isXsScreen ? '0 10%' : null,
                                    marginRight: '10%',
                                    justifyContent: 'flex-end', alignSelf: 'flex-start',
                                    width: isSmScreen || isXsScreen ? '80%' : null,
                                    borderTop: '2px solid black',
                                }}
                                >
                                    <p style={{
                                        color: 'black', marginTop: '0px',
                                        paddingBottom: '0px',
                                        fontWeight: 'bold',
                                        textAlign: isSmScreen || isXsScreen ? 'left' : null
                                    }}>RECIPE PHOTOS</p>
                                    <div className="user-photos"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            gap: '16px',
                                            maxWidth: '1400px',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        {imageList.length > 0 ? (
                                            imageList.map(image => (
                                                <img style={{
                                                    width: isXsScreen || isSmScreen ? '150px' : '250px',
                                                    height: isXsScreen || isSmScreen ? '150px' : '250px',
                                                    objectFit: 'cover',

                                                }}
                                                    key={image.id} className="gallery-image" src={image.path} alt='Recipe photo' />
                                            ))
                                        ) : (
                                            <p style={{ color: '#888' }}>No images yet</p>
                                        )}
                                    </div>
                                </div>
                                <div id="recipe-notes" style={{
                                    display: 'flex',
                                    flex: '1',
                                    flexDirection: 'column',
                                    margin: isSmScreen || isXsScreen ? '0 10%' : null,
                                    marginRight: '50px',
                                    justifyContent: 'flex-end', alignSelf: 'flex-start',
                                    // marginBottom: isSmScreen || isXsScreen ? '10%' : null,
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
                                                style={{ width: '90%' }}
                                                value={newComment}
                                                onChange={e => setNewComment(e.target.value)} />

                                            <Button variant="outlined"
                                                type="submit"
                                                style={{ color: '#DAA520', border: '1px solid #DAA520', borderColor: 'white' }}
                                            >Save note</Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p style={{
                            color: 'black', margin: '10px 0px', fontSize: '.9rem',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            alignSelf: 'center',
                            paddingBottom: isSmScreen || isXsScreen ? '17%' : null,
                        }}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <span>Back to recipe</span>
                                <FaTurnUp style={{ marginLeft: '3px', fill: "black", }} />
                            </div>
                        </p>
                    </div>
                    {/* </div> */}
                </div>
            </div >
        </div >
    )

}

export default RecipeDetails;