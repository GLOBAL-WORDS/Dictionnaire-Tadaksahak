// modules/navigation.js
// Gestion de la navigation principale via le menu déroulant
// ---------------------------------------------------------

export function initialiserNavigation() {
  const select = document.getElementById('sectionSelector');
  const sections = document.querySelectorAll('main > section');

  if (!select || !sections.length) return;

  function afficherSection(id) {
    sections.forEach(sec => (sec.hidden = sec.id !== id));
    localStorage.setItem('lastSection', id);
  }

  select.addEventListener('change', () => {
    afficherSection(select.value);
  });

  const last = localStorage.getItem('lastSection') || 'accueil';
  select.value = last;
  afficherSection(last);
}
