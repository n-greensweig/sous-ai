import RecipePrepAndCookTime from "./RecipePrepAndCookTime/RecipePrepAndCookTime";
import RecipeCooked from "./RecipeCooked/RecipeCooked";
import RecipeRating from "./RecipeRating/RecipeRating";
import AutoScroll from "../../AutoScroll/AutoScroll";
import RecipeIngredientsAndInstructions from "./RecipeIngredientsAndInstructions/RecipeIngredientsAndInstructions";
import RecipeNotesAndPhoto from "./RecipeNotesAndPhoto/RecipeNotesAndPhoto";
import './LowerSection.css';
function LowerSection({ prepTime, cookTime, isCooked, setIsCooked, id, dispatch, rating, setRating, ingredients, instructions, servings, isXsScreen, isSmScreen, replaceWithCommas, imageList, setImageList, comments, isInGroceryList, title, user }) {
    return (
        <section className='lower-section'>
            <div className={`display-flex flex-row align-center ${isXsScreen || isSmScreen ? 'justify-center' : 'justify-sb'}`}>
                <div className='recipe-details__lower-section-wrapper'>
                    <RecipePrepAndCookTime prepTime={prepTime} replaceWithCommas={replaceWithCommas} />
                    <RecipePrepAndCookTime cookTime={cookTime} replaceWithCommas={replaceWithCommas} />
                    {user.id ? <RecipeCooked isCooked={isCooked} setIsCooked={setIsCooked} id={id} dispatch={dispatch} /> : null}
                    {user.id ? <RecipeRating rating={rating} setRating={setRating} id={id} dispatch={dispatch} /> : null}
                    {/* <AutoScroll type={'scroll-down'} /> */}
                </div>
            </div>
            <RecipeIngredientsAndInstructions ingredients={ingredients} instructions={instructions}
                servings={servings} isInGroceryList={isInGroceryList} replaceWithCommas={replaceWithCommas}
                title={title} id={id} user={user} />
            {user.id ? <RecipeNotesAndPhoto imageList={imageList} setImageList={setImageList} comments={comments} dispatch={dispatch} id={id} /> : null}
        </section>
    )
}
export default LowerSection;