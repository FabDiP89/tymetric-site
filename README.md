# Tymetric Landing Page

Sito web ufficiale per Tymetric - Software di pianificazione turni con AI per il settore sanitario.

## Informazioni Generali

- **URL Produzione**: https://tymetric.com / https://www.tymetric.com
- **URL GitHub Pages**: https://fabdip89.github.io/tymetric-site/
- **Repository GitHub**: https://github.com/FabDiP89/tymetric-site
- **Hosting**: GitHub Pages
- **DNS**: Register.it
- **Analytics**: Google Analytics GA4 (G-QFYFCYZ4Z6)

## Stack Tecnologico

- **HTML5** + **Tailwind CSS** (compilato in `css/styles.css`)
- **JavaScript Vanilla** (carousel, mobile menu, smooth scroll, cookie banner)
- **Font**: Google Fonts - Inter
- **Immagini**: WebP (ottimizzate da PNG)
- **Video**: MP4 (convertito da MOV)
- **Colori Brand**:
  - Primary: `#08979c` (cyan)
  - Primary Light: `#52d6cd`
  - Primary Dark: `#006d75`

## Struttura File

```
tymetric-site/
├── index.html                          # Pagina principale
├── blog.html                           # Lista articoli blog
├── cookie-policy.html                  # Cookie Policy
├── privacy-policy.html                 # Privacy Policy
├── CNAME                               # Configurazione dominio custom
├── favicon.png                         # Favicon/Logo
├── robots.txt                          # Direttive crawler
├── sitemap.xml                         # Sitemap XML
│
├── css/
│   └── styles.css                      # Tailwind CSS compilato
│
├── blog/
│   ├── assenteismo-stress-turnazione.html
│   ├── colpa-di-organizzazione-gestione-turni.html
│   ├── costo-nascosto-incompetenza-credentialing.html
│   ├── ottimizzazione-algoritmica-roi-voi.html
│   ├── stress-lavoro-correlato-cassazione.html
│   ├── turni-massacranti-responsabilita-medica.html
│   └── immagini/                       # Immagini articoli (WebP)
│
├── im1.webp - im5.webp                 # Screenshot prodotto
├── carosello1.webp - carosello7.webp   # Immagini carousel
├── smartphone.webp                     # Mobile app preview
└── demo-tymetric.mp4                   # Video demo
```

## SEO e Analytics

### Implementato
- Google Analytics GA4 su tutte le pagine
- Schema.org Organization (index.html)
- Schema.org FAQPage (index.html)
- Schema.org BreadcrumbList (articoli blog)
- Schema.org TechArticle (articoli blog)
- Canonical URLs su tutte le pagine
- Open Graph tags
- sitemap.xml
- robots.txt
- Meta description ottimizzate

### Google Analytics
- **ID**: G-QFYFCYZ4Z6
- **Dashboard**: https://analytics.google.com
- Tracciamento attivo su tutte le 10 pagine HTML

## Sezioni del Sito

### Homepage (index.html)
1. **Navigation** - Menu fisso con logo e link
2. **Hero Section** - Titolo, CTA, statistiche
3. **Video Demo** - Demo prodotto in autoplay
4. **Features** - 6 funzionalità principali
5. **Solutions** - Focus Healthcare
6. **Mobile App** - Showcase interfaccia mobile
7. **Department Overview** - Panoramica modulo schedulazione
8. **Screenshots Carousel** - 7 immagini con navigazione
9. **Benefits** - Statistiche chiave
10. **Contact Form** - Form richiesta demo (FormSubmit)
11. **Footer** - Link, contatti, Trust Badges
12. **Sticky CTA Mobile** - Bottone fisso su mobile
13. **Cookie Banner** - Consenso cookie

### Blog
- 6 articoli tecnici sulla gestione turni sanitari
- Immagini WebP ottimizzate
- Schema.org TechArticle per SEO
- Breadcrumb navigation

## Form Contatti

Il form di contatto utilizza **Google Apps Script** per gestire le richieste in modo autonomo, senza dipendenze da servizi esterni.

### Configurazione

| Componente | Dettaglio |
|------------|-----------|
| **Servizio** | Google Apps Script (custom) |
| **Foglio Google** | [Richieste Tymetric](https://docs.google.com/spreadsheets/d/1398ShoHMWRCfM3-FXkZic0P_D7NIVwvvv9eXkvlhKPw/edit?gid=0#gid=0) |
| **Email Notifiche** | dipriamo.fabrizio@gdpanalytics.com |
| **Endpoint** | `https://script.google.com/macros/s/AKfycbzpx1FCJFgR7nd1_ZtCvjPnlGeiBWN1P7wF9tRAoPocJTidV-C1Q0KpiVw9GRIOWpzc/exec` |

### Come Funziona

1. L'utente compila il form su tymetric.com
2. I dati vengono inviati via POST al Google Apps Script
3. Lo script salva i dati nel foglio Google (storico completo)
4. Viene inviata un'email di notifica automatica
5. L'utente vede un messaggio di conferma

### Campi Tracciati

- Data e ora
- Nome e Cognome
- Email
- Telefono (opzionale)
- Settore
- Messaggio (opzionale)

### Modifica dello Script

Per modificare lo script (es. cambiare email destinatario):

1. Apri il [Foglio Google](https://docs.google.com/spreadsheets/d/1398ShoHMWRCfM3-FXkZic0P_D7NIVwvvv9eXkvlhKPw/edit)
2. Vai su **Estensioni** → **Apps Script**
3. Modifica il codice
4. Clicca **Deploy** → **Gestisci deployment** → **Modifica** → **Nuova versione**

> **Nota**: Dopo ogni modifica allo script, è necessario creare un nuovo deployment per renderla attiva.

## Performance

- Tailwind CSS compilato (non CDN)
- Immagini WebP (70-80% più leggere di PNG)
- Video MP4 (compatibilità universale)
- Lazy loading su immagini non critiche
- Font preconnect ottimizzato
- Dimensioni esplicite su immagini (no CLS)

## Trust Badges (Footer)

- GDPR Compliant
- Made in Italy
- Conforme CCNL Sanità

## Comandi Git

```bash
# Verificare stato
git status

# Aggiungere modifiche
git add .

# Commit
git commit -m "Descrizione modifica"

# Push
git push
```

## Configurazione DNS (Register.it)

### Record A
```
Host: tymetric.com (o @)
Valori: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
```

### Record CNAME
```
Host: www.tymetric.com
Valore: fabdip89.github.io.
```

## Contatti

- **Email pubblica**: info@tymetric.com
- **Email form**: dipriamo.fabrizio@gdpanalytics.com
- **Azienda**: GDP Analytics s.r.l.
- **P.IVA**: 11975840015
- **Sede**: Corso Unione Sovietica 341, Torino (TO)

---

**Ultima modifica**: 2025-12-15
**Versione**: 2.1
**Maintainer**: Fabrizio Di Priamo
