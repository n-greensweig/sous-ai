function RecipeIngredients({ ingredients, servings, isSmScreen, isXsScreen, replaceWithCommas, isInGroceryList }) {
    return (
        <div className="ingredients" style={{
            borderTop: isSmScreen || isXsScreen ? '2px solid black' : null,
            marginRight: isSmScreen || isXsScreen ? null : '30px', alignSelf: isSmScreen || isXsScreen ? 'center' : null,
            width: isSmScreen || isXsScreen ? '80%' : null
        }}>
            <p style={{
                color: 'black', fontWeight: 'bold', marginTop: isSmScreen || isXsScreen ? '10px' : null,
                textAlign: isSmScreen || isXsScreen ? 'left' : null, marginTop: isSmScreen || isXsScreen ? '0px' : null
            }}><span style={{
                borderTop: isSmScreen || isXsScreen ? null : '2px solid black',
                fontSize: '1.1rem'
            }}>INGREDIENTS</span></p>

            <p style={{ color: 'black', textAlign: isSmScreen || isXsScreen ? 'left' : null }}><strong>Yield:</strong> {!servings ? '' : isNaN(servings) ? servings : <span>{servings} servings</span>}</p>

            <ul style={{ listStyleType: 'none', paddingLeft: '0px', textAlign: isSmScreen || isXsScreen ? 'left' : null }}>
                {Array.isArray(ingredients) && ingredients.map((ingredient, index) => ingredient.length > 2 ? <li key={index} style={{ color: "black", marginBottom: '10px' }}>{replaceWithCommas(ingredient.replace(/"|\\n/g, '').trim())}</li> : '')}
            </ul>
            <p>{isInGroceryList ? <span>Added!<button>Open grocery list</button></span> : <button>Add ingredients to your grocery list</button>}</p>
        </div>
    );
}

export default RecipeIngredients;