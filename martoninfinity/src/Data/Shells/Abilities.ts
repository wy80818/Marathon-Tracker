export type AbilityType = "prime" | "tactical" | "trait"

export interface Ability {
    id: string            // stable slug, e.g. "sentinel-lockdown-protocol"
    name: string
    description: string
    type: AbilityType
    baseCooldown?: number  // omit for passives, which typically have none
    iconPath?: string
}