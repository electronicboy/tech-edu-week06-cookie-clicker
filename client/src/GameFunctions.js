/**
 * @namespace gameState
 * @property {number} cookies
 * @property {number} cachedCPS
 * @property {number} cachedClickRate
 * @property {Array<number>} upgrades
 */

/**
 * @namespace upgrade
 * @property {number} id
 * @property {number} cost
 * @property {number} increase
 * @property {upgradeMeta} upgrade
 */

/**
 * @namespace upgradeMeta
 * @property {number} type an index of the enum type
 * @property {number} amount
 */

import {randomElement} from "./util.js";

/**
 * @callback updateGameState
 * @param {gameState} cb game state
 * @return {gameState} game state
 */

const upgradeType = ["CPS", "CLICK", "CLICK_MULTI", "CLICK_RATE_CPS"];

/**
 *
 * @param {number} tick current tick
 * @param {number} tps how frequently the game should tick
 * @param {updateGameState} updateGameState callback to update current game state object
 * @param {MutableRefObject} upgradesStateDirty the {@link useRef} which lets us track if the update list has been modified
 * @param {Array<upgrade>} upgrades
 *
 */
export function tickLoop(
    tick,
    tps,
    updateGameState,
    upgradesStateDirty,
    upgrades,
) {
    const upgradesState = upgradesStateDirty.current;
    updateGameState((currentGameState) => {
        /** @type {gameState} */
        let newGameState = currentGameState; // create a copy;

        // We only need to recalculate this if the update state is dirty
        if (upgradesState) {
            let cps = 0;
            let clickRate = 1;
            if (newGameState.upgrades != null) {
                /** @type {Array<upgrade>} */
                let pendingUpgrades = [];
                for (let upgrade of upgrades) {
                    let totalUpgrade = newGameState.upgrades[upgrade.id];
                    if (totalUpgrade) {
                        if (upgrade.upgrade) {
                            if (upgrade.upgrade.type === 0) {
                                cps += upgrade.upgrade.amount * totalUpgrade;
                            } else {
                                pendingUpgrades.push(upgrade);
                            }
                        } else {
                            cps += upgrade.increase * totalUpgrade;
                        }
                    }
                }

                while (pendingUpgrades.length > 0) {
                    const upgrade = pendingUpgrades.shift();
                    const type = upgradeType[upgrade.upgrade.type];
                    const amount = upgrade.upgrade.amount;
                    const upgradeAmount = newGameState.upgrades[upgrade.id]
                    switch (type) {
                        case "CPS":
                            // We handled this above
                            break;
                        case "CLICK":
                            clickRate += (amount * upgradeAmount);
                            break;
                        case "CLICK_MULTI":
                            clickRate *= (amount * upgradeAmount);
                            break;
                        case "CLICK_RATE_CPS":
                            clickRate = clickRate + (cps * (amount * upgradeAmount))
                    }
                }
            }

            newGameState = {
                ...newGameState,
                cachedCPS: cps,
                cachedClickRate: clickRate,
            };
        }

        let currentCPS = newGameState.cachedCPS || 0;

        newGameState = {
            ...newGameState,
            cookies: (newGameState.cookies || 0) + currentCPS / tps,
        };

        return newGameState;
    });

    if (tick % 5 === 0) {
        updateGameState((current) => {
            if (!localStorage.getItem("save-off")) {
                localStorage.setItem("game-state", JSON.stringify(current));
            }
            return current; // No update, will clean
        });
    }

    upgradesStateDirty.current = false;
}

/**
 *
 * @param existingGameState
 * @param updateGameState
 * @param {upgrade} upgrade
 * @return {boolean} was the upgrade a success?
 */
export function handleUpgrade(existingGameState, updateGameState, upgrade) {
    let ret = false;
    // This is more complex, as StrictMode causes state updaters to double run, so, we'll operate on the raw state
    // and then set a copy if something actually changes

    let gameState = {...existingGameState};
    if (gameState.cookies >= upgrade.cost) {
        gameState.cookies -= upgrade.cost;

        if (!gameState.upgrades) {
            gameState.upgrades = [];
        }
        const currentVal = gameState.upgrades[upgrade.id];
        gameState.upgrades[upgrade.id] = (currentVal || 0) + 1;
        ret = true;
    }
    if (ret) {
        updateGameState((storedGameState) => {
            return {...storedGameState,
                cookies: gameState.cookies,
                upgrades: gameState.upgrades};
        });
    }
    return ret;
}

const sounds = ["/sound/ui-click-43196.mp3", "/sound/ui-click-97915.mp3"]
/**
 *
 * @param {updateGameState} gameState
 * @param {MouseEvent} event
 * @param {boolean} doSound
 */
export function handleClick(updateGameState, event, doSound) {
    const clickX = event.clientX;
    const clickY = event.clientY;

    if (doSound) {
        const randSound = randomElement(sounds);
        new Audio(randSound).play().catch(() => {})
    }

    updateGameState((gameState) => {
        const plusDisp = document.createElement("div");
        plusDisp.textContent = gameState.cachedClickRate | 1;
        const offsetY = (Math.random() * 50) - 25;
        const offsetX = (Math.random() * 50) - 25;
        plusDisp.style.left = `${clickX + offsetX}px`;
        plusDisp.style.top = `${clickY + offsetY}px`;
        document.body.appendChild(plusDisp);
        plusDisp.classList.add("plus");

        plusDisp.addEventListener("animationend", () => {
            plusDisp.remove();
        });

        const newState = {
            ...gameState,
            cookies: gameState.cookies + (gameState.cachedClickRate | 1),
        };

        return newState;
    });
}

/**
 * produces text to render
 * @param upgrade
 */
export function upgradeDisplay(upgrade) {
    if (upgrade.upgrade) {
        const type = upgradeType[upgrade.upgrade.type];
        const amount = upgrade.upgrade.amount;
        switch (type) {
            case "CPS":
                return `+${amount} CPS`;
            case "CLICK":
                return `+${amount} CLICK`;
            case "CLICK_MULTI":
                return `*${amount} CLICK`;
            case "CLICK_RATE_CPS":
                return `+${amount} * CPS CLICK`
        }
    }
    return `+${upgrade.increase} CPS`;
}

export function canPurchase(gameState, upgrade, amount) {
    return gameState.cookies >= upgrade.cost * amount;
}
