/**
 * JON ESTÚDIO — JAVASCRIPT PRINCIPAL
 * Inspirações de Design: Alicia Dubuis (SiteInspire), Mobbin, Huxley Saga (Studio Freight)
 *
 * Funcionalidades:
 * 1. Alternador de Modo Claro / Escuro com persistência em localStorage (Dark como padrão)
 * 2. Menu móvel responsivo e acessível
 * 3. Animações de Scroll Reveal com Intersection Observer
 * 4. Destaque do link de navegação conforme a seção visível
 * 5. Sistema de Áudio Imersivo & Sintetizador via Web Audio API (Huxley Saga)
 * 6. Cursor Magnético Personalizado com modo de exploração visual (Huxley Saga)
 * 7. Alternador de Visualização da Galeria: Grade de Cartões vs. Arquivo / Índice Editorial (Alicia Dubuis)
 * 8. Preview Flutuante no Hover da Lista de Arquivo (Alicia Dubuis)
 * 9. Filtros dinâmicos com contadores automáticos em tempo real (Mobbin)
 * 10. Bandeja de Curadoria Interativa / Contact Sheet ("Deck Autoral") com injeção na proposta (Alicia Dubuis)
 * 11. Command Palette / Spotlight Global com atalhos ⌘K e / (Mobbin)
 * 12. Modal de Detalhes Avançado com navegação Anterior/Próximo e atalhos de teclado
 * 13. Ação rápida de Copiar Link do Projeto com Toast Feedback (Mobbin)
 * 14. Formulário de contato com validação em tempo real e integração com o deck
 * 15. Rolagem suave e botão voltar ao topo
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     CATÁLOGO DE DADOS DOS PROJETOS (JON ESTÚDIO)
     ========================================================================== */
  const projectsData = {
    "1": {
      id: "1",
      title: "Vortex Electronic Festival",
      category: "Identidade Visual & Web",
      filterGroup: "branding digital",
      year: "2026",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop",
      description: "Criação de identidade visual cinética com tipografia reativa a batimentos e plataforma web imersiva para o festival Vortex, reunindo 45.000 pessoas em 3 palcos simultâneos.",
      client: "Vortex Music Global",
      scope: "Identidade Cinética, Design de Pôsteres, Web Experience",
      impact: "Ingressos esgotados em 4 horas e Menção Awwwards"
    },
    "2": {
      id: "2",
      title: "Aura Bio Skincare",
      category: "Branding & Embalagens",
      filterGroup: "branding packaging",
      year: "2026",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
      description: "Estratégia de marca, naming e sistema de packaging ecológico para cosméticos à base de biomas nativos. Design elegante, frascos em vidro reciclado e rotulagem serigráfica limpa.",
      client: "Aura Biocosméticos",
      scope: "Branding, Packaging Design, Brand Guidelines",
      impact: "+180% de receita em e-commerce no primeiro trimestre"
    },
    "3": {
      id: "3",
      title: "Nexus FinTech Platform",
      category: "Design System & UI/UX",
      filterGroup: "digital",
      year: "2025",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
      description: "Redesenho completo da interface de gestão financeira para investidores modernos. Criação de componentes escaláveis em Design System, gráficos em tempo real e modo noturno de alta legibilidade.",
      client: "Nexus Capital Tech",
      scope: "Design System, UX Research, Mobile & Web App",
      impact: "4.9/5 nas lojas de aplicativos com 120 mil usuários ativos"
    },
    "4": {
      id: "4",
      title: "Monolith Architecture Book",
      category: "Design Editorial & Impresso",
      filterGroup: "packaging",
      year: "2026",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop",
      description: "Projeto gráfico e direção de arte para livro monográfico sobre o brutalismo sul-americano. Capa dura com gravação em baixo relevo, papéis texturizados de 150g e tipografia monolítica.",
      client: "Monolith Press & Architecture",
      scope: "Design Editorial, Direção Fotográfica, Produção Gráfica",
      impact: "Destaque na Bienal Internacional do Livro e Design"
    },
    "5": {
      id: "5",
      title: "Kroma Sneakerlab Concept",
      category: "Direção de Arte & E-commerce",
      filterGroup: "branding digital",
      year: "2025",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=900&auto=format&fit=crop",
      description: "Lançamento da linha de tênis urbanos futuristas. Desenvolvimento do universo visual da marca, renderizações 3D interativas dos calçados e loja digital com checkout sem atrito.",
      client: "Kroma Footwear Ltd.",
      scope: "Direção de Arte, Web Design 3D, Campanha Digital",
      impact: "Vencedor de Site of the Day e +50k acessos no drop"
    },
    "6": {
      id: "6",
      title: "Zenith Hi-Fi Acoustics",
      category: "Packaging & Brand Identity",
      filterGroup: "branding packaging",
      year: "2026",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop",
      description: "Identidade visual para equipamentos de áudio espacial profissional. Criação de embalagem com fechamento magnético, manual ilustrado e cartela cromática inspirada em frequências sonoras.",
      client: "Zenith Audio Labs",
      scope: "Branding, Packaging de Luxo, Sinalização de Produto",
      impact: "Expansão para 18 mercados internacionais de áudio hi-fi"
    }
  };

  const projectIds = ["1", "2", "3", "4", "5", "6"];
  let currentModalIndex = 0;

  /* ==========================================================================
     1. TEMA CLARO / ESCURO (PERSISTÊNCIA & DETECÇÃO)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('jon-theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jon-theme', newTheme);
    triggerAudioFeedback('click');
  });

  /* ==========================================================================
     2. ÁUDIO IMERSIVO & SINTETIZADOR WEB AUDIO API (HUXLEY SAGA)
     ========================================================================== */
  let audioCtx = null;
  let isAudioEnabled = false;
  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioLabel = document.getElementById('audio-status-label');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function triggerAudioFeedback(type = 'click') {
    if (!isAudioEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'click') {
        // Micro-clique refinado estilo interface tátil
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'select') {
        // Tom harmônico de adição ao deck
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'hover') {
        // Micro-sussurro de hover
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.025);
      }
    } catch (err) {
      console.warn("Audio feedback error:", err);
    }
  }

  audioToggleBtn.addEventListener('click', () => {
    initAudioContext();
    isAudioEnabled = !isAudioEnabled;
    if (isAudioEnabled) {
      audioToggleBtn.classList.add('is-playing');
      audioLabel.textContent = 'SOM: ON';
      triggerAudioFeedback('select');
      showToast('Áudio Imersivo Ativado', 'Micro-sons táteis sintetizados ativados.');
    } else {
      audioToggleBtn.classList.remove('is-playing');
      audioLabel.textContent = 'SOM: OFF';
    }
  });

  /* ==========================================================================
     3. CURSOR MAGNÉTICO PERSONALIZADO (HUXLEY SAGA)
     ========================================================================== */
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');
  const cursorTag = document.getElementById('cursor-tag');

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursorRing);
  }
  requestAnimationFrame(renderCursorRing);

  // Expansão do cursor sobre cards de projetos e itens interativos
  function setupCursorInteractions() {
    const projectCards = document.querySelectorAll('.project-card, .archive-row');
    const interactiveElements = document.querySelectorAll('button, a, .filter-btn, .view-btn');

    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('is-hovering-project');
        if (cursorTag) cursorTag.textContent = 'EXPLORAR';
        triggerAudioFeedback('hover');
      });
      card.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('is-hovering-project');
      });
    });

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorRing && !cursorRing.classList.contains('is-hovering-project')) {
          cursorRing.classList.add('is-hovering-clickable');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('is-hovering-clickable');
      });
    });
  }
  setupCursorInteractions();

  /* ==========================================================================
     4. MENU MOBILE HAMBÚRGUER
     ========================================================================== */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    const isOpen = mobileToggleBtn.classList.toggle('open');
    mobileMenuDrawer.classList.toggle('open');
    mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    mobileMenuDrawer.setAttribute('aria-hidden', !isOpen);
    triggerAudioFeedback('click');
  }

  mobileToggleBtn.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggleBtn.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     5. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     6. DESTAQUE DO MENU ATIVO AO ROLAR
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ==========================================================================
     7. ALTERNADOR DE VISUALIZAÇÃO: GRADE VS. ARQUIVO EDITORIAL (ALICIA DUBUIS)
     ========================================================================== */
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewArchiveBtn = document.getElementById('view-archive-btn');
  const projectsGrid = document.getElementById('projects-grid');
  const projectsArchive = document.getElementById('projects-archive');

  viewGridBtn.addEventListener('click', () => {
    viewGridBtn.classList.add('active');
    viewArchiveBtn.classList.remove('active');
    projectsGrid.style.display = 'grid';
    projectsArchive.style.display = 'none';
    triggerAudioFeedback('click');
  });

  viewArchiveBtn.addEventListener('click', () => {
    viewArchiveBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
    projectsGrid.style.display = 'none';
    projectsArchive.style.display = 'block';
    triggerAudioFeedback('click');
  });

  // Hover Preview Flutuante para Linhas da Tabela de Arquivo (Alicia Dubuis Style)
  const archiveRows = document.querySelectorAll('.archive-row');
  const archivePreviewCard = document.getElementById('archive-preview-card');
  const archivePreviewImg = document.getElementById('archive-preview-img');
  const archivePreviewCaption = document.getElementById('archive-preview-caption');

  archiveRows.forEach(row => {
    row.addEventListener('mouseenter', (e) => {
      const imgUrl = row.getAttribute('data-image');
      const title = row.querySelector('.archive-title').textContent;
      if (archivePreviewImg) archivePreviewImg.src = imgUrl;
      if (archivePreviewCaption) archivePreviewCaption.textContent = title;
      if (archivePreviewCard) archivePreviewCard.classList.add('visible');
    });

    row.addEventListener('mousemove', (e) => {
      if (archivePreviewCard) {
        archivePreviewCard.style.left = `${e.clientX + 140}px`;
        archivePreviewCard.style.top = `${e.clientY - 20}px`;
      }
    });

    row.addEventListener('mouseleave', () => {
      if (archivePreviewCard) archivePreviewCard.classList.remove('visible');
    });

    row.addEventListener('click', (e) => {
      // Se clicou no botão de coletar, não abre o modal
      if (e.target.closest('.collect-btn-sm')) return;
      const id = row.getAttribute('data-id');
      openProjectModal(id);
    });
  });

  /* ==========================================================================
     8. FILTROS DA GALERIA COM CONTADORES EM TEMPO REAL (MOBBIN)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      triggerAudioFeedback('click');

      const filterValue = btn.getAttribute('data-filter');

      // Filtra na Grade
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => card.classList.add('is-revealed'), 40);
        } else {
          card.style.display = 'none';
        }
      });

      // Filtra no Arquivo
      archiveRows.forEach(row => {
        const categories = row.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          row.style.display = window.innerWidth >= 860 ? 'grid' : 'flex';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     9. BANDEJA DE CURADORIA INTERATIVA / DECK AUTORAL (ALICIA DUBUIS)
     ========================================================================== */
  const selectedProjects = new Set();
  const selectionDock = document.getElementById('selection-dock');
  const selectionCountEl = document.getElementById('selection-count');
  const dockItemsPreview = document.getElementById('dock-items-preview');
  const dockClearBtn = document.getElementById('dock-clear-btn');
  const dockSubmitBtn = document.getElementById('dock-submit-btn');
  const modalCollectBtn = document.getElementById('modal-collect-btn');
  const deckCurationNotice = document.getElementById('deck-curation-notice');
  const deckCurationTags = document.getElementById('deck-curation-tags');
  const userMessageInput = document.getElementById('user-message');

  function updateSelectionUI() {
    const count = selectedProjects.size;
    if (selectionCountEl) selectionCountEl.textContent = count;

    // Atualiza classes dos botões
    document.querySelectorAll('.collect-btn, .collect-btn-sm').forEach(btn => {
      const id = btn.getAttribute('data-id');
      if (selectedProjects.has(id)) {
        btn.classList.add('is-collected');
        if (btn.classList.contains('collect-btn-sm')) {
          btn.textContent = '✓';
        }
      } else {
        btn.classList.remove('is-collected');
        if (btn.classList.contains('collect-btn-sm')) {
          btn.textContent = '+';
        }
      }
    });

    // Atualiza botão do modal se estiver aberto
    const currentId = projectIds[currentModalIndex];
    if (modalCollectBtn) {
      if (selectedProjects.has(currentId)) {
        modalCollectBtn.innerHTML = '✓ No Deck';
        modalCollectBtn.classList.add('btn-primary');
        modalCollectBtn.classList.remove('btn-secondary');
      } else {
        modalCollectBtn.innerHTML = '<span class="collect-symbol">+</span> Adicionar ao Deck';
        modalCollectBtn.classList.remove('btn-primary');
        modalCollectBtn.classList.add('btn-secondary');
      }
    }

    // Renderiza chips na barra flutuante
    if (dockItemsPreview) {
      dockItemsPreview.innerHTML = '';
      selectedProjects.forEach(id => {
        const p = projectsData[id];
        if (p) {
          const chip = document.createElement('span');
          chip.className = 'dock-chip';
          chip.textContent = p.title.split(' ')[0];
          dockItemsPreview.appendChild(chip);
        }
      });
    }

    // Exibe ou esconde a barra inferior
    if (count > 0) {
      selectionDock.classList.add('is-active');
    } else {
      selectionDock.classList.remove('is-active');
    }
  }

  function toggleProjectInDeck(id) {
    if (selectedProjects.has(id)) {
      selectedProjects.delete(id);
      showToast('Projeto Removido', `O projeto foi removido do seu deck.`);
    } else {
      selectedProjects.add(id);
      triggerAudioFeedback('select');
      const p = projectsData[id];
      showToast('Projeto Adicionado ao Deck!', `"${p ? p.title : 'Projeto'}" salvo na sua seleção.`);
    }
    updateSelectionUI();
  }

  // Cliques nos botões de coletar da galeria e do arquivo
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.collect-btn, .collect-btn-sm');
    if (btn) {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleProjectInDeck(id);
    }
  });

  if (modalCollectBtn) {
    modalCollectBtn.addEventListener('click', () => {
      const id = projectIds[currentModalIndex];
      toggleProjectInDeck(id);
    });
  }

  if (dockClearBtn) {
    dockClearBtn.addEventListener('click', () => {
      selectedProjects.clear();
      updateSelectionUI();
      if (deckCurationNotice) deckCurationNotice.style.display = 'none';
      showToast('Deck Limpo', 'Todos os projetos foram removidos da seleção.');
    });
  }

  if (dockSubmitBtn) {
    dockSubmitBtn.addEventListener('click', () => {
      triggerAudioFeedback('click');
      // Scroll suave até o formulário de contato
      const contactSec = document.getElementById('contato');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }

      // Preenche o aviso do formulário
      if (deckCurationNotice && deckCurationTags) {
        deckCurationTags.innerHTML = '';
        const titles = [];
        selectedProjects.forEach(id => {
          const p = projectsData[id];
          if (p) {
            titles.push(p.title);
            const tag = document.createElement('span');
            tag.className = 'deck-tag-item';
            tag.textContent = p.title;
            deckCurationTags.appendChild(tag);
          }
        });
        deckCurationNotice.style.display = 'block';

        // Preenche o textarea
        if (userMessageInput && titles.length > 0) {
          userMessageInput.value = `Olá Jon! Gostaria de conversar sobre uma proposta com foco nas referências que selecionei no portfólio:\n• ${titles.join('\n• ')}\n\nObjetivo principal do projeto: `;
          const charCounter = document.getElementById('char-counter');
          if (charCounter) {
            charCounter.textContent = `${userMessageInput.value.length} / 500`;
          }
          userMessageInput.focus();
        }
      }
    });
  }

  /* ==========================================================================
     10. MODAL DE DETALHES COM NAVEGAÇÃO ANTERIOR / PRÓXIMO & COPIAR LINK
     ========================================================================== */
  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalPrevBtn = document.getElementById('modal-prev');
  const modalNextBtn = document.getElementById('modal-next');
  const modalCopyLinkBtn = document.getElementById('modal-copy-link');
  const modalImg = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalYear = document.getElementById('modal-year');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalClient = document.getElementById('modal-client');
  const modalScope = document.getElementById('modal-scope');
  const modalImpact = document.getElementById('modal-impact');

  function openProjectModal(projectId) {
    const index = projectIds.indexOf(projectId.toString());
    if (index !== -1) {
      currentModalIndex = index;
    }

    const data = projectsData[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalYear.textContent = data.year;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalClient.textContent = data.client;
    modalScope.textContent = data.scope;
    modalImpact.textContent = data.impact;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updateSelectionUI();
    triggerAudioFeedback('click');
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    triggerAudioFeedback('click');
  }

  function navigateModal(direction) {
    if (direction === 'next') {
      currentModalIndex = (currentModalIndex + 1) % projectIds.length;
    } else {
      currentModalIndex = (currentModalIndex - 1 + projectIds.length) % projectIds.length;
    }
    const nextId = projectIds[currentModalIndex];
    openProjectModal(nextId);
  }

  if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => navigateModal('prev'));
  if (modalNextBtn) modalNextBtn.addEventListener('click', () => navigateModal('next'));

  // Copiar Link Direto do Case (Mobbin Style)
  if (modalCopyLinkBtn) {
    modalCopyLinkBtn.addEventListener('click', () => {
      const currentId = projectIds[currentModalIndex];
      const projectUrl = `${window.location.origin}${window.location.pathname}#case-${currentId}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(projectUrl).then(() => {
          showToast('Link do Case Copiado!', 'URL copiada para sua área de transferência.');
          triggerAudioFeedback('select');
        });
      } else {
        showToast('Link do Case', projectUrl);
      }
    });
  }

  // Cliques nos cards da galeria
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.collect-btn')) return;
      const id = card.getAttribute('data-id');
      openProjectModal(id);
    });
  });

  modalCloseBtn.addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open')) {
      if (e.key === 'Escape') closeProjectModal();
      if (e.key === 'ArrowRight') navigateModal('next');
      if (e.key === 'ArrowLeft') navigateModal('prev');
    }
  });

  /* ==========================================================================
     11. COMMAND PALETTE / SPOTLIGHT SEARCH (MOBBIN STYLE)
     ========================================================================== */
  const commandPalette = document.getElementById('command-palette');
  const paletteInput = document.getElementById('palette-input');
  const paletteResults = document.getElementById('palette-results');
  const searchTrigger = document.getElementById('search-trigger');

  const paletteItems = [
    // Seções principais
    { title: "Início // Hero & Manifesto", type: "Seção", url: "#hero", category: "Navegação" },
    { title: "Trabalhos Selecionados // Galeria", type: "Seção", url: "#projetos", category: "Navegação" },
    { title: "A Trajetória JON // Linha do Tempo", type: "Seção", url: "#trajetoria", category: "Navegação" },
    { title: "Sobre o Jon & Estúdio", type: "Seção", url: "#sobre", category: "Navegação" },
    { title: "Especialidades & Serviços", type: "Seção", url: "#servicos", category: "Navegação" },
    { title: "Briefing & Contato Direto", type: "Seção", url: "#contato", category: "Navegação" },
    // Projetos individuais
    { title: "Vortex Electronic Festival", type: "Case", projectId: "1", sub: "Identidade Cinética & Web", category: "Projetos" },
    { title: "Aura Bio Skincare", type: "Case", projectId: "2", sub: "Branding & Embalagens Botânicas", category: "Projetos" },
    { title: "Nexus FinTech Platform", type: "Case", projectId: "3", sub: "Design System & UI/UX", category: "Projetos" },
    { title: "Monolith Architecture Book", type: "Case", projectId: "4", sub: "Design Editorial & Livro", category: "Projetos" },
    { title: "Kroma Sneakerlab Concept", type: "Case", projectId: "5", sub: "Direção de Arte & 3D Web", category: "Projetos" },
    { title: "Zenith Hi-Fi Acoustics", type: "Case", projectId: "6", sub: "Packaging & Brand Identity", category: "Projetos" }
  ];

  let selectedPaletteIndex = 0;
  let filteredPaletteItems = [];

  function openCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.add('open');
    commandPalette.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    paletteInput.value = '';
    renderPaletteResults('');
    setTimeout(() => paletteInput.focus(), 50);
    triggerAudioFeedback('click');
  }

  function closeCommandPalette() {
    if (!commandPalette) return;
    commandPalette.classList.remove('open');
    commandPalette.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderPaletteResults(query) {
    const q = query.toLowerCase().trim();
    filteredPaletteItems = paletteItems.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.sub ? item.sub.toLowerCase().includes(q) : false;
      const matchCat = item.category.toLowerCase().includes(q);
      return matchTitle || matchSub || matchCat;
    });

    selectedPaletteIndex = 0;
    paletteResults.innerHTML = '';

    if (filteredPaletteItems.length === 0) {
      paletteResults.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">Nenhum resultado encontrado para "${query}".</div>`;
      return;
    }

    filteredPaletteItems.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `palette-item ${index === selectedPaletteIndex ? 'is-selected' : ''}`;
      row.innerHTML = `
        <div class="palette-item-left">
          <span class="palette-item-badge">${item.type}</span>
          <div>
            <div class="palette-item-title">${item.title}</div>
            ${item.sub ? `<div class="palette-item-sub">${item.sub}</div>` : ''}
          </div>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">↵</span>
      `;

      row.addEventListener('click', () => {
        executePaletteItem(item);
      });

      paletteResults.appendChild(row);
    });
  }

  function executePaletteItem(item) {
    closeCommandPalette();
    if (item.url) {
      const target = document.querySelector(item.url);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else if (item.projectId) {
      openProjectModal(item.projectId);
    }
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openCommandPalette);

  if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
      renderPaletteResults(e.target.value);
    });

    paletteInput.addEventListener('keydown', (e) => {
      const items = paletteResults.querySelectorAll('.palette-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedPaletteIndex = (selectedPaletteIndex + 1) % filteredPaletteItems.length;
        updatePaletteSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedPaletteIndex = (selectedPaletteIndex - 1 + filteredPaletteItems.length) % filteredPaletteItems.length;
        updatePaletteSelection(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredPaletteItems[selectedPaletteIndex]) {
          executePaletteItem(filteredPaletteItems[selectedPaletteIndex]);
        }
      } else if (e.key === 'Escape') {
        closeCommandPalette();
      }
    });
  }

  function updatePaletteSelection(items) {
    items.forEach((it, idx) => {
      if (idx === selectedPaletteIndex) {
        it.classList.add('is-selected');
        it.scrollIntoView({ block: 'nearest' });
      } else {
        it.classList.remove('is-selected');
      }
    });
  }

  if (commandPalette) {
    commandPalette.addEventListener('click', (e) => {
      if (e.target === commandPalette) closeCommandPalette();
    });
  }

  // Atalhos Globais de Teclado (⌘K, Ctrl+K, e tecla /)
  document.addEventListener('keydown', (e) => {
    const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (commandPalette && commandPalette.classList.contains('open')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === '/' && !isInputActive) {
      e.preventDefault();
      openCommandPalette();
    }
  });

  /* ==========================================================================
     12. FORMULÁRIO DE CONTATO COM JON (VALIDAÇÃO & FEEDBACK)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const messageInput = document.getElementById('user-message');
  const charCounter = document.getElementById('char-counter');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  function showToast(title, message) {
    if (toastTitle) toastTitle.textContent = title;
    if (toastBody) toastBody.textContent = message;
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4500);
    }
  }

  messageInput.addEventListener('input', () => {
    const currentLength = messageInput.value.length;
    charCounter.textContent = `${currentLength} / 500`;
    if (currentLength > 500) {
      charCounter.style.color = '#E53935';
    } else {
      charCounter.style.color = 'var(--text-muted)';
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showFieldValidation(field, errorElId, isValid) {
    const errorEl = document.getElementById(errorElId);
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      if (errorEl) errorEl.classList.remove('visible');
    } else {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      if (errorEl) errorEl.classList.add('visible');
    }
  }

  nameInput.addEventListener('blur', () => {
    const isValid = nameInput.value.trim().length >= 3;
    showFieldValidation(nameInput, 'error-name', isValid);
  });

  emailInput.addEventListener('blur', () => {
    const isValid = validateEmail(emailInput.value.trim());
    showFieldValidation(emailInput, 'error-email', isValid);
  });

  messageInput.addEventListener('blur', () => {
    const isValid = messageInput.value.trim().length >= 10;
    showFieldValidation(messageInput, 'error-message', isValid);
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = nameInput.value.trim().length >= 3;
    const isEmailValid = validateEmail(emailInput.value.trim());
    const isMessageValid = messageInput.value.trim().length >= 10;

    showFieldValidation(nameInput, 'error-name', isNameValid);
    showFieldValidation(emailInput, 'error-email', isEmailValid);
    showFieldValidation(messageInput, 'error-message', isMessageValid);

    if (isNameValid && isEmailValid && isMessageValid) {
      const submitBtn = document.getElementById('submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando briefing...</span>';
      triggerAudioFeedback('click');

      setTimeout(() => {
        contactForm.reset();
        nameInput.classList.remove('is-valid');
        emailInput.classList.remove('is-valid');
        messageInput.classList.remove('is-valid');
        charCounter.textContent = '0 / 500';

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (deckCurationNotice) deckCurationNotice.style.display = 'none';
        selectedProjects.clear();
        updateSelectionUI();

        showToast('Briefing Enviado com Sucesso!', 'Obrigado pelo contato! O Jon responderá em até 24 horas úteis.');
        triggerAudioFeedback('select');
      }, 700);
    }
  });

  /* ==========================================================================
     13. BOTÃO VOLTAR AO TOPO
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      triggerAudioFeedback('click');
    });
  }

});
