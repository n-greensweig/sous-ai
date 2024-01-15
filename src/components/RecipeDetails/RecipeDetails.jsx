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
import { FaArrowTurnDown } from "react-icons/fa6";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';
import { useState } from "react";

import axios from "axios";

import Header from "../Header/Header";

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
        axios.get('/photos')
            .then(response => {
                setImageList(response.data);
            })
            .catch(error => {
                console.error(error);
                alert('Something went wrong.');
            });
    };

    const addComment = (comment, id) => {
        dispatch({ type: 'ADD_COMMENT', payload: { comment: comment, id: id } });
        dispatch({ type: 'FETCH_DETAILS', payload: id });
        setNewComment('');
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

    // Check the screen size for responsive design
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={isEditing ? null : { paddingBottom: '8%', marginTop: '5%' }}>
            <Header text={title ? title : ''} />
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >

                {/* {isEditing ?
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
                    : null

                } */}
                {/* 
                <h2>Images</h2>
                {
                    imageList.length > 0 ? (
                        imageList.map(image => (
                            <img style={{
                                margin: '10px',
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                border: '5px solid rgb(42, 42, 42)'

                            }}
                                key={image.id} className="gallery-image" src={image.path} alt='Recipe photo' />
                        ))
                    ) : (
                        <p>No images!</p>
                    )

                } */}

                <Button variant="text" onClick={e => toggleEditing(e)} startIcon={isEditing ? null : <EditIcon />}
                    style={{ borderColor: 'white', color: "gray" }}>Edit recipe</Button>

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

            </div>


            <div className="details-body" style={{ display: 'flex', flexDirection: 'column', marginLeft: '10%' }}>
                <div className="sections-container" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="upper-section" style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center',
                        flexWrap: 'wrap', justifyContent: 'space-between'
                    }}>
                        <p style={{
                            color: 'black', fontWeight: 'bold', fontSize: '54px',
                        }}> {title ? title : ''}</p>

                        <img src={`images/${image}`}
                            style={{
                                maxWidth: '30%',
                                height: 'auto',
                                marginRight: '10%'
                            }}
                        />
                    </div>

                    <div className="lower-section">

                        <div className="time-notes" style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                            <div className="time" style={{ alignSelf: 'flex-start', borderTop: '1px solid #888' }}>
                                <p style={{ color: 'black', marginBottom: '0px', fontSize: '.9rem' }}><strong style={{ marginRight: '5px' }}>Prep Time</strong> {prepTime ? replaceWithCommas(prepTime) : ''}</p>
                                <p style={{ color: 'black', marginTop: '0px', fontSize: '.9rem' }}><strong style={{ marginRight: '5px' }}>Cook Time</strong> {cookTime ? replaceWithCommas(cookTime) : ''}</p>
                                <p style={{
                                    color: 'black', marginTop: '0px', fontSize: '.9rem',
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}
                                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <strong>Read recipe notes</strong>
                                        <FaArrowTurnDown style={{ marginLeft: '3px', fill: "black", textDecoration: 'underline', }} />
                                    </div>
                                </p>
                            </div>
                            <div className="notes" style={{
                                marginRight: '10%', maxWidth: '30%',
                                paddingTop: '10px'
                            }}>
                                <p style={{ color: 'black', marginTop: '0px', fontSize: '.9rem' }}>{notes ? replaceWithCommas(notes) : ''}</p>
                            </div>
                        </div>

                        <div className="ingredients-instructions" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="ingredients" style={{ marginRight: '10%' }}>
                                <p style={{ color: 'black', fontWeight: 'bold' }}><span style={{ borderTop: '2px solid black', fontSize: '1.1rem' }}>INGREDIENTS</span></p>

                                <p style={{ color: 'black' }}><strong>Yield:</strong> {!servings ? '' : isNaN(servings) ? servings : <span>{servings} servings</span>}</p>

                                <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                    {Array.isArray(ingredients) && ingredients.map(ingredient => ingredient.length > 2 ? <li style={{ color: "black", marginBottom: '10px' }}>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
                                </ul>
                            </div>
                            <div className="instructions">
                                <p style={{ color: 'black', fontWeight: 'bold' }}><span style={{ borderTop: '2px solid black', fontSize: '1.1rem' }}>INSTRUCTIONS</span></p>
                                <ol style={{ listStyleType: 'none', paddingLeft: '0px', marginRight: '10%' }}>
                                    {Array.isArray(instructions) && instructions.map((instruction, index) => instruction.length > 2 ?
                                        <li key={index} style={{ color: "black", display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                                            <span style={{ color: 'black', fontWeight: 'bold' }}>
                                                Step {index + 1}
                                            </span>
                                            {<span>{replaceWithCommas(instruction.replace(/"|\\n/g, '').trim())}.</span>}
                                        </li> : '')}
                                </ol>
                            </div>
                        </div>

                        <div className="recipe-notes" style={{ display: 'flex', flexDirection: 'row' }}>

                            <p style={{ color: 'black', border: '2px solid green' }}>Recipe notes:</p>
                            {comments.map(comment => <p style={{ color: 'black' }}>{comment.comment}</p>)}

                            <div style={{ display: 'flex', border: '2px solid green' }}>
                                <form onSubmit={() => addComment(newComment, id)}>
                                    <TextField label="Add a comment" variant="outlined" value={newComment} onChange={e => setNewComment(e.target.value)} />
                                    <Button variant="outlined"
                                        type="submit"
                                        style={{ color: 'orange', backgroundColor: 'lightgray', borderColor: 'white' }}
                                    >Save comment</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )

}

export default RecipeDetails;