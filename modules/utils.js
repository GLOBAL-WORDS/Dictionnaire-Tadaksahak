// modules/utils.js
// Fonctions utilitaires globales

export const $ = sel => document.querySelector(sel);
export const $$ = sel => document.querySelectorAll(sel);

export function escapeHTML(str) {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}

export function nettoyerTexte(texte) {
  return texte?.trim().toLowerCase() || '';
}
