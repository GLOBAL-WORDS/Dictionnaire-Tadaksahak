// modules/share.js
// Gère les boutons de partage dynamiques dans les articles ou pages
// ---------------------------------------------------------------

export function initialiserPartage() {
  document.querySelectorAll('.share-buttons').forEach(section => {
    const pageURL = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const liens = {
      whatsapp: `https://wa.me/?text=${pageTitle}%20${pageURL}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageURL}`,
      twitter: `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageURL}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}`,
      email: `mailto:?subject=${pageTitle}&body=Voici un lien intéressant : ${pageURL}`,
    };

    for (const [classe, lien] of Object.entries(liens)) {
      const bouton = section.querySelector(`.${classe}`);
      if (bouton) bouton.href = lien;
    }
  });
}
