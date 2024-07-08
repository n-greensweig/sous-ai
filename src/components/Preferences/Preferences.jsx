import { Button } from "@mui/material";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Preferences() {
    const dispatch = useDispatch();
    const userPreferences = useSelector(store => store.userPreferencesReducer);
    const [preferencesToDisplay, setPreferencesToDisplay] = useState([]);

    const preferences = [
        'Dairy-free',
        'Egg-free',
        'Fish-free',
        'Gluten-free',
        'Halal',
        'Keto',
        'Kosher',
        'Low-carb',
        'Low-sodium',
        'Mediterranean',
        'Mustard-free',
        'Non-GMO',
        'Nut-free',
        'Organic',
        'Paleo',
        'Peanut-free',
        'Pescatarian',
        'Sesame-free',
        'Shellfish-free',
        'Soy-free',
        'Sugar-free',
        'Sulfite-free',
        'Tree-nut-free',
        'Vegan',
        'Vegetarian',
        'Whole30',
    ];

    const addUserPreference = (preference) => {
        if (!userPreferences.includes(preference)) {
            dispatch({ type: 'ADD_USER_PREFERENCE', payload: { preference, currentPreferences: userPreferences } });
        }
    };

    const removeUserPreference = (preference) => {
        dispatch({ type: 'REMOVE_USER_PREFERENCE', payload: { preference, currentPreferences: userPreferences } });
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PREFERENCES' });
        setPreferencesToDisplay(preferences);
    }, [dispatch]);

    return (
        <div>
            <Header />
            <p>Choose your dietary preferences:</p>
            <div>
                {preferences.map((preference, index) => {
                    const isSelected = userPreferences.includes(preference);
                    return (
                        <Button
                            key={index}
                            variant="contained"
                            color="primary"
                            style={{ margin: 1, backgroundColor: isSelected ? 'red' : 'green', color: 'white' }}
                            onClick={() => isSelected ? removeUserPreference(preference) : addUserPreference(preference)}
                        >
                            {preference}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}

export default Preferences;
