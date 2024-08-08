import { FaArrowTurnDown, FaTurnUp } from "react-icons/fa6";
function AutoScroll({ type }) {
    return (
        type === 'scroll-up' ?
            // If type is 'scroll-up', then render ability scroll to top of the page
            <p style={{ marginTop: '3%' }} className="auto-scroll__p" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className="auto-scroll__span" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration: 'underline', }}>
                    <span>Back to recipe</span>
                    <FaTurnUp className="icon-black auto-scroll__icon" style={{ marginLeft: '3px', fill: 'black', }} />
                </span>
            </p> :
            // If type is 'scroll-down', then render ability scroll to bottom of the page
            <p style={{ marginBottom: '15%', textDecoration: 'underline', }} className="auto-scroll__p" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                <span className="auto-scroll__span">
                    Read recipe notes
                    <FaArrowTurnDown className="icon-black auto-scroll__icon" style={{ marginLeft: '3px', fill: 'black', }} />
                </span>
            </p>
    );
}

export default AutoScroll;