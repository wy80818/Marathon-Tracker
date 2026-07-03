// import cryoIcon from "../assets/MapIcons/cryo.jpeg";

export const categories = [
    "Consumable",
    "Salvage",
    "Equipment"
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

export const items: item[] = [
    {
        category: "Consumable",
        id: "patch-kit",
        name: "Patch Kit",
        image: null,
        rarity: "Enhanced",
        sellPrice: "50",
        description: "Heals 30 HP upon activation",
        sources: "Test"
    }
]