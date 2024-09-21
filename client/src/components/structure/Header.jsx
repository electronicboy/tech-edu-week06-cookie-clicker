import Settings from "../config/Settings.jsx";
import PropTypes from "prop-types";

export default function Header({resetFunct}) {
    return (<header>
        { /* Logo greetz from Michelle */}
        <img src="img/logo.png" alt="logo"/>
        <Settings resetFunct={resetFunct}/>
    </header>)
}

Header.propTypes = {
    resetFunct: PropTypes.func.isRequired
}
