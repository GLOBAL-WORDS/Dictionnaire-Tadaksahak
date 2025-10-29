// modules/dictionnaire.js
// Gestion du dictionnaire Tadaksahak interactif
// ---------------------------------------------

import { escapeHTML } from './utils.js';

export function initialiserDictionnaire() {
  const motsComplet = typeof mots_final_489 !== 'undefined' ? mots_final_489 : [];
  if (!motsComplet.length) return;

  const fuse = typeof Fuse !== 'undefined' ? new Fuse(motsComplet, { keys: ['mot', 'fr', 'en'], threshold: 0.4 }) : null;

  const motTexte = document.getElementById('motTexte');
  const definition = document.getElementById('definition');
  const compteur = document.getElementById('compteur');
  const searchBar = document.getElementById('searchBar');

  let idx = parseInt(localStorage.getItem('motIndex')) || 0;
  let mots = [...motsComplet];
  const langueTrad = localStorage.getItem('langueTrad') || 'fr';

  function showMot(i) {
    if (!motTexte || !definition || !compteur) return;
    idx = Math.max(0, Math.min(mots.length - 1, i));
    localStorage.setItem('motIndex', idx);

    const m = mots[idx];
    motTexte.textContent = m?.mot || '—';
    definition.innerHTML =
      escapeHTML(m?.[langueTrad] || m?.fr || '—') +
      (m?.cat ? ` <span style="color:#888">(${escapeHTML(m.cat)})</span>` : '');
    compteur.textContent = `${idx + 1}/${mots.length}`;
  }

  document.getElementById('btnPrev')?.addEventListener('click', () => showMot(idx - 1));
  document.getElementById('btnNext')?.addEventListener('click', () => showMot(idx + 1));

  searchBar?.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    mots = q && fuse ? fuse.search(q).map(r => r.item) : [...motsComplet];
    mots.length ? showMot(0) : noResult();
  });

  function noResult() {
    motTexte.textContent = 'Aucun résultat';
    definition.textContent = '';
    compteur.textContent = '0 / 0';
  }

  if (mots.length) showMot(idx);
}
