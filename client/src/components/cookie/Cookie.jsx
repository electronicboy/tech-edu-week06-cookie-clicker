import {handleClick} from "../../GameFunctions.js";
import PropTypes from "prop-types";
import "./Cookie.css";
import {formatCurrency} from "../../util.js";

/**
 *
 * @param {gameState} gameState
 * @param {function} updateGamestate
 * @returns {JSX.Element}
 * @constructor
 */
export default function Cookie({gameState, updateGamestate, muteRef}) {
    return (
        <>
            <div className="cookie-container">
                <div className="game-info-container">
                    <p className="game-info-pop">{formatCurrency(gameState.cookies)}</p>
                    <span>Cookies</span>

                    <p className="game-info-pop">{formatCurrency(gameState.cachedCPS)}</p>
                    <p>CPS</p>
                </div>
                <div className="cookie-image-container">
                    <img
                        src="/img/cookie.png"
                        alt="cookie"
                        onClick={(event) => handleClick(updateGamestate, event, !muteRef.current)}
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
    muteRef: PropTypes.object,
};
