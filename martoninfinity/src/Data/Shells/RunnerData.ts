import { type Runner, isValidRunner } from "./Runners"

export const RUNNERS = [
    {
        id: "sentinel",
        name: "Sentinel",
        role: "Reinforcement",
        baseStats: {  // Remember to put base stats for Sentinel
            heatCapacity: 0,
            agility: 0,
            lootSpeed: 0,
            fallResistance: 0,
            meleeDamage: 0,
            finisherSiphon: 0,
            primeRecovery: 0,
            tacticalRecovery: 0,
            selfRepairSpeed: 0,
            reviveSpeed: 0,
            hardware: 0,
            firewall: 0,
            pingDuration: 0,
        },
        abilities: [
            {
                id: "sentinel-defender-system",
                name: "Defender System",
                description: "Deploy a defensive platform that harmlessly neutralizes incoming explosives. \
                    You and your allies gain increased weapon stability and reload speed while standing near the device. \
                    Has a limited number of projectiles to fire — keep a steady eye on the count.",
                type: "prime",
            },
            {
                id: "sentinel-snare-mine",
                name: "Snare Mine",
                description: "Toss a proximity-triggered mine which detonates into several immobilizing submunitions when enemies get too close.",
                type: "tactical",
            },
            {
                id: "sentinel-prey-tracker",
                name: "Prey Tracker",
                description: "Activates a motion tracking system in your HUD that shows moving enemies on radar within a conical zone in front of you.",
                type: "trait",
            },
            {
                id: "sentinel-castle-doctrine",
                name: "Prey Tracker",
                description: "You ready and reload SMGs, Pistols, and Shotguns more quickly based on the number of nearby hostiles. \
                    When you take splash damage, your Hardware, Firewall, and Self-Repair Speed are increased for a short time.",
                type: "trait",
            },
        ],
    },
    {
        id: "destroyer",
        name: "Destroyer",
        role: "Offense",
        baseStats: {
            heatCapacity: 15,
            agility: 10,
            lootSpeed: 5,
            fallResistance: 5,
            meleeDamage: 15,
            finisherSiphon: 10,
            primeRecovery: 5,
            tacticalRecovery: 10,
            selfRepairSpeed: 15,
            reviveSpeed: 10,
            hardware: 25,
            firewall: 20,
            pingDuration: 5,
        },
        abilities: [
            {
                id: "destroyer-search-and-destroy",
                name: "Search and Destroy",
                description: "Activate your shoulder-mounted missile pods. \
                    Dealing sustained damage to targets launches homing missiles, Immobilizing and dealing damage upon impact.",
                type: "prime",
            },
            {
                id: "destroyer-riot-barricade",
                name: "Riot Barricade",
                description: "Toggle an energy barricade that blocks incoming damage, draining tactical ability energy over time. \
                    Taking damage drains additional energy.",
                type: "tactical",
            },
            {
                id: "destroyer-prey-tracker",
                name: "Thruster",
                description: "Activate by pressing the jump button while airborne to fire boosters that thrust you in the direction you are moving.",
                type: "trait",
            },
            {
                id: "destroy-tactical-sprint",
                name: "Tactical Sprint",
                description: "Double-press sprint to move faster at the cost of generating additional heat.",
                type: "trait",
            },
        ],
    },
    {
        id: "assassin",
        name: "Assassin",
        role: "Stealth",
        baseStats: {
            heatCapacity: 10,
            agility: 20,
            lootSpeed: 15,
            fallResistance: 10,
            meleeDamage: 10,
            finisherSiphon: 10,
            primeRecovery: 10,
            tacticalRecovery: 5,
            selfRepairSpeed: 10,
            reviveSpeed: 15,
            hardware: 10,
            firewall: 20,
            pingDuration: 10,
        },
        abilities: [
            {
                id: "assassin-smoke-screen",
                name: "Smoke Screen",
                description: "Throw a smoke disc that emits a line of smoke fields in front of you",
                type: "prime",
            },
            {
                id: "assassin-active-camo",
                name: "Riot Barricade",
                description: "Activate your shell's camouflage systems, pulling a shroud of invisibility over yourself. \
                    Performing offensive actions, taking damage, and using abilities or consumables briefly disrupts your invisibility.",
                type: "tactical",
            },
            {
                id: "assassin-shadow-dive",
                name: "Shadow Dive",
                description: "Activate while airborne to slam a smoke disc into the ground.",
                type: "trait",
            },
            {
                id: "assassin-shroud",
                name: "Shroud",
                description: "Your shell automatically activates its camouflage systems when entering any smoke field, making you invisible. \
                    Invisibility persists for a short time after leaving the smoke field.",
                type: "trait",
            },
        ],
    },
    {
        id: "recon",
        name: "Recon",
        role: "Intelligence",
        baseStats: {
            heatCapacity: 20,
            agility: 15,
            lootSpeed: 10,
            fallResistance: 5,
            meleeDamage: 5,
            finisherSiphon: 25,
            primeRecovery: 5,
            tacticalRecovery: 10,
            selfRepairSpeed: 5,
            reviveSpeed: 10,
            hardware: 10,
            firewall: 15,
            pingDuration: 25,
        },
        abilities: [
            {
                id: "recon-echo-pulse",
                name: "Echo Pulse",
                description: "Activate your shell's advanced detection systems, releasing a series of sonar pulses that reveal the location of nearby hostiles. \
                    Pings distinguish between enemy Runner and enemy UESC targets. Signal Jammed runners display UESC ping navpoints instead of Runner navpoints.",
                type: "prime",
            },
            {
                id: "recon-tracker-drone",
                name: "Tracker Drone",
                description: "Deploy a mechanized microbot that tracks down nearby hostiles and explodes, Overheating any targets caught in the blast.",
                type: "tactical",
            },
            {
                id: "recon-interrogation",
                name: "Interrogation",
                description: "When pinged by a hostile Runner, you automatically receive a warning on your shell's HUD. Performing a finish on a runner pings their crew.",
                type: "trait",
            },
            {
                id: "recon-stalker-protocol",
                name: "Stalker Protocol",
                description: "After breaking a target's shields, they leave behind a lingering holographic trail for a short time.",
                type: "trait",
            },
        ],
    },
    {
        id: "vandal",
        name: "Vandal",
        role: "Mobility",
        baseStats: {
            heatCapacity: 25,
            agility: 30,
            lootSpeed: 5,
            fallResistance: 10,
            meleeDamage: 5,
            finisherSiphon: 10,
            primeRecovery: 10,
            tacticalRecovery: 5,
            selfRepairSpeed: 5,
            reviveSpeed: 5,
            hardware: 10,
            firewall: 5,
            pingDuration: 5,
        },
        abilities: [
            {
                id: "vandal-amplify",
                name: "Amplify",
                description: "Overcharge your movement systems, reducing the heat generated from your movement abilities while increasing your movement speed and weapon dexterity and cleansing \
                    any old heat buildup.",
                type: "prime",
            },
            {
                id: "vandal-disrupt-cannon",
                name: "Disrupt Cannon",
                description: "Transform your arm into a cannon and fire a high-powered energy projectile that deals damage and pushes targets away. \
                    Overcharge your arm cannon greatly increasing the size and damage of the blast.",
                type: "tactical",
            },
            {
                id: "vandal-microjets",
                name: "Microjets",
                description: "Activate while airborne to perform another jump at the cost of generating additional heat",
                type: "trait",
            },
            {
                id: "vandal-power-slide",
                name: "Power Slide",
                description: "Grants a supercharged slide that generates additional heat.",
                type: "trait",
            },
        ],
    },
    {
        id: "thief",
        name: "Thief",
        role: "Observation",
        baseStats: {
            heatCapacity: 15,
            agility: 20,
            lootSpeed: 25,
            fallResistance: 20,
            meleeDamage: 10,
            finisherSiphon: 15,
            primeRecovery: 10,
            tacticalRecovery: 5,
            selfRepairSpeed: 5,
            reviveSpeed: 5,
            hardware: 5,
            firewall: 15,
            pingDuration: 5,
        },
        abilities: [
            {
                id: "thief-pickpocket-drone",
                name: "Pickpocket Drone",
                description: "Deploy a remotely piloted drone with a limited lifespan, healthbar and signal distance. \
                    Can be fired to force targets to drop their highest valued item in their inventory. \
                    Can also be used to pick up rarity-highlighted items from the ground which gets placed into a 2x4 drone inventory. \
                    Drone can be exited and later entered again as long as it is still online. \
                    One placeable-utility of each type (Claymore, Frostmine, etc.) can be placed on the drone.",
                type: "prime",
            },
            {
                id: "thief-grapple-device",
                name: "Grapple Device",
                description: "Launch a grapple device in the aimed direction, propelling yourself toward it.",
                type: "tactical",
            },
            {
                id: "thief-x-ray-visor",
                name: "X-Ray Visor",
                description: "Activate your visor, highlighting hostiles and containers in the color of the most valuable item they're storing. \
                    Containers are revealed through walls, while hostiles require line of sight. \
                    While active, aiming at a hostile for a short time will EMP them for a short period of time.",
                type: "trait",
            },
            {
                id: "thief-the-finer-things",
                name: "The Finer Things",
                description: "Gain increased weapon handling and accelerated Grapple Device recharge rate based on the number of items in your Backpack.",
                type: "trait",
            },
        ],
    },
    {
        id: "triage",
        name: "Triage",
        role: "Medic",
        baseStats: {
            heatCapacity: 10,
            agility: 10,
            lootSpeed: 10,
            fallResistance: 5,
            meleeDamage: 5,
            finisherSiphon: 5,
            primeRecovery: 10,
            tacticalRecovery: 5,
            selfRepairSpeed: 25,
            reviveSpeed: 20,
            hardware: 15,
            firewall: 15,
            pingDuration: 5,
        },
        abilities: [
            {
                id: "triage-reboot+",
                name: "Reboot+",
                description: "Ready your shell's emergency defibrillator systems. \
                    Lock on to downed crew members or hostile targets and fire your Reboot+ device at them, which revives crew members and EMPs hostiles.",
                type: "prime",
            },
            {
                id: "triage-med-drone",
                name: "Med Drone",
                description: "Deploy a floating medical drone that attaches to crew members and restores health or recharges shields, \
                    and prevents them from bleeding out while downed.",
                type: "tactical",
            },
            {
                id: "triage-shareware-exe",
                name: "Shareware.exe",
                description: "Benefits from medical consumables are shared between crew members with Med-Drone attached to them.",
                type: "trait",
            },
            {
                id: "triage-battery-overcharge",
                name: "Battery Overcharge",
                description: "Divert energy from your cooling systems to boost the performance of your weapons at the cost of generating additional heat. \
                    While active, breaking a target's shield with a volt weapon EMPs them",
                type: "trait",
            },
        ],
    },
    {
        id: "rook",
        name: "Rook",
        role: "Scavenger",
        baseStats: {
            heatCapacity: -5,
            agility: 5,
            lootSpeed: 20,
            fallResistance: 0,
            meleeDamage: 0,
            finisherSiphon: 0,
            primeRecovery: 0,
            tacticalRecovery: 0,
            selfRepairSpeed: 25,
            reviveSpeed: 10,
            hardware: 0,
            firewall: 0,
            pingDuration: 0,
        },
        abilities: [
            {
                id: "rook-recuperation",
                name: "Recuperation",
                description: "Activate your prototype frame's emergency repair system to slowly restore health. Interrupted when you take damage.",
                type: "prime",
            },
            {
                id: "rook-signal-mask",
                name: "Signal Mask",
                description: "Activate a temporary holodisplay mask to deceive UESC forces, making them unaware of your presence. \
                    Disrupted when you sprint, take damage, and attack.",
                type: "tactical",
            }
        ],
    }
] as const satisfies readonly Runner[]

// Derived directly from the data above — can never drift out of sync.
export type RunnerName = (typeof RUNNERS)[number]["name"]
export type RunnerId = (typeof RUNNERS)[number]["id"]
