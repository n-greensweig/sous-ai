function RecipeTitle({ title, isSmScreen, isXsScreen}) {
    return (
        <p style={{
            color: 'black', fontWeight: 'bold', fontSize: isSmScreen || isXsScreen ? '44px' : '40px',
            textAlign: 'center', marginBottom: isSmScreen || isXsScreen ? '10px' : '5px'
        }}> {title ? title : ''}</p>
    );
}

export default RecipeTitle;