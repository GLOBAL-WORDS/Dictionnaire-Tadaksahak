// modules/photos.js
// Gestion de la galerie photo dynamique
// -------------------------------------

import { escapeHTML } from './utils.js';

export function initialiserPhotos() {
  const photosContainer = document.getElementById('photosContainer');
  const photosData = typeof photos !== 'undefined' ? photos : [];
  if (!photosContainer || !photosData.length) return;

  photosData.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'photo-item';
    div.innerHTML = `
      <img src="${escapeHTML(photo.url)}" alt="${escapeHTML(photo.titre || 'Photo')}" loading="lazy">
      <p>${escapeHTML(photo.titre || '')}</p>
    `;
    photosContainer.appendChild(div);
  });
}
