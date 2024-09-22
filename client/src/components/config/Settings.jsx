import './Settings.css'
import {useRef} from "react";
import PropTypes from "prop-types";

export default function Settings({resetFunct, toggleMusic, giveCookies}) {
    const settings = useRef()
    const settingsMenu = useRef(null)
    const useCheats = useRef(false);

    /**
     *
     * @param {MouseEvent} e
     */
    function toggleMenu(e) {
        const menu = settingsMenu.current;
        if (menu.style.display === "none") {
            menu.style.display = "block"
            if (e.shiftKey) {
                useCheats.current = true;
            }
        } else {
            menu.style.display = "none";
            useCheats.current = false;
        }

    }

    const cheats = <>
        <div>
            <button onClick={() => giveCookies(100)} >+100 cookies</button>
        </div>
    </>

    return (
        <>
            <div className="settings">
                <div ref={settings} className="settings-button" onClick={(e) => toggleMenu(e)}>⚙️</div>
                <div ref={settingsMenu} className="settings-menu" style={{display: "none"}}>
                    <div>
                        <button onClick={resetFunct}>Reset Game</button>
                    </div>
                    <div>
                        <button onClick={toggleMusic}>Toggle Music</button>
                    </div>
                    {useCheats.current && cheats }
                </div>
            </div>
        </>
    )
}

Settings.propTypes = {
    resetFunct: PropTypes.func.isRequired,
    toggleMusic: PropTypes.func.isRequired,
    giveCookies: PropTypes.func.isRequired,
}
