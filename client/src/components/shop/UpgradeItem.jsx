import PropTypes from "prop-types";
import { formatCurrency } from "../../util.js";
import "./UpgradeItem.css";
import {canPurchase, upgradeDisplay} from "../../GameFunctions.js";

export default function UpgradeItem({ gameState, item, upgradeCB }) {
    const purchasable = canPurchase(gameState, item, 1)
  return (
    <div className="upgrade-item">
      <span>{item.name}</span>
      <span>{upgradeDisplay(item)}</span>
      <span>
        {"Owned: " +
          (gameState.upgrades && gameState.upgrades[item.id]
            ? gameState.upgrades[item.id]
            : "0")}
      </span>
      <button className={"shop-button" } disabled={!purchasable} onClick={() => upgradeCB(item)}>
        🍪{formatCurrency(item.cost)}
      </button>
    </div>
  );
}

UpgradeItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    increase: PropTypes.number.isRequired,
  }),
  upgradeCB: PropTypes.func.isRequired,
};
