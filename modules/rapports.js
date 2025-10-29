// modules/rapports.js
// Gestion des rapports et actualités
// ----------------------------------

import { escapeHTML } from './utils.js';

export function initialiserRapports() {
  const rapportsContainer = document.getElementById('rapportsContainer');
  const newsContainer = document.getElementById('newsContainer');

  const docsData = typeof docs !== 'undefined' ? docs : [];
  const newsData = typeof actualites !== 'undefined' ? actualites : [];

  if (rapportsContainer && docsData.length) {
    docsData.forEach(d => {
      const item = document.createElement('div');
      item.className = 'rapport-item';
      item.innerHTML = `
        <h3>${escapeHTML(d.titre)}</h3>
        <p>${escapeHTML(d.resume || '')}</p>
        <a href="${escapeHTML(d.url)}" target="_blank" class="btn">Lire</a>
      `;
      rapportsContainer.appendChild(item);
    });
  }

  if (newsContainer && newsData.length) {
    newsData.forEach(n => {
      const art = document.createElement('article');
      art.className = 'actualite';
      art.innerHTML = `
        <h3>${escapeHTML(n.titre)}</h3>
        <p><strong>${escapeHTML(n.date)}</strong> — ${escapeHTML(n.texte)}</p>
      `;
      newsContainer.appendChild(art);
    });
  }
}
