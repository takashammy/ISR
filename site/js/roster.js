async function loadRoster() {
  const container = document.getElementById('roster-entries');
  if (!container) return;

  try {
    const response = await fetch('data/roster.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { artists } = await response.json();

    container.innerHTML = artists.map((artist) => `
      <article class="catalogue-row" id="artist-${artist.id}">
        <span class="cat-num">${artist.catalogNumber}</span>
        <span class="cat-artist">${artist.name}</span>
        <span class="cat-genre">${artist.genre}</span>
        <span class="cat-side">${artist.side}</span>
        <p class="cat-note">${artist.note}</p>
      </article>
    `).join('');
  } catch (error) {
    container.innerHTML = `
      <p class="cat-note" style="grid-column: 1 / -1; padding: 1rem 0;">
        Catalogue unavailable — check data/roster.json.
      </p>
    `;
    console.error('Failed to load roster:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadRoster);
