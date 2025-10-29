// modules/audio.js
// Gestion de la section “Albums Hamadine” + export PDF paroles
// ------------------------------------------------------------

import { escapeHTML } from './utils.js';

export function initialiserAudio() {
  const albumsAudio = typeof audios !== 'undefined' ? audios[0]?.pistes || [] : [];
  if (!albumsAudio.length) return;

  const conteneur = document.getElementById('audioContainer');
  if (!conteneur) return;

  const section = document.createElement('section');
  const titreAlbum = document.createElement('h3');
  titreAlbum.textContent = 'Album Hamadine';
  section.appendChild(titreAlbum);

  albumsAudio.forEach((piste, idx) => {
    const idLyrics = `lyrics-${idx}`;
    const bloc = document.createElement('div');
    bloc.className = 'audio-bloc';
    bloc.innerHTML = `
      <p><strong>${escapeHTML(piste.title)}</strong></p>
      <audio controls src="${piste.src}" preload="none"></audio>
      ${
        piste.lyrics
          ? `<button class="btnLyrics" data-target="${idLyrics}">Voir les paroles</button>
             <pre id="${idLyrics}" class="lyrics-text" style="display:none;">${escapeHTML(piste.lyrics)}</pre>
             <button class="btnPdf" data-target="${idLyrics}">Télécharger PDF</button>`
          : ''
      }
    `;
    section.appendChild(bloc);
  });

  conteneur.appendChild(section);

  conteneur.querySelectorAll('.btnLyrics').forEach(btn => {
    btn.addEventListener('click', () => {
      const tgt = document.getElementById(btn.dataset.target);
      tgt.style.display = tgt.style.display === 'block' ? 'none' : 'block';
      btn.textContent = tgt.style.display === 'block' ? 'Masquer paroles' : 'Voir les paroles';
    });
  });

  conteneur.querySelectorAll('.btnPdf').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      try {
        const doc = new window.jspdf.jsPDF();
        doc.setFontSize(16);
        const titre = btn.parentNode.querySelector('strong').textContent;
        doc.text(titre, 10, 20);
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(target.textContent, 180);
        doc.text(lines, 10, 30);
        doc.save(`${titre}.pdf`);
      } catch (e) {
        alert("Erreur lors de la génération du PDF : " + e.message);
      }
    });
  });
}
