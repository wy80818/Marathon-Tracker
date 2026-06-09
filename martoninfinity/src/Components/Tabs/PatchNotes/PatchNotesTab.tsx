function PatchNotesTab() {
    const bungieUpdatesUrl = 'https://www.bungie.net/7/en/News/MarathonUpdates'

    return (
        <div className="tab-content-inner">
            <h2>Patch Notes</h2>
            <p>Latest Marathon Updates from Bungie</p>
            <div className="patch-notes-container">
                <div className="patch-notes-info">
                    <p className="patch-notes-description">
                        Marathon Updates are published on Bungie's official website. Click the button below to view the latest patch notes and announcements.
                    </p>
                    <a
                        href={bungieUpdatesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="patch-notes-button"
                    >
                        View Marathon Updates on Bungie.net →
                    </a>
                </div>
                <div className="patch-notes-info-section">
                    <h3>Coming Soon</h3>
                    <p>We're working on integrating live patch notes directly into this tracker. Check back soon for updates!</p>
                </div>
            </div>
        </div>
    )
}

export default PatchNotesTab;