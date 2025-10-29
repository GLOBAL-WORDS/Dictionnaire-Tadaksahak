// app.js
// Point d’entrée principal du projet Tadaksahak Learning
// -------------------------------------------------------

import { initialiserNavigation } from './modules/navigation.js';
import { initialiserPartage } from './modules/share.js';
import { initialiserDictionnaire } from './modules/dictionnaire.js';
import { initialiserChatbot } from './modules/chatbot.js';
import { initialiserAudio } from './modules/audio.js';
import { initialiserPhotos } from './modules/photos.js';
import { initialiserVideos } from './modules/videos.js';
import { initialiserLivres } from './modules/livres.js';
import { initialiserRapports } from './modules/rapports.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🚀 Tadaksahak Learning initialisé', 'color:#00bcd4;font-weight:bold;');

  // Initialisation des modules
  initialiserNavigation();
  initialiserPartage();
  initialiserDictionnaire();
  initialiserChatbot();
  initialiserAudio();
  initialiserPhotos();
  initialiserVideos();
  initialiserLivres();
  initialiserRapports();
});
