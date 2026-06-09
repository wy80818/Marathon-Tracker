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
                x: .748,
                y: .385,
                label: "Crew Exfil",
                icon: exfilIcon
            },
            {
                id: 2,
                x: .686,
                y: .672,
                label: "Crew Exfil",
                icon: exfilIcon
            },            
            {
                id: 3,
                x: .585,
                y: .692,
                label: "Crew Exfil",
                icon: exfilIcon
            },
            {
                id: 4,
                x: .446,
                y: .581,
                label: "Crew Exfil",
                icon: exfilIcon
            },
            {
                id: 5,
                x: .481,
                y: .358,
                label: "Crew Exfil",
                icon: exfilIcon
            },
            {
                id: 5,
                x: .329,
                y: .701,
                label: "Crew Exfil",
                icon: exfilIcon
            },
            {
                id: 5,
                x: .223,
                y: .516,
                label: "Crew Exfil",
                icon: exfilIcon
            },
            {
                id: 6,
                x: .594,
                y: .254,
                label: "Crew Exfil",
                icon: exfilIcon
            }
        ]
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
        id: "perimiter",
        name: "Perimiter",
        image: perimiter,
        width: 2224,
        height: 1744,
        markers: []
    },
    {
        id: "cryo-archive.png",
        name: "Cryo Archive",
        image: cryoArchive,
        width: 2048,
        height: 1453,
        markers: []
    }
];