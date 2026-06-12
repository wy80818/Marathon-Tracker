import direMarsh from "../assets/Maps/dire-marsh.png";
import cryoArchive from "../assets/Maps/cryo-archive.png";
import perimiter from "../assets/Maps/perimeter.png";
import outpost from "../assets/Maps/outpost.png";

import crewExfilIcon from "../assets/Markers/Crew_Exfil.png";
import finalExfilIcon from "../assets/Markers/Final_Exfil.png";
import guardedExfilIcon from "../assets/Markers/Guarded_Exfil.png";

// Add new markers here in camelCase
export type MarkerType =
    | "crewExfil"
    | "finalExfil"
    | "guardedExfil";

export interface Marker {
    id: string;
    type: MarkerType;
    x: number;
    y: number;
    label: string;
    icon: string;
}

export interface MarkerGroup {
    type: MarkerType;
    label: string;
    icon: string;
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
        positions: [
        ]
    },
    {
        type: "guardedExfil",
        label: "Guarded Exfil",
        icon: guardedExfilIcon,
        positions: [
            [.33, .564],
            [.509, .664],
            [.673, .429],
            [.426, .376]
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
            icon: group.icon
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