import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function RecipeItems() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES' });
    }, []);

    return (
        <h1>Hi</h1>
    )

}

export default RecipeItems;