import { useParams, Link } from "react-router-dom"
import { RUNNERS } from "../../../Data/Shells/RunnerData"
import { STAT_KEYS, getStatLabel, getStatDescription } from "../../../Data/Shells/Stats"
import type { AbilityType } from "../../../Data/Shells/Abilities"
import Error from "../Error/Error"
import "./ShellDetail.css"

const ABILITY_TYPE_LABELS: Record<AbilityType, string> = {
    prime: "Prime Ability",
    tactical: "Tactical Ability",
    trait: "Trait",
}
const ABILITY_TYPE_ORDER: AbilityType[] = ["prime", "tactical", "trait"]

const sortedRunners = RUNNERS.toSorted((a, b) => a.name.localeCompare(b.name))

function ShellDetail() {
    const { shellId } = useParams()
    const runner = RUNNERS.find((r) => r.id === shellId)

    if (!runner) {
        return (
            <Error
                message="Shell Not Found"
                sub={`No shell exists with id "${shellId}"`}
                backlink="/shells"
                backmsg="Back to Shells"
            />
        )
    }

    interface Ability {
        readonly id: string
        readonly name: string
        readonly description: string
        readonly type: AbilityType
        readonly iconPath: string
    }

    const abilitiesByType = runner.abilities.reduce<Partial<Record<AbilityType, Ability[]>>>(
        (acc, a) => {
            (acc[a.type] ??= []).push(a)
            return acc
        },
        {}
    )

    return (
        <div className="shell-detail-page">
            <div className="shell-detail-nav">
                <Link to="/shells" className="shell-detail-back">← Back to Shells</Link>
                <div className="shell-detail-nav-shells">
                    {sortedRunners.map((r) => (
                        <Link
                            key={r.id}
                            to={`/shells/${r.id}`}
                            className={`shell-detail-nav-shell-link${r.id === runner.id ? " active" : ""}`}
                            aria-current={r.id === runner.id ? "page" : undefined}
                        >
                            {r.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="shell-detail-layout">
                <div className="shell-detail-sidebar">
                    <div className="shell-detail-image">
                        {runner.portraitPath ? (
                            <img src={runner.portraitPath} alt={runner.name} />
                        ) : (
                            <div className="shell-image-placeholder large">?</div>
                        )}
                    </div>

                    <h1>{runner.name}</h1>

                    {runner.role && <span className="shell-detail-role">{runner.role}</span>}
                    {runner.bio && <p className="shell-detail-bio">{runner.bio}</p>}
                </div>

                <div className="shell-detail-stats">
                    <span className="shell-detail-stats-label">Base Stats</span>
                    <div className="shell-stat-grid">
                        {STAT_KEYS.map((key) => {
                            const value = runner.baseStats[key]
                            const fillPercent = Math.min(100, Math.max(0, value))
                            const isOverflow = value > 100
                            const isUnderflow = value < 0
                            const tooltipId = `stat-tooltip-${key}`

                            return (
                                <div key={key} className="shell-stat-row">
                                    <button
                                        type="button"
                                        className="shell-stat-label-wrap"
                                        aria-describedby={tooltipId}
                                    >
                                        <span className="shell-stat-label">{getStatLabel(key)}</span>
                                        <div id={tooltipId} className="shell-stat-tooltip" role="tooltip">
                                            <strong>{getStatLabel(key)}</strong>
                                            <p>{getStatDescription(key)}</p>
                                        </div>
                                    </button>
                                    <div className="shell-stat-bar-track">
                                        <div
                                            className={`shell-stat-bar-fill${isUnderflow ? " underflow" : ""}`}
                                            style={{ width: `${fillPercent}%` }}
                                        />
                                    </div>
                                    <span className="shell-stat-value">
                                        {value}
                                        {isOverflow && (
                                            <span className="shell-stat-flag overflow" title="Exceeds 100">▲</span>
                                        )}
                                        {isUnderflow && (
                                            <span className="shell-stat-flag underflow" title="Below 0">▼</span>
                                        )}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="shell-detail-content">
                    <div className="shell-detail-abilities">
                        {ABILITY_TYPE_ORDER.flatMap((type) =>
                            (abilitiesByType[type] ?? []).map((a) => (
                                <div key={a.id} className="shell-ability">
                                    <span className="shell-ability-type-label">
                                        {ABILITY_TYPE_LABELS[type]}
                                    </span>
                                    <span className="shell-ability-name">{a.name}</span>
                                    <p className="shell-ability-description">{a.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShellDetail