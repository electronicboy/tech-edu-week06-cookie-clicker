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
    const upgradesState = upgradesStateDirty.current
    updateGameState(currentGameState => {
        /** @type {gameState} */
        let newGameState = currentGameState; // create a copy;

        // We only need to recalculate this if the update state is dirty
        if (upgradesState) {
            let cps = 0;
            if (newGameState.upgrades != null) {
                for (let upgrade of upgrades) {
                    let totalUpgrade = newGameState.upgrades[upgrade.id];
                    if (totalUpgrade) {
                        cps += upgrade.increase * totalUpgrade;
                    }
                }
            }

            newGameState = {...newGameState, cachedCPS: cps}
        }

        let currentCPS = newGameState.cachedCPS || 0;

        newGameState = {...newGameState, cookies: (newGameState.cookies || 0) + (currentCPS / tps)}

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

    let gameState = {...existingGameState}
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
        updateGameState(storedGameState => {
            return {...storedGameState, upgrades: gameState.upgrades};
        })
    }
    return ret;
}

/**
 *
 * @param {updateGameState} gameState
 */
export function handleClick(updateGameState, event, ref) {
    const htmlElement = ref.current;
    const clickX = event.clientX;
    const clickY = event.clientY;


    console.log(ref)
    updateGameState(gameState => {
        const plusDisp = document.createElement("div")
        plusDisp.textContent = (gameState.cachedCPS | 1);
        plusDisp.style.left = `${clickX}px`;
        plusDisp.style.top = `${clickY}px`;
        document.body.appendChild(plusDisp);
        plusDisp.classList.add("plus")

        plusDisp.addEventListener('animationend', () => {
            plusDisp.remove();
        })


        const newState = {
        ...gameState,
            cookies: gameState.cookies + (gameState.cachedCPS | 1)
        }
        console.log(newState);

        return newState
    })

}

/**
 * produces text to render
 * @param upgrade
 */
export function upgradeDisplay(upgrade) {
    return `+${upgrade.increase} CPS`
}

export function canPurchase(gameState, upgrade, amount) {
    return gameState.cookies >= upgrade.cost * amount;
}
