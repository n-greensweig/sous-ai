import "./RecipePrepAndCookTime.css";
function RecipePrepAndCookTime({ prepTime, cookTime, replaceWithCommas }) {
    // Utility function to format time strings in minutes to hours and minutes
    const formatTime = timeString => {
        // Convert string to an integer
        const timeInMinutes = parseInt(timeString, 10);

        // Check if time is 60 minutes or more
        if (timeInMinutes >= 60) {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;

            // Return a formatted string in terms of hours and remaining minutes
            if (minutes === 0) {
                return `${hours} hour${hours > 1 ? 's' : ''}`;
            } else {
                return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 || minutes === 0 ? 's' : ''}`;
            }
        } else {
            // Return in minutes if less than 60
            return `${timeInMinutes} minute${timeInMinutes > 1 || timeInMinutes === 0 ? 's' : ''}`;
        }
    };
    return (
        <div className="recipe-time">
            {prepTime && (
                <p className="recipe-time__prep" style={{marginTop: '10%'}}>
                    Prep Time
                    <span className="recipe-time__value">{formatTime(replaceWithCommas(prepTime).split(' ')[0])}</span>
                </p>
            )}
            {cookTime && (
                <p className="recipe-time__cook" style={{marginBottom: '10%'}}>
                    Cook Time
                    <span className="recipe-time__value">{formatTime(replaceWithCommas(cookTime).split(' ')[0])}</span>
                </p>
            )}
            {!prepTime && !cookTime && (
                <p className="recipe-time">No prep or cook time available.</p>
            )}
        </div>
    );
}

export default RecipePrepAndCookTime;