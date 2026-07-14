import { type Runner } from "./Runners"

import AssassinIcon from "../../assets/RunnerIcons/assassin.png"
import DestroyerIcon from "../../assets/RunnerIcons/destroyer.png"
import ReconIcon from "../../assets/RunnerIcons/recon.png"
import RookIcon from "../../assets/RunnerIcons/rook.png"
import SentinelIcon from "../../assets/RunnerIcons/sentinel.png"
import ThiefIcon from "../../assets/RunnerIcons/thief.png"
import TriageIcon from "../../assets/RunnerIcons/triage.png"
import VandalIcon from "../../assets/RunnerIcons/vandal.png"


export const RUNNERS = [
    {
        id: "sentinel",
        name: "Sentinel",
        role: "Defensive Strategist",
        bio: "Sentinels are defenders. \
            Customized tech and devices create a range of offensive and defensive advantages when exploring hostile zones. \
            Their Defender Systems hold ground and Snare Mines entrap rival threats. \
            Every gadget in a Sentinel's arsenal is tuned to control encounters.",
        portraitPath: SentinelIcon,
        baseStats: {
            heatCapacity: 5,
            agility: 10,
            lootSpeed: 10,
            fallResistance: 5,
            meleeDamage: 20,
            finisherSiphon: 15,
            primeRecovery: 10,
            tacticalRecovery: 15,
            selfRepairSpeed: 15,
            reviveSpeed: 5,
            hardware: 20,
            firewall: 20,
            pingDuration: 5,
        },
        abilities: [
            {
                id: "sentinel-defender-system",
                name: "Defender System",
                description: "Deploy an automated defensive platform that intercepts incoming explosives. \
                        You and your crew gain increased weapon stability and reload speed when standing near the device.",
                type: "prime",
                iconPath: "",
            },
            {
                id: "sentinel-snare-mine",
                name: "Snare Mine",
                description: "Deploy a stationary mine that releases a salvo of Immobilizing submunitions when hostiles approach.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "sentinel-prey-tracker",
                name: "Prey Tracker",
                description: "Activate your shell's motion tracker system. which reveals the position of any moving hostile in the direction you're looking.",
                type: "trait",
                iconPath: "",
            },
            {
                id: "sentinel-castle-doctrine",
                name: "Castle Doctrine",
                description: "You ready and reload submachine guns, shotguns, and pistols more quickly based on the number of nearby hostiles. \
                    When you take splash damage, your Hardware, Firewall, and Self-Repair Speed are increased for a short time.",
                type: "trait",
                iconPath: "",
            },
        ],
    },
    {
        id: "destroyer",
        name: "Destroyer",
        role: "Combat Specialist",
        bio: "Destroyers seek conflict.\
                Advanced weapons systems, \
                a personal defense barricade, and increased movement abilities allow \
                Destroyers to take the fight to any threat or rival they encounter during a run.\
                ",
        portraitPath: DestroyerIcon,
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
                description: "Activate your shoulder-mounted missile pods. Dealing sustained damage to targets launches homing missiles, Immobilizing and dealing damage upon impact.",
                type: "prime",
                iconPath: "",
            },
            {
                id: "destroyer-riot-barricade",
                name: "Riot Barricade",
                description: "Toggle an energy barricade that blocks incoming damage, draining tactical ability energy over time. Taking damage drains additional energy.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "destroyer-prey-tracker",
                name: "Thruster",
                description: "Activate while airborne to fire boosters that thrust you in the direction you are moving.",
                type: "trait",
                iconPath: "",
            },
            {
                id: "destroy-tactical-sprint",
                name: "Tactical Sprint",
                description: "Double-press sprint to move faster at the cost of generating additional heat.",
                type: "trait",
                iconPath: "",
            },
        ],
    },
    {
        id: "assassin",
        name: "Assassin",
        role: "Shadow Agent",
        bio: "Assasins are lethal shadows. \
                Active Camo and synthetic smoke deployment allows for unseen strikes or the perfect cover \
                during hostile engagements. The ability to move undetected makes Assassins valued allies and lethal enemies.",
        portraitPath: AssassinIcon,
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
                description: "Throw a smoke disc that emits a line of smoke fields in front of you, disrupting the optics of those who step inside.",
                type: "prime",
                iconPath: "",
            },
            {
                id: "assassin-active-camo",
                name: "Active Camo",
                description: "Activate your shell's camouflage systems, pulling a shroud of invisibility over yourself. \
                    Performing offensive actions, taking damage, and using abilities or consumables briefly disrupts your invisibility.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "assassin-shadow-dive",
                name: "Shadow Dive",
                description: "Activate while airborne to slam a smoke disc into the ground, deploying a smoke field.",
                type: "trait",
                iconPath: "",
            },
            {
                id: "assassin-shroud",
                name: "Shroud",
                description: "Your shell automatically activates its camouflage systems when entering any smoke field, making you invisible. \
                    Invisibility persists for a short time after leaving the smoke field.",
                type: "trait",
                iconPath: "",
            },
        ],
    },
    {
        id: "recon",
        name: "Recon",
        role: "Intel Specialist",
        bio: "Recons use intel as a weapon. \
                Everything about Recon shells is geared toward identifying threats and providing insight into enemy locations and movements: \
                Mark hostiles. Track wounded targets. Deploy a tracker drone to engage threats in unexpected ways.",
        portraitPath: ReconIcon,
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
                description: "Activate your shell's advanced detection systems, releasing a series of sonar pulses that reveal the location of nearby hostiles.",
                type: "prime",
                iconPath: "",
            },
            {
                id: "recon-tracker-drone",
                name: "Tracker Drone",
                description: "Deploy a mechanized microbot that tracks down nearby hostiles and explodes, Overheating any targets caught in the blast.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "recon-interrogation",
                name: "Interrogation",
                description: "When pinged by a hostile Runner, you automatically receive a warning on your shell's HUD. Performing a finish on a runner pings their crew.",
                type: "trait",
                iconPath: "",
            },
            {
                id: "recon-stalker-protocol",
                name: "Stalker Protocol",
                description: "After breaking a target's shields, they leave behind a lingering holographic trail for a short time.",
                type: "trait",
                iconPath: "",
            },
        ],
    }, 
    {
        id: "vandal",
        name: "Vandal",
        role: "Combat Anarchist",
        bio: "Vandals are troublemakers. \
                Amplified movement abilities help cover ground at incredible speeds, changing any encounter in their favor. \
                Microjets allow a secondary jump to reach higher grouned. And a built-in Disrupt Cannon provides instant offense or defense when it is charged \
                and ready to fire.",
        portraitPath: VandalIcon,
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
                description: "Overcharge your movement systems, reducing the heat generated from your movement abilities while increasing your movement speed and weapon dexterity.",
                type: "prime",
                iconPath: "",
            },
            {
                id: "vandal-disrupt-cannon",
                name: "Disrupt Cannon",
                description: "Transform your arm into a cannon and fire a high-powered energy projectile that deals damage and pushes targets away. \
                    Overcharge your arm cannon greatly increasing the size and damage of the blast.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "vandal-microjets",
                name: "Microjets",
                description: "Activate while airborne to perform another jump at the cost of generating additional heat",
                type: "trait",
                iconPath: "",
            },
            {
                id: "vandal-power-slide",
                name: "Power Slide",
                description: "Grants a supercharged slide that generates additional heat.",
                type: "trait",
                iconPath: "",
            },
        ],
    },
    {
        id: "thief",
        name: "Thief",
        role: "Covert Acquisitions",
        bio: "A Thief always keeps their eyes on the prize. \
                Use enhanced visors and piloted drones to remotely locate and acquire valuable loot. Steal from a zone or rival Runners. \
                Then make an escape or push the advantage with the Thief's deployable grapple device.",
        portraitPath: ThiefIcon,
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
                description: "Deploy a remotely piloted drone with a limited lifespan. While piloting the drone: \
                    Fire a hooked tether that can eject the highest-value item from target inventories collect and store loose loot, and open doors. \
                    Exit the drone and return to your shell. At any point while the drone is still active, activate the ability again to continue piloting \
                    the drone.",
                type: "prime",
                iconPath: "",
            },
            {
                id: "thief-grapple-device",
                name: "Grapple Device",
                description: "Launch a grapple device in the aimed direction, propelling yourself toward it.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "thief-x-ray-visor",
                name: "X-Ray Visor",
                description: "Activate your visor, highlighting hostiles and containers in the color of the most valuable item they're storing. \
                    Containers are revealed through walls, while hostiles require line of sight. \
                    While active, aiming at a hostile for a short time will EMP them for a short period of time.",
                type: "trait",
                iconPath: "",
            },
            {
                id: "thief-the-finer-things",
                name: "The Finer Things",
                description: "Gain increased weapon handling and accelerated Grapple Device recharge rate based on the number of items in your Backpack.",
                type: "trait",
                iconPath: "",
            },
        ],
    },
    {
        id: "triage",
        name: "Triage",
        role: "Field Medic",
        bio: "Triage saves lives. \
                Deployable healing drones and onboard reboot abilities allow Triage Runners and their crews to keep \
                running after taking damage. Men health and shields and even reboot crewmates at a distance to survive and \
                fight again and again.",
        portraitPath: TriageIcon,
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
                iconPath: "",
            },
            {
                id: "triage-med-drone",
                name: "Med Drone",
                description: "Deploy a floating medical drone that attaches to crew members and restores health or recharges shields, \
                    and prevents them from bleeding out while downed.",
                type: "tactical",
                iconPath: "",
            },
            {
                id: "triage-shareware-exe",
                name: "Shareware.exe",
                description: "Benefits from medical consumables are shared between crew members with Med-Drone attached to them.",
                type: "trait",
                iconPath: "",
            },
            {
                id: "triage-battery-overcharge",
                name: "Battery Overcharge",
                description: "Divert energy from your cooling systems to boost the performance of your weapons at the cost of generating additional heat. \
                    While active, breaking a target's shield with a volt weapon EMPs them",
                type: "trait",
                iconPath: "",
            },
        ],
    },
    {
        id: "rook",
        name: "Rook",
        role: "Scavenger",
        bio: "ROOK's basic frame cannot be upgraded, but remains as dangerous as your skills and patience allow. \
                While deployed as ROOK, contracts and associated objectives cannot be progressed.",
        portraitPath: RookIcon,
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
                iconPath: "",
            },
            {
                id: "rook-signal-mask",
                name: "Signal Mask",
                description: "Activate a temporary holodisplay mask to deceive UESC forces, making them unaware of your presence. \
                    Disrupted when you sprint, take damage, and attack.",
                type: "tactical",
                iconPath: "",
            }
        ],
    }
] as const satisfies readonly Runner[]

// Derived directly from the data above — can never drift out of sync.
export type RunnerName = (typeof RUNNERS)[number]["name"]
export type RunnerId = (typeof RUNNERS)[number]["id"]
