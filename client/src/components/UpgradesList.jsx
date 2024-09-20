import PropTypes from "prop-types";

export default function UpgradesList({upgrades}) {
    console.log(upgrades);
    if (!upgrades) throw new Promise(resolve => setTimeout(resolve, 1000));
    return (<div className="upgradesList">
        {upgrades.map(upgrade => (
            <div key={upgrade.key}>{upgrade.name}</div>
        ))}
    </div>)
}

UpgradesList.propTypes = {
    upgrades: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        cost: PropTypes.number,
        increase: PropTypes.number
    }))
}
