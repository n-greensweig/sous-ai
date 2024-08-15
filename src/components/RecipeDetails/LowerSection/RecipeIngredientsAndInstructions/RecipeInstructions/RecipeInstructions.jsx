import './RecipeInstructions.css';
function RecipeInstructions({ instructions, replaceWithCommas }) {
    return (
        <div className='recipe-instructions__container'>
            <p className='recipe-details__instructions-subheader color-black bold'><span>INSTRUCTIONS</span></p>
            <ol className='recipe-instructions__instruction-list list-none'>
                {Array.isArray(instructions) && instructions.map((instruction, index) => instruction.length > 2 ?
                    <li key={index} className='recipe-instructions__instruction-li color-black display-flex flex-column'>
                        <span className='color-black bold'>
                            Step {index + 1}
                        </span>
                        {<span>{replaceWithCommas(instruction.replace(/"|\\n/g, '').trim())}</span>}
                    </li> : '')}
            </ol>
        </div>
    );
}

export default RecipeInstructions;