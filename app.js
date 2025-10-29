// app.js
// Initialisation générale du site Tadaksahak Learning
// ---------------------------------------------------

import { initialiserDictionnaire } from './modules/dictionnaire.js';
import { initialiserChatbot } from './modules/chatbot.js';
import { initialiserAudio } from './modules/audio.js';
import { initialiserPhotos } from './modules/photos.js';
import { initialiserVideos } from './modules/videos.js';
import { initialiserRapports } from './modules/rapports.js';
import { initialiserLivres } from './modules/livres.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Tadaksahak Learning modules init');

  initialiserDictionnaire();
  initialiserChatbot();
  initialiserAudio();
  initialiserPhotos();
  initialiserVideos();
  initialiserRapports();
  initialiserLivres();
});
