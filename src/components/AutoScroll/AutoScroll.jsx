import { FaArrowTurnDown, FaTurnUp } from "react-icons/fa6";
function AutoScroll({ type }) {
    return (
        type === 'scroll-up' ?
            // If type is 'scroll-up', then render ability scroll to top of the page
            <p style={{
                color: 'black',
                margin: '10px 0px',
                fontSize: '.9rem',
                cursor: 'pointer',
                alignSelf: 'center',
            }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'underline', }}>
                    <span>Back to recipe</span>
                    <FaTurnUp style={{ marginLeft: '3px', fill: 'black', }} />
                </span>
            </p> :
            // If type is 'scroll-down', then render ability scroll to bottom of the page
            <p style={{
                color: 'black', marginTop: '0px', fontSize: '.9rem', cursor: 'pointer',
            }}
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'underline', }}>
                    Read recipe notes
                    <FaArrowTurnDown style={{ marginLeft: '3px', fill: 'black', }} />
                </span>
            </p>
    );
}

export default AutoScroll;