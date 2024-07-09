import { Button, useTheme } from "@mui/material";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Preferences() {
    const dispatch = useDispatch();
    const userPreferences = useSelector(store => store.userPreferencesReducer);
    const userHouseholdItems = useSelector(store => store.userHouseholdItemsReducer);
    const [preferencesToDisplay, setPreferencesToDisplay] = useState([]);
    const [householdItemsToDisplay, setHouseholdItemsToDisplay] = useState([]);

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

    const householdItems = [
        'Immersion blender',
        'Air fryer',
        'Oven',
        'Microwave',
        'Pressure cooker',
        'Slow cooker',
        'Stand mixer',
        'Toaster',
        'Blender',
        'Food processor',
    ];

    const addUserPreference = (preference) => {
        if (!userPreferences.includes(preference)) {
            dispatch({ type: 'ADD_USER_PREFERENCE', payload: { preference, currentPreferences: userPreferences } });
        }
    };

    const removeUserPreference = (preference) => {
        dispatch({ type: 'REMOVE_USER_PREFERENCE', payload: { preference, currentPreferences: userPreferences } });
    };

    const addUserHouseholdItem = (item) => {
        if (!userHouseholdItems.includes(item)) {
            dispatch({ type: 'ADD_USER_HOUSEHOLD_ITEM', payload: { item, currentHouseholdItems: userHouseholdItems } });
        }
    };

    const removeUserHouseholdItem = (item) => {
        dispatch({ type: 'REMOVE_USER_HOUSEHOLD_ITEM', payload: { item, currentHouseholdItems: userHouseholdItems } });
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_PREFERENCES' });
        dispatch({ type: 'FETCH_USER_HOUSEHOLD_ITEMS' });
        setPreferencesToDisplay(preferences);
        setHouseholdItemsToDisplay(householdItems);
    }, [dispatch]);

    const theme = useTheme();
    const primaryColor = '#df321b';
    const secondaryColor = '#4A4A4A';
    const tertiaryColor = '#A84430';  // Slightly lighter shade of primary color

    const buttonStyle = {
        margin: theme.spacing(1),
        borderRadius: '20px',
        padding: theme.spacing(1, 2),
        fontSize: '0.875rem',
        textTransform: 'none',
        boxShadow: theme.shadows[2],
        transition: theme.transitions.create(['background-color', 'transform'], {
            duration: theme.transitions.duration.short,
        }),
        border: `2px solid ${tertiaryColor}`,
        backgroundColor: theme.palette.common.white,
        color: tertiaryColor,
        '&:hover': {
            backgroundColor: secondaryColor,
            color: theme.palette.common.white,
        },
    };

    const selectedButtonStyle = {
        ...buttonStyle,
        backgroundColor: primaryColor,
        color: theme.palette.common.white,
        border: `2px solid ${primaryColor}`,
    };

    return (
        <div>
            <Header />
            <div style={{ padding: theme.spacing(2), maxWidth: '1200px', margin: '0 auto', }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Choose your dietary preferences:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(1) }}>
                    {preferences.map((preference, index) => {
                        const isSelected = userPreferences.includes(preference);
                        return (
                            <Button
                                key={index}
                                variant="contained"
                                style={isSelected ? selectedButtonStyle : buttonStyle}
                                onClick={() => isSelected ? removeUserPreference(preference) : addUserPreference(preference)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                    e.currentTarget.style.boxShadow = theme.shadows[4];
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
                                    e.currentTarget.style.boxShadow = theme.shadows[2];
                                }}
                            >
                                {preference}
                            </Button>
                        );
                    })}
                </div>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: theme.spacing(4) }}>Select your household items:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(1) }}>
                    {householdItems.map((item, index) => {
                        const isSelected = userHouseholdItems.includes(item);
                        return (
                            <Button
                                key={index}
                                variant="contained"
                                style={isSelected ? selectedButtonStyle : buttonStyle}
                                onClick={() => isSelected ? removeUserHouseholdItem(item) : addUserHouseholdItem(item)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                    e.currentTarget.style.boxShadow = theme.shadows[4];
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
                                    e.currentTarget.style.boxShadow = theme.shadows[2];
                                }}
                            >
                                {item}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Preferences;
