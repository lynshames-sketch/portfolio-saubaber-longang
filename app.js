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
  const portfolioUrl = window.location.href.includes('http') ? window.location.href : 'https://www.linkedin.com/in/saubaber-longang-18416216a';

  if (typeof QRCode !== 'undefined') {
    // 1. Mini QR on business card
    const cardMiniQr = document.getElementById('cardMiniQr');
    if (cardMiniQr) {
      cardMiniQr.innerHTML = '';
      new QRCode(cardMiniQr, {
        text: linkedinUrl,
        width: 52,
        height: 52,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    // 2. LinkedIn QR Panel
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

    // 3. Portfolio Web QR Panel
    const portfolioQrCanvas = document.getElementById('portfolioQrCanvas');
    if (portfolioQrCanvas) {
      portfolioQrCanvas.innerHTML = '';
      new QRCode(portfolioQrCanvas, {
        text: portfolioUrl,
        width: 130,
        height: 130,
        colorDark: "#2563eb",
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
      if (url === 'window.location.href') {
        url = window.location.href;
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
   CARTE DU MONDE INTERACTIVE & EXPLORATEUR DE CONFÉRENCES
   ========================================================================== */
function initWorldMap() {
  const confData = {
    'ca': {
      id: 'conf-ca',
      title: "Intégration du Causal Machine Learning dans les cadres d'évaluation gouvernementaux & Deep-Dive DML",
      org: "Emploi et Développement social Canada (EDSC), Services partagés Canada (SPC), AAC • Ottawa & Gatineau",
      badgeText: "Audience Gouvernementale • 2026",
      badgeClass: "conf-type-badge gov",
      badgeIcon: "fa-solid fa-landmark",
      flightId: null
    },
    'de': {
      id: 'conf-de',
      title: "Effets Causaux Hétérogènes (HCE) et applications du Machine Learning en évaluation d'impact dans l’économie bleue",
      org: "Leibniz Centre for Tropical Marine Research (ZMT) • Brême, Allemagne",
      badgeText: "Conférence Internationale • 2026",
      badgeClass: "conf-type-badge plenary",
      badgeIcon: "fa-solid fa-satellite-dish",
      flightId: "flight-de"
    },
    'us': {
      id: 'conf-us',
      title: "Inférence Causale et Machine Learning Moderne : Causal Forests & Synthèse Économétrique",
      org: "Scott Cunningham / Harvard & MIT Faculty • Cambridge, États-Unis",
      badgeText: "Symposium Avancé • 2026",
      badgeClass: "conf-type-badge symposium",
      badgeIcon: "fa-solid fa-award",
      flightId: "flight-us"
    },
    'in': {
      id: 'conf-in',
      title: "Adoption of Cocoa Certification Scheme and Farmer’s Technical Efficiency in Cameroon",
      org: "INET (Institute for New Economic Thinking) - YSI & IIT Bombay • Mumbai, Inde",
      badgeText: "Conférence Internationale • 2024",
      badgeClass: "conf-type-badge plenary",
      badgeIcon: "fa-solid fa-satellite-dish",
      flightId: "flight-in"
    },
    'cm': {
      id: 'conf-cm',
      title: "Organisation de la Session d'Honneur du Prix Nobel d'Économie & Séminaires d'Évaluation d'Impact",
      org: "Faculté des Sciences Économiques et de Gestion (FSEG), Université de Dschang • Cameroun",
      badgeText: "Session d'Honneur & Séminaire • 2024",
      badgeClass: "conf-type-badge nobel",
      badgeIcon: "fa-solid fa-medal",
      flightId: "flight-cm"
    },
    'ng': {
      id: 'conf-ng',
      title: "Structural Change Effects of Agricultural Land Expansion in Sub-Saharan Africa",
      org: "ACAPE 2 (African Conference of Agricultural and Applied Economists) • Abuja, Nigeria",
      badgeText: "Conférence Panafricaine • 2022",
      badgeClass: "conf-type-badge plenary",
      badgeIcon: "fa-solid fa-satellite-dish",
      flightId: "flight-ng"
    },
    'za': {
      id: 'conf-za',
      title: "Structural Dynamics, Agricultural Modernization & Environmental Impact in Africa",
      org: "SARChI (South African Research Chair in Industrial Development) & YSI • Johannesburg, Afrique du Sud",
      badgeText: "Colloque International • 2022",
      badgeClass: "conf-type-badge symposium",
      badgeIcon: "fa-solid fa-earth-africa",
      flightId: "flight-za"
    }
  };

  const pins = document.querySelectorAll('.map-pin');
  const filterBtns = document.querySelectorAll('.map-filter-btn');
  const timelineItems = document.querySelectorAll('.conf-timeline-item');
  const flightPaths = document.querySelectorAll('.flight-path');
  const spotlightBadge = document.getElementById('spotlightBadge');
  const spotlightTitle = document.getElementById('spotlightTitle');
  const spotlightOrg = document.getElementById('spotlightOrg');
  const btnScrollToConf = document.getElementById('btnScrollToConf');

  let currentTargetId = 'conf-de';

  function selectCountry(countryCode) {
    // 1. Mettre à jour les boutons filtres
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-country') === countryCode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Mettre à jour les repères de la carte et les trajectoires
    pins.forEach(pin => {
      const pCountry = pin.getAttribute('data-country');
      if (countryCode === 'all' || pCountry === countryCode) {
        pin.style.opacity = '1';
        if (pCountry === countryCode) {
          pin.classList.add('active');
        } else {
          pin.classList.remove('active');
        }
      } else {
        pin.style.opacity = '0.3';
        pin.classList.remove('active');
      }
    });

    // Mettre en surbrillance la ligne de vol
    flightPaths.forEach(fp => fp.classList.remove('highlighted'));
    if (countryCode !== 'all' && confData[countryCode] && confData[countryCode].flightId) {
      const activeFp = document.getElementById(confData[countryCode].flightId);
      if (activeFp) activeFp.classList.add('highlighted');
    }

    // 3. Mettre à jour la carte spotlight
    const targetKey = countryCode === 'all' ? 'de' : countryCode;
    if (confData[targetKey]) {
      const item = confData[targetKey];
      currentTargetId = item.id;
      if (spotlightBadge) {
        spotlightBadge.className = item.badgeClass;
        spotlightBadge.innerHTML = `<i class="${item.badgeIcon}"></i> ${item.badgeText}`;
      }
      if (spotlightTitle) spotlightTitle.textContent = item.title;
      if (spotlightOrg) spotlightOrg.innerHTML = `<i class="fa-solid fa-building-columns"></i> ${item.org}`;
    }

    // 4. Filtrer la timeline
    timelineItems.forEach(item => {
      const itemCountry = item.getAttribute('data-country');
      if (countryCode === 'all' || itemCountry === countryCode) {
        item.style.display = 'block';
        item.style.opacity = '1';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Événements sur les pins de la carte
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const country = pin.getAttribute('data-country');
      selectCountry(country);
    });
  });

  // Événements sur les boutons filtres
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const country = btn.getAttribute('data-country');
      selectCountry(country);
    });
  });

  // Bouton de défilement vers la timeline
  if (btnScrollToConf) {
    btnScrollToConf.addEventListener('click', () => {
      const targetEl = document.getElementById(currentTargetId);
      if (targetEl) {
        targetEl.style.display = 'block';
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const card = targetEl.querySelector('.conf-card');
        if (card) {
          card.style.borderColor = 'var(--accent-cyan)';
          card.style.boxShadow = '0 0 25px rgba(6, 182, 212, 0.6)';
          setTimeout(() => {
            card.style.borderColor = '';
            card.style.boxShadow = '';
          }, 2000);
        }
      }
    });
  }
}

