import React, { useState, useEffect, useRef} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

import marathonLogo from './assets/Miscellaneous/Marathon_Logo_WordMark_Green.png'
import RunnerIcon from './assets/Icons/RunnerIcon.svg?react'
import WeaponIcon from './assets/Icons/SwordIcon.svg?react'
import HomeIcon from './assets/Icons/HomeIcon.svg?react'
import PatchNotesIcon from './assets/Icons/PatchNotesIcon.svg?react'
import MapIcon from './assets/Icons/MapIcon.svg?react'
// import PlayerLookupIcon from './assets/Icons/PlayerLookupIcon.svg?react'

import Placeholder from './assets/Icons/Placeholder.svg?react'

import HomeTab from './Components/Tabs/Home/HomeTab';
import PlayerLookupTab from './Components/Tabs/PlayerLookup/PlayerLookupTab';
import ShellsTab from './Components/Tabs/Shells/ShellsTab';
import WeaponsTab from './Components/Tabs/Weapons/WeaponsTab';
import ItemsTab from './Components/Tabs/Items/ItemsTab';
import MapsTab from './Components/Tabs/Maps/MapsTab';
import LeaderboardTab from './Components/Tabs/Leaderboard/LeaderboardTab';
import PatchNotesTab from './Components/Tabs/PatchNotes/PatchNotesTab';

import Error from './Components/Pages/Error/Error'
import AnnouncementsPage from './Components/Pages/Announcements/AnnouncementsPage';
import AnnouncementDetail from './Components/Pages/Announcements/AnnouncementDetail';

// type TabId = 'home' | 'player-lookup' | 'shells' | 'weapons' | 'items' | 'maps' | 'leaderboard' | 'patch-notes'

interface TabConfig {
    path: string
    label: string
    ariaLabel: string
    iconSvg: React.ElementType
    component: React.ElementType
}

const TABS: TabConfig[] = [
    { path: '/', label: 'Home', ariaLabel: 'Go to Home tab', iconSvg: HomeIcon, component: HomeTab },
    { path: '/patch-notes', label: 'Patch Notes', ariaLabel: 'Go to Patch Notes tab', iconSvg: PatchNotesIcon, component: PatchNotesTab },
    { path: '/player-lookup', label: 'Player Lookup', ariaLabel: 'Go to Player Lookup tab', iconSvg: Placeholder, component: PlayerLookupTab },
    { path: '/shells', label: 'Shells', ariaLabel: 'Go to Shells tab', iconSvg: RunnerIcon, component: ShellsTab },
    { path: '/weapons', label: 'Weapons', ariaLabel: 'Go to Weapons tab', iconSvg: WeaponIcon, component: WeaponsTab },
    { path: '/items', label: 'Items', ariaLabel: 'Go to Items tab', iconSvg: Placeholder, component: ItemsTab },
    { path: '/maps', label: 'Maps', ariaLabel: 'Go to Maps tab', iconSvg: MapIcon, component: MapsTab },
    { path: '/leaderboard', label: 'Leaderboard', ariaLabel: 'Go to Leaderboard tab', iconSvg: Placeholder, component: LeaderboardTab },
]

function TabLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const [tabsOffset] = useState(0)
    const tabsListRef = useRef<HTMLDivElement>(null)
    const [scrollState, setScrollState] = useState({ left: false, right: false })

    useEffect(() => {
        let lastY = window.scrollY;
        let currentOffset = 0;

        const handleScroll = () => {
            const tabsEl = document.querySelector<HTMLElement>(".tabs-wrapper");
            if (!tabsEl) return;

            const tabsHeight = tabsEl.offsetHeight;
            const currentY = window.scrollY;
            const delta = currentY - lastY;

            if (Math.abs(delta) < 2) return; // ignore tiny scroll jitter

            currentOffset = Math.min(tabsHeight, Math.max(0, currentOffset + delta));

            tabsEl.style.transform = `translateY(-${currentOffset}px)`;

            lastY = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const el = tabsListRef.current
        if (!el) return

        const update = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el
            setScrollState({
                left: scrollLeft > 4,
                right: scrollLeft < scrollWidth - clientWidth - 4,
            })
        }

        update() // run once on mount
        el.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update, { passive: true })
        return () => {
            el.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [])

    const activeTab = TABS.find(tab => tab.path === location.pathname) ?? TABS[0]
    const ActiveComponent = activeTab.component

    return (
        <>
            <div
                className="tabs-wrapper"
                style={{ transform: `translateY(${tabsOffset}%)` }}
            >
                <div className="tabs-scroll-container">
                    {/* left fade — only rendered when scrolled right */}
                    <div className={`tabs-fade tabs-fade--left ${scrollState.left ? 'visible' : ''}`} aria-hidden="true" />

                    <div
                        role="tablist"
                        className="tabs-list"
                        ref={tabsListRef}
                    >
                        {TABS.map(tab => {
                            const Icon = tab.iconSvg
                            const isActive = location.pathname === tab.path
                            return (
                                <button
                                    key={tab.path}
                                    aria-label={tab.ariaLabel}
                                    className={`tab-button ${isActive ? 'active' : ''}`}
                                    onClick={() => navigate(tab.path)}
                                >
                                    <Icon />
                                    <span className="tab-label">{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* right fade — only rendered when more content to the right */}
                    <div className={`tabs-fade tabs-fade--right ${scrollState.right ? 'visible' : ''}`} aria-hidden="true" />
                </div>
            </div>
            <div className="tab-content">
                <div className="tab-panel">
                    <ActiveComponent />
                </div>
            </div>
        </>
    )
}

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <img src={marathonLogo} alt="Marathon Logo" className="marathon-logo" />
                    <h1>MARATHON TRACKER</h1>
                </div>
            </header>

            <Routes>
                <Route path="*" element={<Error />} />

                <Route path="/" element={<TabLayout />} />
                <Route path="/patch-notes" element={<TabLayout />} />
                <Route path="/player-lookup" element={<TabLayout />} />
                <Route path="/shells" element={<TabLayout />} />
                <Route path="/weapons" element={<TabLayout />} />
                <Route path="/items" element={<TabLayout />} />
                <Route path="/maps" element={<TabLayout />} />
                <Route path="/leaderboard" element={<TabLayout />} />

                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/announcements/:id" element={<AnnouncementDetail />} />
            </Routes>

            <footer className="footer-content">
                <div className="footer-left">
                    <span className="footer-brand">MARATHON TRACKER</span>
                    <p>An unofficial fan project — not affiliated with Bungie, Inc.</p>
                </div>
                <div className="footer-divider" />
                <div className="footer-right">
                    <p>Marathon™, Bungie™, and all associated logos, images, and trademarks are property of <a href="https://www.bungie.net" target="_blank" rel="noreferrer">Bungie, Inc.</a></p>
                </div>
            </footer>
        </div>
    )
}

export default App