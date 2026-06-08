import direMarsh from "../assets/Maps/dire-marsh.png";
import cryoArchive from "../assets/Maps/cryo-archive.png";
import perimiter from "../assets/Maps/perimeter.png";
import outpost from "../assets/Maps/outpost.png";

import exfilIcon from "../assets/Markers/Crew_Exfil.png";

export interface Marker {
    id: number;
    x: number;
    y: number;
    label: string;
    icon: string;
}

export interface GameMap {
    id: string;
    name: string;
    image: string;
    width: number;
    height: number;
    markers: Marker[];
}

export const maps: GameMap[] = [
    {
        id: "marsh",
        name: "Dire Marsh",
        image: direMarsh,
        width: 2224,
        height: 1744,
        markers: [
            {
                id: 1,
                x: 0.72,
                y: 0.45,
                label: "Crew Exfil",
                icon: exfilIcon
            }
        ]
    },
    {
        id: "outpost",
        name: "Outpost",
        image: outpost,
        width: 3840,
        height: 2160,
        markers: []
    }
];