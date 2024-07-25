import Header from "../Header/Header";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Pantry() {
    const dispatch = useDispatch();
    const userPreferences = useSelector(store => store.userPreferencesReducer);
    const userHouseholdItems = useSelector(store => store.userHouseholdItemsReducer);
    const [preferencesToDisplay, setPreferencesToDisplay] = useState([]);
    const [householdItemsToDisplay, setHouseholdItemsToDisplay] = useState([]);

    const pantryEssentials = [
        "Butter",
        "Egg",
        "Garlic",
        "Milk",
        "Onion",
        "Sugar",
        "Flour",
        "Olive oil",
        "Garlic powder",
        "White rice",
        "Cinnamon",
        "Ketchup",
        "Soy sauce",
        "Mayonnaise",
        "Vegetable oil",
        "Bread",
        "Baking powder",
        "Brown sugar",
        "Oregano",
        "Potato",
        "Honey",
        "Paprika",
        "Baking soda",
        "Vanilla",
        "Spaghetti",
        "Peanut butter",
        "Chili powder",
        "Cumin",
        "Mustard",
        "Chicken breast",
        "Cheddar",
        "Onion powder",
        "Carrot",
        "Tomato",
        "Tomato",
        "Basil",
        "Parsley",
        "Parmesean",
        "Italian seasoning",
        "Thyme",
        "Bell pepper",
    ];

    const vegetablesAndGreens = [
        "Scallion",
        "Red onion",
        "Celery",
        "Jalapeño",
        "Avocado",
        "Zucchini",
        "Shallot",
        "Cherry tomato",
        "Cucumber",
        "Spinach",
        "Corn",
        "Chile pepper",
        "Sweet potato",
        "Broccoli",
        "Baby greens",
        "Pumpkin",
        "Cauliflower",
        "Asparagus",
        "Cabbage",
        "Arugula",
        "Leek",
        "Kale",
        "Eggplant",
        "Lettuce",
        "Butternut squash",
        "Romaine",
        "Beetroot",
        "Brussels sprout",
        "Fennel",
        "Sun-dried tomato",
        "Radish",
        "Red cabbage",
        "Artichoke",
        "Summer squash",
        "Mixed greens",
        "Parsnip",
        "Baby carrot",
        "Mixed vegetable",
        "Poblano pepper",
        "Sweet pepper",
        "Green tomato",
        "Serrano pepper",
        "Watercress",
        "Iceberg lettuce",
        "Mashed potatoes",
        "Horseradish",
        "Chard",
        "Hash browns",
        "Pimento",
        "Napa cabbage",
        "Butter lettuce",
        "Spaghetti squash",
        "Coleslaw",
        "Celeriac",
        "Turnip",
        "Bok choy",
        "Okra",
        "Acorn squash",
        "Corn cob",
        "Raddichio",
        "Water chestnut",
        "Pearl onion",
        "Pepperoncini",
        "Tenderstem broccoli",
        "Leaf lettuce",
        "Cavolo nero",
        "Baby boy choy",
        "Endive",
        "Plantain",
        "Jicama",
        "Collard greens",
        "Habañero pepper",
        "Corn husk",
        "Fried onion",
        "Daikon",
        "Baby corn",
        "Broccoli rabe",
        "Belgian endive",
        "Rutabaga",
        "Kohlrabi",
        "Boston lettuce",
        "Fresno chile",
        "Microgreens",
        "Yam",
        "Ancho chile peppers",
        "Delicata squash",
        "Anaheim pepper",
        "Cress",
        "Frisée",
        "Broccoli slaw",
        "Potato flakes",
        "Golden beet",
        "Gem lettuce",
    ];

    const householdItems = [
        "Air fryer",
        "Blender",
        "Bread maker",
        "Bread slicer",
        "Butter churn",
        "Candy thermometer",
        "Cast iron skillet",
        "Cheese grater",
        "Coffee grinder",
        "Coffee maker",
        "Crepe maker",
        "Deep fryer",
        "Electric can opener",
        "Electric kettle",
        "Fondue pot",
        "Food processor",
        "Food steamer",
        "Grill",
        "Handheld mixer",
        "Hot pot",
        "Ice cream maker",
        "Immersion blender",
        "Induction cooktop",
        "Juicer",
        "Mandoline",
        "Meat grinder",
        "Meat slicer",
        "Milk frother",
        "Microwave",
        "Non-stick pan",
        "Oven",
        "Panini press",
        "Pasta maker",
        "Peeler",
        "Pizza oven",
        "Pizza stone",
        "Popcorn maker",
        "Potato masher",
        "Pressure cooker",
        "Rice cooker",
        "Salad spinner",
        "Sandwich maker",
        "Sauce pan",
        "Sausage stuffer",
        "Slow cooker",
        "Smoker",
        "Snow cone machine",
        "Sous vide",
        "Spice grinder",
        "Spiralizer",
        "Stand mixer",
        "Stockpot",
        "Stovetop",
        "Toaster",
        "Toaster oven",
        "Vacuum sealer",
        "Waffle maker",
        "Yogurt maker",
        "Zester"
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
        setPreferencesToDisplay(pantryEssentials);
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

    const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Header />
            <div style={{ padding: theme.spacing(2), maxWidth: '1200px', margin: '0 auto',
                 paddingTop: isXsScreen || isSmScreen ? '50px' : '0px', }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Pantry essentials:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(1) }}>
                    {pantryEssentials.map((pantryEssentials, index) => {
                        const isSelected = userPreferences.includes(pantryEssentials);
                        return (
                            <Button
                                key={index}
                                variant="contained"
                                style={isSelected ? selectedButtonStyle : buttonStyle}
                                onClick={() => isSelected ? removeUserPreference(pantryEssentials) : addUserPreference(pantryEssentials)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                    e.currentTarget.style.boxShadow = theme.shadows[4];
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
                                    e.currentTarget.style.boxShadow = theme.shadows[2];
                                }}
                            >
                                {pantryEssentials}
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

export default Pantry;