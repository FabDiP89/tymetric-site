/* Tymetric: comportamenti comuni a tutte le pagine del sito.
   Menu mobile, scroll morbido e modulo contatti. */

window.TYMETRIC_CONFIG = {
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
   In Analytics va segnato come «evento chiave»: generate_lead. */
function trackEvent(name, params) {
    if (typeof gtag !== 'function') return;
    var p = params || {};
    p.pagina = window.location.pathname;
    gtag('event', name, p);
}

/* ===== Modulo ===== */
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

/* Le pagine rimaste in cache possono ancora chiamare questi nomi:
   portano tutti al modulo di richiesta informazioni. */
function openBooking() { openForm(); }
function openChat() { openForm(); }

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
    initHomeV2();
});

/* ===== Home v2: comparsa delle sezioni, schermate del prodotto, email dall'apertura, esempio di Mya ===== */
function initHomeV2() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Le sezioni compaiono quando entrano nello schermo
    var rv = document.querySelectorAll('.ty-reveal');
    if ('IntersectionObserver' in window && !reduce) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
        }, { threshold: 0.12 });
        rv.forEach(function (el) { io.observe(el); });
    } else {
        rv.forEach(function (el) { el.classList.add('is-in'); });
    }

    // Schermate del prodotto nell'apertura
    var shot = document.getElementById('ty-shot');
    if (shot) {
        var frame = shot.parentNode;
        document.querySelectorAll('.ty-tabs button').forEach(function (b) {
            b.addEventListener('click', function () {
                document.querySelectorAll('.ty-tabs button').forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
                b.setAttribute('aria-selected', 'true');
                frame.classList.add('is-fading');
                setTimeout(function () {
                    shot.src = b.getAttribute('data-shot');
                    shot.alt = b.textContent.trim() + ' in Tymetric';
                    frame.classList.remove('is-fading');
                }, 180);
            });
        });
    }

    // L'email scritta nell'apertura precompila il modulo
    var go = document.getElementById('ty-go');
    if (go) {
        go.addEventListener('submit', function (e) {
            e.preventDefault();
            var v = document.getElementById('ty-go-email').value.trim();
            var target = document.getElementById('cf-email');
            if (v && target) target.value = v;
            var contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
            setTimeout(function () { var f = document.getElementById('cf-nome'); if (f) f.focus({ preventScroll: true }); }, 500);
        });
    }

    // L'esempio di conversazione con Mya compare a passi
    var chat = document.getElementById('ty-talk');
    if (!chat) return;
    var timers = [];
    function step(n) { return chat.querySelector('[data-step="' + n + '"]'); }
    function reset() {
        timers.forEach(clearTimeout); timers = [];
        chat.querySelectorAll('[data-step]').forEach(function (el) { el.classList.remove('is-on'); });
        chat.querySelector('.ty-ok').classList.remove('is-pressed');
        chat.querySelector('.ty-typed').textContent = '';
    }
    function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function play() {
        reset();
        var typed = chat.querySelector('.ty-typed'), text = typed.getAttribute('data-text');
        if (reduce) {
            typed.textContent = text;
            chat.querySelectorAll('[data-step]').forEach(function (el) { if (el.getAttribute('data-step') !== '2') el.classList.add('is-on'); });
            return;
        }
        at(300, function () { step(1).classList.add('is-on'); });
        for (var i = 1; i <= text.length; i++) {
            (function (n) { at(350 + n * 28, function () { typed.textContent = text.slice(0, n); }); })(i);
        }
        var t = 350 + text.length * 28;
        at(t + 300, function () { step(2).classList.add('is-on'); });
        at(t + 1500, function () { step(2).classList.remove('is-on'); step(3).classList.add('is-on'); });
        at(t + 2000, function () { step(4).classList.add('is-on'); });
        at(t + 2350, function () { step(5).classList.add('is-on'); });
        at(t + 2700, function () { step(6).classList.add('is-on'); });
        at(t + 3200, function () { step(7).classList.add('is-on'); });
        at(t + 4400, function () { chat.querySelector('.ty-ok').classList.add('is-pressed'); });
        at(t + 4900, function () { step(8).classList.add('is-on'); });
    }
    var replay = document.getElementById('ty-talk-replay');
    if (replay) replay.addEventListener('click', play);
    if ('IntersectionObserver' in window) {
        var seen = false;
        new IntersectionObserver(function (es) { if (!seen && es[0].isIntersecting) { seen = true; play(); } }, { threshold: 0.4 }).observe(chat);
    } else {
        play();
    }
}
