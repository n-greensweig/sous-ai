import "./RecipePrepAndCookTime.css";

function RecipePrepAndCookTime({ prepTime, cookTime, replaceWithCommas }) {
    return (
        <div className="recipe-time">
            {prepTime && (
                <p className="recipe-time__prep">
                    Prep Time
                    <span className="recipe-time__value">{replaceWithCommas(prepTime)}</span>
                </p>
            )}
            {cookTime && (
                <p className="recipe-time__cook">
                    Cook Time
                    <span className="recipe-time__value">{replaceWithCommas(cookTime)}</span>
                </p>
            )}
            {!prepTime && !cookTime && (
                <p className="recipe-time">No prep or cook time available.</p>
            )}
        </div>
    );
}

export default RecipePrepAndCookTime;