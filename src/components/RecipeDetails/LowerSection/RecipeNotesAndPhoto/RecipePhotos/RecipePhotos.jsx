function RecipePhotos({ imageList, isSmScreen, isXsScreen}) {
    return (
        <div id="recipe-photos" style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            margin: isSmScreen || isXsScreen ? '0 10%' : null,
            marginLeft: isSmScreen || isXsScreen ? '0 10%' : null,
            marginRight: '10%',
            justifyContent: 'flex-end', alignSelf: 'flex-start',
            width: isSmScreen || isXsScreen ? '80%' : null,
            borderTop: '2px solid black',
        }}
        >
            <p style={{
                color: 'black', marginTop: '0px',
                paddingBottom: '0px',
                fontWeight: 'bold',
                textAlign: isSmScreen || isXsScreen ? 'left' : null,
                marginBottom: '6%',
            }}>RECIPE PHOTOS</p>
            <div className="user-photos"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                    maxWidth: '1400px',
                    justifyContent: 'flex-start'
                }}
            >
                {imageList.length > 0 ? (
                    imageList.map(image => (
                        <img style={{
                            width: isXsScreen || isSmScreen ? '150px' : '250px',
                            height: isXsScreen || isSmScreen ? '150px' : '250px',
                            objectFit: 'cover',

                        }}
                            key={image.id} className="gallery-image" src={image.path} alt='Recipe photo' />
                    ))
                ) : (
                    <p style={{ color: '#888' }}>No images yet</p>
                )}
            </div>
        </div>
    );
}

export default RecipePhotos;