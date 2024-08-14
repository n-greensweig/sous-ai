import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function SnackbarComponent({ open, handleClose, vertical, horizontal }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            autoHideDuration={1500}
            TransitionComponent={Fade} // Using Fade transition
            key={vertical + horizontal}>
            <Alert
                icon={<CheckCircleOutlineIcon className='fill-white' />}
                action={<IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>
                        <CloseIcon className='fill-white' />
                    </IconButton>}
                onClose={handleClose}
                severity="error"
                variant="filled">
                Recipe deleted!
            </Alert>
        </Snackbar>
    )
}
export default SnackbarComponent;