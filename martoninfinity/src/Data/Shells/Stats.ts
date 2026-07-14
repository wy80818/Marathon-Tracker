// Single source of truth for runner stats.
// To add a new stat: add ONE line here. The key, the display label,
// and the RunnerStats interface all derive from this object — nothing
// else to keep in sync by hand.
export const STAT_CONFIG = {
    heatCapacity: { label: "Heat Capacity", description: "Increases the number of movement actions (sprinting, sliding) you can perform before overheating." },
    agility: { label: "Agility", description: "Increases your movement speed and jump height." },
    lootSpeed: { label: "Loot Speed", description: "Increases how quickly items are revealed when looting containers." },
    meleeDamage: { label: "Melee Damage", description: "Increases the damage of your melee and knife attacks." },
    primeRecovery: { label: "Prime Recovery", description: "Reduces the cooldown of your prime ability." },
    tacticalRecovery: { label: "Tactical Recovery", description: "Reduces the cooldown of your tactical and trait abilities." },
    selfRepairSpeed: { label: "Self-Repair Speed", description: "Increases how quickly your consumables restore missing health or shields." },
    finisherSiphon: { label: "Finisher Siphon", description: "Increases the amount your shields recharge after you perform a funisher on a downed Runner." },
    reviveSpeed: { label: "Revive Speed", description: "Increases how quicky you can self-revive or revive downed crew members." },
    hardware: { label: "Hardware", description: "Reduces the duration of status effects that debilitate your Runner's physical chassis (Immobilize, Overheat, Toxin, Frost)." },
    firewall: { label: "Firewall", description: "Reduces the duration of status effects that degrade your Runner's electronic systems (EMP, Hack)." },
    fallResistance: { label: "Fall Resistance", description: "Reduces the amount of damage you take after falling." },
    pingDuration: { label: "Ping Duration", description: "Increases how long your pings persist on hostile targets." },
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

export function getStatDescription(key: RunnerStatKey): string {
    return STAT_CONFIG[key].description
}

// Handy for building stat-selector UIs, iterating in display order, etc.
export const STAT_KEYS = Object.keys(STAT_CONFIG) as RunnerStatKey[]