// Single source of truth for runner stats.
// To add a new stat: add ONE line here. The key, the display label,
// and the RunnerStats interface all derive from this object — nothing
// else to keep in sync by hand.
export const STAT_CONFIG = {
    heatCapacity: { label: "Heat Capacity", description: "How much heat (stamina) can be used before getting overheated." },
    agility: { label: "Agility", description: "How fast your shell can move as well as jump height." },
    lootSpeed: { label: "Loot Speed", description: "How fast items get revealed when looting." },
    fallResistance: { label: "Fall Resistance", description: "Increases distance in which your shell will start registering fall damage, as well as reducing it." },
    meleeDamage: { label: "Melee Damage", description: "How much damage the knife does, as well as quick melee (which is far less)." },
    finisherSiphon: { label: "Finisher Siphon", description: "Amount of shield charge gained when performaing a finisher move." },
    primeRecovery: { label: "Prime Recovery", description: "How much time it takes to recovery your prime ability." },
    tacticalRecovery: { label: "Tactical Recovery", description: "How much time it takes to recovery your tactical ability." },
    selfRepairSpeed: { label: "Self-Repair Speed", description: "How fast health/shield is gained through any healing source." },
    reviveSpeed: { label: "Revive Speed", description: "How fast you can revive teammates, as well as yourself (which is far more)." },
    hardware: { label: "Hardware", description: "Reduces duration of physical status effects." },
    firewall: { label: "Firewall", description: "Reduces duration of electronic status effects." },
    pingDuration: { label: "Ping Duration", description: "How long pings last on enemies." },
} as const satisfies Record<string, { label: string, description: string }>

export type RunnerStatKey = keyof typeof STAT_CONFIG
export type RunnerStatName = (typeof STAT_CONFIG)[RunnerStatKey]["label"]

// Base stats: one number per stat key. This intentionally represents
// BASE values only — upgrades/cores should apply as modifiers on top
// of this at read-time, not mutate it, so you always have the
// unmodified baseline to recompute from.
export type RunnerStats = {
    [K in RunnerStatKey]: number
}

export function getStatLabel(key: RunnerStatKey): RunnerStatName {
    return STAT_CONFIG[key].label
}

// Handy for building stat-selector UIs, iterating in display order, etc.
export const STAT_KEYS = Object.keys(STAT_CONFIG) as RunnerStatKey[]