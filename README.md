# Tymetric Landing Page

Sito web ufficiale per Tymetric - Software di pianificazione turni con AI per healthcare e corporate.

## 📋 Informazioni Generali

- **URL Produzione**: https://tymetric.com / https://www.tymetric.com
- **URL GitHub Pages**: https://fabdip89.github.io/tymetric-site/
- **Repository GitHub**: https://github.com/FabDiP89/tymetric-site
- **Hosting**: GitHub Pages
- **DNS**: Register.it

## 🏗️ Stack Tecnologico

- **HTML5** + **Tailwind CSS** (via CDN)
- **JavaScript Vanilla** (carousel, mobile menu, smooth scroll)
- **Font**: Google Fonts - Inter
- **Colori Brand**:
  - Primary: `#08979c` (cyan)
  - Primary Light: `#52d6cd`
  - Primary Dark: `#006d75`

## 📁 Struttura File

```
sito/
├── index.html                          # Pagina principale
├── CNAME                               # Configurazione dominio custom
├── README.md                           # Questo file
├── im1.png                            # Dashboard (hero section)
├── im2.png                            # Gestione Operatori
├── im3.png                            # Assegnazione Ruoli
├── im4.png                            # Gestione Unità Operative
├── smartphone.png                      # Mobile app preview
├── Screenshot 2025-11-05 alle 09.23.29.png
├── Screenshot 2025-11-05 alle 09.27.45.png
├── Screenshot 2025-11-05 alle 09.39.35.png
├── Screenshot 2025-11-05 alle 12.00.10.png
└── Registrazione schermo 2025-11-05 alle 16.59.29.mov  # Video demo
```

## 🚀 Come Caricare Modifiche su GitHub

### 1. Modifiche Locali
Apri e modifica `index.html` con il tuo editor preferito.

### 2. Verificare Stato Git
```bash
git status
```

### 3. Aggiungere File Modificati
```bash
# Aggiungere un file specifico
git add index.html

# Oppure aggiungere tutti i file modificati
git add .
```

### 4. Creare Commit
```bash
git commit -m "Descrizione chiara della modifica

Dettagli aggiuntivi se necessario

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 5. Push su GitHub
```bash
git push
```

### 6. Verifica Deployment
- Vai su: https://github.com/FabDiP89/tymetric-site/actions
- Aspetta il check verde ✓ (1-2 minuti)
- Il sito si aggiornerà automaticamente

## 📧 Form Contatti - FormSubmit

### Configurazione Attuale
- **Servizio**: FormSubmit.co (gratuito)
- **Email Destinazione**: dipriamo.fabrizio@gdpanalytics.com
- **Oggetto Email**: "Nuova Richiesta Demo Tymetric"
- **Template**: Tabella

### Prima Compilazione
**IMPORTANTE**: Alla prima compilazione del form, riceverai un'email da FormSubmit con oggetto "Confirm Form Submission". Devi cliccare sul link di conferma per attivare il servizio.

### Cambiare Email Destinazione
Nel file `index.html`, cerca:
```html
<form action="https://formsubmit.co/NUOVA-EMAIL@esempio.com" method="POST">
```

Dopo la modifica, ricorda che dovrai riconfermare la nuova email alla prima compilazione.

## 🌐 Configurazione DNS (Register.it)

### Record A (per tymetric.com)
```
Host: tymetric.com (o @)
Tipo: A
Valori:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
TTL: 900
```

### Record CNAME (per www)
```
Host: www.tymetric.com
Tipo: CNAME
Valore: fabdip89.github.io.
TTL: 900
```

### GitHub Pages Custom Domain
1. Vai su: https://github.com/FabDiP89/tymetric-site/settings/pages
2. In "Custom domain" scrivi: `tymetric.com`
3. Attiva "Enforce HTTPS" ✓

## 🎨 Sezioni del Sito

1. **Hero Section** - Presentazione principale con im1.png
2. **Features** - 6 funzionalità principali con icone
3. **Solutions** - Healthcare e Corporate
4. **Mobile App** - Showcase con smartphone.png
5. **Department Overview** - Video demo modulo schedulazione
6. **Screenshots Carousel** - 7 immagini prodotto con navigazione
7. **Benefits** - 4 statistiche chiave (90%, 100%, +85%, ROI)
8. **Contact Form** - Form richiesta demo con FormSubmit
9. **Footer** - Link e contatti

## 🎠 Carousel Screenshots

### Funzionalità
- Auto-play ogni 5 secondi
- Navigazione con frecce sinistra/destra
- Indicatori cliccabili (7 pallini)
- Transizioni fluide
- Reset auto-play all'interazione manuale

### Modificare Immagini Carousel
Nel file `index.html`, cerca la sezione `<!-- Screenshots Section -->` e modifica i tag `<img src="...">`.

### Cambiare Velocità Auto-play
Cerca nel codice JavaScript:
```javascript
let autoplayInterval = setInterval(nextSlide, 5000); // 5000 = 5 secondi
```

## 🔧 Modifiche Comuni

### Cambiare Colori Brand
Nel `<head>` cerca:
```javascript
colors: {
    primary: '#08979c',        // Colore principale
    'primary-light': '#52d6cd', // Colore chiaro
    'primary-dark': '#006d75',  // Colore scuro
}
```

### Aggiungere/Rimuovere Feature
Cerca la sezione `<!-- Features Section -->` e duplica/rimuovi un blocco:
```html
<div class="feature-card bg-white p-8 rounded-xl shadow-md">
    <!-- Contenuto feature -->
</div>
```

### Modificare Testi
Tutti i testi sono direttamente nell'HTML. Cerca la sezione specifica e modifica il contenuto tra i tag.

## 📱 Responsive Design

Il sito è completamente responsive grazie a Tailwind CSS:
- **Mobile**: Layout a colonna singola
- **Tablet** (md): 768px+ - Layout a 2 colonne
- **Desktop** (lg): 1024px+ - Layout a 3 colonne

Classi Tailwind responsive: `md:`, `lg:`, `xl:`

## ⚡ Performance

- Tailwind CSS caricato via CDN
- Font Google ottimizzato con `preconnect`
- Immagini ottimizzate (PNG)
- Video con poster per caricamento lazy
- Smooth scroll nativo CSS

## 🐛 Troubleshooting

### Il sito non si aggiorna dopo push
1. Verifica su GitHub Actions: https://github.com/FabDiP89/tymetric-site/actions
2. Aspetta 2-3 minuti per il deployment
3. Svuota cache browser (Ctrl+Shift+R o Cmd+Shift+R)

### Video non funziona
- Il video è in formato .mov (QuickTime)
- Alcuni browser potrebbero non supportarlo
- Considera conversione in .mp4 per compatibilità universale

### Form non invia email
1. Verifica di aver confermato l'email FormSubmit
2. Controlla spam/promozioni nella tua casella email
3. Verifica l'attributo `action` nel form tag

### Carousel non scorre
1. Verifica che il JavaScript sia presente prima di `</body>`
2. Controlla la console del browser (F12) per errori
3. Verifica che `totalSlides` corrisponda al numero di slide

## 📊 SEO e Indicizzazione

### Meta Tags Attuali
- Title: "Tymetric - AI-Powered Shift Scheduling"
- Description: SEO-friendly
- Language: `it`
- Viewport: Responsive

### Da Fare (Opzionale)
- [ ] Registrare su Google Search Console
- [ ] Aggiungere sitemap.xml
- [ ] Aggiungere robots.txt
- [ ] Implementare Open Graph tags per social sharing
- [ ] Aggiungere Structured Data (JSON-LD)

### Google Search Console
1. Vai su: https://search.google.com/search-console
2. Aggiungi proprietà: `tymetric.com`
3. Verifica tramite file HTML o DNS TXT record

## 🔒 Sicurezza

- ✅ HTTPS forzato (Enforce HTTPS attivo)
- ✅ Certificato SSL automatico GitHub Pages
- ✅ Form submission tramite POST
- ✅ No dati sensibili nel repository

## 📞 Contatti Email nel Sito

- **Email visibile**: info@tymetric.com (nel footer)
- **Email form**: dipriamo.fabrizio@gdpanalytics.com (FormSubmit backend)

## 🎯 Checklist Prima di Ogni Modifica

- [ ] Testa le modifiche localmente (apri index.html nel browser)
- [ ] Verifica responsive (inspeziona > toggle device toolbar)
- [ ] Controlla che i link funzionino
- [ ] Commit con messaggio descrittivo
- [ ] Push su GitHub
- [ ] Verifica deployment su Actions
- [ ] Testa su tymetric.com dopo deployment

## 💡 Tips Utili

1. **Preview locale**: Apri `index.html` direttamente nel browser per vedere le modifiche prima del push
2. **Git stash**: Usa `git stash` per salvare modifiche temporanee senza commit
3. **Git log**: Usa `git log --oneline` per vedere cronologia commit
4. **Rollback**: `git revert <commit-hash>` per annullare un commit specifico
5. **Branch**: Considera di usare branch per modifiche importanti: `git checkout -b nuova-feature`

## 🆘 Supporto

Per assistenza tecnica con Claude Code:
- Condividi questo README nella chat
- Specifica quale sezione vuoi modificare
- Claude avrà tutte le informazioni necessarie

---

**Ultima modifica**: 2025-11-05
**Versione**: 1.0
**Maintainer**: Fabrizio Di Priamo
