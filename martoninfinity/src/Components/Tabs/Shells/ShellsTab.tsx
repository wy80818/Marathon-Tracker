import { Link } from "react-router-dom"
import { RUNNERS } from "../../../Data/Shells/RunnerData"
import "./ShellsTab.css"

const sortedRunners = RUNNERS.toSorted((a, b) => a.name.localeCompare(b.name))

function ShellsTab() {
    return (
        <div className="tab-content-inner">
            <h2>Shells</h2>

            <div className="shell-grid">
                {sortedRunners.map((r) => (
                    <Link key={r.id} to={`/shells/${r.id}`} className="shell-card">
                        <div className="shell-image">
                            {r.portraitPath ? (
                                <img src={r.portraitPath} alt={r.name} />
                            ) : (
                                <div className="shell-image-placeholder">?</div>
                            )}
                        </div>
                        <div className="shell-info">
                            <span className="shell-name">{r.name}</span>
                            {r.role && <span className="shell-role">{r.role}</span>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ShellsTab