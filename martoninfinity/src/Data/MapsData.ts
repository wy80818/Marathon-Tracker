import direMarsh from "../assets/Maps/dire-marsh.png";
import cryoArchive from "../assets/Maps/cryo-archive.png";
import perimiter from "../assets/Maps/perimeter.png";
import outpost from "../assets/Maps/outpost.png";

import crewExfilIcon from "../assets/Markers/Crew_Exfil.png";
import finalExfilIcon from "../assets/Markers/Final_Exfil.png";
import guardedExfilIcon from "../assets/Markers/Guarded_Exfil.png";
import playerSpawnIcon from "../assets/Markers/Player_Spawn.png"

// Add new markers here in camelCase
export type MarkerType =
    | "crewExfil"
    | "finalExfil"
    | "guardedExfil"
    | "playerSpawn";

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
    label: string;
    icon: string;
    description: string;
    positions: [number, number][];
}

export interface GameMap {
    id: string;
    name: string;
    image: string;
    width: number;
    height: number;
    markers: Marker[];
}

// Make a new MarkerGroup[] for every map named appropriately, 
// and copy and paste structure inside for every new marker type.
const markerGroups_DireMarsh: MarkerGroup[] = [
    {
        type: "crewExfil",
        label: "Crew Exfil",
        icon: crewExfilIcon,
        description: "Potential exfil location necessary for players to extract. \
        When initialized by a Runner, exfil takes around 45 seconds to warm up. Eventually, \
        an auditory que will occur as well as a ring appearing around the exfil indicating that \
        it is ready to be used. At least one runner must step inside to initiate a 10 second countdown \
        in which extraction takes place. Countdown can be reset once there are no runners within the ring.",
        positions: [
            [0.748, 0.385],
            [0.686, 0.672],
            [0.585, 0.692],
            [0.446, 0.581],
            [0.481, 0.358],
            [0.329, 0.701],
            [0.223, 0.516],
            [0.594, 0.254]
        ]
    },
    {
        type: "finalExfil",
        label: "Final Exfil",
        icon: finalExfilIcon,
        description: "Potential exfil location. Only appears once the match timer reaches 0. \
        Afterwards, all Runners are given exactly 1 minute to reach the location before they are \
        eliminated by the match time limit. There is only 1 exfil ever.",
        positions: [
            [.608, .606]
        ]
    },
    {
        type: "guardedExfil",
        label: "Guarded Exfil",
        icon: guardedExfilIcon,
        description: "Potential exfil location. \
        Functions exactly like a Crew Exfil, but when initialized by a Runner, spawns 1 UESC wave which includes a Commander.",
        positions: [
            [.33, .564],
            [.509, .664],
            [.673, .429],
            [.426, .376]
        ]
    },
    {
        type: "playerSpawn",
        label: "Player Spawn",
        icon: playerSpawnIcon,
        description: "Potential Runner spawn point. There are a maximum of 6 crews on this map.",
        positions: [
            [.503, .814],
            [.145, .437],
            [.545, .197],
            [.357, .818],
            [.728, .151],
            [.864, .329],
            [.901, .582],
            [.906, .46],
            [.834, .722],
            [.59, .683]
        ]
    }
];

function createMarkers(groups: MarkerGroup[]): Marker[] {
    return groups.flatMap(group =>
        group.positions.map(([x, y], index) => ({
            id: `${group.type}-${index}`,
            type: group.type,
            x,
            y,
            label: group.label,
            icon: group.icon,
            description: group.description
        }))
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
        markers: createMarkers(markerGroups_DireMarsh)
    },
    {
        id: "outpost",
        name: "Outpost",
        image: outpost,
        width: 2224,
        height: 1744,
        markers: []
    },
    {
        id: "perimeter",
        name: "Perimeter",
        image: perimiter,
        width: 2224,
        height: 1744,
        markers: []
    },
    {
        id: "cryo-archive",
        name: "Cryo Archive",
        image: cryoArchive,
        width: 2048,
        height: 1453,
        markers: []
    }
];