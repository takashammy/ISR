async function loadRoster() {
  const container = document.getElementById('roster-entries');
  if (!container) return;

  try {
    const response = await fetch('data/roster.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { artists } = await response.json();

    container.innerHTML = artists.map((artist) => `
      <article class="roster-card" id="artist-${artist.id}">
        <div class="roster-photo-wrap">
          <img
            class="roster-photo"
            src="${artist.image}"
            alt="${artist.name}"
            loading="lazy"
            width="400"
            height="400"
          >
          <span class="roster-side">${artist.side}</span>
        </div>
        <div class="roster-card-body">
          <span class="roster-catalog">${artist.catalogNumber}</span>
          <h3 class="roster-name">${artist.name}</h3>
          <p class="roster-genre">${artist.genre}</p>
          ${artist.latestRelease ? `<p class="roster-release"><em>${artist.latestRelease}</em></p>` : ''}
          <p class="roster-note">${artist.note}</p>
        </div>
      </article>
    `).join('');
  } catch (error) {
    container.innerHTML = `
      <p class="roster-error">
        Catalogue unavailable — check data/roster.json.
      </p>
    `;
    console.error('Failed to load roster:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadRoster);
