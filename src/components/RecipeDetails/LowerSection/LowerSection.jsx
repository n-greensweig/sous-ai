import RecipePrepAndCookTime from "./RecipePrepAndCookTime/RecipePrepAndCookTime";
import RecipeCooked from "./RecipeCooked/RecipeCooked";
import RecipeRating from "./RecipeRating/RecipeRating";
import AutoScroll from "../../AutoScroll/AutoScroll";
import RecipeIngredientsAndInstructions from "./RecipeIngredientsAndInstructions/RecipeIngredientsAndInstructions";
import RecipeNotesAndPhoto from "./RecipeNotesAndPhoto/RecipeNotesAndPhoto";
function LowerSection({ prepTime, cookTime, isCooked, setIsCooked, id, dispatch, rating, setRating, ingredients, instructions, servings, isXsScreen, isSmScreen, replaceWithCommas, imageList, comments }) {
    return (
        <section className="lower-section">
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: isXsScreen || isSmScreen ? 'center' : 'space-between', }}>
                <div style={{ alignSelf: 'flex-start', borderTop: '1px solid #888' }}>
                    <RecipePrepAndCookTime prepTime={prepTime} replaceWithCommas={replaceWithCommas} />
                    <RecipePrepAndCookTime cookTime={cookTime} replaceWithCommas={replaceWithCommas} />
                    <RecipeCooked isCooked={isCooked} setIsCooked={setIsCooked} id={id} dispatch={dispatch} />
                    <RecipeRating rating={rating} setRating={setRating} id={id} dispatch={dispatch} />
                    <AutoScroll isSmScreen={isSmScreen} isXsScreen={isXsScreen} type={'scroll-down'} />
                </div>
            </div>

            <RecipeIngredientsAndInstructions ingredients={ingredients} instructions={instructions} servings={servings} isXsScreen={isXsScreen}
                isSmScreen={isSmScreen} replaceWithCommas={replaceWithCommas} />
            <RecipeNotesAndPhoto imageList={imageList} isXsScreen={isXsScreen} isSmScreen={isSmScreen} comments={comments} dispatch={dispatch} id={id} />
        </section>
    )
}

export default LowerSection;