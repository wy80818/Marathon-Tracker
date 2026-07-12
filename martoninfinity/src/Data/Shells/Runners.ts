import type { RunnerStats } from "./Stats"
import type { Ability } from "./Abilities"

export interface Runner {
    id: string              // stable slug, e.g. "sentinel" — NEVER rename once shipped
    name: string             // display name — safe to change/localize independently of id
    role?: string            // e.g. "Offense" | "Defense" | "Support" — free-form grouping for now
    bio?: string
    portraitPath?: string
    baseStats: RunnerStats
    abilities: Ability[]     // must contain >= 1 "prime" and >= 1 "tactical" | "trait"
}

// TypeScript can't enforce "at least one ultimate + at least one tactical/passive"
// at the type level for a plain array, so we check it at build/dev time instead.
export function isValidRunner(runner: Runner): boolean {
    const hasUltimate = runner.abilities.some(a => a.type === "prime")
    const hasTacticalOrPassive = runner.abilities.some(
        a => a.type === "tactical" || a.type === "trait"
    )
    return hasUltimate && hasTacticalOrPassive
}