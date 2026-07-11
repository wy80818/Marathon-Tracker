export interface Announcement {
    id: number;
    title: string;
    date: string;
    description: string;
}

export const announcements: Announcement[] = [
    {
        id: 0,
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
    },
    {
        id: 4,
        title: "WebDev",
        date: "2026-07-07",
        description: `
Items Tab is functionally complete!

There are 6 statically created items which are missing images.

I rather would move on to other features than painstakingly add all items that exist in the game.

Hopefully the API will provide this information.

In the future I will improve upon patch notes tab.
`
    },
    {
        id: 5,
        title: "WebDev",
        date: "2026-07-11",
        description: `
News Tab is functionally complete!

The news is pulled directly from the Steam's public API.

There is a search function that looks for keyworks in the shorthand description and the titles.

If there were to be more futures in the future, it would probably be allowing date search and more news outlets

(Probably not Twitter/X since it's paid, but maybe Bluesky?)
`
    }
];