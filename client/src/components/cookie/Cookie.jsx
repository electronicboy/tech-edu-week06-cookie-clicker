import { handleClick } from "../../GameFunctions.js";
import PropTypes from "prop-types";
import "./Cookie.css";
import { useRef } from "react";

/**
 *
 * @param {gameState} gameState
 * @param {function} updateGamestate
 * @returns {JSX.Element}
 * @constructor
 */
export default function Cookie({ gameState, updateGamestate }) {
  const image = useRef();
  return (
    <>
      <div className="cookie-container">
        <div className="game-info-container">
          <p>{gameState.cookies.toFixed(0)} cookies</p>
          <p>{gameState.cachedCPS} CPS</p>
        </div>
        <div className="cookie-image-container">
          <img
            ref={image}
            src="/img/cookie.png"
            alt="cookie"
            onClick={(event) => handleClick(updateGamestate, event, image)}
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
