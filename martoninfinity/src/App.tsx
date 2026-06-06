import React, { useState, useEffect } from 'react'
import './App.css'
import marathonLogo from './assets/Marathon_Logo_WordMark_Green.png'
import RunnerIcon from './assets/Icons/RunnerIcon.svg?react'
import WeaponIcon from './assets/Icons/SwordIcon.svg?react'
import Placeholder from './assets/Icons/Placeholder.svg?react'

type TabId = 'home' | 'player-lookup' | 'shells' | 'weapons' | 'items' | 'maps' | 'leaderboard' | 'patch-notes'

interface TabConfig {
    id: TabId
    label: string
    ariaLabel: string
    iconSvg: React.ElementType
}

const TABS: TabConfig[] = [
    { id: 'home', label: 'Home', ariaLabel: 'Go to Home tab', iconSvg: Placeholder },
    { id: 'player-lookup', label: 'Player Lookup', ariaLabel: 'Go to Player Lookup tab', iconSvg: Placeholder },
    { id: 'shells', label: 'Shells', ariaLabel: 'Go to Shells tab', iconSvg: RunnerIcon },
    { id: 'weapons', label: 'Weapons', ariaLabel: 'Go to Weapons tab', iconSvg: WeaponIcon },
    { id: 'items', label: 'Items', ariaLabel: 'Go to Items tab', iconSvg: Placeholder },
    { id: 'maps', label: 'Maps', ariaLabel: 'Go to Maps tab', iconSvg: Placeholder },
    { id: 'leaderboard', label: 'Leaderboard', ariaLabel: 'Go to Leaderboard tab', iconSvg: Placeholder },
    { id: 'patch-notes', label: 'Patch Notes', ariaLabel: 'Go to Patch Notes tab', iconSvg: Placeholder },
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

            let newOffset = tabsOffset - scrollDelta // Inverted: subtract delta instead of adding

            if (currentScrollY < scrollThreshold) {
                // Always show tabs when near the top
                newOffset = 0
            } else {
                // Clamp the offset between -100% (fully hidden) and 0 (fully visible)
                newOffset = Math.max(-100, Math.min(0, newOffset))
            }

            setTabsOffset(newOffset)
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY, tabsOffset])

    const handleTabClick = (tabId: TabId) => {
        setActiveTab(tabId)
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeTab />
            case 'player-lookup':
                return <PlayerLookupTab />
            case 'shells':
                return <ShellsTab />
            case 'weapons':
                return <WeaponsTab />
            case 'items':
                return <ItemsTab />
            case 'maps':
                return <MapsTab />
            case 'leaderboard':
                return <LeaderboardTab />
            case 'patch-notes':
                return <PatchNotesTab />
        }
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <img src={marathonLogo} alt="Marathon Logo" className="marathon-logo" />
                    <h1>MARATHON TRACKER</h1>
                </div>
            </header>

            <div className="tabs-wrapper" style={{ transform: `translateY(${tabsOffset}%)` }}>
    <div
        role="tablist"
        className="tabs-list"
        aria-label="Main navigation tabs"
    >
        {TABS.map((tab) => {
            const Icon = tab.iconSvg;

            return (
                <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`${tab.id}-panel`}
                    aria-label={tab.ariaLabel}
                    data-tab-id={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                >
                    <Icon />
                    {tab.label}
                </button>
            );
        })}
    </div>
</div>

            <div className="tab-content">
                <div
                    role="tabpanel"
                    id={`${activeTab}-panel`}
                    aria-labelledby={activeTab}
                    className="tab-panel"
                >
                    {renderTabContent()}
                </div>
            </div>
        </div>
    )
}

// Placeholder components for each tab
function HomeTab() {
    return (
        <div className="tab-content-inner">
            <h2>Home Screen</h2>
            <p>Select a tab to navigate through the application.</p>

        </div>
    )
}

function PlayerLookupTab() {
    return (
        <div className="tab-content-inner">
            <h2>Player Lookup</h2>
            <p>Search for and view player information here.</p>
        </div>
    )
}

function ShellsTab() {
    return (
        <div className="tab-content-inner">
            <h2>Shells</h2>
            <p>Browse available shells.</p>
        </div>
    )
}

function WeaponsTab() {
    return (
        <div className="tab-content-inner">
            <h2>Weapons</h2>
            <p>Browse available weapons.</p>
        </div>
    )
}

function ItemsTab() {
    return (
        <div className="tab-content-inner">
            <h2>Items</h2>
            <p>Browse available items.</p>
        </div>
    )
}

function MapsTab() {
    return (
        <div className="tab-content-inner">
            <h2>Maps</h2>
            <p>Browse available maps.</p>
        </div>
    )
}

function LeaderboardTab() {
    return (
        <div className="tab-content-inner">
            <h2>Leaderboard</h2>
            <p>View the leaderboard standings.</p>
        </div>
    )
}

function PatchNotesTab() {
    const bungieUpdatesUrl = 'https://www.bungie.net/7/en/News/MarathonUpdates'

    return (
        <div className="tab-content-inner">
            <h2>Patch Notes</h2>
            <p>Latest Marathon Updates from Bungie</p>
            <div className="patch-notes-container">
                <div className="patch-notes-info">
                    <p className="patch-notes-description">
                        Marathon Updates are published on Bungie's official website. Click the button below to view the latest patch notes and announcements.
                    </p>
                    <a
                        href={bungieUpdatesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="patch-notes-button"
                    >
                        View Marathon Updates on Bungie.net →
                    </a>
                </div>
                <div className="patch-notes-info-section">
                    <h3>Coming Soon</h3>
                    <p>We're working on integrating live patch notes directly into this tracker. Check back soon for updates!</p>
                </div>
            </div>
        </div>
    )
}

export default App
