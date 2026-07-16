import { useState } from "react"
import { Link } from "react-router-dom"
import { RUNNERS } from "../../../Data/Shells/RunnerData"
import "./ShellsTab.css"

const sortedRunners = RUNNERS.toSorted((a, b) => a.name.localeCompare(b.name))

function ShellsTab() {
    const [loadedImages, setLoadedImages] = useState<Set<string | number>>(() => new Set())

    const handleImageLoad = (id: string | number) => {
        setLoadedImages((prev) => {
            const next = new Set(prev)
            next.add(id)
            return next
        })
    }

    return (
        <div className="tab-content-inner">
            <h2>Shells</h2>

            <div className="shell-grid">
                {sortedRunners.map((r) => {
                    const isLoaded = loadedImages.has(r.id)

                    return (
                        <Link key={r.id} to={`/shells/${r.id}`} className="shell-card">
                            <div className="shell-image">
                                {r.portraitPath ? (
                                    <>
                                        {!isLoaded && (
                                            <div className="shell-image-loading" aria-hidden="true">
                                                <span className="shell-spinner" />
                                            </div>
                                        )}
                                        <img
                                            src={r.portraitPath}
                                            alt={r.name}
                                            className={`shell-portrait${isLoaded ? " is-loaded" : ""}`}
                                            onLoad={() => handleImageLoad(r.id)}
                                        />
                                    </>
                                ) : (
                                    <div className="shell-image-placeholder">?</div>
                                )}
                            </div>
                            <div className="shell-info">
                                <span className="shell-name">{r.name}</span>
                                {r.role && <span className="shell-role">{r.role}</span>}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ShellsTab