import direMarsh from "../assets/Maps/dire-marsh.png";
import cryoArchive from "../assets/Maps/cryo-archive.png";
import perimiter from "../assets/Maps/perimeter.png";
import outpost from "../assets/Maps/outpost.png";

import crewExfilIcon from "../assets/Markers/Crew_Exfil.png";
import finalExfilIcon from "../assets/Markers/Final_Exfil.png";
import hiddenFinalExfilIcon from "../assets/Markers/Hidden_Final_Exfil.png";
import exfilStation from "../assets/Markers/Exfil_Station.png";
import scanStation from "../assets/Markers/Scan_Station.png";
import guardedExfilIcon from "../assets/Markers/Guarded_Exfil.png";
import secretExfilIcon from "../assets/Markers/Secret_Exfil.png";
import restrictedExfilIcon from "../assets/Markers/Restricted_Exfil.png";
import playerSpawnIcon from "../assets/Markers/Player_Spawn.png";
import keyDeluxeIcon from "../assets/Markers/Key_Deluxe_Icon.png";
import keyPrestigeIcon from "../assets/Markers/Key_Prestige_Icon.png";
import keySuperiorIcon from "../assets/Markers/Key_Superior_Icon.png";
import keyLockboxIcon from "../assets/Markers/Key_Lockbox_Icon.png";
import elevatorIcon from "../assets/Markers/Elevator.png"
import vaultIcon from "../assets/Markers/Vault.png"
import supplyDropIcon from "../assets/Markers/Supply_Drop.png"
import POIIcon from "../assets/Markers/POI.png"
import securedResourceIcon from "../assets/Markers/Secured_Resource.png"

// Add new markers here in camelCase
export type CategoryType =
    | "points_of_interest"
    | "infils_&_exfils"
    | "monitors_&_stations"
    | "keyrooms"
    | "doors_&_entryways"
    | "map_objectives";

export type MarkerType =
    | "crewExfil"
    | "secretExfil"
    | "finalExfil"
    | "hiddenFinalExfil"
    | "exfilStation"
    | "scanStation"
    | "guardedExfil"
    | "restrictedExfil"
    | "playerSpawn"
    | "keyDeluxe"
    | "keyPrestige"
    | "keySuperior"
    | "keyLockbox"
    | "elevator"
    | "vault"
    | "supplyDrop"
    | "securedResource"
    | "poiLarge"
    | "poiSmall";

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
    category: CategoryType;
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
        category: "infils_&_exfils",
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
        category: "infils_&_exfils",
        type: "finalExfil",
        icon: finalExfilIcon,
        defaultLabel: "Final Exfil",
        defaultDescription: "Final exfil location. Only appears once the match timer reaches 0. Afterwards, \
                    all Runners are given exactly 1 minute to reach the location before they are eliminated by \
                    the match time limit. There is only 1 exfil ever.",
        markers: [
            { x: 0.608, y: 0.606 }
        ]
    },
    {
        category: "infils_&_exfils",
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
        category: "infils_&_exfils",
        type: "playerSpawn",
        icon: playerSpawnIcon,
        defaultLabel: "Player Spawn",
        defaultDescription: "Potential Runner Crew spawn point. There are a maximum of 6 crews on this map.",
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
        category: "keyrooms",
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
        category: "keyrooms",
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
        category: "keyrooms",
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
        category: "keyrooms",
        type: "keyLockbox",
        icon: keyLockboxIcon,
        defaultLabel: "Lockbox Spawn",
        defaultDescription: "Possible Lockbox location. Exactly one random location every match. Indicated by red flares. Room will contain multiple lockboxes.",
        markers: [
            { x: 0.749, y: 0.643 },
            { x: 0.175, y: 0.580 }
        ]
    },
    {
        category: "map_objectives",
        type: "supplyDrop",
        icon: supplyDropIcon,
        defaultLabel: "Supply Drop",
        defaultDescription: "Potential Supply Drop location. Once activated, Runners must wait until it arrives in which 4 containers mostly containing weapon attachments \
            get deployed. Beware of Supply Drop Ship thrusters when it arrives and leaves.",
        markers: [
            { x: 0.66, y: 0.548 },
            { x: 0.404, y: 0.479 },
            { x: 0.647, y: 0.288 }
        ]
    },
    {
        category: "map_objectives",
        type: "securedResource",
        icon: securedResourceIcon,
        defaultLabel: "Secured Resource",
        defaultDescription: "",
        markers: [
            { x: 0.189, y: 0.603 },
            { x: 0.323, y: 0.753 },
            { x: 0.432, y: 0.578 },
            { x: 0.513, y: 0.377 },
            { x: 0.725, y: 0.281 },
            { x: 0.778, y: 0.467 },
            { x: 0.57, y: 0.714 }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiLarge",
        icon: POIIcon,
        defaultLabel: "Point of Interest",
        defaultDescription: "",
        markers: [
            { x: 0.426, y: 0.557, label: "Algae Ponds" },
            { x: 0.34, y: 0.786, label: "Maintenance" },
            { x: 0.181, y: 0.596, label: "Quarantine" },
            { x: 0.514, y: 0.371, label: "Greenhouse" },
            { x: 0.575, y: 0.712, label: "AI Uplink" },
            { x: 0.779, y: 0.481, label: "Complex" },
            { x: 0.637, y: 0.256, label: "Bio Research" }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiSmall",
        icon: POIIcon,
        defaultLabel: "Area",
        defaultDescription: "",
        markers: [
            { x: 0.386, y: 0.499, label: "Intersection" },
            { x: 0.158, y: 0.502, label: "West Gate" },
            { x: 0.46, y: 0.755, label: "Canal" },
            { x: 0.616, y: 0.564, label: "Anomaly" },
            { x: 0.911, y: 0.477, label: "East Gate" },
        ]
    }
];

export const markerGroups_Outpost: MarkerGroup[] = [
    {
        category: "infils_&_exfils",
        type: "restrictedExfil",
        icon: restrictedExfilIcon,
        defaultLabel: "Restricted Exfil",
        defaultDescription: "Potential exfil location. Works like a normal Crew Exfil, but requires one Red Master Clearance Code to activate.",
        markers: [
            { x: 0.639, y: 0.608 },
            { x: 0.596, y: 0.427 },
            { x: 0.52, y: 0.572 },
            { x: 0.436, y: 0.427 },
            { x: 0.509, y: 0.707 }
        ]
    },
    {
        category: "infils_&_exfils",
        type: "finalExfil",
        icon: finalExfilIcon,
        defaultLabel: "Final Exfil",
        defaultDescription: "Potential final exfil location. Only appears once the match timer reaches 0. Afterwards, \
                    all Runners are given exactly 1 minute to reach the location before they are eliminated by \
                    the match time limit. There is only 1 final exfil ever.",
        markers: [
            { x: 0.499, y: 0.426 },
            { x: 0.387, y: 0.617 },
            { x: 0.601, y: 0.543 }
        ]
    },
    {
        category: "infils_&_exfils",
        type: "guardedExfil",
        icon: guardedExfilIcon,
        defaultLabel: "Guarded Exfil",
        defaultDescription: "Potential exfil location. Functions exactly like a Crew Exfil, but when initialized by a Runner, spawns 1 UESC wave which includes a Commander.",
        markers: [
            { x: 0.283, y: 0.659 },
            { x: 0.34, y: 0.763 },
            { x: 0.498, y: 0.831 },
            { x: 0.724, y: 0.63 },
            { x: 0.682, y: 0.426 },
            { x: 0.538, y: 0.33 },
            { x: 0.414, y: 0.176 }
        ]
    },
    {
        category: "infils_&_exfils",
        type: "playerSpawn",
        icon: playerSpawnIcon,
        defaultLabel: "Player Spawn",
        defaultDescription: "Potential Runner Crew spawn point. There are a maximum of 4 crews on this map.",
        markers: [
            { x: 0.473, y: 0.181 },
            { x: 0.313, y: 0.244 },
            { x: 0.196, y: 0.581 },
            { x: 0.295, y: 0.816 },
            { x: 0.51, y: 0.855 },
            { x: 0.745, y: 0.677 },
            { x: 0.63, y: 0.677 },
            { x: 0.756, y: 0.549 },
            { x: 0.535, y: 0.449 },
            { x: 0.324, y: 0.449 },
            { x: 0.582, y: 0.287 },
            { x: 0.731, y: 0.389 }
        ]
    },
    {
        category: "keyrooms",
        type: "keyDeluxe",
        icon: keyDeluxeIcon,
        defaultLabel: "Deluxe Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.453,
                y: 0.658,
                label: "Processing Upper Keyroom",
                description: "Located inside Processing on the uppermost level. Two doors for entry and bulletproof glass."
            },
            {
                x: 0.607,
                y: 0.625,
                label: "Dormitories Keyroom",
                description: "Located on the second floor of Dormitories. One door for entry and bulletproof glass."
            },
            {
                x: 0.559,
                y: 0.388,
                label: "Welcome Center Keyroom",
                description: "Located on the second floor of Orientation. Two doors for entry and bulletproof glass."
            },
            {
                x: 0.474,
                y: 0.242,
                label: "Airfield Keyroom",
                description: "Located on the uppermost level of Eastern Airfield. One door for entry and bulletproof glass."
            }
        ]
    },
    {
        category: "keyrooms",
        type: "keySuperior",
        icon: keySuperiorIcon,
        defaultLabel: "Superior Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.428,
                y: 0.596,
                label: "Processing Basement Keyroom",
                description: "Located at the lowest level of Processing in the direction of Flight Control. Two doors for entry and bulletproof glass."
            },
            {
                x: 0.458,
                y: 0.447,
                label: "Flight Control Keyroom",
                description: "Located on the second floor of Flight Control. One door for entry and bulletproof glass with a vent for escape."
            },
            {
                x: 0.363,
                y: 0.57,
                label: "Drone Wing Keyroom",
                description: "Located at the far end of the Drone Wing inside the Pinwheel. Two doors for entry and bulletproof glass."
            },
        ]
    },
    {
        category: "keyrooms",
        type: "keyPrestige",
        icon: keyPrestigeIcon,
        defaultLabel: "Prestige Keyroom",
        defaultDescription: "Keyroom location",
        markers: [
            {
                x: 0.607,
                y: 0.733,
                label: "Command Facility Keyroom",
                description: "Located on the upper level of the Command Wing inside the Pinwheel. One door for entry and bulletproof glass."
            },
            {
                x: 0.614,
                y: 0.425,
                label: "Destroyed Wing Keyroom",
                description: "Located on the outside portion of destroyed wing. One door for entry."
            }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiLarge",
        icon: POIIcon,
        defaultLabel: "Point of Interest",
        defaultDescription: "",
        markers: [
            { x: 0.522, y: 0.584, label: "Pinwheel Base" },
            { x: 0.485, y: 0.45, label: "Flight Control" },
            { x: 0.407, y: 0.265, label: "Airfield" },
            { x: 0.606, y: 0.388, label: "Orientation" },
            { x: 0.724, y: 0.527, label: "Dormitories" },
            { x: 0.442, y: 0.698, label: "Processing" }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiSmall",
        icon: POIIcon,
        defaultLabel: "Area",
        defaultDescription: "",
        markers: [
            { x: 0.385, y: 0.586, label: "Drone Wing" },
            { x: 0.585, y: 0.717, label: "Command Wing" },
            { x: 0.577, y: 0.46, label: "Destroyed Wing" }
        ]
    }
];

export const markerGroups_Perimiter: MarkerGroup[] = [
    {
        category: "infils_&_exfils",
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
        category: "infils_&_exfils",
        type: "finalExfil",
        icon: finalExfilIcon,
        defaultLabel: "Final Exfil",
        defaultDescription: "Final exfil location. Only appears once the match timer reaches 0. Afterwards, \
                    all Runners are given exactly 1 minute to reach the location before they are eliminated by \
                    the match time limit. There is only 1 exfil ever.",
        markers: [
            { x: 0.487, y: 0.529 }
        ]
    },
    {
        category: "infils_&_exfils",
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
        category: "infils_&_exfils",
        type: "playerSpawn",
        icon: playerSpawnIcon,
        defaultLabel: "Player Spawn",
        defaultDescription: "Potential Runner Crew spawn point. There are a maximum of 5 crews on this map.",
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
        category: "keyrooms",
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
                description: "Located underground closest to the Southside entryway. 2 doors for entry."
            },
            {
                x: 0.308,
                y: 0.416,
                label: "Terrace Keyroom",
                description: "Located Northwest of Hauler outside. 2 doors for entry."
            }
        ]
    },
    {
        category: "keyrooms",
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
        category: "keyrooms",
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
        category: "keyrooms",
        type: "keyLockbox",
        icon: keyLockboxIcon,
        defaultLabel: "Lockbox Spawn",
        defaultDescription: "Possible Lockbox location. Exactly one random location every match. Indicated by red flares. Room will contain multiple lockboxes.",
        markers: [
            { x: 0.635, y: 0.365 },
            { x: 0.464, y: 0.222 },
            { x: 0.649, y: 0.717 }
        ]
    },
    {
        category: "map_objectives",
        type: "supplyDrop",
        icon: supplyDropIcon,
        defaultLabel: "Supply Drop",
        defaultDescription: "Potential Supply Drop location. Once activated, Runners must wait until it arrives in which 4 containers mostly containing weapon attachments \
            get deployed. Beware of Supply Drop Ship thrusters when it arrives and leaves.",
        markers: [
            { x: 0.681, y: 0.377 },
            { x: 0.449, y: 0.647 },
            { x: 0.525, y: 0.713 },
            { x: 0.465, y: 0.426 }
        ]
    },
    ,
    {
        category: "map_objectives",
        type: "securedResource",
        icon: securedResourceIcon,
        defaultLabel: "Secured Resource",
        defaultDescription: "Potential Secured Resource spawn which provides early tier loot once completed. High chance for blue unique weapons. \
             Once activated, a timer will start along with a wave of UESC spawning as countermeasures.",
        markers: [
            { x: 0.355, y: 0.488 },
            { x: 0.419, y: 0.735 },
            { x: 0.65, y: 0.682 },
            { x: 0.668, y: 0.386 },
            { x: 0.467, y: 0.236 }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiLarge",
        icon: POIIcon,
        defaultLabel: "Point of Interest",
        defaultDescription: "",
        markers: [
            { x: 0.465, y: 0.269, label: "North Relay" },
            { x: 0.647, y: 0.671, label: "South Relay" },
            { x: 0.657, y: 0.393, label: "Station" },
            { x: 0.385, y: 0.731, label: "Overflow" },
            { x: 0.354, y: 0.483, label: "Hauler" }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiSmall",
        icon: POIIcon,
        defaultLabel: "Area",
        defaultDescription: "",
        markers: [
            { x: 0.477, y: 0.469, label: "Data Wall" },
            { x: 0.536, y: 0.622, label: "Ravine" },
            { x: 0.584, y: 0.526, label: "Tunnels" },
            { x: 0.721, y: 0.598, label: "East Wall" },
            { x: 0.515, y: 0.727, label: "Columns" }
        ]
    }

];

export const markerGroups_CryoArchive: MarkerGroup[] = [
    {
        category: "infils_&_exfils",
        type: "secretExfil",
        icon: secretExfilIcon,
        defaultLabel: "Secret Exfil",
        defaultDescription: "Must be initiated by an Exfil Station. Afterwards, works just like a normal Crew Exfil other than a wave of UESC being nearby.",
        markers: [
            { x: 0.265, y: 0.492 },
            { x: 0.176, y: 0.313 },
            { x: 0.113, y: 0.634 },
            { x: 0.375, y: 0.81 },
            { x: 0.653, y: 0.813 },
            { x: 0.897, y: 0.685 },
            { x: 0.895, y: 0.383 },
            { x: 0.663, y: 0.163 },
            { x: 0.375, y: 0.168 }
        ]
    },
    {
        category: "infils_&_exfils",
        type: "hiddenFinalExfil",
        icon: hiddenFinalExfilIcon,
        defaultLabel: "Hidden Final Exfil",
        defaultDescription: "Works just like a normal Final Exfil, but does not show up on the map. 4 Commanders spawn nearby.",
        markers: [
            { x: 0.419, y: 0.489 },
            {
                x: 0.507, y: 0.306, description: "Located on the ground floor in the theatre. Works just like a normal Final Exfil, \
                    but it does not show up on the map. 4 Commanders spawn nearby." },
            {
                x: 0.619, y: 0.487, description: "Located on the second floor at the bottom of the lift. Works just like a normal Final Exfil, \
                    but it does not show up on the map. 4 Commanders spawn nearby." },
            {
                x: 0.512, y: 0.677, description: "Located on the ground floor in the theatre. Works just like a normal Final Exfil, \
                    but it does not show up on the map. 4 Commanders spawn nearby." }
        ]
    },
    {
        category: "infils_&_exfils",
        type: "playerSpawn",
        icon: playerSpawnIcon,
        defaultLabel: "Player Spawn",
        defaultDescription: "Potential Runner Crew spawn point. There are a maximum of 5 crews on this map. The side that ends up not having a \
                    Runner Crew spawn will end up with a Pump Credentials spawn.",
        markers: [
            { x: 0.718, y: 0.073 },
            { x: 0.05, y: 0.178 },
            { x: 0.048, y: 0.813 },
            { x: 0.716, y: 0.785 },
            { x: 0.96, y: 0.721 },
            { x: 0.948, y: 0.257 },
        ]
    },
    {
        category: "monitors_&_stations",
        type: "exfilStation",
        icon: exfilStation,
        defaultLabel: "Exfil Station",
        defaultDescription: "Potential Exfil Station spawn point. Required to summon a Secret Exfil. After activation, Runners are advised to \
                    look at their map afterwards for the appearance of the Secret Exfil.",
        markers: [
            { x: 0.472, y: 0.444 },
            { x: 0.393, y: 0.444 },
            { x: 0.393, y: 0.536 },
            { x: 0.472, y: 0.536 },
            { x: 0.551, y: 0.536 },
            { x: 0.479, y: 0.488 },
            { x: 0.393, y: 0.536 },
            { x: 0.543, y: 0.488 },
            { x: 0.457, y: 0.346 },
            { x: 0.457, y: 0.633 },
            { x: 0.654, y: 0.516 },
            { x: 0.654, y: 0.462 },
            { x: 0.644, y: 0.582 },
            { x: 0.644, y: 0.393 },
            { x: 0.51, y: 0.481 }
        ]
    },
    {
        category: "monitors_&_stations",
        type: "scanStation",
        icon: scanStation,
        defaultLabel: "Scan Station",
        defaultDescription: "Scan Station necessary for discovering exfils, pickups, etc. Reveals more based on current crew security clearance level.",
        markers: [
            { x: 0.457, y: 0.392 },
            { x: 0.296, y: 0.402 },
            { x: 0.296, y: 0.576 },
            { x: 0.457, y: 0.588 },
            { x: 0.173, y: 0.703 },
            { x: 0.281, y: 0.747 },
            { x: 0.414, y: 0.755 },
            { x: 0.5, y: 0.858 },
            { x: 0.56, y: 0.458 },
            { x: 0.277, y: 0.278 },
            { x: 0.35, y: 0.164 }, 
            { x: 0.433, y: 0.231 }, 
            { x: 0.572, y: 0.169 },
            { x: 0.675, y: 0.308 },
            { x: 0.68, y: 0.458 },
            { x: 0.68, y: 0.655 },

        ]
    },
    {
        category: "doors_&_entryways",
        type: "elevator",
        icon: elevatorIcon,
        defaultLabel: "Elevator",
        defaultDescription: "Requires security clearance 3, brings you to the Labs which resides above the map and where Vault 6 and 7 reside. Remember to bring Antivirus.",
        markers: [
            { x: 0.582, y: 0.3 },
            { x: 0.582, y: 0.676 }
        ]
    },
    {
        category: "doors_&_entryways",
        type: "vault",
        icon: vaultIcon,
        defaultLabel: "Vault",
        defaultDescription: "",
        markers: [
            {
                x: 0.43,
                y: 0.612,
                label: "Vault 1",
                description: "Vault room which yields valuable loot once the requirements have been met: 5 Batteries."
            },
            {
                x: 0.619,
                y: 0.342,
                label: "Vault 2",
                description: "Vault room which yields valuable loot once the requirements have been met: 6 Batteries, 1 Cryo Coolant."
            },
            {
                x: 0.63,
                y: 0.631,
                label: "Vault 3",
                description: "Vault room which yields valuable loot once the requirements have been met: 4 Batteries, Pump Credentials."
            },
            {
                x:
                    0.43,
                y: 0.365,
                label: "Vault 4",
                description: "Vault room which yields valuable loot once the requirements have been met: 8 Batteries, 1 Cryo Coolant, Clearance Level 3, Colonist Credentials."
            },
            {
                x: 0.249,
                y: 0.5,
                label: "Vault 5",
                description: "Vault room which yields valuable loot once the requirements have been met: 5 Batteries, 1 Cryo Coolant, Tranquility Credentials."
            }
        ]
    },
    {
        category: "points_of_interest",
        type: "poiLarge",
        icon: POIIcon,
        defaultLabel: "Point of Interest",
        defaultDescription: "",
        markers: [
            { x: 0.321, y: 0.331, label: "Cargo" },
            { x: 0.5, y: 0.172, label: "Steerage" },
            { x: 0.7, y: 0.381, label: "Biostock" },
            { x: 0.7, y: 0.593, label: "Preservation" },
            { x: 0.5, y: 0.808, label: "Revival" },
            { x: 0.321, y: 0.639, label: "Index" },
            { x: 0.51, y: 0.436, label: "Control" },
        ]
    },
    {
        category: "points_of_interest",
        type: "poiSmall",
        icon: POIIcon,
        defaultLabel: "Area",
        defaultDescription: "",
        markers: [
            { x: 0.511, y: 0.493, label: "Panoptacon" },
            { x: 0.323, y: 0.489, label: "Cold Storage" },
            { x: 0.19, y: 0.339, label: "Calibration" },
            { x: 0.19, y: 0.628, label: "Optimization" },
            { x: 0.663, y: 0.141, label: "Stockpile" },
            { x: 0.663, y: 0.829, label: "Repository" },
            { x: 0.894, y: 0.366, label: "Staging" },
            { x: 0.894, y: 0.62, label: "Foundation" },
            { x: 0.524, y: 0.308, label: "Tranquility (Derelict)" },
            { x: 0.524, y: 0.675, label: "Tranquility (Dormant)" },
            { x: 0.819, y: 0.487, label: "Secret Labs" }
        ]
    }
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
        markers: createMarkers(markerGroups_Outpost)
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
        markers: createMarkers(markerGroups_CryoArchive)
    }
];