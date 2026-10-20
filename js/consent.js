/* Tymetric — consenso cookie (Garante privacy, linee guida 10/06/2021).
   Nessuno strumento di statistica o marketing parte prima del consenso:
   - Statistiche: Google Analytics 4
   - Marketing: Google Ads e Google Tag Manager (il contenitore ha solo tag Ads)
   La scelta resta in memoria locale per 6 mesi, poi il banner si ripresenta.
   Lo stato iniziale del Consent Mode è impostato in <head>, prima di questo file. */
(function () {
    'use strict';

    var KEY = 'tyConsent';
    var MAX_AGE = 180 * 24 * 60 * 60 * 1000; // 6 mesi
    var GA_ID = 'G-QFYFCYZ4Z6';
    var ADS_ID = 'AW-17799873404';
    var GTM_ID = 'GTM-PM6KM6HZ';

    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
        window.gtag = function () { window.dataLayer.push(arguments); };
    }

    var state = { gtagLoaded: false, gtmLoaded: false, gaConfigured: false, adsConfigured: false };

    function read() {
        try {
            var v = JSON.parse(localStorage.getItem(KEY) || 'null');
            if (v && v.v === 1 && typeof v.t === 'number' && Date.now() - v.t < MAX_AGE) return v;
        } catch (e) { /* memoria locale non disponibile */ }
        return null;
    }

    function save(c) {
        var v = { v: 1, a: !!c.a, m: !!c.m, t: Date.now() };
        try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* memoria locale non disponibile */ }
        return v;
    }

    function addScript(src) {
        var s = document.createElement('script');
        s.async = true;
        s.src = src;
        document.head.appendChild(s);
    }

    function g(x) { return x ? 'granted' : 'denied'; }

    function deleteCookies(prefixes) {
        var host = location.hostname;
        var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')];
        document.cookie.split(';').forEach(function (part) {
            var name = part.split('=')[0].trim();
            var hit = prefixes.some(function (p) { return name.indexOf(p) === 0; });
            if (!hit) return;
            domains.forEach(function (d) {
                document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
            });
        });
    }

    function apply(c) {
        window.gtag('consent', 'update', {
            analytics_storage: g(c.a),
            ad_storage: g(c.m),
            ad_user_data: g(c.m),
            ad_personalization: g(c.m)
        });
        window.dataLayer.push({ event: 'ty_consent_update', ty_analytics: !!c.a, ty_marketing: !!c.m });

        if ((c.a || c.m) && !state.gtagLoaded) {
            state.gtagLoaded = true;
            window.gtag('js', new Date());
            addScript('https://www.googletagmanager.com/gtag/js?id=' + (c.a ? GA_ID : ADS_ID));
        }
        if (c.a && !state.gaConfigured) {
            state.gaConfigured = true;
            window.gtag('config', GA_ID);
        }
        if (c.m && !state.adsConfigured) {
            state.adsConfigured = true;
            window.gtag('config', ADS_ID);
        }
        if (c.m && !state.gtmLoaded) {
            state.gtmLoaded = true;
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            addScript('https://www.googletagmanager.com/gtm.js?id=' + GTM_ID);
        }

        if (!c.a) deleteCookies(['_ga']);
        if (!c.m) deleteCookies(['_gcl', '_gac']);
    }

    /* ---------- Banner ---------- */

    var CSS = '' +
        '#ty-consent{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#0f172a;color:#e2e8f0;' +
        'box-shadow:0 -8px 30px rgba(0,0,0,.25);font-family:Inter,system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.5}' +
        '#ty-consent .tyc-in{max-width:1200px;margin:0 auto;padding:18px 20px;display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:space-between}' +
        '#ty-consent p{margin:0;flex:1 1 420px}' +
        '#ty-consent a{color:#5eead4;text-decoration:underline}' +
        '#ty-consent .tyc-btns{display:flex;flex-wrap:wrap;gap:10px;align-items:center}' +
        '#ty-consent button{font:inherit;font-weight:600;cursor:pointer;border-radius:8px;padding:10px 20px;min-width:120px}' +
        '#ty-consent .tyc-main{background:#0f766e;color:#fff;border:2px solid #0f766e}' +
        '#ty-consent .tyc-main:hover{background:#115e59;border-color:#115e59}' +
        '#ty-consent .tyc-link{background:none;border:0;color:#cbd5e1;text-decoration:underline;min-width:0;padding:10px 6px}' +
        '#ty-consent .tyc-prefs{flex-basis:100%;display:none;border-top:1px solid #334155;padding-top:14px}' +
        '#ty-consent.tyc-open .tyc-prefs{display:block}' +
        '#ty-consent label{display:flex;gap:10px;align-items:flex-start;margin:0 0 10px;cursor:pointer}' +
        '#ty-consent input[type=checkbox]{width:18px;height:18px;margin-top:3px;accent-color:#14b8a6}' +
        '#ty-consent .tyc-muted{color:#94a3b8;font-size:14px}' +
        '#ty-consent button:focus-visible,#ty-consent a:focus-visible,#ty-consent input:focus-visible{outline:3px solid #5eead4;outline-offset:2px}' +
        '@media (max-width:640px){#ty-consent .tyc-btns{width:100%;display:grid;grid-template-columns:1fr 1fr}#ty-consent .tyc-btns .tyc-link{grid-column:1/-1;order:3}#ty-consent .tyc-prefs .tyc-btns{grid-template-columns:1fr}}';

    function el(html) {
        var d = document.createElement('div');
        d.innerHTML = html;
        return d.firstChild;
    }

    function hideBanner() {
        var b = document.getElementById('ty-consent');
        if (b) b.parentNode.removeChild(b);
    }

    function choose(c) {
        apply(save(c));
        hideBanner();
    }

    function showBanner(openPrefs) {
        hideBanner();
        if (!document.getElementById('ty-consent-css')) {
            var st = document.createElement('style');
            st.id = 'ty-consent-css';
            st.textContent = CSS;
            document.head.appendChild(st);
        }
        var cur = read() || { a: false, m: false };
        var b = el(
            '<div id="ty-consent" role="dialog" aria-live="polite" aria-label="Scelta sui cookie">' +
            '<div class="tyc-in">' +
            '<p>Usiamo cookie tecnici e, solo con il tuo consenso, cookie di statistica (Google Analytics) e di marketing (Google Ads). ' +
            'Puoi cambiare idea in ogni momento da «Gestisci cookie» in fondo alla pagina. <a href="/cookie-policy.html">Cookie policy</a></p>' +
            '<div class="tyc-btns">' +
            '<button type="button" class="tyc-link" data-tyc="prefs" aria-expanded="false">Personalizza</button>' +
            '<button type="button" class="tyc-main" data-tyc="reject">Rifiuta</button>' +
            '<button type="button" class="tyc-main" data-tyc="accept">Accetta</button>' +
            '</div>' +
            '<div class="tyc-prefs">' +
            '<label><input type="checkbox" checked disabled> <span><strong>Tecnici</strong> <span class="tyc-muted">— sempre attivi: ricordano questa scelta.</span></span></label>' +
            '<label><input type="checkbox" id="tyc-a"' + (cur.a ? ' checked' : '') + '> <span><strong>Statistiche</strong> <span class="tyc-muted">— Google Analytics: quante persone visitano il sito e quali pagine leggono, in forma aggregata.</span></span></label>' +
            '<label><input type="checkbox" id="tyc-m"' + (cur.m ? ' checked' : '') + '> <span><strong>Marketing</strong> <span class="tyc-muted">— Google Ads: misurano se le nostre campagne portano richieste di contatto.</span></span></label>' +
            '<div class="tyc-btns"><button type="button" class="tyc-main" data-tyc="save">Salva le scelte</button></div>' +
            '</div>' +
            '</div></div>'
        );
        b.addEventListener('click', function (e) {
            var t = e.target.closest ? e.target.closest('[data-tyc]') : null;
            if (!t) return;
            var act = t.getAttribute('data-tyc');
            if (act === 'accept') choose({ a: true, m: true });
            else if (act === 'reject') choose({ a: false, m: false });
            else if (act === 'save') choose({ a: document.getElementById('tyc-a').checked, m: document.getElementById('tyc-m').checked });
            else if (act === 'prefs') {
                var open = b.classList.toggle('tyc-open');
                t.setAttribute('aria-expanded', open ? 'true' : 'false');
            }
        });
        document.body.appendChild(b);
        if (openPrefs) {
            b.classList.add('tyc-open');
            b.querySelector('[data-tyc="prefs"]').setAttribute('aria-expanded', 'true');
        }
    }

    window.tyOpenCookieSettings = function () { showBanner(true); };

    /* "Gestisci cookie": accanto a ogni link alla cookie policy nel piè di pagina,
       e su ogni elemento con data-cookie-settings. */
    function bindSettingsLinks() {
        var links = document.querySelectorAll('footer a[href$="cookie-policy.html"]');
        Array.prototype.forEach.call(links, function (a) {
            if (a.getAttribute('data-tyc-done')) return;
            a.setAttribute('data-tyc-done', '1');
            var link = a.cloneNode(false);
            link.removeAttribute('data-tyc-done');
            link.setAttribute('href', '#');
            link.setAttribute('data-cookie-settings', '');
            link.textContent = 'Gestisci cookie';
            var holder = a.parentNode;
            if (holder && holder.tagName === 'LI') {
                var li = holder.cloneNode(false);
                li.appendChild(link);
                holder.parentNode.insertBefore(li, holder.nextSibling);
            } else {
                a.parentNode.insertBefore(link, a.nextSibling);
            }
        });
        document.addEventListener('click', function (e) {
            var t = e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
            if (!t) return;
            e.preventDefault();
            window.tyOpenCookieSettings();
        });
    }

    function init() {
        bindSettingsLinks();
        var c = read();
        if (c) apply(c);
        else showBanner(false);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
