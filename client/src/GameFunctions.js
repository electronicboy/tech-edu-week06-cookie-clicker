/**
 * @namespace gameState
 * @property {number} cookies
 * @property {number} cachedCPS
 * @property {Array<number>} upgrades
 */

/**
 * @namespace upgrade
 * @property {number} id
 * @property {number} cost
 * @property {number} increase
 */

/**
 * @callback updateGameState
 * @param {gameState} cb game state
 * @return {gameState} game state
 */

/**
 *
 * @param {number} tick current tick
 * @param {number} tps how frequently the game should tick
 * @param {updateGameState} updateGameState callback to update current game state object
 * @param {MutableRefObject} upgradesStateDirty the {@link useRef} which lets us track if the update list has been modified
 * @param {Array<upgrades>} upgrades
 *
 */
export function tickLoop(tick, tps, updateGameState, upgradesStateDirty, upgrades) {
    updateGameState(currentGameState => {
        /** @type {gameState} */
        const newGameState = {...currentGameState}; // create a copy;

        // We only need to recalculate this if the update state is dirty
        if (upgradesStateDirty.current) {
            let cps = 0;
            if (newGameState.upgrades != null) {
                for (let upgrade of upgrades) {
                    let totalUpgrade = newGameState.upgrades[upgrade.id];
                    if (totalUpgrade) {
                        cps += upgrade.increase * totalUpgrade;
                    }
                }
            }

            newGameState.cachedCPS = cps;
            upgradesStateDirty.current = false;
        }

        let currentCPS = newGameState.cachedCPS || 0;

        newGameState.cookies = (newGameState.cookies || 0) + (currentCPS / tps);

        return newGameState;
    })

    if (tick % 5 === 0) {
        updateGameState(current => {
            if (!localStorage.getItem("save-off")) {
                localStorage.setItem("game-state", JSON.stringify(current));
            }
            return current; // No update, will clean
        })
    }
}

/**
 *
 * @param {updateGameState} gameState
 * @param {upgrade} upgrade
 * @return {boolean} was the upgrade a success?
 */
export function handleUpgrade(gameState, updateGameState, upgrade) {
    let ret = false;
    // This is more complex, as StrictMode causes state updaters to double run, so, we'll operate on the raw state
    // and then set a copy if something actually changes

    if (gameState.cookies >= upgrade.cost) {
        gameState.cookies -= upgrade.cost;

        if (!gameState.upgrades) {
            gameState.upgrades = [];
        }
        gameState.upgrades[upgrade.id] += 1;
        ret = true;
    }
    if (ret) {
        updateGameState({...gameState})
    }
    return ret;
}

/**
 *
 * @param {updateGameState} gameState
 */
export function handleClick(updateGameState) {
    updateGameState(gameState => {
        return {
            ...gameState,
            cookies: gameState.cookies + gameState.cachedCPS
        }
    })

}
