import PropTypes from "prop-types";
import UpgradeItem from "./UpgradeItem.jsx";
import { handleUpgrade } from "../../GameFunctions.js";
import "./UpgradesShop.css";

/**
 *
 * @param upgrades
 * @param gameState
 * @param updateGamestate
 * @param upgradeDirtyRef
 * @returns {JSX.Element}
 * @constructor
 */
export default function UpgradesShop({
  upgrades,
  gameState,
  updateGamestate,
  upgradeDirtyRef,
}) {
  if (!upgrades) throw new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="upgrades-shop">
      <div className="upgrades-shop-header">
        <span>Upgrades</span>
      </div>
      <div className="upgradesList">
        {upgrades.map((upgrade) => (
          <UpgradeItem
            key={upgrade.id}
            item={upgrade}
            upgradeCB={() => {
              if (handleUpgrade(gameState, updateGamestate, upgrade)) {
                upgradeDirtyRef.current = true;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

UpgradesShop.propTypes = {
  upgrades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      cost: PropTypes.number,
      increase: PropTypes.number,
    }),
  ),
  gameState: PropTypes.shape({
    cookies: PropTypes.number,
    cachedCPS: PropTypes.number,
    upgrades: PropTypes.arrayOf(PropTypes.number),
  }),
  updateGamestate: PropTypes.func,
  upgradeDirtyRef: PropTypes.object,
};
