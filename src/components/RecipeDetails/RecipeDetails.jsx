// Import necessary components and libraries
import { Button, useTheme, useMediaQuery } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { FaArrowTurnDown, FaTurnUp } from "react-icons/fa6";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import swal from 'sweetalert';
import { useState } from "react";
import axios from "axios";
import './RecipeDetails.css';
import RecipeInstructions from "./RecipeInstructions/RecipeInstructions";
import RecipeIngredients from "./RecipeIngredients/RecipeIngredients";
import RecipePhotos from "./RecipePhotos/RecipePhotos";
import RecipeNotes from "./RecipeNotes/RecipeNotes";
import RecipeRating from "./RecipeRating/RecipeRating";
import DialogComponent from "../DialogComponent/DialogComponent";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import RecipeProfilePhotoAndNotes from "./RecipeProfilePhotoAndNotes/RecipeProfilePhotoAndNotes";
import RecipePrepAndCookTime from "./RecipePrepAndCookTime/RecipePrepAndCookTime";
import RecipeCooked from "./RecipeCooked/RecipeCooked";

// Function component for RecipeDetails
function RecipeDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const details = useSelector(store => store.recipeDetailsReducer);
    const comments = useSelector(store => store.commentsReducer);
    const [title, setTitle] = useState(details ? details.title : '');
    const [ingredients, setIngredients] = useState(details?.ingredients ?? []);
    const [instructions, setInstructions] = useState(details?.instructions ?? []);
    const [prepTime, setPrepTime] = useState(details ? details.prep_time : '');
    const [cookTime, setCookTime] = useState(details ? details.cook_time : '');
    const [notes, setNotes] = useState(details ? details.notes : '');
    const [isCooked, setIsCooked] = useState(details?.is_cooked ?? '');
    const [rating, setRating] = useState(details ? details.rating : '');
    const [servings, setServings] = useState(details ? details.number_of_servings : '');
    const [isEditing, setIsEditing] = useState(false);
    const [imagePath, setImagePath] = useState('');
    document.title = title ? `${title} Recipe` : 'Saved Recipes';

    // Function to handle file change
    const onFileChange = async (event) => {
        const fileToUpload = event.target.files[0]; // Access the selected file
        const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png']; // Limit to specific file types

        // Check if the file is one of the allowed types
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            setIsLoading(true); // Start loading
            const formData = new FormData();
            formData.append('file', fileToUpload);
            formData.append('upload_preset', process.env.REACT_APP_PRESET);

            let postUrl = `https://api.cloudinary.com/v1_1/` + process.env.REACT_APP_CLOUD_NAME + `/image/upload`;
            axios.post(postUrl, formData)
                .then(response => {
                    setImagePath(response.data.url);
                })
                .catch(error => {
                    console.error('error', error);
                    alert('Something went wrong.');
                })
                .finally(() => {
                    setIsLoading(false); // End loading
                });
        } else {
            alert('Please select an image');
        }
    };

    // Function to send photo to server
    const sendPhotoToServer = e => {
        e.preventDefault();
        if (imagePath) {
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
        }
    };

    // Function to fetch image list
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

    const image = details ? details.photo : ''; // The image of the recipe

    // Function to save the edited title of a recipe
    const saveEditedTitle = (e, id) => {
        e.preventDefault();
        if (title !== details?.title) {
            const action = { type: 'UPDATE_TITLE', payload: { id, title } };
            dispatch(action);
        }
        e.currentTarget.blur();
    };

    // Function to toggle the editing mode for the recipe details
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
                    setState({ ...state, open: true, vertical: 'top', horizontal: 'center' });
                    setTimeout(() => {
                        history.push('/recipes');
                    }, 1000);
                }
            });
    };

    // Function to handle the state of the snackbar
    const [state, setState] = useState({
        open: false, // Whether the snackbar is open or not
        vertical: 'top', // The vertical position of the snackbar
        horizontal: 'center', // The horizontal position of the snackbar
        autoHideDuration: 1000, // The duration for which the snackbar is displayed
    });

    /**
     * Represents the state object.
     * @typedef {Object} State
     * @property {string} vertical - The vertical position of the Snackbar.
     * @property {string} horizontal - The horizontal position of the Snackbar.
     * @property {boolean} open - Indicates whether the Snackbar is open or not.
     */
    const { vertical, horizontal, open } = state;

    // Function to handle the close event of the snackbar
    const handleClose = () => setState({ ...state, open: false });

    // useEffect fetching recipe info
    useEffect(() => {
        if (details && details.title && details.ingredients) {
            setTitle(details.title);
            setIngredients(details.ingredients.slice(1, -1).split(','));
            setInstructions(details.instructions.slice(1, -1).split(','));
            setPrepTime(details.prep_time);
            setCookTime(details.cook_time);
            setNotes(details.notes);
            setIsCooked(details.is_cooked);
            setRating(details.rating);
        }
    }, [details]);

    // useEffect fetching recipe info
    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: id });
        getImageList();
    }, [id]);

    // Replaces all occurrences of '@' with commas in a given string.
    const replaceWithCommas = str => str.replace(/@/g, ',');

    // Check the screen size for responsive design
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <SnackbarComponent open={open} handleClose={handleClose} vertical={vertical} horizontal={horizontal} />
            <div style={isEditing ? null : { paddingBottom: '8%', marginTop: '5%' }}>
                <div className="details-body" style={{ display: 'flex', flexDirection: 'column', marginLeft: isSmScreen || isXsScreen ? '0%' : '10%' }}>
                    <div className="sections-container" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="upper-section" style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            flexWrap: 'wrap', justifyContent: isSmScreen || isXsScreen ? 'center' : 'space-between'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{
                                    color: 'black', fontWeight: 'bold', fontSize: isSmScreen || isXsScreen ? '44px' : '40px',
                                    textAlign: 'center', marginBottom: isSmScreen || isXsScreen ? '10px' : '5px'
                                }}> {title ? title : ''}</p>
                                <Button variant="text" onClick={e => toggleEditing(e)} startIcon={isEditing ? null : <EditIcon />}
                                    style={{
                                        borderColor: 'white', color: "gray",
                                        marginBottom: isSmScreen || isXsScreen ? '5%' : null,
                                    }}>{isEditing ? null : 'Edit recipe'}</Button>
                            </div>
                            <DialogComponent isEditing={isEditing} setIsEditing={setIsEditing} toggleEditing={toggleEditing} 
                            isLoading={isLoading} onFileChange={onFileChange} imagePath={imagePath} title={title} 
                            setTitle={setTitle} id={id} saveEditedTitle={saveEditedTitle} removeRecipe={removeRecipe} />
                            <RecipeProfilePhotoAndNotes isXsScreen={isXsScreen} isSmScreen={isSmScreen} imageList={imageList} image={image} notes={notes} replaceWithCommas={replaceWithCommas} />
                        </div>

                        <div className="lower-section">
                            <div className="time" style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: isXsScreen || isSmScreen ? 'center' : 'space-between',
                            }}>
                                <div className="time" style={{ alignSelf: 'flex-start', borderTop: '1px solid #888' }}>
                                    <RecipePrepAndCookTime prepTime={prepTime} replaceWithCommas={replaceWithCommas} />
                                    <RecipePrepAndCookTime cookTime={cookTime} replaceWithCommas={replaceWithCommas} />
                                    <RecipeCooked isCooked={isCooked} setIsCooked={setIsCooked} id={id} dispatch={dispatch} />
                                    <RecipeRating rating={rating} setRating={setRating} id={id} dispatch={dispatch} />
                                    <p style={{
                                        color: 'black', marginTop: '0px', fontSize: '.9rem', cursor: 'pointer', }}
                                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                    >
                                        <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <strong><span style={{ marginRight: '5px' }}>Notes</span> <span style={{ textDecoration: 'underline' }}>Read recipe notes</span></strong>
                                            <FaArrowTurnDown style={{ marginLeft: '3px', fill: "black", }} />
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="ingredients-instructions" style={{
                                display: 'flex',
                                flexDirection: isSmScreen || isXsScreen ? 'column' : 'row',
                                textAlign: isSmScreen || isXsScreen ? 'center' : null,
                            }}>
                                <RecipeIngredients ingredients={ingredients} servings={servings} isXsScreen={isXsScreen} isSmScreen={isSmScreen} replaceWithCommas={replaceWithCommas} />
                                <RecipeInstructions instructions={instructions} isXsScreen={isXsScreen} isSmScreen={isSmScreen} replaceWithCommas={replaceWithCommas} />
                            </div>

                            <div id="notes-photo-container" style={{
                                display: 'flex', flexDirection: isSmScreen || isXsScreen ? 'column' : 'row',
                                marginTop: '30px',
                                alignItems: 'flex-start', justifyContent: 'space-between', width: '100%',
                            }}>
                                <RecipePhotos imageList={imageList} isXsScreen={isXsScreen} isSmScreen={isSmScreen} />
                                <RecipeNotes isXsScreen={isXsScreen} isSmScreen={isSmScreen} comments={comments} dispatch={dispatch} id={id} />
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
                            <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <span>Back to recipe</span>
                                <FaTurnUp style={{ marginLeft: '3px', fill: "black", }} />
                            </span>
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default RecipeDetails;