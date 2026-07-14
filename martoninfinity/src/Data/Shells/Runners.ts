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
