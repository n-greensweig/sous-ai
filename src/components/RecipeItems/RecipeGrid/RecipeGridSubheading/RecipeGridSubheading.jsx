import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
function RecipeGridSubheading({ listName, numOfRecipes, searchQuery, setSearchQuery }) {

    // const [anchorEl, setAnchorEl] = useState(null);

    // // Handle the pop-overs for adding or removing recipes
    // const handleClose = () => {
    //     setAnchorEl(null);
    //     setConfirmFolder(false);
    // };

    // const handleFolderPopover = (e) => {
    //     setAnchorFolder(e.currentTarget)
    // };

    // const handleFolderPopoverClose = () => {
    //     setAnchorFolder(null);
    //     handleClose();
    // };

    // const handlePopover = (e) => {
    //     setAnchorEl(e.currentTarget)
    // };

    // // For popover operations
    // const open = Boolean(anchorEl);
    // const openFolder = Boolean(anchorFolder)
    // const popoverID = open ? 'simple-popover' : undefined;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <div style={{ display: 'flex', }}>
                    <h2 style={{ marginLeft: 'inherit', color: '#222', margin: 0, }}>{listName}</h2>
                    <MoreHorizIcon /*onClick={(event) => { handlePopover(event); }}*/ style={{ color: '#717171', marginLeft: '5px', }} />
                </div>
                {numOfRecipes > 0 ? <p style={{ marginTop: 0, color: '#717171', }}>{numOfRecipes} {numOfRecipes === 1 ? 'recipe' : 'recipes'}</p> :
                    <p style={{ marginTop: 0, color: '#717171', }}>No recipes yet</p>}
            </div>
            <div className="search__input" style={{
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', position: 'absolute', right: '2%',
            }}>
                <SearchIcon className='icon--black search' />
                <input
                    type="text"
                    placeholder="Search your saved recipes"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                {searchQuery ? <CancelIcon onClick={() => setSearchQuery('')} className='icon--gray' /> : null}
            </div>
        </div>
    )
}

export default RecipeGridSubheading;