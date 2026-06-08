import React, { useState, useEffect } from 'react'
import './App.css'

import marathonLogo from './assets/Miscellaneous/Marathon_Logo_WordMark_Green.png'
import RunnerIcon from './assets/Icons/RunnerIcon.svg?react'
import WeaponIcon from './assets/Icons/SwordIcon.svg?react'
import Placeholder from './assets/Icons/Placeholder.svg?react'

import HomeTab from './Components/Tabs/HomeTab';
import PlayerLookupTab from './Components/Tabs/PlayerLookupTab';
import ShellsTab from './Components/Tabs/ShellsTab';
import WeaponsTab from './Components/Tabs/WeaponsTab';
import ItemsTab from './Components/Tabs/ItemsTab';
import MapsTab from './Components/Tabs/Maps/MapsTab';
import LeaderboardTab from './Components/Tabs/LeaderboardTab';
import PatchNotesTab from './Components/Tabs/PatchNotesTab';

type TabId = 'home' | 'player-lookup' | 'shells' | 'weapons' | 'items' | 'maps' | 'leaderboard' | 'patch-notes'

interface TabConfig {
    id: TabId
    label: string
    ariaLabel: string
    iconSvg: React.ElementType
}

const TABS: TabConfig[] = [
    { id: 'home', label: 'Home', ariaLabel: 'Go to Home tab', iconSvg: Placeholder },
    { id: 'patch-notes', label: 'Patch Notes', ariaLabel: 'Go to Patch Notes tab', iconSvg: Placeholder },
    { id: 'player-lookup', label: 'Player Lookup', ariaLabel: 'Go to Player Lookup tab', iconSvg: Placeholder },
    { id: 'shells', label: 'Shells', ariaLabel: 'Go to Shells tab', iconSvg: RunnerIcon },
    { id: 'weapons', label: 'Weapons', ariaLabel: 'Go to Weapons tab', iconSvg: WeaponIcon },
    { id: 'items', label: 'Items', ariaLabel: 'Go to Items tab', iconSvg: Placeholder },
    { id: 'maps', label: 'Maps', ariaLabel: 'Go to Maps tab', iconSvg: Placeholder },
    { id: 'leaderboard', label: 'Leaderboard', ariaLabel: 'Go to Leaderboard tab', iconSvg: Placeholder },
]

function App() {
    const [activeTab, setActiveTab] = useState<TabId>('home')
    const [tabsOffset, setTabsOffset] = useState(0)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const scrollDelta = currentScrollY - lastScrollY
            const scrollThreshold = 100

            setTabsOffset(prev => {
                if (currentScrollY < scrollThreshold) return 0
                return Math.max(-100, Math.min(0, prev - scrollDelta))
            })

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const ActiveTab = {
        home: HomeTab,
        "player-lookup": PlayerLookupTab,
        shells: ShellsTab,
        weapons: WeaponsTab,
        items: ItemsTab,
        maps: MapsTab,
        leaderboard: LeaderboardTab,
        "patch-notes": PatchNotesTab,
    }[activeTab]

    return (
        <div className="app-container">

            <header className="app-header">
                <div className="header-content">
                    <img src={marathonLogo} alt="Marathon Logo" className="marathon-logo" />
                    <h1>MARATHON TRACKER</h1>
                </div>
            </header>

            <div
                className="tabs-wrapper"
                style={{ transform: `translateY(${tabsOffset}%)` }}
            >
                <div role="tablist" className="tabs-list">
                    {TABS.map(tab => {
                        const Icon = tab.iconSvg

                        return (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="tab-content">
                <div className="tab-panel">
                    <ActiveTab />
                </div>
            </div>

        </div>
    )
}

export default App
