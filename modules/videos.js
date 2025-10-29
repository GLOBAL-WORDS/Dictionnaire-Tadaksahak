// modules/videos.js
// Gestion des vidéos (tri, affichage)
// -----------------------------------

import { escapeHTML } from './utils.js';

export function initialiserVideos() {
  const videosContainer = document.getElementById('videosContainer');
  const filtreVideos = document.getElementById('filtreVideos');
  const videosData = typeof videos !== 'undefined' ? videos : [];
  if (!videosContainer || !videosData.length) return;

  function renderVideos(liste) {
    videosContainer.innerHTML = '';
    liste.forEach(v => {
      const div = document.createElement('div');
      div.className = 'video-item';
      div.innerHTML = `
        <video controls preload="none" width="100%" poster="${escapeHTML(v.poster || '')}">
          <source src="${escapeHTML(v.src)}" type="video/mp4">
        </video>
        <p><strong>${escapeHTML(v.titre)}</strong></p>
      `;
      videosContainer.appendChild(div);
    });
  }

  filtreVideos?.addEventListener('change', () => {
    const val = filtreVideos.value;
    const sorted =
      val === 'nouveau'
        ? [...videosData].sort((a, b) => new Date(b.date) - new Date(a.date))
        : [...videosData].sort((a, b) => new Date(a.date) - new Date(b.date));
    renderVideos(sorted);
  });

  renderVideos(videosData);
}
