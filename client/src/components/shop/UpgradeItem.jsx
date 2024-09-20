import PropTypes from "prop-types";
import { formatCurrency } from "../../util.js";

export default function UpgradeItem({ item, upgradeCB }) {
  return (
    <div className="upgrade-item">
      <span>{item.name}</span>
      <span>{item.increase}</span>
      <button onClick={() => upgradeCB(item)}>
        Upgrade ${formatCurrency(item.cost)}
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
