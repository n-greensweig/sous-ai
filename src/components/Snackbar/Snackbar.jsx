import { useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * Finish editing the Snackbar component
 * @returns Snackbar component
 */
function SnackbarComponent() {

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        autoHideDuration: 1000,
    });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={1500} // Adjusted to 1 second for demonstration
            TransitionComponent={Fade} // Using Fade transition
            key={vertical + horizontal}
        >
            <Alert
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
                onClose={handleClose}
                severity="success"
                variant="filled"
            >
                Recipe saved!
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent;