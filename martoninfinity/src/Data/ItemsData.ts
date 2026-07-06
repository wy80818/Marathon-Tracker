// import cryoIcon from "../assets/MapIcons/cryo.jpeg";

export const categories = [
    "Consumable",
    "Salvage",
    "Equipment",
    "Core",
    "Implant",
] as const;
export type categoryType = typeof categories[number];

export const rarities = [
    "Standard",
    "Enhanced",
    "Deluxe",
    "Superior",
    "Prestige",
    "Contraband",
] as const;
export type rarityType = typeof rarities[number];

export interface item {
    category: categoryType
    id: string
    name: string
    image: string | null
    rarity: rarityType
    sellPrice: string
    description: string
    sources?: string
}

// const prestigeCoreSellPrice = "3,000";

// ~~spoiler~~ for spoiler
export const items: item[] = [
    {
        category: "Consumable",
        id: "depleted-cardio-kick",
        name: "Depleted Cardio Kick",
        image: null,
        rarity: "Standard",
        sellPrice: "0",
        description: "Increases heat capacity by a small amount and cleanses a small portion of heat."
    },
    {
        category: "Salvage",
        id: "sparkleaf",
        name: "Sparkleaf",
        image: null,
        rarity: "Enhanced",
        sellPrice: "50",
        description: "Plant Salvage. High in silica content, this plant is a valuable resource on Tau Ceti IV.",
        sources: "Perimiter -> Overflow\n\nDire Marsh -> Greenhouse\n\nGrassy Areas"
    },
    {
        category: "Equipment",
        id: "emp-grenade",
        name: "Emp Grenade",
        image: null,
        rarity: "Deluxe",
        sellPrice: "100",
        description: "Bouncing grenade which inflicts hack for each surface contact."
    },
    {
        category: "Implant",
        id: "regen-v4",
        name: "Regen V4",
        image: null,
        rarity: "Superior",
        sellPrice: "600",
        description: "Self-Repair Speed: 50, Revive Speed: 20"
    },
    {
        category: "Core",
        id: "early-warning-system",
        name: "Early Warning System",
        image: null,
        rarity: "Prestige",
        sellPrice: "3,000",
        description: "You receive an alert on your HUD when a hostile Runner is nearby."
    },
    {
        category: "Salvage",
        id: "compiler-ganglion",
        name: "Compiler Ganglion",
        image: null,
        rarity: "Contraband",
        sellPrice: "8,000",
        description: "A piece of a Compiler's nervous system.",
        sources: "Guaranteed after killing ~~the Compiler~~ located ~~in the Lab above Cryo Archive~~."
    }
]   