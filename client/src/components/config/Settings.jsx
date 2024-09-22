import './Settings.css'
import {useRef} from "react";
import PropTypes from "prop-types";

export default function Settings({resetFunct, toggleMusic}) {
    const settings = useRef()
    const settingsMenu = useRef(null)

    function toggleMenu() {
        const menu = settingsMenu.current;
        if (menu.style.display === "none") {
            menu.style.display = "block"
        } else {
            menu.style.display = "none";
        }

    }

    return (
        <>
            <div className="settings">
                <div ref={settings} className="settings-button" onClick={() => toggleMenu()}>⚙️</div>
                <div ref={settingsMenu} className="settings-menu" style={{display: "none"}}>
                    <div>
                        <button onClick={resetFunct}>Reset Game</button>
                    </div>
                    <div>
                        <button onClick={toggleMusic}>Toggle Music</button>
                    </div>
                    </div>
                </div>
            </>
    )
}

Settings.propTypes = {
    resetFunct: PropTypes.func.isRequired,
    toggleMusic: PropTypes.func.isRequired,
}
