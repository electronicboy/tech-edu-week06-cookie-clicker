import Settings from "../config/Settings.jsx";
import PropTypes from "prop-types";

export default function Header({resetFunct, toggleMusic, giveCookies}) {
    return (<header>
        { /* Logo greetz from Michelle */}
        <img src="img/logo.png" alt="logo"/>
        <Settings resetFunct={resetFunct} toggleMusic={toggleMusic} giveCookies={giveCookies}/>
    </header>)
}

Header.propTypes = {
    resetFunct: PropTypes.func.isRequired,
    toggleMusic: PropTypes.func.isRequired,
    giveCookies: PropTypes.func.isRequired
}
