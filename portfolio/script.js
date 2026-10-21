/**
 * JON ESTÚDIO — JAVASCRIPT PRINCIPAL
 * Funcionalidades:
 * 1. Alternador de Modo Claro / Escuro com persistência em localStorage (Dark como padrão)
 * 2. Menu móvel responsivo e acessível
 * 3. Animações de Scroll Reveal com Intersection Observer
 * 4. Destaque do link de navegação conforme a seção visível
 * 5. Filtros dinâmicos da galeria de projetos
 * 6. Modal de detalhes interativo para cada projeto do JON Estúdio
 * 7. Formulário de contato com validação em tempo real e Toast de confirmação
 * 8. Rolagem suave e botão voltar ao topo
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TEMA CLARO / ESCURO (PERSISTÊNCIA & DETECÇÃO)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Verifica preferência anterior no LocalStorage; padrão é dark para JON Estúdio
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
  });

  /* ==========================================================================
     2. MENU MOBILE HAMBÚRGUER
     ========================================================================== */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    const isOpen = mobileToggleBtn.classList.toggle('open');
    mobileMenuDrawer.classList.toggle('open');
    mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    mobileMenuDrawer.setAttribute('aria-hidden', !isOpen);
  }

  mobileToggleBtn.addEventListener('click', toggleMobileMenu);

  // Fecha o menu móvel ao clicar em qualquer link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggleBtn.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================================
     3. SCROLL REVEAL (INTERSECTION OBSERVER)
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
     4. DESTAQUE DO MENU ATIVO AO ROLAR
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
     5. FILTROS DA GALERIA DE PROJETOS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.classList.add('is-revealed');
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     6. CATÁLOGO AUTORAL & MODAL DE DETALHES (JON ESTÚDIO)
     ========================================================================== */
  const projectsData = {
    "1": {
      title: "Vortex Electronic Festival",
      category: "Identidade Visual & Web",
      year: "2026",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop",
      description: "Criação de identidade visual cinética com tipografia reativa a batimentos e plataforma web imersiva para o festival Vortex, reunindo 45.000 pessoas em 3 palcos simultâneos.",
      client: "Vortex Music Global",
      scope: "Identidade Cinética, Design de Pôsteres, Web Experience",
      impact: "Ingressos esgotados em 4 horas e Menção Awwwards"
    },
    "2": {
      title: "Aura Bio Skincare",
      category: "Branding & Embalagens",
      year: "2026",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
      description: "Estratégia de marca, naming e sistema de packaging ecológico para cosméticos à base de biomas nativos. Design elegante, frascos em vidro reciclado e rotulagem serigráfica limpa.",
      client: "Aura Biocosméticos",
      scope: "Branding, Packaging Design, Brand Guidelines",
      impact: "+180% de receita em e-commerce no primeiro trimestre"
    },
    "3": {
      title: "Nexus FinTech Platform",
      category: "Design System & UI/UX",
      year: "2025",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
      description: "Redesenho completo da interface de gestão financeira para investidores modernos. Criação de componentes escaláveis em Design System, gráficos em tempo real e modo noturno de alta legibilidade.",
      client: "Nexus Capital Tech",
      scope: "Design System, UX Research, Mobile & Web App",
      impact: "4.9/5 nas lojas de aplicativos com 120 mil usuários ativos"
    },
    "4": {
      title: "Monolith Architecture Book",
      category: "Design Editorial & Impresso",
      year: "2026",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=900&auto=format&fit=crop",
      description: "Projeto gráfico e direção de arte para livro monográfico sobre o brutalismo sul-americano. Capa dura com gravação em baixo relevo, papéis texturizados de 150g e tipografia monolítica.",
      client: "Monolith Press & Architecture",
      scope: "Design Editorial, Direção Fotográfica, Produção Gráfica",
      impact: "Destaque na Bienal Internacional do Livro e Design"
    },
    "5": {
      title: "Kroma Sneakerlab Concept",
      category: "Direção de Arte & E-commerce",
      year: "2025",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=900&auto=format&fit=crop",
      description: "Lançamento da linha de tênis urbanos futuristas. Desenvolvimento do universo visual da marca, renderizações 3D interativas dos calçados e loja digital com checkout sem atrito.",
      client: "Kroma Footwear Ltd.",
      scope: "Direção de Arte, Web Design 3D, Campanha Digital",
      impact: "Vencedor de Site of the Day e +50k acessos no drop"
    },
    "6": {
      title: "Zenith Hi-Fi Acoustics",
      category: "Packaging & Brand Identity",
      year: "2026",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop",
      description: "Identidade visual para equipamentos de áudio espacial profissional. Criação de embalagem com fechamento magnético, manual ilustrado e cartela cromática inspirada em frequências sonoras.",
      client: "Zenith Audio Labs",
      scope: "Branding, Packaging de Luxo, Sinalização de Produto",
      impact: "Expansão para 18 mercados internacionais de áudio hi-fi"
    }
  };

  const modal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalYear = document.getElementById('modal-year');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalClient = document.getElementById('modal-client');
  const modalScope = document.getElementById('modal-scope');
  const modalImpact = document.getElementById('modal-impact');

  function openProjectModal(projectId) {
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
  }

  function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
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
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     7. FORMULÁRIO DE CONTATO COM JON (VALIDAÇÃO & FEEDBACK)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const messageInput = document.getElementById('user-message');
  const charCounter = document.getElementById('char-counter');
  const toast = document.getElementById('toast');

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
      errorEl.classList.remove('visible');
    } else {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      errorEl.classList.add('visible');
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

      setTimeout(() => {
        contactForm.reset();
        nameInput.classList.remove('is-valid');
        emailInput.classList.remove('is-valid');
        messageInput.classList.remove('is-valid');
        charCounter.textContent = '0 / 500';

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4500);
      }, 700);
    }
  });

  /* ==========================================================================
     8. BOTÃO VOLTAR AO TOPO
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
