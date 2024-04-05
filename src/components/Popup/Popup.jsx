import { Button } from "@mui/material";
import './Popup.css';
function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup__inner">
                <Button className="close_btn" onClick={() => props.setTrigger(false)}>close</Button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup;