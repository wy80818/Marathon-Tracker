import direMarsh from "../assets/Maps/dire-marsh.png";
import cryoArchive from "../assets/Maps/cryo-archive.png";
import perimiter from "../assets/Maps/perimeter.png";
import outpost from "../assets/Maps/outpost.png";

import exfilIcon from "../assets/Markers/Crew_Exfil.png";

export type MarkerType =
    | "crewExfil"
    | "vault"
    | "uplink";

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

const markerGroups_DireMarsh: MarkerGroup[] = [
    {
        type: "crewExfil",
        label: "Crew Exfil",
        icon: exfilIcon,
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
        markers: [
        ]
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