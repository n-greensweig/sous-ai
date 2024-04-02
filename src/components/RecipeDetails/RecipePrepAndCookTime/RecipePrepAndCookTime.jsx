function RecipePrepAndCookTime(props) {
    const prepTime = props.prepTime;
    const cookTime = props.cookTime;
    const replaceWithCommas = props.replaceWithCommas;
    return (
        prepTime ?
            <p style={{ color: 'black', marginBottom: '0px', fontSize: '.9rem' }}>
                <strong style={{ marginRight: '5px' }}>Prep Time</strong>
                {prepTime ? replaceWithCommas(prepTime) : ''}
            </p> : 
            <p style={{ color: 'black', marginTop: '0px', fontSize: '.9rem' }}>
                <strong style={{ marginRight: '5px' }}>Cook Time</strong>
                {cookTime ? replaceWithCommas(cookTime) : ''}
            </p>
    )

}
export default RecipePrepAndCookTime;