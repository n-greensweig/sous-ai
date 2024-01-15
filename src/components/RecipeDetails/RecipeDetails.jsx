import { Button, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

    return (
        <div style={isEditing ? null : { paddingBottom: '8%', marginTop: '5%' }}>

            {isEditing ?
                <div>
                    <p>Recipe title:</p>
                    <input style={{ color: "black", width: '50%' }}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        value={title}
                        onChange={e => setTitle(e.target.value.trim())}
                        onBlur={e => saveEditedTitle(e, id)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                saveEditedTitle(e, id);
                            }
                        }} />
                </div> :
                <Header text={title ? title : ''} />
            }
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >
                <Button variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => history.push('/recipes')} style={{ color: 'white', backgroundColor: '#orange', borderColor: 'white' }}></Button>

                {isEditing ?
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

                }
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


                {/* <input style={{ color: "black" }}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    value={title}
                    onChange={e => setTitle(e.target.value.trim())}
                    onBlur={e => saveEditedTitle(e, id)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            saveEditedTitle(e, id);
                        }
                    }}
                /> */}
                {/* <Button variant="text"
                    startIcon={isEditing ? <CheckIcon style={{fill: '#DAA520'}} /> : <EditIcon />} onClick={e => toggleHeader(e)}
                    style={{ borderColor: 'white' }}></Button> */}
                <Button variant="text" onClick={e => toggleEditing(e)} startIcon={isEditing ? null : <EditIcon />}
                    style={{ borderColor: 'white' }}>Edit recipe title</Button>

                    {isEditing ? null :
                        <Button variant="outlined" startIcon={<DeleteIcon />}
                            onClick={() => removeRecipe(id)} style={{ color: 'white', borderColor: 'white' }}>
                        </Button>
                    }
            </div>

            <img src={`images/${image}`}
                height={'100'}
                width={'100'}
                style={{ borderRadius: '75%' }}
            />

            <p style={{ color: 'black' }}><strong>Prep Time:</strong> {prepTime ? replaceWithCommas(prepTime) : ''}</p>
            <p style={{ color: 'black' }}><strong>Cook Time:</strong> {cookTime ? replaceWithCommas(cookTime) : ''}</p>

            <p style={{ color: 'black' }}><strong>Ingredients:</strong></p>
            <ul>
                {Array.isArray(ingredients) && ingredients.map(ingredient => ingredient.length > 2 ? <li style={{ color: "black" }}>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
                {/* {ingredients ? ingredients.map(ingredient => ingredient.length > 2 ? <li style={{ color: "black" }}>{ingredient.replace(/"|\\n/g, '').trim()}</li> : '') : null} */}
            </ul>

            <p style={{ color: 'black' }}><strong>Instructions:</strong></p>
            <ol>
                {Array.isArray(instructions) && instructions.map(instruction => instruction.length > 2 ? <li style={{ color: "black" }}>{replaceWithCommas(instruction.replace(/"|\\n/g, '').trim())}</li> : '')}
                {/* {instructions ? instructions.map(step => step.length > 2 ? <li style={{ color: "black" }}>{step.replace(/"|\\n/g, '').trim()}</li> : '') : null} */}
            </ol>

            <p style={{ color: 'black' }}>{notes ? replaceWithCommas(notes) : ''}</p>

            <p style={{ color: 'black' }}>Comments:</p>
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
        </div>

    )

}

export default RecipeDetails;