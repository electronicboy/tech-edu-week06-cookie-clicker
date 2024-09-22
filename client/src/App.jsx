import {Suspense, useEffect, useRef, useState} from 'react'
import './App.css'
import UpgradesShop from "./components/shop/UpgradesShop.jsx";
import LoadingElement from "./components/structure/LoadingElement.jsx";
import Cookie from "./components/cookie/Cookie.jsx";
import {tickLoop} from "./GameFunctions.js";
import Header from "./components/structure/Header.jsx";

const TPS = 10;

function App() {
    // We're using loadingSuccess to track if loading works
    const [loadingSuccess, setLoadingSuccess] = useState(null);
    const [upgrades, setUpgrades] = useState()

    const [gameState, setGameState] = useState(() => {
        let defaultData = {cookies: 0, cachedCPS: 0, upgrades: [], clicks: 0}
        let fetchedState = localStorage.getItem("game-state");
        if (fetchedState !== null) {
            return {...defaultData, ...JSON.parse(fetchedState)}
        }
        return defaultData;
    })

    const upgradesDirty = useRef(true);
    const tick = useRef(0);
    const teardown = useRef(false);
    const mute = useRef(false);
    const audioPlayer = useRef(new Audio("sound/cookies-11147.mp3"))


    // State
    const doReset = useRef(false)

    if (doReset.current) {
        localStorage.removeItem("game-state");
        location.reload();
    }

    function resetGame() {
        teardown.current = true;
        doReset.current = true;
        // triggers a re-render which will hit the logic above
        setGameState({})
    }

    function toggleMusic() {
        mute.current = !mute.current;
    }

    useEffect(() => {
        fetch("https://tech-edu-week06-cookie-clicker-api.onrender.com/api/upgrades")
            .then((res) => res.json())
            .then((res) => {
                setUpgrades(res)
                setLoadingSuccess(true)
            }).catch(() => {
            setLoadingSuccess(false)
        });
        audioPlayer.current.volume = 0.05;
    }, [])

    useEffect(() => {
        if (upgrades) {
            const intervalID = setInterval(() => {
                if (audioPlayer.current.paused && !mute.current) {
                    audioPlayer.current.play().catch(_ => _);
                } else if (!audioPlayer.current.paused && mute.current) {
                    audioPlayer.current.pause()
                    audioPlayer.current.currentTime = 0
                }

                tick.current++
                if (!teardown.current) {
                    tickLoop(tick.current, TPS, setGameState, upgradesDirty, upgrades)
                }
            }, 1000 / TPS)

            return () => clearInterval(intervalID)
        }

    }, [upgrades])


    return (
        <>
            <Suspense fallback={<LoadingElement loadingSuccess={loadingSuccess}/>}>
                <Header resetFunct={resetGame} toggleMusic={toggleMusic}/>
                <div className="container">
                    <Cookie gameState={gameState} updateGamestate={setGameState} muteRef={mute}/>
                    <UpgradesShop upgrades={upgrades} gameState={gameState} updateGamestate={setGameState}
                                  upgradeDirtyRef={upgradesDirty} muteRef={mute}/>
                </div>
            </Suspense>
        </>
    )
}

export default App
