function RecipeProfilePhotoAndNotes({ isXsScreen, isSmScreen, imageList, image, notes, replaceWithCommas}) {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', maxWidth: isSmScreen || isXsScreen ? '100%' : '30%',
            height: 'auto',
            marginRight: isSmScreen || isXsScreen ? null : '10%'
        }}>

            <img
                key={imageList.length > 0 ? imageList[0].id : null} className="profile-photo"
                src={imageList.length > 0 ? imageList[0].path : `${image}`
                } alt='Recipe photo' />
            <div className="notes">
                <p style={{
                    color: 'black', marginTop: '10px', fontSize: '.9rem',
                    margin: isSmScreen || isXsScreen ? '20px' : null,
                    justifyContent: 'space-evenly'
                }}>{notes ? replaceWithCommas(notes) : ''}</p>
            </div>
        </div>
    );
}

export default RecipeProfilePhotoAndNotes;