// modules/livres.js
// Gestion du catalogue de livres / études
// ---------------------------------------

import { escapeHTML } from './utils.js';

export function initialiserLivres() {
  const livresContainer = document.getElementById('livresContainer');
  const inputRecherche = document.getElementById('rechercheLivres');
  const selectTheme = document.getElementById('selectThemeLivres');
  const livresData = typeof livres !== 'undefined' ? livres : [];
  if (!livresContainer || !livresData.length) return;

  function renderLivres(liste) {
    livresContainer.innerHTML = '';
    liste.forEach(livre => {
      const div = document.createElement('div');
      div.className = 'livre-item';
      div.innerHTML = `
        <h4>${escapeHTML(livre.titre)}</h4>
        <p>${escapeHTML(livre.description || '')}</p>
        <a href="${escapeHTML(livre.lien)}" target="_blank" class="btn">Lire le document</a>
      `;
      livresContainer.appendChild(div);
    });
  }

  function filtrerLivres() {
    const query = inputRecherche.value.toLowerCase();
    const theme = selectTheme.value;
    const resultats = livresData.filter(l =>
      (!theme || l.theme === theme) &&
      (!query || l.titre.toLowerCase().includes(query))
    );
    renderLivres(resultats);
  }

  inputRecherche?.addEventListener('input', filtrerLivres);
  selectTheme?.addEventListener('change', filtrerLivres);

  renderLivres(livresData);
}
