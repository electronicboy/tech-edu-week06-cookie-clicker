import PropTypes from "prop-types";
import {formatCurrency} from "../../util.js";
import "./UpgradeItem.css";
import {canPurchase, upgradeDisplay} from "../../GameFunctions.js";

export default function UpgradeItem({gameState, item, upgradeCB}) {
    const purchasable = canPurchase(gameState, item, 1)
    return (
        <div className="upgrade-item">
            <span title={item.upgrade.display}>{item.name}</span>
            <span>{upgradeDisplay(item)}</span>
            <span>
        {"Owned: " +
            (gameState.upgrades && gameState.upgrades[item.id]
                ? gameState.upgrades[item.id]
                : "0")}
      </span>
            <button className={"shop-button"} disabled={!purchasable} onClick={() => upgradeCB(item)}>
                🍪{formatCurrency(item.cost)}
            </button>
        </div>
    );
}

UpgradeItem.propTypes = {
    gameState: PropTypes.object.isRequired,
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        increase: PropTypes.number.isRequired,
        upgrade: PropTypes.arrayOf(PropTypes.shape({
            amount: PropTypes.number,
            type: PropTypes.number,
            display: PropTypes.string
        }))
    }),
    upgradeCB: PropTypes.func.isRequired,
};
