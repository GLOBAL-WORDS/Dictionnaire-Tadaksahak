// modules/chatbot.js
// Chatbot multilingue Hamadine / Idaksahak
// ---------------------------------------

import { escapeHTML } from './utils.js';

export function initialiserChatbot() {
  const interfaceData = typeof interface_langue !== 'undefined' ? interface_langue : {};
  const histoireDocs = typeof histoire !== 'undefined' ? histoire : [];
  const motsComplet = typeof mots_final_489 !== 'undefined' ? mots_final_489 : [];

  const chatInput = document.getElementById('chatInput');
  const btnEnvoyer = document.getElementById('btnEnvoyer');
  const chatWindow = document.getElementById('chatWindow');

  if (!chatInput || !btnEnvoyer || !chatWindow) return;

  const langueInterface = localStorage.getItem('langueInterface') || 'fr';
  const langueTrad = localStorage.getItem('langueTrad') || 'fr';

  let historiqueConversation = [];

  function afficheMsg(user, html) {
    const div = document.createElement('div');
    div.className = `message ${user}`;
    const label = user === 'bot' ? (interfaceData[langueInterface]?.bot || 'Bot') : 'Moi';
    div.innerHTML = `<strong>${label}:</strong> ${html}`;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    historiqueConversation.push({ user, html });
    if (historiqueConversation.length > 30) historiqueConversation.shift();
  }

  function reponseBot(txt) {
    const clean = txt.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const botInfo = interfaceData[langueInterface]?.botIntelligence || {};

    const salutations = ['bonjour', 'salut', 'hello', 'bonsoir', 'salam'];
    if (salutations.some(s => clean.includes(s))) {
      const replies = botInfo.salutations || [
        'Bonjour ! Comment puis-je vous aider ?',
        'Salut ! Besoin d’une info ?',
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }

    if (clean.includes('ça va') || clean.includes('comment ca va'))
      return 'Ça va bien, merci ! Et toi ?';

    if (clean.includes('aide') || clean.includes('je ne sais pas'))
      return "Tu veux un mot au hasard ou une anecdote ?";

    // Si c’est un mot du dictionnaire
    const m = motsComplet.find(m => m.mot.toLowerCase() === clean || m.fr?.toLowerCase() === clean);
    if (m)
      return `📚 <strong>${m.mot}</strong> = ${escapeHTML(m?.[langueTrad] || m.fr)}${m.en ? ` / en : ${escapeHTML(m.en)}` : ''}`;

    // Si c’est une histoire
    const hist = histoireDocs.find(h => clean.includes(h.titre.toLowerCase()));
    if (hist) {
      let out = `<strong>${escapeHTML(hist.titre)}</strong><br>${escapeHTML(hist.contenu)}`;
      if (hist.image) out += `<br><img src="${hist.image}" style="max-width:100%;">`;
      if (hist.video)
        out += `<br><video controls width="100%" style="max-width:100%;"><source src="${hist.video}" type="video/mp4"></video>`;
      return out;
    }

    return "Je n’ai pas compris. Essaie un mot ou dis-moi 'une histoire'.";
  }

  function traiterSaisie() {
    const txt = chatInput.value.trim();
    if (!txt) return;
    chatInput.value = '';
    afficheMsg('user', escapeHTML(txt));
    afficheMsg('bot', reponseBot(txt));
  }

  btnEnvoyer.addEventListener('click', traiterSaisie);
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      traiterSaisie();
    }
  });

  // Bouton flottant d’accès direct au chat
  document.getElementById('toggleChatBot')?.addEventListener('click', () => {
    document.querySelector('select#sectionSelector').value = 'chat';
    document.querySelector('#chat').hidden = false;
    document.querySelectorAll('main > section').forEach(s => (s.hidden = s.id !== 'chat'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
