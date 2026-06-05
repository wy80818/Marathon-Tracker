import { useState, useEffect } from 'react'
import './App.css'
import marathonLogo from './assets/Marathon_Logo_WordMark_Green.png'

type TabId = 'home' | 'player-lookup' | 'shells' | 'weapons' | 'items' | 'maps' | 'leaderboard'

interface TabConfig {
    id: TabId
    label: string
    ariaLabel: string
}


const TABS: TabConfig[] = [
    { id: 'home', label: 'Home', ariaLabel: 'Go to Home tab' },
    { id: 'player-lookup', label: 'Player Lookup', ariaLabel: 'Go to Player Lookup tab' },
    { id: 'shells', label: 'Shells', ariaLabel: 'Go to Shells tab' },
    { id: 'weapons', label: 'Weapons', ariaLabel: 'Go to Weapons tab' },
    { id: 'items', label: 'Items', ariaLabel: 'Go to Items tab' },
    { id: 'maps', label: 'Maps', ariaLabel: 'Go to Maps tab' },
    { id: 'leaderboard', label: 'Leaderboard', ariaLabel: 'Go to Leaderboard tab' },
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tabId: TabId) => {
        const currentIndex = TABS.findIndex(tab => tab.id === tabId)
        let nextIndex = currentIndex

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault()
                nextIndex = currentIndex === 0 ? TABS.length - 1 : currentIndex - 1
                break
            case 'ArrowRight':
                e.preventDefault()
                nextIndex = currentIndex === TABS.length - 1 ? 0 : currentIndex + 1
                break
            case 'Home':
                e.preventDefault()
                nextIndex = 0
                break
            case 'End':
                e.preventDefault()
                nextIndex = TABS.length - 1
                break
            default:
                return
        }

        setActiveTab(TABS[nextIndex].id)
        // Focus the newly selected tab button
        setTimeout(() => {
            const tabElement = document.querySelector(`[data-tab-id="${TABS[nextIndex].id}"]`) as HTMLButtonElement | null
            tabElement?.focus()
        }, 0)
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
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            aria-controls={`${tab.id}-panel`}
                            aria-label={tab.ariaLabel}
                            data-tab-id={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.id)}
                            onKeyDown={(e) => handleKeyDown(e, tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
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
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
            <p>Select a tab to navigate through the application.</p>
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

export default App
