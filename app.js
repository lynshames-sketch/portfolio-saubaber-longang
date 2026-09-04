/* ==========================================================================
   APP JAVASCRIPT LOGIC - PORTFOLIO DR. SAUBABER LONGANG GAMO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStitchDock();
  initQRCodes();
  initQRTabs();
  initCopyButtons();
  initVCardDownload();
  initPrintCard();
  initSimulator();
  initLightbox();
  initMobileNav();
  initScrollSpy();
  initWorldMap();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  htmlEl.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeToggle, currentTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(themeToggle, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    btn.setAttribute('title', 'Passer en mode clair');
  } else {
    btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    btn.setAttribute('title', 'Passer en mode sombre');
  }
}

/* ==========================================================================
   2. DYNAMIC QR CODES INITIALIZATION (VIA QRCODEJS)
   ========================================================================== */
function initQRCodes() {
  const linkedinUrl = 'https://www.linkedin.com/in/saubaber-longang-18416216a';
  const githubUrl = 'https://github.com/lynshames-sketch/portfolio-saubaber-longang';
  
  // URL du Master Portfolio (utilise l'URL active si HTTP/HTTPS ou le lien de déploiement GitHub)
  const isHosted = window.location.href.startsWith('http');
  const portfolioUrl = isHosted ? window.location.href.split('#')[0] : 'https://github.com/lynshames-sketch/portfolio-saubaber-longang';

  // Mise à jour de l'aperçu textuel et des boutons
  const portfolioUrlPreview = document.getElementById('portfolioUrlPreview');
  if (portfolioUrlPreview && isHosted) {
    portfolioUrlPreview.textContent = window.location.host + window.location.pathname;
  }

  const portfolioCopyBtn = document.getElementById('portfolioCopyBtn');
  if (portfolioCopyBtn) {
    portfolioCopyBtn.setAttribute('data-url', portfolioUrl);
  }

  if (typeof QRCode !== 'undefined') {
    // 1. Mini QR sur la carte de visite physique -> Pointeur vers le MASTER PORTFOLIO
    const cardMiniQr = document.getElementById('cardMiniQr');
    if (cardMiniQr) {
      cardMiniQr.innerHTML = '';
      new QRCode(cardMiniQr, {
        text: portfolioUrl,
        width: 54,
        height: 54,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    // 2. Master Portfolio QR Panel
    const portfolioQrCanvas = document.getElementById('portfolioQrCanvas');
    if (portfolioQrCanvas) {
      portfolioQrCanvas.innerHTML = '';
      new QRCode(portfolioQrCanvas, {
        text: portfolioUrl,
        width: 130,
        height: 130,
        colorDark: "#0284c7",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    // 3. Dépôt GitHub QR Panel
    const githubQrCanvas = document.getElementById('githubQrCanvas');
    if (githubQrCanvas) {
      githubQrCanvas.innerHTML = '';
      new QRCode(githubQrCanvas, {
        text: githubUrl,
        width: 130,
        height: 130,
        colorDark: "#1e293b",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    // 4. LinkedIn QR Panel
    const linkedinQrCanvas = document.getElementById('linkedinQrCanvas');
    if (linkedinQrCanvas) {
      linkedinQrCanvas.innerHTML = '';
      new QRCode(linkedinQrCanvas, {
        text: linkedinUrl,
        width: 130,
        height: 130,
        colorDark: "#0a66c2",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
}

/* ==========================================================================
   3. QR CODE TABS
   ========================================================================== */
function initQRTabs() {
  const tabs = document.querySelectorAll('.qr-tab-btn');
  const panels = document.querySelectorAll('.qr-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. COPY LINK BUTTONS
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-link-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let url = btn.getAttribute('data-url');
      if (url === 'window.location.href' || url === 'portfolio') {
        url = window.location.href.split('#')[0];
      }

      navigator.clipboard.writeText(url).then(() => {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copié !';
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-outline');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-outline');
        }, 2000);
      }).catch(err => {
        console.error('Erreur de copie:', err);
      });
    });
  });
}

/* ==========================================================================
   5. VCARD (.VCF) DIRECT DOWNLOAD
   ========================================================================== */
function initVCardDownload() {
  const downloadBtn = document.getElementById('downloadVCardBtn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Longang Gamo;Saubaber;;Dr.;',
      'FN:Dr. Saubaber Longang Gamo',
      'ORG:ENAP Gatineau / CERME',
      'TITLE:Économiste & Scientifique des Données (Inférence Causale & GAR)',
      'TEL;TYPE=CELL,VOICE:(819) 329-7470',
      'EMAIL;TYPE=INTERNET,HOME:lynshames@gmail.com',
      'EMAIL;TYPE=INTERNET,WORK:saubaber.longanggamo@enap.ca',
      'ADR;TYPE=HOME:;;Gatineau;Québec;;;Canada',
      'URL;TYPE=LinkedIn:https://www.linkedin.com/in/saubaber-longang-18416216a',
      'NOTE:Expert en Inférence Causale, Modélisation Économétrique (Causal Forest, SHAP, DiD), Tableaux de bord Power BI et Gestion Axée sur les Résultats (GAR).',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Dr_Saubaber_Longang_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

/* ==========================================================================
   6. PRINT BUSINESS CARD
   ========================================================================== */
function initPrintCard() {
  const printBtn = document.getElementById('printCardBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   7. INTERACTIVE ECONOMETRIC SIMULATOR (PROJET HCE AGRICOLE)
   ========================================================================== */
function initSimulator() {
  const selRegion = document.getElementById('simRegion');
  const selIrrigation = document.getElementById('simIrrigation');
  const selSubvention = document.getElementById('simSubvention');

  const outVal = document.getElementById('simOutputValue');
  const waterfall = document.getElementById('simWaterfall');
  const badge = document.getElementById('simRecommendationBadge');

  if (!selRegion || !selIrrigation || !selSubvention) return;

  function recalculate() {
    const region = selRegion.value;
    const irrigation = selIrrigation.value === 'oui';
    const subvention = selSubvention.value === 'oui';

    let baseVal = 5939;
    let subEffect = subvention ? 2867 : 0;
    let irriEffect = irrigation ? 2537 : 0;
    let regEffect = 0;
    let costEffect = -464;
    let total = 0;
    let recommendation = '';
    let badgeClass = 'prio-1';

    // Exact empirical figures from Rapport D.docx
    if (subvention && irrigation) {
      if (region === 'centre') {
        total = 12825;
        regEffect = total - (baseVal + subEffect + irriEffect + costEffect);
        recommendation = '<i class="fa-solid fa-circle-check"></i> Priorité I : Éligibilité Optimale Recommandée (ROI Maximal +74%)';
        badgeClass = 'prio-1';
      } else if (region === 'nord') {
        total = 10717;
        regEffect = total - (baseVal + subEffect + irriEffect + costEffect);
        recommendation = '<i class="fa-solid fa-circle-check"></i> Priorité II : Impact Élevé Recommandé';
        badgeClass = 'prio-2';
      } else { // sud
        total = 10580;
        regEffect = -249;
        recommendation = '<i class="fa-solid fa-circle-check"></i> Priorité II : Impact Élevé Recommandé';
        badgeClass = 'prio-2';
      }
    } else if (subvention && !irrigation) {
      if (region === 'nord') {
        total = 903;
        regEffect = -5036;
      } else if (region === 'centre') {
        total = 1844;
        regEffect = -4095;
      } else {
        total = 1250;
        regEffect = -4689;
      }
      recommendation = '<i class="fa-solid fa-triangle-exclamation"></i> Exclusion Subvention Directe : Réorienter vers Crédit Irrigation ou PPP';
      badgeClass = 'prio-exclude';
    } else { // Sans subvention
      if (irrigation) {
        total = region === 'centre' ? 9500 : 8200;
        recommendation = '<i class="fa-solid fa-info-circle"></i> Exploitation Hors Programme (Performante sous Irrigation)';
        badgeClass = 'prio-2';
      } else {
        total = region === 'centre' ? 3200 : 1500;
        recommendation = '<i class="fa-solid fa-info-circle"></i> Exploitation Témoin non irriguée';
        badgeClass = 'prio-exclude';
      }
    }

    // Format display
    outVal.innerText = `${total.toLocaleString('fr-FR')} €`;

    waterfall.innerHTML = `
      <div class="waterfall-row"><span>Revenu de Base :</span> <strong>${baseVal.toLocaleString('fr-FR')} €</strong></div>
      <div class="waterfall-row"><span>Effet Subvention :</span> <strong class="${subEffect > 0 ? 'text-success' : ''}">${subEffect >= 0 ? '+' : ''}${subEffect.toLocaleString('fr-FR')} €</strong></div>
      <div class="waterfall-row"><span>Effet Irrigation :</span> <strong class="${irriEffect > 0 ? 'text-success' : 'text-danger'}">${irriEffect >= 0 ? '+' : ''}${irriEffect.toLocaleString('fr-FR')} €</strong></div>
      <div class="waterfall-row"><span>Effet Régional & Coûts :</span> <strong class="${(regEffect + costEffect) >= 0 ? 'text-success' : 'text-danger'}">${(regEffect + costEffect) >= 0 ? '+' : ''}${(regEffect + costEffect).toLocaleString('fr-FR')} €</strong></div>
    `;

    badge.className = `sim-badge ${badgeClass}`;
    badge.innerHTML = recommendation;
  }

  selRegion.addEventListener('change', recalculate);
  selIrrigation.addEventListener('change', recalculate);
  selSubvention.addEventListener('change', recalculate);
}

/* ==========================================================================
   8. LIGHTBOX GALLERY
   ========================================================================== */
function initLightbox() {
  const cards = document.querySelectorAll('.chart-card');
  const modal = document.getElementById('lightboxModal');
  const overlay = document.getElementById('lightboxOverlay');
  const closeBtn = document.getElementById('lightboxClose');
  const imgEl = document.getElementById('lightboxImg');
  const capEl = document.getElementById('lightboxCaption');

  if (!modal || !imgEl) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      imgEl.src = src;
      capEl.innerText = title;
      modal.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const btn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (btn && navLinks) {
    btn.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--bg-secondary)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-subtle)';
      }
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   10. SCROLL SPY FOR ACTIVE NAVIGATION LINKS
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   11. GOOGLE STITCH MULTI-VERSE DOCK & LIVE VIEWPORT ENGINE
   ========================================================================== */
const stitchDashboards = {
  mlops: {
    id: "mlops",
    num: "01",
    title: "Product-Oriented & MLOps Suite",
    subtitle: "Architecture Microservices FastAPI • Inférence Faible Latence (p95 ≤ 4.1 ms) • Détection de Dérive PSI",
    badge: "Tech & Production SaaS",
    color: "#49c5b6",
    ghPagesUrl: "https://lynshames-sketch.github.io/product-mlops-dashboard/",
    localUrl: "http://localhost:8087/",
    repoUrl: "https://github.com/lynshames-sketch/product-mlops-dashboard",
    icon: "fa-solid fa-server",
    stack: ["FastAPI", "Pydantic", "Docker", "KNN Distance", "Cosine Similarity", "PSI Drift"],
    features: [
      "Inférence temps réel avec métriques SLA percentiles (p50, p95, p99)",
      "Moteur de recommandation vectorielle hybride (Cosinus + Régression logistique)",
      "Pipeline d'auto-cleaning stochastique par K-plus proches voisins (KNN)",
      "Surveillance de dérive distributionnelle par Population Stability Index (PSI = 0.042)"
    ],
    agentLogs: [
      "[Antigravity Agent] Initialisation du microservice FastAPI (Worker pool actif)...",
      "[Antigravity Agent] Benchmarking des percentiles de latence : p50=2.4ms, p95=4.1ms, p99=6.8ms (SLA garanti ≤ 10ms)",
      "[Antigravity Agent] Exécution du pipeline d'imputation stochastique KNN sur les micro-données...",
      "[Antigravity Agent] Calcul du Population Stability Index : PSI = 0.042 < 0.10 (Stabilité distributionnelle validée)."
    ]
  },
  causal: {
    id: "causal",
    num: "02",
    title: "Observatoire des Effets Causaux & Analyse SHAP",
    subtitle: "Différences de Différences (DiD / TWFE) • Modified Causal Forest (MCF) • 12 Scénarios SHAP",
    badge: "Économie Causale & Politiques Publiques",
    color: "#10b981",
    ghPagesUrl: "https://lynshames-sketch.github.io/storyteller-impact-dashboard/",
    localUrl: "http://localhost:8088/",
    repoUrl: "https://github.com/lynshames-sketch/storyteller-impact-dashboard",
    icon: "fa-solid fa-wheat-awn",
    stack: ["DiD (TWFE)", "Causal Forest (grf)", "Valeurs SHAP", "R / Stata", "KaTeX", "Panel MINADER"],
    features: [
      "Validation empirique de l'hypothèse de tendances parallèles (F = 0.89, p = 0.42 > 0.05)",
      "Quantification de l'effet moyen de traitement (ATT = +7 358 € / an)",
      "Décomposition microéconomique SHAP interactive des 12 scénarios réels d'exploitations",
      "Identification de l'irrigation comme condition sine qua non de rentabilité publique"
    ],
    agentLogs: [
      "[Antigravity Agent] Chargement du panel microéconomique MINADER & LSMS-ISA (N = 4 850 exploitations)...",
      "[Antigravity Agent] Estimation du modèle DiD TWFE à effets fixes bidirectionnels (R² = 0.884)...",
      "[Antigravity Agent] Déploiement du Modified Causal Forest (grf) avec partitionnement honnête...",
      "[Antigravity Agent] Extraction locale des attributions SHAP : Scénario optimal Centre = 12 825 € (+74%)."
    ]
  },
  coreml: {
    id: "coreml",
    num: "03",
    title: "Laboratoire Core ML & Espace Latent (White Lab)",
    subtitle: "Topologie Manifold 2D • Perte Contrastive InfoNCE • Filtrage d'Entropie Anti-Hallucination",
    badge: "R&D • Deep Learning",
    color: "#4f46e5",
    ghPagesUrl: "https://lynshames-sketch.github.io/Clustering_dashboard/",
    localUrl: "http://localhost:8086/",
    repoUrl: "https://github.com/lynshames-sketch/Clustering_dashboard",
    icon: "fa-solid fa-atom",
    stack: ["PyTorch 2.4", "GMM", "k-means", "InfoNCE Loss", "Shannon Entropy", "White Lab UI"],
    features: [
      "Projection bidimensionnelle des représentations denses R⁷⁶⁸ (PCA / UMAP manifold)",
      "Partitionnement stochastique par modèles de mélanges gaussiens (GMM) et k-means",
      "Évaluation géométrique : Coefficient de Silhouette (s = 0.724) et Davies-Bouldin (DB = 0.648)",
      "Rejet strict des hallucinations LLM par seuillage d'entropie prédictive de Shannon"
    ],
    agentLogs: [
      "[Antigravity Agent] Compilation PyTorch 2.4 des tenseurs d'embeddings denses (Dim = 768)...",
      "[Antigravity Agent] Minimisation de la perte contrastive InfoNCE avec paramètre de température tau=0.07...",
      "[Antigravity Agent] Calcul spectral des coefficients de Silhouette et de séparation Davies-Bouldin...",
      "[Antigravity Agent] Filtrage d'incertitude épistémique : taux d'hallucinations résiduelles = 3.2%."
    ]
  },
  prudential: {
    id: "prudential",
    num: "04",
    title: "Terminal de Risque Bancaire & Surveillance Prudentielle",
    subtitle: "IFRS 9 ECL Staging • Bâle IV IRB Vasicek • Graphe Topologique AML de Détection de Schtroumpfage",
    badge: "Finance & Régulation Bancaire",
    color: "#5bc0be",
    ghPagesUrl: "https://lynshames-sketch.github.io/prudential-dashboard/",
    localUrl: "http://localhost:8085/",
    repoUrl: "https://github.com/lynshames-sketch/prudential-dashboard",
    icon: "fa-solid fa-building-columns",
    stack: ["IFRS 9 ECL", "Bâle IV IRB", "Modèle de Vasicek", "Graphe AML", "KaTeX", "Normes BCE/BEAC"],
    features: [
      "Moteur prudentiel réglementaire IFRS 9 (Provisionnement ECL 12 mois vs Lifetime)",
      "Modélisation asymptotique du capital réglementaire de Vasicek (Bâle IV IRB)",
      "Graphe de réseau transactionnel temps réel détectant les réseaux de schtroumpfage (Smurfing)",
      "Génération automatisée des rapports de déclaration de soupçon (SAR / Tracfin)"
    ],
    agentLogs: [
      "[Antigravity Agent] Initialisation du moteur prudentiel Bâle IV / IFRS 9 (Normes BCE & BEAC)...",
      "[Antigravity Agent] Exécution du modèle de Vasicek à facteur unique : calcul des RWA et ratio CET1...",
      "[Antigravity Agent] Analyse topologique du graphe de flux : détection de structuration suspecte (38 000 €)...",
      "[Antigravity Agent] Synthèse d'alerte réglementaire SAR générée pour transmission à la cellule Tracfin."
    ]
  }
};

let currentStitchId = "causal"; // Default on Dr. Longang's signature Causal Econometrics
let currentViewportMode = "desktop"; // "desktop", "laptop", "mobile"
let useLocalSource = false; // toggle between GitHub Pages and Local ports

function initStitchDock() {
  const tabs = document.querySelectorAll('.stitch-tab-card');
  const iframe = document.getElementById('stitchIframe');
  const urlDisplay = document.getElementById('stitchUrlText');
  const openExternalBtn = document.getElementById('stitchOpenExternal');
  const openExternalBottomBtn = document.getElementById('stitchOpenExternalBottom');
  const reloadBtn = document.getElementById('stitchReloadBtn');
  const sourceToggleBtn = document.getElementById('stitchSourceToggle');
  const terminalScreen = document.getElementById('stitchTerminalScreen');
  const specsFeatures = document.getElementById('stitchSpecsFeatures');
  const specsStack = document.getElementById('stitchSpecsStack');
  const specsRepoLink = document.getElementById('stitchSpecsRepo');
  const viewBtns = document.querySelectorAll('.stitch-view-btn');
  const viewportFrame = document.getElementById('stitchViewportFrame');

  if (!tabs.length || !iframe) return;

  function updateDock(dashId) {
    currentStitchId = dashId;
    const data = stitchDashboards[dashId];
    if (!data) return;

    // 1. Update Tabs
    tabs.forEach(tab => {
      if (tab.getAttribute('data-id') === dashId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // 2. Compute URL
    const targetUrl = useLocalSource ? data.localUrl : data.ghPagesUrl;
    iframe.src = targetUrl;
    if (urlDisplay) urlDisplay.textContent = targetUrl;
    if (openExternalBtn) {
      openExternalBtn.href = targetUrl;
      openExternalBtn.title = `Ouvrir ${data.title} dans un nouvel onglet`;
    }
    if (openExternalBottomBtn) {
      openExternalBottomBtn.href = targetUrl;
      openExternalBottomBtn.title = `Ouvrir ${data.title} dans un nouvel onglet`;
    }

    // 3. Update Specs
    if (specsFeatures) {
      specsFeatures.innerHTML = data.features.map(f => `<li><i class="fa-solid fa-check text-indigo-400 mr-1.5 text-xs"></i>${f}</li>`).join('');
    }
    if (specsStack) {
      specsStack.innerHTML = data.stack.map(s => `<span class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">${s}</span>`).join(' ');
    }
    if (specsRepoLink) {
      specsRepoLink.href = data.repoUrl;
    }

    // 4. Update Agent Terminal Stream
    if (terminalScreen) {
      terminalScreen.innerHTML = `<div class="prompt mb-1"><i class="fa-solid fa-terminal mr-1"></i> system@analytics-hub:~$ load_module --target=${dashId}</div>`;
      data.agentLogs.forEach((log, idx) => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = "text-slate-300 font-mono text-xs";
          line.textContent = log;
          terminalScreen.appendChild(line);
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }, idx * 250);
      });
    }
  }

  // Bind Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-id');
      updateDock(id);
    });
  });

  // Bind Viewport Size Controls
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.getAttribute('data-mode');
      currentViewportMode = mode;
      viewportFrame.className = `stitch-viewport-frame mode-${mode}`;
    });
  });

  // Bind Source Toggle (Prod vs Local)
  if (sourceToggleBtn) {
    sourceToggleBtn.addEventListener('click', () => {
      useLocalSource = !useLocalSource;
      sourceToggleBtn.textContent = useLocalSource ? "Source : Serveur Local (Ports 8085-8088)" : "Source : GitHub Pages (Live)";
      sourceToggleBtn.className = useLocalSource 
        ? "text-xs font-mono px-3 py-1 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-300 cursor-pointer"
        : "text-xs font-mono px-3 py-1 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 cursor-pointer";
      updateDock(currentStitchId);
    });
  }

  // Bind Reload Button
  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      iframe.contentWindow.location.reload();
    });
  }

  // Initial Load
  updateDock("causal");
}

/* ==========================================================================
   GOOGLE MAPS PLATFORM, TIMELINE INTERACTIVE & FENÊTRE DE DESCRIPTION
   Source: Google Maps Platform Code Assist
   ========================================================================== */
function initWorldMap() {
  const confList = [
    {
      key: 'de',
      id: 'conf-de',
      country: '🇩🇪 Allemagne (Brême)',
      title: "Effets Causaux Hétérogènes (HCE) et applications du Machine Learning en évaluation d'impact dans l’économie bleue",
      org: "Leibniz Centre for Tropical Marine Research (ZMT), Brême",
      year: '2026',
      badgeText: "Conférence 2026",
      badgeClass: "conf-type-badge plenary",
      badgeIcon: "fa-solid fa-satellite-dish",
      city: "Brême",
      flag: "🇩🇪",
      coords: { lat: 53.0793, lng: 8.8017 },
      description: "Présentation méthodologique sur l'apport des algorithmes de Causal Forest (grf) et du Double/Debiased Machine Learning pour mesurer la distribution des effets de traitement hétérogènes dans la durabilité des ressources marines et côtières.",
      tags: ["Inférence Causale", "Causal Forest (grf)", "Économie Bleue", "HCE", "Debiased ML"]
    },
    {
      key: 'ca',
      id: 'conf-ca',
      country: '🇨🇦 Canada (Ottawa & Gatineau)',
      title: "Intégration du Causal Machine Learning dans les cadres d'évaluation gouvernementaux & Deep-Dive DML",
      org: "Emploi et Développement social Canada (EDSC), Services partagés Canada (SPC), AAC",
      year: '2026',
      badgeText: "Audience Gouvernementale • 2026",
      badgeClass: "conf-type-badge gov",
      badgeIcon: "fa-solid fa-landmark",
      city: "Ottawa / Gatineau",
      flag: "🇨🇦",
      coords: { lat: 45.4215, lng: -75.6972 },
      description: "Communications techniques et notes de discussion stratégiques présentées aux directions générales d'évaluation sur la modernisation des protocoles d'évaluation d'impact : passage des estimateurs classiques instables vers des estimateurs causaux robustes à haute dimension (Debiased ML).",
      tags: ["Politiques Publiques Fédérales", "Debiased ML", "Évaluation GAR", "High-Dimensional Inférence"]
    },
    {
      key: 'us',
      id: 'conf-us',
      country: '🇺🇸 États-Unis (Cambridge / MA)',
      title: "Inférence Causale et Machine Learning Moderne : Causal Forests & Synthèse Économétrique",
      org: "Scott Cunningham / Intervenants de Harvard & Bourse de formation MIT • Cambridge, USA",
      year: '2026',
      badgeText: "Bourse de Formation MIT • 2026",
      badgeClass: "conf-type-badge symposium",
      badgeIcon: "fa-solid fa-graduation-cap",
      city: "Cambridge (USA)",
      flag: "🇺🇸",
      coords: { lat: 42.3736, lng: -71.1097 },
      description: "Bourse de formation obtenue pour participer aux masterclasses avancées et séminaires de recherche au MIT et avec les intervenants de Harvard (Scott Cunningham) sur les frontières de l'économétrie causale : Causal Trees & Forests (Athey & Wager), Difference-in-Differences décalées (Callaway-Sant'Anna, Sun-Abraham) et calibration d'impact.",
      tags: ["Bourse de formation MIT", "Harvard & MIT", "Inférence Causale", "DiD Moderne", "CausalML"]
    },
    {
      key: 'in',
      id: 'conf-in',
      country: '🇮🇳 Inde (Mumbai)',
      title: "Adoption of Cocoa Certification Scheme and Farmer’s Technical Efficiency in Cameroon",
      org: "INET (Institute for New Economic Thinking) - YSI & IIT Bombay",
      year: '2024',
      badgeText: "Conférence Internationale • 2024",
      badgeClass: "conf-type-badge plenary",
      badgeIcon: "fa-solid fa-satellite-dish",
      city: "Mumbai",
      flag: "🇮🇳",
      coords: { lat: 19.0760, lng: 72.8777 },
      description: "Communication scientifique sur l'estimation de l'efficacité technique des producteurs agricoles sous certification par procédure double bootstrap de Simar et Wilson, isolant les déterminants institutionnels et environnementaux.",
      tags: ["Double Bootstrap", "IIT Bombay", "INET-YSI", "Efficacité Technique", "Micro-données"]
    },
    {
      key: 'cm',
      id: 'conf-cm',
      country: '🇨🇲 Cameroun (Dschang)',
      title: "Organisation du Séjour du Prix Nobel James Robinson & Séminaires d'Évaluation d'Impact",
      org: "CERME (Centre de Recherche en Économie et Management), Université de Dschang",
      year: '2024',
      badgeText: "Accueil Prix Nobel James Robinson • 2024",
      badgeClass: "conf-type-badge nobel",
      badgeIcon: "fa-solid fa-medal",
      city: "Dschang (CERME)",
      flag: "🇨🇲",
      coords: { lat: 5.4435, lng: 10.0538 },
      description: "Membre de l'équipe d'organisation du séjour académique du Prix Nobel d'Économie James Robinson à l'Université de Dschang au sein du CERME (Centre de Recherche en Économie et Management). Coordination scientifique, direction des séminaires d'analyse statistique avancée sur l'impact des institutions et l'économie du développement, et co-construction des approches participatives d'évaluation.",
      tags: ["Prix Nobel James Robinson", "CERME Dschang", "Économie Institutionnelle", "Évaluation d'Impact", "Séminaires FSEG"]
    },
    {
      key: 'ng',
      id: 'conf-ng',
      country: '🇳🇬 Nigeria (Abuja)',
      title: "Structural Change Effects of Agricultural Land Expansion in Sub-Saharan Africa",
      org: "ACAPE 2 (African Conference of Agricultural and Applied Economists)",
      year: '2022',
      badgeText: "Conférence Panafricaine • 2022",
      badgeClass: "conf-type-badge plenary",
      badgeIcon: "fa-solid fa-satellite-dish",
      city: "Abuja",
      flag: "🇳🇬",
      coords: { lat: 9.0765, lng: 7.3986 },
      description: "Modélisation macro-économétrique sur données de panel évaluant les effets de l'expansion foncière sur les transitions structurelles de l'emploi, la productivité factorielle et la dynamique sectorielle en Afrique subsaharienne.",
      tags: ["Macro-Économétrie", "Panel Dynamique", "ACAPE Abuja", "Transformation Structurelle"]
    },
    {
      key: 'za',
      id: 'conf-za',
      country: '🇿🇦 Afrique du Sud (Johannesburg)',
      title: "Structural Dynamics, Agricultural Modernization & Environmental Impact in Africa",
      org: "SARChI (South African Research Chair in Industrial Development) & YSI",
      year: '2022',
      badgeText: "Colloque International • 2022",
      badgeClass: "conf-type-badge symposium",
      badgeIcon: "fa-solid fa-earth-africa",
      city: "Johannesburg",
      flag: "🇿🇦",
      coords: { lat: -26.2041, lng: 28.0473 },
      description: "Communication sur les arbitrages entre expansion des terres arables, préservation de la biodiversité et trajectoires d'industrialisation verte pour les économies émergentes.",
      tags: ["SARChI", "YSI Africa", "Industrialisation Verte", "Biodiversité"]
    }
  ];

  const confMap = {};
  confList.forEach(c => { confMap[c.key] = c; });

  const mapContainer = document.getElementById('googleMap');
  if (!mapContainer) return;

  // Éléments du DOM pour la frise chronologique horizontale
  const stepperNodesContainer = document.getElementById('stepperNodes');
  const stepperProgressBar = document.getElementById('stepperProgressBar');

  // Injection dynamique des jalons sur la frise horizontale
  if (stepperNodesContainer) {
    stepperNodesContainer.innerHTML = confList.map((item, idx) => `
      <button class="stepper-node ${idx === 0 ? 'active' : ''}" data-index="${idx}" title="${item.city} (${item.year}) - ${item.title}">
        <div class="stepper-node-dot">${idx + 1}</div>
        <div class="stepper-node-label">${item.flag} ${item.year}</div>
      </button>
    `).join('');
  }

  const stepperNodeElements = document.querySelectorAll('.stepper-node');

  // Éléments du DOM pour la fenêtre de description & les contrôles
  const winCountryBadge = document.getElementById('winCountryBadge');
  const winTypeBadge = document.getElementById('winTypeBadge');
  const winTitle = document.getElementById('winTitle');
  const winInstitution = document.getElementById('winInstitution');
  const winBody = document.getElementById('winBody');
  const winTags = document.getElementById('winTags');
  const winExpandModalBtn = document.getElementById('winExpandModalBtn');
  const winPrevBtn = document.getElementById('winPrevBtn');
  const winNextBtn = document.getElementById('winNextBtn');
  const mapConfCounter = document.getElementById('mapConfCounter');

  // Modal plein écran
  const confModal = document.getElementById('confModal');
  const confModalClose = document.getElementById('confModalClose');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCountry = document.getElementById('modalCountry');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalOrg = document.getElementById('modalOrg');
  const modalBody = document.getElementById('modalBody');
  const modalTags = document.getElementById('modalTags');

  // Contrôles carte & tour
  const tourAutoBtn = document.getElementById('tourAutoBtn');
  const tourIcon = document.getElementById('tourIcon');
  const tourBtnText = document.getElementById('tourBtnText');
  const mapResetViewBtn = document.getElementById('mapResetViewBtn');
  const mapPrevConfBtn = document.getElementById('mapPrevConfBtn');
  const mapNextConfBtn = document.getElementById('mapNextConfBtn');

  const yearBtns = document.querySelectorAll('.year-btn');
  const filterBtns = document.querySelectorAll('.map-filter-btn');

  let currentIndex = 0;
  let isTouring = false;
  let tourTimer = null;
  let googleMapInstance = null;
  let activeMarkers = {};

  // 1. Mise à jour de la Fenêtre de Description & Frise Horizontale
  function selectConference(index, flyMap = true) {
    if (index < 0) index = confList.length - 1;
    if (index >= confList.length) index = 0;
    currentIndex = index;

    const data = confList[currentIndex];
    if (!data) return;

    // Mise à jour du compteur
    if (mapConfCounter) {
      mapConfCounter.textContent = `${currentIndex + 1} / ${confList.length}`;
    }

    // Mise à jour de la frise chronologique horizontale (stepper)
    if (stepperProgressBar) {
      const progressPercent = ((currentIndex) / (confList.length - 1)) * 100;
      stepperProgressBar.style.width = `${Math.max(10, Math.min(100, progressPercent))}%`;
    }

    // Mise à jour visuelle des nœuds du stepper
    stepperNodeElements.forEach((node, nIdx) => {
      node.classList.remove('active', 'passed');
      if (nIdx === currentIndex) {
        node.classList.add('active');
      } else if (nIdx < currentIndex) {
        node.classList.add('passed');
      }
    });

    // Mise à jour de la Fenêtre de Description Juxtaposée (Volet Unique)
    if (winCountryBadge) winCountryBadge.innerHTML = `<span class="flag">${data.flag}</span> ${data.country}`;
    if (winTypeBadge) {
      winTypeBadge.className = data.badgeClass;
      winTypeBadge.innerHTML = `<i class="${data.badgeIcon}"></i> ${data.badgeText}`;
    }
    if (winTitle) winTitle.textContent = data.title;
    if (winInstitution) winInstitution.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${data.org}`;
    if (winBody) winBody.textContent = data.description;
    if (winTags) {
      winTags.innerHTML = data.tags.map(t => `<span class="conf-tag"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('');
    }

    // Mise à jour de la modale plein écran
    if (modalCountry) modalCountry.innerHTML = data.country;
    if (modalBadge) {
      modalBadge.className = data.badgeClass;
      modalBadge.innerHTML = `<i class="${data.badgeIcon}"></i> ${data.badgeText}`;
    }
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalOrg) modalOrg.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${data.org}`;
    if (modalBody) modalBody.textContent = data.description;
    if (modalTags) {
      modalTags.innerHTML = data.tags.map(t => `<span class="conf-tag"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('');
    }

    // Mise à jour visuelle des marqueurs sur la carte
    Object.keys(activeMarkers).forEach(k => {
      const mEl = document.querySelector(`.gmap-radar-marker[data-key="${k}"]`);
      if (mEl) {
        if (k === data.key) {
          mEl.classList.add('active');
        } else {
          mEl.classList.remove('active');
        }
      }
    });

    // Animation de la caméra Google Maps
    if (flyMap && googleMapInstance) {
      googleMapInstance.panTo(data.coords);
      googleMapInstance.setZoom(5);
    }
  }

  // 3. Initialisation de Google Maps Platform avec Dark Cyber Theme
  async function loadGoogleMap() {
    try {
      // Import des librairies Maps et Marker officielles
      let mapsLib = null;
      let markerLib = null;

      if (window.google && window.google.maps && window.google.maps.importLibrary) {
        mapsLib = await google.maps.importLibrary("maps");
        markerLib = await google.maps.importLibrary("marker");
      }

      const mapStyles = [
        { elementType: "geometry", stylers: [{ color: "#0b1220" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#080d1a" }, { weight: 3 }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#38bdf8" }] },
        { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#1e293b" }] },
        { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#cbd5e1" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#13213c" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0f172a" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1e3a5f" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#06152b" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#38bdf8" }] }
      ];

      const mapOptions = {
        center: { lat: 20, lng: 15 },
        zoom: 2,
        minZoom: 2,
        maxZoom: 9,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        backgroundColor: '#080d1a',
        gestureHandling: 'cooperative'
      };

      if (window.google && window.google.maps && window.google.maps.Map) {
        googleMapInstance = new google.maps.Map(mapContainer, mapOptions);

        // Création des Custom Overlay Radar Markers pour Google Maps
        class RadarOverlay extends google.maps.OverlayView {
          constructor(item, index) {
            super();
            this.item = item;
            this.index = index;
            this.div = null;
          }

          onAdd() {
            this.div = document.createElement('div');
            this.div.className = `gmap-radar-marker ${this.index === 0 ? 'active' : ''}`;
            this.div.setAttribute('data-key', this.item.key);
            this.div.innerHTML = `
              <div class="gmap-radar-dot-wrapper">
                <div class="gmap-radar-pulse"></div>
                <div class="gmap-radar-dot"></div>
              </div>
              <div class="gmap-radar-label">${this.item.flag} ${this.item.city}</div>
            `;

            this.div.addEventListener('click', (e) => {
              e.stopPropagation();
              stopTour();
              selectConference(this.index, true);
            });

            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(this.div);
          }

          draw() {
            const overlayProjection = this.getProjection();
            if (!overlayProjection || !this.div) return;
            const pos = overlayProjection.fromLatLngToDivPixel(new google.maps.LatLng(this.item.coords.lat, this.item.coords.lng));
            if (pos) {
              this.div.style.left = pos.x + 'px';
              this.div.style.top = pos.y + 'px';
            }
          }

          onRemove() {
            if (this.div && this.div.parentNode) {
              this.div.parentNode.removeChild(this.div);
              this.div = null;
            }
          }
        }

        confList.forEach((item, idx) => {
          const overlay = new RadarOverlay(item, idx);
          overlay.setMap(googleMapInstance);
          activeMarkers[item.key] = overlay;
        });

      } else {
        // Fallback interactif fluide si chargement asynchrone sans clé dédiée
        initInteractiveRadarFallback();
      }
    } catch (e) {
      console.warn("Google Maps init fallback active:", e);
      initInteractiveRadarFallback();
    }
  }

  // Fallback radar visuel et interactif autonome
  function initInteractiveRadarFallback() {
    mapContainer.style.position = 'relative';
    mapContainer.style.background = 'radial-gradient(circle at center, #0e1e38 0%, #080d1a 100%)';
    mapContainer.style.overflow = 'hidden';

    // Grille radar SVG de fond
    mapContainer.innerHTML = `
      <div style="position: absolute; inset: 0; opacity: 0.35; background-image: radial-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px); background-size: 30px 30px;"></div>
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 380px; height: 380px; border-radius: 50%; border: 1px dashed rgba(6, 182, 212, 0.25); pointer-events: none;"></div>
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 560px; height: 560px; border-radius: 50%; border: 1px solid rgba(6, 182, 212, 0.15); pointer-events: none;"></div>
      <div id="radarPinsWrapper" style="position: absolute; inset: 0;"></div>
    `;

    const pinsWrapper = document.getElementById('radarPinsWrapper');
    if (!pinsWrapper) return;

    // Positionnement projeté des 7 conférences sur le canevas
    const projectedCoords = {
      'de': { x: 52, y: 32 },
      'ca': { x: 26, y: 36 },
      'us': { x: 28, y: 40 },
      'in': { x: 70, y: 50 },
      'cm': { x: 53, y: 58 },
      'ng': { x: 51, y: 56 },
      'za': { x: 57, y: 78 }
    };

    confList.forEach((item, idx) => {
      const pos = projectedCoords[item.key] || { x: 50, y: 50 };
      const pinEl = document.createElement('div');
      pinEl.className = `gmap-radar-marker ${idx === 0 ? 'active' : ''}`;
      pinEl.setAttribute('data-key', item.key);
      pinEl.style.position = 'absolute';
      pinEl.style.left = `${pos.x}%`;
      pinEl.style.top = `${pos.y}%`;
      pinEl.innerHTML = `
        <div class="gmap-radar-dot-wrapper">
          <div class="gmap-radar-pulse"></div>
          <div class="gmap-radar-dot"></div>
        </div>
        <div class="gmap-radar-label">${item.flag} ${item.city}</div>
      `;

      pinEl.addEventListener('click', () => {
        stopTour();
        selectConference(idx, false);
      });

      pinsWrapper.appendChild(pinEl);
      activeMarkers[item.key] = pinEl;
    });
  }

  // 4. Auto-Tour Guidé à travers le monde
  function startTour() {
    isTouring = true;
    if (tourAutoBtn) {
      tourAutoBtn.classList.add('touring');
      if (tourIcon) tourIcon.className = 'fa-solid fa-pause';
      if (tourBtnText) tourBtnText.textContent = 'Pause Visite';
    }

    tourTimer = setInterval(() => {
      const nextIdx = (currentIndex + 1) % confList.length;
      selectConference(nextIdx, true);
    }, 4500);
  }

  function stopTour() {
    isTouring = false;
    if (tourTimer) {
      clearInterval(tourTimer);
      tourTimer = null;
    }
    if (tourAutoBtn) {
      tourAutoBtn.classList.remove('touring');
      if (tourIcon) tourIcon.className = 'fa-solid fa-play';
      if (tourBtnText) tourBtnText.textContent = 'Visite Guidée Auto';
    }
  }

  if (tourAutoBtn) {
    tourAutoBtn.addEventListener('click', () => {
      if (isTouring) {
        stopTour();
      } else {
        startTour();
      }
    });
  }

  // 5. Navigation rapide (Boutons Précédent / Suivant / Reset)
  if (mapPrevConfBtn) {
    mapPrevConfBtn.addEventListener('click', () => {
      stopTour();
      selectConference(currentIndex - 1, true);
    });
  }

  if (mapNextConfBtn) {
    mapNextConfBtn.addEventListener('click', () => {
      stopTour();
      selectConference(currentIndex + 1, true);
    });
  }

  if (winPrevBtn) {
    winPrevBtn.addEventListener('click', () => {
      stopTour();
      selectConference(currentIndex - 1, true);
    });
  }

  if (winNextBtn) {
    winNextBtn.addEventListener('click', () => {
      stopTour();
      selectConference(currentIndex + 1, true);
    });
  }

  if (mapResetViewBtn) {
    mapResetViewBtn.addEventListener('click', () => {
      stopTour();
      if (googleMapInstance) {
        googleMapInstance.panTo({ lat: 20, lng: 15 });
        googleMapInstance.setZoom(2);
      }
      selectConference(0, false);
    });
  }

  // 6. Interaction avec les Jalons de la Frise Horizontale (Stepper Nodes)
  stepperNodeElements.forEach(node => {
    node.addEventListener('click', () => {
      stopTour();
      const idx = parseInt(node.getAttribute('data-index'), 10);
      selectConference(idx, true);
    });
  });

  // 7. Gestion de la modale plein écran
  function openModal() {
    if (confModal) {
      confModal.classList.add('active');
      confModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (confModal) {
      confModal.classList.remove('active');
      confModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (winExpandModalBtn) winExpandModalBtn.addEventListener('click', openModal);
  if (confModalClose) confModalClose.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (confModal) {
    confModal.addEventListener('click', (e) => {
      if (e.target === confModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 8. Filtres par Année (Milestones 2026, 2024, 2022)
  yearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stopTour();
      const year = btn.getAttribute('data-year');
      yearBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (year === 'all') {
        selectConference(0, true);
      } else {
        const matchedIndex = confList.findIndex(c => c.year === year);
        if (matchedIndex !== -1) {
          selectConference(matchedIndex, true);
        }
      }
    });
  });

  // 9. Filtres par Pays
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stopTour();
      const country = btn.getAttribute('data-country');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (country === 'all') {
        selectConference(0, true);
      } else {
        const targetIdx = confList.findIndex(c => c.key === country);
        if (targetIdx !== -1) {
          selectConference(targetIdx, true);
        }
      }
    });
  });

  // Lancement du chargement de la carte et sélection initiale
  loadGoogleMap();
  selectConference(0, false);
}



