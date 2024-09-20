import {Suspense, useDeferredValue, useEffect, useRef, useState} from 'react'
import './App.css'
import UpgradesList from "./components/UpgradesList.jsx";

function App() {
    const [upgrades, setUpgrades] = useState()
    const deferred = useDeferredValue(upgrades)
    const promise = useRef()
    useEffect(() => {


        promise.current = fetch("https://cookie-upgrade-api.vercel.app/api/upgrades")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setUpgrades(res)
            })

    }, [])

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <UpgradesList upgrades={deferred}/>
            </Suspense>
        </>
    )
}

export default App
