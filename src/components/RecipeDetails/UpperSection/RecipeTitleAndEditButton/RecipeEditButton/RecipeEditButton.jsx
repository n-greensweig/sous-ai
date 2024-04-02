import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
function RecipeEditButton({ isEditing, toggleEditing, isSmScreen, isXsScreen}) {
    return (
        <Button variant="text" onClick={e => toggleEditing(e)} startIcon={isEditing ? null : <EditIcon />}
            style={{
                borderColor: 'white', color: "gray",
                marginBottom: isSmScreen || isXsScreen ? '5%' : null,
            }}>{isEditing ? null : 'Edit recipe'}</Button>
    );
}

export default RecipeEditButton;