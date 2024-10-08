import { FaArrowTurnDown, FaTurnUp } from "react-icons/fa6";
function AutoScroll({ type }) {
    return (
        type === 'scroll-up' ?
            // If type is 'scroll-up', then render ability scroll to top of the page
            <p className="auto-scroll__p recipe-details__auto-scroll-one" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className="auto-scroll__span">
                    <span>Back to recipe</span>
                    <FaTurnUp className="icon-black auto-scroll__icon" />
                </span>
            </p> :
            // If type is 'scroll-down', then render ability scroll to bottom of the page
            <p className="auto-scroll__p recipe-details__auto-scroll-two" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                <span className="auto-scroll__span">
                    Read recipe notes
                    <FaArrowTurnDown className="icon-black auto-scroll__icon" />
                </span>
            </p>
    );
}

export default AutoScroll;