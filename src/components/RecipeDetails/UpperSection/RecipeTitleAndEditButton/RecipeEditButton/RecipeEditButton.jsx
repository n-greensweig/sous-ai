import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import './RecipeEditButton.css';
function RecipeEditButton({ isEditing, toggleEditing }) {
    return (
        <Button className='recipe-edit-button' variant='text' onClick={e => toggleEditing(e)} startIcon={isEditing ? null : <EditIcon />}>
            {isEditing ? null : 'Edit recipe'}</Button>
    );
}
export default RecipeEditButton;