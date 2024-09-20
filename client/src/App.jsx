import {Suspense, useEffect, useRef, useState} from 'react'
import './App.css'
import UpgradesShop from "./components/shop/UpgradesShop.jsx";
import LoadingElement from "./components/structure/LoadingElement.jsx";
import Cookie from "./components/cookie/Cookie.jsx";
import {tickLoop, handleUpgrade} from "./GameFunctions.js";
import Header from "./components/structure/Header.jsx";

const TPS = 1;

function App() {
    // We're using loadingSuccess to track if loading works
    const [loadingSuccess, setLoadingSuccess] = useState(null);
    const [upgrades, setUpgrades] = useState()

    const [gameState, setGameState] = useState(() => {
        let defaultData = {cookies: 0, cachedCPS: 0, upgrades: []}
        let fetchedState = localStorage.getItem("game-state");
        if (fetchedState !== null) {
            return {...defaultData, ...JSON.parse(fetchedState)}
        }
        return defaultData;
    })

    const upgradesDirty = useRef(true);
    const tick = useRef(0);

    useEffect(() => {
        fetch("https://tech-edu-week06-cookie-clicker-api.onrender.com/api/upgrades")
            .then((res) => res.json())
            .then((res) => {
                setUpgrades(res)
                setLoadingSuccess(true)
            }).catch(() => {
            setLoadingSuccess(false)
        });
    }, [])

    useEffect(() => {
        if (upgrades) {
            const intervalID = setInterval(() => {
                tick.current++
                tickLoop(tick.current, TPS, setGameState, upgradesDirty, upgrades)
            }, 1000 / TPS)

            return () => clearInterval(intervalID)
        }

    }, [upgrades])


    return (
        <>
            <Suspense fallback={<LoadingElement loadingSuccess={loadingSuccess}/>}>
                <Header />
                <div className="container">
                    <Cookie gameState={gameState} updateGamestate={setGameState}/>
                    <UpgradesShop upgrades={upgrades} gameState={gameState} updateGamestate={setGameState}
                                  upgradeDirtyRef={upgradesDirty}/>
                </div>
            </Suspense>
        </>
    )
}

export default App
