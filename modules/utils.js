// modules/utils.js
// Fonctions utilitaires globales et sécurisées
// --------------------------------------------

// Raccourcis DOM
export const $ = sel => document.querySelector(sel);
export const $$ = sel => document.querySelectorAll(sel);

// Nettoyage d'une chaîne (utile pour les recherches)
export function nettoyerTexte(texte) {
  return texte?.trim().toLowerCase() || '';
}

// Échappement HTML sécurisé (prévention XSS)
export function escapeHTML(str = '') {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
