import { useTheme, useMediaQuery } from "@mui/material";

function RecipeInstructions({ instructions }) {
    
     // Check the screen size for responsive design
     const theme = useTheme();
     const isXsScreen = useMediaQuery(theme.breakpoints.down('xs'));
     const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

     // Replaces all occurrences of '@' with commas in a given string.
    const replaceWithCommas = str => str.replace(/@/g, ',');

    return (
        <div className="instructions" style={{
            textAlign: isSmScreen || isXsScreen ? 'left' : null,
            padding: '0 10%', marginTop: isSmScreen || isXsScreen ? '10px' : null
        }}>
            <p style={{
                borderTop: isSmScreen || isXsScreen ? '2px solid black' : null,
                color: 'black', fontWeight: 'bold',
                textAlign: isSmScreen || isXsScreen ? 'left' : null, marginTop: isSmScreen || isXsScreen ? '0px' : null
            }}><span style={{ borderTop: isSmScreen || isXsScreen ? null : '2px solid black', fontSize: '1.1rem' }}>INSTRUCTIONS</span></p>
            <ol style={{ listStyleType: 'none', paddingLeft: '0px', marginRight: isSmScreen || isXsScreen ? null : '10%' }}>
                {Array.isArray(instructions) && instructions.map((instruction, index) => instruction.length > 2 ?
                    <li key={index} style={{ color: "black", display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        <span style={{ color: 'black', fontWeight: 'bold' }}>
                            Step {index + 1}
                        </span>
                        {<span>{replaceWithCommas(instruction.replace(/"|\\n/g, '').trim())}</span>}
                    </li> : '')}
            </ol>
        </div>
    );
}

export default RecipeInstructions;