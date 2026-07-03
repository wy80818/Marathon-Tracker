// [
//   {
//     "id": 1,
//     "title": "WebDev",
//     "date": "2026-06-24",
//     "description": "Fixed Map Viewer resizing bug."
//   },
//   {
//     "id": 2,
//     "title": "WebDev",
//     "date": "2026-06-25",
//     "description": "Starting to add more content to home page."
//   },
//   {
//     "id": 3,
//     "title": "WebDev",
//     "date": "2026-07-02",
//     "description": "Map Tab is functionally compelete!Only changes that are necessary in the future are more markers, better visuals and bug fixes."
//   }
// ]
export interface Announcement {
    id: number;
    title: string;
    date: string;
    description: string;
}

export const announcements: Announcement[] = [
    {
        id: 1,
        title: "WebDev",
        date: "2000-01-01",
        description: `
Announcement Test.
`
    },
    {
        id: 1,
        title: "WebDev",
        date: "2026-06-24",
        description: `
Fixed Map Viewer resizing bug.
`
    },
    {
        id: 2,
        title: "WebDev",
        date: "2026-06-25",
        description: `
Starting to add more content to home page.
`
    },
    {
        id: 3,
        title: "WebDev",
        date: "2026-07-02",
        description: `
Map Tab is functionally complete!
The only further changes necessary in the forseeable future include...
- Bug fixes
- More markers
- More/different art

To use the map tab:
1. Navigate to the map tab in the tab bar
2. Select a map to start on (can be changed afterwards)
3. Interact with the map using scroll wheel + LMB
4. Click the different marker types to drop down respective markers in the sidebar.
`
    }
];