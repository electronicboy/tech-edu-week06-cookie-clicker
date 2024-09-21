import { handleClick } from "../../GameFunctions.js";
import PropTypes from "prop-types";
import "./Cookie.css";

/**
 *
 * @param {gameState} gameState
 * @param {function} updateGamestate
 * @returns {JSX.Element}
 * @constructor
 */
export default function Cookie({ gameState, updateGamestate }) {
  return (
    <>
      <div className="cookie-container">
        <p>{gameState.cookies.toFixed(0)} cookies</p>
        <div className="cookie-image-container">
          <img
            src="/img/cookie.png"
            alt="cookie"
            onClick={() => handleClick(updateGamestate)}
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}

Cookie.propTypes = {
  gameState: PropTypes.shape({
    cookies: PropTypes.number,
    cachedCPS: PropTypes.number,
    upgrades: PropTypes.arrayOf(PropTypes.number),
  }),
  updateGamestate: PropTypes.func,
};
