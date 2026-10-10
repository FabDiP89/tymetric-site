/* Tymetric: comportamenti comuni a tutte le pagine del sito.
   Menu mobile, scroll morbido, appuntamento, modulo contatti
   e chat con Mya (widget n8n caricato solo alla prima apertura). */

window.TYMETRIC_CONFIG = {
    // Link pubblico di prenotazione (Google Calendar Appointment Schedule)
    bookingUrl: 'https://calendar.app.google/irsQAKtc2qNvA4iZ8',
    // URL di produzione del Chat Trigger n8n (server GDP Analytics)
    chatWebhookUrl: 'https://n8n.gdpanalytics.com/webhook/87ebbd6b-e725-4772-8b26-7114860ec6a8/chat',
    // Endpoint del modulo contatti (Google Apps Script)
    formEndpoint: 'https://script.google.com/macros/s/AKfycbzpx1FCJFgR7nd1_ZtCvjPnlGeiBWN1P7wF9tRAoPocJTidV-C1Q0KpiVw9GRIOWpzc/exec'
};

/* ===== Menu mobile ===== */
function toggleMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var button = document.getElementById('mobile-menu-button');
    if (!menu) return;
    var closed = menu.classList.contains('max-h-0');
    menu.classList.toggle('max-h-0', !closed);
    menu.classList.toggle('opacity-0', !closed);
    menu.classList.toggle('max-h-[640px]', closed);
    menu.classList.toggle('opacity-100', closed);
    if (button) button.setAttribute('aria-expanded', closed ? 'true' : 'false');
}

function closeMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var button = document.getElementById('mobile-menu-button');
    if (!menu) return;
    menu.classList.add('max-h-0', 'opacity-0');
    menu.classList.remove('max-h-[640px]', 'opacity-100');
    if (button) button.setAttribute('aria-expanded', 'false');
}

/* ===== Eventi per Google Analytics =====
   Partono solo se l'utente ha accettato le statistiche (vedi js/consent.js).
   In Analytics vanno segnati come «eventi chiave»: generate_lead, prenota_demo, apri_chat_mya. */
function trackEvent(name, params) {
    if (typeof gtag !== 'function') return;
    var p = params || {};
    p.pagina = window.location.pathname;
    gtag('event', name, p);
}

/* ===== Appuntamento e modulo ===== */
function openBooking() {
    var u = window.TYMETRIC_CONFIG.bookingUrl;
    if (!u) return;
    trackEvent('prenota_demo', { metodo: 'calendario' });
    window.open(u, '_blank', 'noopener');
}

function openForm() {
    var w = document.getElementById('ty-form-wrap');
    if (!w) {
        window.location.href = 'index.html#contact';
        return;
    }
    w.hidden = false;
    w.scrollIntoView({ behavior: 'smooth', block: 'center' });
    var f = w.querySelector('input, textarea');
    if (f) setTimeout(function () { f.focus(); }, 350);
}

/* ===== Chat con Mya ===== */
var CHAT_MARKUP =
    '<button type="button" class="ty-chat-fab" onclick="openChat()" aria-label="Apri la chat con Mya">' +
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 3v-3z"></path></svg>' +
    '</button>' +
    '<div id="ty-chat-modal" class="ty-chat-modal" role="dialog" aria-modal="true" aria-label="Chat con Mya, l\'assistente di Tymetric">' +
    '<div class="ty-chat-panel">' +
    '<div class="ty-chat-header"><div><h4>Mya</h4></div>' +
    '<button type="button" class="ty-chat-close" onclick="closeChat()" aria-label="Chiudi la chat">' +
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>' +
    '</button></div>' +
    '<div class="ty-chat-body"><div id="n8n-chat-container"></div></div>' +
    '</div></div>';

var chatStarted = false;

function startChat() {
    if (chatStarted) return;
    chatStarted = true;

    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    document.head.appendChild(css);

    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(function (mod) {
        mod.createChat({
            webhookUrl: window.TYMETRIC_CONFIG.chatWebhookUrl,
            target: '#n8n-chat-container',
            mode: 'fullscreen',
            loadPreviousSession: false,
            showWelcomeScreen: false,
            allowFileUploads: true,
            allowedFilesMimeTypes: 'application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv',
            initialMessages: [
                "Ciao, sono **Mya** 👋 l'assistente di Tymetric. Posso aiutarti in tre modi:\n\n💬 **Rispondere alle tue domande** e curiosità sulla pianificazione dei turni.\n\n📅 **Fissare un appuntamento** con un consulente per vedere Tymetric dal vivo.\n\n🔍 **Entrare nel dettaglio del tuo reparto**: lasciami nome, cognome ed email e ti invio un **NDA**, così potrai raccontarmi regole e organizzazione del reparto e arriveremo a una **demo costruita sui tuoi turni, con nomi anonimi**.\n\nDa dove vuoi partire? 😊"
            ],
            i18n: {
                en: {
                    title: '',
                    subtitle: '',
                    footer: '',
                    getStarted: 'Nuova conversazione',
                    inputPlaceholder: 'Scrivi qui la tua domanda...',
                    closeButtonTooltip: 'Chiudi'
                }
            }
        });
    }).catch(function () {
        chatStarted = false;
        var box = document.getElementById('n8n-chat-container');
        if (box) {
            box.innerHTML = '<p style="padding:1.5rem;color:#374151">La chat non è disponibile in questo momento. Scrivici a <a href="mailto:info@tymetric.com">info@tymetric.com</a>.</p>';
        }
    });
}

function openChat() {
    var modal = document.getElementById('ty-chat-modal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!chatStarted) trackEvent('apri_chat_mya');
    startChat();
}

function closeChat() {
    var modal = document.getElementById('ty-chat-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

/* ===== Modulo contatti ===== */
function bindContactForm() {
    var contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    var formReadyAt = Date.now();
    var showSuccess = function () {
        contactForm.innerHTML =
            '<div class="text-center py-8">' +
            '<svg class="w-16 h-16 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' +
            '<h4 class="text-2xl font-bold text-gray-900 mb-2">Richiesta inviata</h4>' +
            '<p class="text-gray-600">Ti contatteremo al più presto.</p>' +
            '</div>';
    };
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Antispam: un bot compila il campo nascosto o invia in pochi secondi.
        // Gli mostriamo l'esito positivo, ma non inviamo nulla.
        var trap = contactForm.querySelector('[name="sito_web"]');
        if ((trap && trap.value) || Date.now() - formReadyAt < 4000) {
            showSuccess();
            return;
        }
        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        submitBtn.textContent = 'Invio in corso...';
        submitBtn.disabled = true;

        var field = function (name) {
            var el = contactForm.querySelector('[name="' + name + '"]');
            return el ? el.value : '';
        };
        // «Come ci hai conosciuto?» e la pagina vanno in testa al messaggio,
        // così compaiono nel foglio senza modificare lo script di raccolta.
        var fonte = field('provenienza') || 'non indicata';
        var formData = {
            nome: field('nome'),
            cognome: field('cognome'),
            email: field('email'),
            telefono: field('telefono'),
            messaggio: '[Ci ha conosciuto tramite: ' + fonte + ' · Pagina: ' + window.location.pathname + ']\n' + field('messaggio'),
            provenienza: fonte,
            pagina: window.location.pathname
        };

        fetch(window.TYMETRIC_CONFIG.formEndpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(function () {
            trackEvent('generate_lead', { method: 'modulo', fonte: fonte });
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', { 'send_to': 'AW-17799873404/DK6aCJr9jdEbEPyG0qdC' });
            }
            showSuccess();
        }).catch(function () {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('Si è verificato un errore. Riprova o scrivici a info@tymetric.com');
        });
    });
}

/* ===== Avvio ===== */
document.addEventListener('DOMContentLoaded', function () {
    // Chat: launcher e modale sono uguali in tutte le pagine
    document.body.insertAdjacentHTML('beforeend', CHAT_MARKUP);
    var modal = document.getElementById('ty-chat-modal');
    modal.addEventListener('click', function (e) { if (e.target === modal) closeChat(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeChat(); });

    // Il menu mobile si chiude quando si sceglie una voce
    document.querySelectorAll('#mobile-menu a').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    // Scroll morbido per le ancore della stessa pagina
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id.length < 2) return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', id);
        });
    });

    bindContactForm();
});
