
// Imports necessary hooks from React and Redux for state management, and effects.
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';

// Imports from Material-UI for UI components with responsive capabilities.
import { Card, CardContent, CardMedia, CardActions, Typography, useTheme, useMediaQuery, Popover } from "@mui/material";
// useHistory hook from React Router for programmatically navigating to different routes.
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Imports Material-UI components for buttons and icons.
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useInView } from 'react-intersection-observer'; // Import the hook

//Pop-up via Snackbar
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import './RecipeCard.css';
import { useParams } from 'react-router-dom';
import './RecipeCard.css';

// Define a functional component for an individual recipe card that fades in
function FadeIn({ children }) {
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.1,    // Trigger when 48% of the element is in the viewport
    });

    return (
        <div
            ref={ref}
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
        >
            {children}
        </div>
    );
}

function RecipeCard(props) {

    // Initialize dispatch and history for Redux actions and navigation.
    const { id } = useParams(); // Get the list ID from URL parameter
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorFolder, setAnchorFolder] = useState(null);
    const [confirmFolder, setConfirmFolder] = useState(false)
    const [editedRecipeId, setEditedRecipeId] = useState(null);
    const [totalTime, setTotalTime] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const recipeLists = useSelector(store => store.recipeListsReducer);

    // Handles click events on recipe items, dispatching an action to set the selected recipe ID and navigating to the recipe's detail view.
    const handleClick = (id) => {
        dispatch({ type: 'SET_SELECTED_RECIPE_ID', payload: id });
        history.push(`/recipes/${id}`);
    };

    // Handle the pop-overs for adding or removing recipes
    const handleFolderPopover = (e) => {
        setAnchorFolder(e.currentTarget)
    };

    const handleFolderPopoverClose = () => {
        setAnchorFolder(null);
        handleClose();
    };

    const handlePopover = (e) => {
        setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setConfirmFolder(false);
    };

    // For popover operations
    const open = Boolean(anchorEl);
    const openFolder = Boolean(anchorFolder)
    const popoverID = open ? 'simple-popover' : undefined;

    // Remove recipe
    const removeRecipe = () => {
        dispatch({ type: 'REMOVE_RECIPE', payload: props.recipe.id, });
    };

    // Remove recipe from folder
    const removeRecipeFromUserFolder = () => {
        dispatch({ type: 'REMOVE_RECIPE_FROM_FOLDER', payload: { listId: id, recipeId: props.recipe.id, }, });
        dispatch({ type: 'FETCH_RECIPES_FROM_FOLDER', payload: { id, searchQuery: searchQuery } });
    };

    // Add recipe to folder
    const addRecipeToFolder = (id) => {
        if (props.recipe.list_id.includes(id)) {
            // console.log(`It's already in that folder!`)
        } else {
            dispatch({ type: 'ADD_RECIPE_TO_FOLDER', payload: { listId: id, recipeId: props.recipe.id, }, })
        };
        handleFolderPopoverClose();
        setConfirmFolder(true);
    };

    // Ensure recipes display correct time.
    useEffect(() => {
        formatTime();
    }, [])


    // Utility function to format time strings in minutes to hours and minutes
    const formatTime = () => {
        // Convert string to an integer
        const prepTime = parseInt(props.recipe.prep_time, 10);
        const cookTime = parseInt(props.recipe.cook_time, 10);
        const timeInMinutes = prepTime + cookTime;
        // Check if time is 60 minutes or more
        if (timeInMinutes >= 60) {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;

            // Return a formatted string in terms of hours and remaining minutes
            if (minutes === 0) {
                setTotalTime(`${hours} hour${hours > 1 ? 's' : ''}`);
            } else {
                setTotalTime(`${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 || minutes === 0 ? 's' : ''}`);
            }
        } else {
            // Return in minutes if less than 60
            setTotalTime(`${timeInMinutes} minute${timeInMinutes > 1 || timeInMinutes === 0 ? 's' : ''}`);
        }
    };

    // Use Material-UI hooks to check for screen size for responsive layout design.
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDragStart = (e, target) => {
        e.dataTransfer.setData('recipeId', props.recipe.id);
        e.dataTransfer.setData('text/plain', `https://www.sousai.io/#/recipes/${target}`); // Set the URL to drag
    };

    // Confirming props are loaded 
    if (!props.recipe) {
        return (
            <>Loading...</>
        )
    } else {

        return (
            <FadeIn>
                {/* <Paper> */}
                <Card className="recipe-card-hover" style={{ cursor: 'pointer', }}
                    sx={{
                        borderRadius: '1px', boxShadow: 'none', border: '1px solid #e6e6e6', width: isXsScreen || isSmScreen ? '160px' : '200px',
                        height: isXsScreen || isSmScreen ? '247px' : null,
                        '&:hover': {
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                        },
                        '&:active': {
                            cursor: 'pointer',
                        },
                    }}
                    draggable
                    onDragStart={e => handleDragStart(e, props.recipe.id)}
                    >
                    <div key={props.recipe.id}>
                        <div onClick={() => handleClick(props.recipe.id)}>
                            <CardMedia
                                component={'img'}
                                height={'130px'}
                                image={`${props.recipe.display_photo}`}
                                alt={`${props.recipe.title} dish`}
                            />
                            <CardContent className="card-content" style={{
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'flex-start',
                                height: '30px', paddingLeft: '10px', paddingRight: '10px',
                                overflow: 'clip'
                            }}>
                                {/* Typography for recipe title with responsive font size. */}
                                <Typography className="title" style={{
                                    fontFamily: 'inter',
                                    color: 'black',
                                    fontSize: '18px',
                                    margin: '0px', marginLeft: '0px',
                                }}
                                    variant="h4"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2
                                    }}>{props.recipe.title}</Typography>
                            </CardContent>
                        </div>
                        <div style={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            width: '100%', paddingLeft: '5px', margin: '0px',
                        }}>
                            <div onClick={() => handleClick(props.recipe.id)} style={{
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                width: '100%', paddingLeft: '5px', margin: '0px',
                            }}>
                                <Typography className="notes" style={{
                                    alignItems: 'baseline',
                                    justifyContent: 'center',
                                    fontFamily: 'inter',
                                    color: 'black',
                                    fontSize: isXsScreen || isSmScreen ? '16px' : '13px',
                                    marginTop: '5px',
                                    overflow: 'auto',
                                }}
                                    variant="h4"
                                    component="div"
                                >{totalTime}</Typography>
                            </div>
                            <CardActions>
                                {document.title === 'Cooked Recipes' || document.title === 'Recently Viewed Recipes' ?
                                    <BookmarkIcon /> : <MoreHorizIcon className='icon--black header__button'
                                        onClick={(event) => { handlePopover(event); setEditedRecipeId(props.recipe.id) }} />}
                                <Popover
                                    id={popoverID}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <ul className={`dropdown`}>
                                        <div className="dropdownButton">
                                            <button onClick={handleFolderPopover}>Add to folder</button>
                                            <Popover
                                                open={openFolder}
                                                anchorEl={anchorFolder}
                                                onClose={handleFolderPopoverClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}>
                                                {recipeLists.map((folder, i) => (
                                                    <div className="dropdownButton" ><button onClick={() => addRecipeToFolder(folder.id)} key={i}>{folder.list_name}</button></div>
                                                ))}

                                            </Popover>
                                        </div>
                                        <div className="div__dropdownButton">
                                            <button className="dropdownButton" onClick={() => removeRecipe()}>Unsave from Recipe Box</button>
                                            {document.title.includes('Your Recipe Box') ?
                                                <button className="dropdownButton" onClick={() => removeRecipeFromUserFolder()} >Remove from this folder</button> : null}
                                        </div>
                                                <button className="dropdownButton">Add to recipe box</button>
                                    </ul>
                                </Popover>
                                <Snackbar open={confirmFolder} autoHideDuration={1500} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success" variant="filled"
                                        icon={<CheckCircleOutlineIcon style={{ fill: 'white' }} />}
                                        action={
                                            <IconButton
                                                size="small"
                                                aria-label="close"
                                                color="inherit"
                                                onClick={handleClose}
                                            >
                                                <CloseIcon style={{ fill: 'white' }} />
                                            </IconButton>
                                        }
                                    >
                                        Recipe Added!
                                    </Alert>
                                </Snackbar>
                            </CardActions>
                        </div>
                    </div>
                </Card>
                {/* </Paper> */}
            </FadeIn >
        )
    }
}

export default RecipeCard;