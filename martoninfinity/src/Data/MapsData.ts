import direMarsh from "../assets/Maps/dire-marsh.png";
import cryoArchive from "../assets/Maps/cryo-archive.png";
import perimiter from "../assets/Maps/perimeter.png";
import outpost from "../assets/Maps/outpost.png";

import crewExfilIcon from "../assets/Markers/Crew_Exfil.png";
import finalExfilIcon from "../assets/Markers/Final_Exfil.png";
import guardedExfilIcon from "../assets/Markers/Guarded_Exfil.png";
import playerSpawnIcon from "../assets/Markers/Player_Spawn.png";
import keyDeluxeIcon from "../assets/Markers/Key_Deluxe_Icon.png";
import keyPrestigeIcon from "../assets/Markers/Key_Prestige_Icon.png";
import keySuperiorIcon from "../assets/Markers/Key_Superior_Icon.png";
import keyLockboxIcon from "../assets/Markers/Key_Lockbox_Icon.png";

// Add new markers here in camelCase
export type MarkerType =
    | "crewExfil"
    | "finalExfil"
    | "guardedExfil"
    | "playerSpawn"
    | "keyDeluxe"
    | "keyPrestige"
    | "keySuperior"
    | "keyLockbox";

export interface Marker {
    id: string;
    type: MarkerType;
    x: number;
    y: number;
    label: string;
    icon: string;
    description: string;
}

export interface MarkerGroup {
    type: MarkerType;
    icon: string;
    defaultLabel: string;
    defaultDescription: string;
    markers: {
        x: number;
        y: number;
        label?: string;
        description?: string;
    }[];
}

export interface GameMap {
    id: string;
    name: string;
    image: string;
    width: number;
    height: number;
    markerGroups: MarkerGroup[];
    markers: Marker[];
}

// Make a new MarkerGroup[] for every map named appropriately, 
// and copy and paste structure inside for every new marker type.
export const markerGroups_DireMarsh: MarkerGroup[] = [
    {
        type: "crewExfil",
        icon: crewExfilIcon,
        defaultLabel: "Crew Exfil",
        defaultDescription: "Potential exfil location necessary for players to extract. Once activated, an audio que is played as well as a beam of light appears \
                in which it can be heard/seen by nearby Runners.",
        markers: [
            { x: 0.748, y: 0.385 },
            { x: 0.686, y: 0.672 },
            { x: 0.585, y: 0.692 },
            { x: 0.446, y: 0.581 },
            { x: 0.481, y: 0.358 },
            { x: 0.329, y: 0.701 },
            { x: 0.223, y: 0.516 },
            { x: 0.594, y: 0.254 }
        ]
    },
    {
        type: "finalExfil",
        icon: finalExfilIcon,
        defaultLabel: "Final Exfil",
        defaultDescription: "Potential exfil location. Only appears once the match timer reaches 0. Afterwards, \
                    all Runners are given exactly 1 minute to reach the location before they are eliminated by \
                    the match time limit. There is only 1 exfil ever.",
        markers: [
            { x: 0.608, y: 0.606 }
        ]
    },
    {
        type: "guardedExfil",
        icon: guardedExfilIcon,
        defaultLabel: "Guarded Exfil",
        defaultDescription: "Potential exfil location. Functions exactly like a Crew Exfil, but when initialized by a Runner, spawns 1 UESC wave which includes a Commander.",
        markers: [
            { x: 0.33, y: 0.564 },
            { x: 0.509, y: 0.664 },
            { x: 0.673, y: 0.429 },
            { x: 0.426, y: 0.376 }
        ]
    },
    {
        type: "playerSpawn",
        icon: playerSpawnIcon,
        defaultLabel: "Player Spawn",
        defaultDescription: "Potential Runner spawn point. There are a maximum of 6 crews on this map.",
        markers: [
            { x: 0.503, y: 0.814 },
            { x: 0.145, y: 0.437 },
            { x: 0.545, y: 0.197 },
            { x: 0.369, y: 0.821 },
            { x: 0.728, y: 0.151 },
            { x: 0.864, y: 0.329 },
            { x: 0.901, y: 0.582 },
            { x: 0.906, y: 0.46 },
            { x: 0.834, y: 0.722 },
            { x: 0.59, y: 0.683 },
            { x: 0.672, y: 0.794 },
            { x: 0.157, y: 0.729 },
            { x: 0.242, y: 0.844 },
            { x: 0.118, y: 0.618 },
            { x: 0.404, y: 0.257 },
            { x: 0.481, y: 0.568 }
        ]
    },
    {
        type: "keyDeluxe",
        icon: keyDeluxeIcon,
        defaultLabel: "Deluxe Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.729,
                y: 0.549,
                label: "Complex Shed Keyroom",
                description: "Located at the northermost shed in the vicinity. 2 doors for entry."
            },
            {
                x: 0.355,
                y: 0.754,
                label: "Maintenance Pump Keyroom",
                description: "Located on the first floor. One door for entry and a shutter can be opened from the inside."
            },
            {
                x: 0.514,
                y: 0.409,
                label: "Greenhouse Lab Keyroom",
                description: "Located inside on the first floor. Two doors as entry."
            },
            {
                x: 0.454,
                y: 0.571,
                label: "Algae Ponds Office Keyroom",
                description: "Located inside on the second floor. One door as entry and a shutter can be opened from the inside."
            }
        ]
    },
    {
        type: "keySuperior",
        icon: keySuperiorIcon,
        defaultLabel: "Superior Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.355,
                y: 0.733,
                label: "Maintenance Canal Keyroom",
                description: "Located in the underside of Maintenance. \
                Multiple entryways and doors exist which all get unlocked once the key is used on any door."
            },
            {
                x: 0.209,
                y: 0.568,
                label: "Quarantine Morgue Keyroom",
                description: "Located under Quarantine, a stairway and ladder for two entryways to the room."
            },
            {
                x: 0.666,
                y: 0.249,
                label: "Bio Research Lab Keyroom",
                description: "Located on the second floor of Bio Research. Two doors as entry and a shutter can be opened from the inside."
            },
        ]
    },
    {
        type: "keyPrestige",
        icon: keyPrestigeIcon,
        defaultLabel: "Prestige Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.617,
                y: 0.708,
                label: "AI Uplink Keyroom",
                description: "Located undeground with 3 doors and bulletproof glass. Can be approached from the west and the east."
            },
            {
                x: 0.517,   
                y: 0.326,
                label: "Greenhouse Operations Keyroom",
                description: "Located on top of the greenhouses. Two doors as entry."
            }
        ]
    },
    {
        type: "keyLockbox",
        icon: keyLockboxIcon,
        defaultLabel: "Lockbox Spawn",
        defaultDescription: "Possible Lockbox location. Exactly one random location every match. Indicated by red flares. Room will contain multiple lockboxes.",
        markers: [
            { x: 0.749, y: 0.643 },
            { x: 0.175, y: 0.580 }
        ]
    }
];

export const markerGroups_Outpost: MarkerGroup[] = [
];

export const markerGroups_Perimiter: MarkerGroup[] = [
    {
        type: "crewExfil",
        icon: crewExfilIcon,
        defaultLabel: "Crew Exfil",
        defaultDescription: "Potential exfil location necessary for players to extract. Once activated, an audio que is played as well as a beam of light appears \
                in which it can be heard/seen by nearby Runners.",
        markers: [
            { x: 0.398, y: 0.691 },
            { x: 0.366, y: 0.541 },
            { x: 0.537, y: 0.238 },
            { x: 0.661, y: 0.436 },
            { x: 0.669, y: 0.593 },
            { x: 0.439, y: 0.256 }
        ]
    },
    {
        type: "finalExfil",
        icon: finalExfilIcon,
        defaultLabel: "Final Exfil",
        defaultDescription: "Potential exfil location. Only appears once the match timer reaches 0. Afterwards, \
                    all Runners are given exactly 1 minute to reach the location before they are eliminated by \
                    the match time limit. There is only 1 exfil ever.",
        markers: [
            { x: 0.487, y: 0.529 }
        ]
    },
    {
        type: "guardedExfil",
        icon: guardedExfilIcon,
        defaultLabel: "Guarded Exfil",
        defaultDescription: "Potential exfil location. Functions exactly like a Crew Exfil, but when initialized by a Runner, spawns 1 UESC wave which includes a Commander.",
        markers: [
            { x: 0.532, y: 0.377 },
            { x: 0.532, y: 0.377 },
            { x: 0.41, y: 0.394 },
            { x: 0.514, y: 0.508 }
        ]
    },
    {
        type: "playerSpawn",
        icon: playerSpawnIcon,
        defaultLabel: "Player Spawn",
        defaultDescription: "Potential Runner spawn point. There are a maximum of 5 crews on this map.",
        markers: [
            { x: 0.786, y: 0.371 },
            { x: 0.755, y: 0.275 },
            { x: 0.529, y: 0.119 },
            { x: 0.62, y: 0.209 },
            { x: 0.364, y: 0.196 },
            { x: 0.293, y: 0.428 },
            { x: 0.294, y: 0.586 },
            { x: 0.313, y: 0.792 },
            { x: 0.471, y: 0.737 },
            { x: 0.599, y: 0.85 },
            { x: 0.732, y: 0.648 },
            { x: 0.62, y: 0.209 },
        ]
    },
    {
        type: "keyDeluxe",
        icon: keyDeluxeIcon,
        defaultLabel: "Deluxe Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.465,
                y: 0.199,
                label: "North Relay Storage Keyroom",
                description: "Located in the Northernmost part of the second floor in North Relay. 2 doors for entry."
            },
            {
                x: 0.643,
                y: 0.412,
                label: "Station Security Keyroom",
                description: "Located inside the main Station building. 2 doors for entry with bulletproof glass."
            },
            {
                x: 0.615,
                y: 0.542,
                label: "Tunnels Office Keyroom",
                description: "Located underground closest to the Southside entryway. 2 doors."
            },
            {
                x: 0.308,
                y: 0.416,
                label: "Terrace Keyroom",
                description: "Located underground closest to the Southside entryway. 2 doors."
            }
        ]
    },
    {
        type: "keySuperior",
        icon: keySuperiorIcon,
        defaultLabel: "Superior Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.387,
                y: 0.75,
                label: "Overflow Laboratory Keyroom",
                description: "Located on the second floor of Overflow. One door for entry and a shutter can be opened from the inside."
            },
            {
                x: 0.58,
                y: 0.451,
                label: "Data Wall Upper Level Keyroom",
                description: "Located inside on the Easternmost side of Data Wall on the highest level. One door for entry with a vent as escape."
            }
        ]
    },
    {
        type: "keyPrestige",
        icon: keyPrestigeIcon,
        defaultLabel: "Prestige Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.626,
                y: 0.681,
                label: "South Relay Observation Keyroom",
                description: "Located inside the large crane-like structure in the air. Can be approached normally with the stack of boxes \
                    Southwest of the marker. One doorway with a vent as escape."
            },
            {
                x: 0.356,
                y: 0.521,
                label: "Hauler Observation Keyroom",
                description: "Located on the 2nd floor of Hauler. 2 doors for entry."
            }
        ]
    },
    {
        type: "keyLockbox",
        icon: keyLockboxIcon,
        defaultLabel: "Lockbox Spawn",
        defaultDescription: "Possible Lockbox location. Exactly one random location every match. Indicated by red flares. Room will contain multiple lockboxes.",
        markers: [
            { x: 0.635, y: 0.365 },
            { x: 0.464, y: 0.222 },
            { x: 0.649, y: 0.717 }
        ]
    }
];

export const markerGroups_CryoArchive: MarkerGroup[] = [
];

function createMarkers(groups: MarkerGroup[]): Marker[] {
    return groups.flatMap(group =>
        group.markers.map((m, index) => {
            const label =
                typeof m.label === "string" && m.label.trim() !== ""
                    ? m.label
                    : group.defaultLabel ?? group.type;

            const description =
                typeof m.description === "string" && m.description.trim() !== ""
                    ? m.description
                    : group.defaultDescription ?? "";

            return {
                id: `${group.type}-${index}`,
                type: group.type,
                x: m.x,
                y: m.y,
                label,
                icon: group.icon,
                description
            };
        })
    );
}

// Add for every new map added.
export const maps: GameMap[] = [
    {
        id: "marsh",
        name: "Dire Marsh",
        image: direMarsh,
        width: 2224,
        height: 1744,
        markerGroups: markerGroups_DireMarsh,
        markers: createMarkers(markerGroups_DireMarsh)
    },
    {
        id: "outpost",
        name: "Outpost",
        image: outpost,
        width: 2224,
        height: 1744,
        markerGroups: markerGroups_Outpost,
        markers: []
    },
    {
        id: "perimeter",
        name: "Perimeter",
        image: perimiter,
        width: 2224,
        height: 1744,
        markerGroups: markerGroups_Perimiter,
        markers: createMarkers(markerGroups_Perimiter)
    },
    {
        id: "cryo-archive",
        name: "Cryo Archive",
        image: cryoArchive,
        width: 2048,
        height: 1453,
        markerGroups: markerGroups_CryoArchive,
        markers: []
    }
];