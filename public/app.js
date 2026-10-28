/* =========================================================
   RIDER MARKET — interacciones
   Sin dependencias. Funciona con archivos estáticos.
   ========================================================= */
(() => {
  'use strict';

  const body = document.body;
  const WHATSAPP = (body.dataset.whatsapp || '').replace(/[^\d]/g, '');
  const SITE_URL = body.dataset.siteUrl || window.location.href;
  const SITE_TITLE = 'Rider Market';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer = 0;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  /* ---------- Bloqueo de scroll ---------- */
  const openDialogs = new Set();

  function lockScroll() {
    body.classList.add('is-locked');
  }

  function unlockScroll() {
    if (openDialogs.size === 0) body.classList.remove('is-locked');
  }

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    openDialogs.add(dialog);
    lockScroll();
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    openDialogs.delete(dialog);
    unlockScroll();
  }

  /* ---------- Menú móvil ---------- */
  const menuDialog = $('#menu-dialog');
  const menuOpenBtn = $('[data-menu-open]');

  function setMenuExpanded(value) {
    if (menuOpenBtn) menuOpenBtn.setAttribute('aria-expanded', String(value));
  }

  function openMenu() {
    if (!menuDialog) return;
    openDialog(menuDialog);
    setMenuExpanded(true);
    const firstLink = $('.menu-nav a', menuDialog);
    if (firstLink) firstLink.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!menuDialog) return;
    closeDialog(menuDialog);
    setMenuExpanded(false);
    if (menuOpenBtn) menuOpenBtn.focus({ preventScroll: true });
  }

  if (menuOpenBtn) {
    menuOpenBtn.addEventListener('click', () => {
      if (menuDialog && menuDialog.open) closeMenu();
      else openMenu();
    });
  }

  $$('[data-menu-close]').forEach((btn) => {
    btn.addEventListener('click', closeMenu);
  });

  if (menuDialog) {
    $$('.menu-nav a', menuDialog).forEach((link) => {
      link.addEventListener('click', () => closeDialog(menuDialog));
    });
    menuDialog.addEventListener('close', () => {
      openDialogs.delete(menuDialog);
      unlockScroll();
      setMenuExpanded(false);
    });
  }

  /* ---------- Filtros de productos ---------- */
  const productGrid = $('#products-grid');
  const productCards = productGrid ? $$('.product-card', productGrid) : [];
  const productFilters = $$('[data-product-filter]');
  const productCount = $('#product-count');

  function applyProductFilter(filter) {
    let visible = 0;

    productCards.forEach((card) => {
      const matches = filter === 'Todos' || card.dataset.category === filter;
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    productFilters.forEach((btn) => {
      const active = btn.dataset.productFilter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    if (productCount) {
      const label = filter === 'Todos' ? 'productos' : filter.toLowerCase();
      productCount.textContent = `${visible} ${label}`;
    }
  }

  productFilters.forEach((btn) => {
    btn.addEventListener('click', () => applyProductFilter(btn.dataset.productFilter));
  });

  /* ---------- Filtros de galería ---------- */
  const galleryGrid = $('#gallery-grid');
  const galleryItems = galleryGrid ? $$('.gallery-item', galleryGrid) : [];
  const galleryFilters = $$('[data-gallery-filter]');

  function applyGalleryFilter(filter) {
    galleryItems.forEach((item) => {
      const matches = filter === 'Todas' || item.dataset.galleryCategory === filter;
      item.hidden = !matches;
    });

    galleryFilters.forEach((btn) => {
      const active = btn.dataset.galleryFilter === filter;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  galleryFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyGalleryFilter(btn.dataset.galleryFilter);
      if (lightbox && lightbox.open) closeLightbox();
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightbox-img');
  const lightboxCaption = $('#lightbox-caption');
  const lightboxType = $('#lightbox-type');
  const lightboxCount = $('#lightbox-count');
  let lightboxList = [];
  let lightboxIndex = 0;
  let lastLightboxTrigger = null;

  function bestSource(img) {
    if (!img) return '';
    const srcset = img.getAttribute('srcset');
    if (srcset) {
      const candidates = srcset
        .split(',')
        .map((part) => {
          const [url, size] = part.trim().split(/\s+/);
          return { url, size: parseInt(size, 10) || 0 };
        })
        .filter((candidate) => candidate.url);
      candidates.sort((a, b) => b.size - a.size);
      if (candidates.length) return candidates[0].url;
    }
    return img.currentSrc || img.src;
  }

  function renderLightbox() {
    const item = lightboxList[lightboxIndex];
    if (!item) return;
    const img = $('img', item);
    if (!img || !lightboxImg) return;

    lightboxImg.src = bestSource(img);
    lightboxImg.alt = img.alt || item.dataset.caption || '';
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.caption || '';
    if (lightboxType) lightboxType.textContent = item.dataset.type || '';
    if (lightboxCount) lightboxCount.textContent = `${lightboxIndex + 1} / ${lightboxList.length}`;
  }

  function openLightbox(item, trigger) {
    if (!lightbox) return;
    lightboxList = galleryItems.filter((entry) => !entry.hidden);
    lightboxIndex = lightboxList.indexOf(item);
    if (lightboxIndex < 0) lightboxIndex = 0;
    lastLightboxTrigger = trigger || null;
    renderLightbox();
    openDialog(lightbox);
  }

  function closeLightbox() {
    if (!lightbox) return;
    closeDialog(lightbox);
    if (lightboxImg) {
      lightboxImg.removeAttribute('src');
      lightboxImg.alt = '';
    }
    if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === 'function') {
      lastLightboxTrigger.focus({ preventScroll: true });
    }
  }

  function stepLightbox(direction) {
    if (!lightboxList.length) return;
    lightboxIndex = (lightboxIndex + direction + lightboxList.length) % lightboxList.length;
    renderLightbox();
  }

  galleryItems.forEach((item) => {
    const trigger = $('.gallery-btn', item);
    if (!trigger) return;
    trigger.addEventListener('click', () => openLightbox(item, trigger));
  });

  $$('[data-lightbox-close]').forEach((btn) => btn.addEventListener('click', closeLightbox));
  $$('[data-lightbox-prev]').forEach((btn) => btn.addEventListener('click', () => stepLightbox(-1)));
  $$('[data-lightbox-next]').forEach((btn) => btn.addEventListener('click', () => stepLightbox(1)));

  if (lightbox) {
    lightbox.addEventListener('close', () => {
      openDialogs.delete(lightbox);
      unlockScroll();
      if (lightboxImg) {
        lightboxImg.removeAttribute('src');
        lightboxImg.alt = '';
      }
      if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === 'function') {
        lastLightboxTrigger.focus({ preventScroll: true });
      }
    });
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  /* ---------- Contacto ---------- */
  const contactDialog = $('#contact-dialog');
  const preparedMessage = $('#prepared-message');

  function buildMessage(topic) {
    const subject = (topic || 'Consulta general sobre Rider Market').trim();
    return `Hola Rider Market, quiero consultar por: ${subject}. Vi la página web y quisiera saber disponibilidad y forma de coordinar.`;
  }

  function openWhatsApp(topic) {
    const message = buildMessage(topic);
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function openContact(topic) {
    if (WHATSAPP) {
      openWhatsApp(topic);
      return;
    }
    if (!contactDialog) return;
    if (preparedMessage) preparedMessage.value = buildMessage(topic);
    openDialog(contactDialog);
    const copyBtn = $('[data-copy-message]', contactDialog);
    if (copyBtn) copyBtn.focus({ preventScroll: true });
  }

  $$('[data-consult]').forEach((btn) => {
    btn.addEventListener('click', () => openContact(btn.dataset.consult));
  });

  $$('[data-contact-close]').forEach((btn) => {
    btn.addEventListener('click', () => closeDialog(contactDialog));
  });

  if (contactDialog) {
    contactDialog.addEventListener('close', () => {
      openDialogs.delete(contactDialog);
      unlockScroll();
    });
    contactDialog.addEventListener('click', (event) => {
      if (event.target === contactDialog) closeDialog(contactDialog);
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        /* cae al método alternativo */
      }
    }
    try {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(helper);
      return ok;
    } catch (error) {
      return false;
    }
  }

  $$('[data-copy-message]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = preparedMessage ? preparedMessage.value : '';
      if (!text) return;
      const ok = await copyText(text);
      showToast(ok ? 'Consulta copiada. Ya podés pegarla.' : 'No se pudo copiar. Seleccioná el texto manualmente.');
      if (ok && preparedMessage) {
        preparedMessage.focus();
        preparedMessage.select();
      }
    });
  });

  /* ---------- Compartir ---------- */
  async function shareSite() {
    const shareData = {
      title: SITE_TITLE,
      text: 'Rider Market: servicio de bicicletas, repuestos, accesorios y perfumes en Neuquén.',
      url: SITE_URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }

    const ok = await copyText(SITE_URL);
    showToast(ok ? 'Enlace copiado al portapapeles.' : 'No se pudo copiar el enlace.');
  }

  $$('[data-share]').forEach((btn) => {
    btn.addEventListener('click', shareSite);
  });

  /* ---------- Header con scroll ---------- */
  const header = $('.site-header');
  let lastScrollState = false;

  function onScroll() {
    const scrolled = window.scrollY > 10;
    if (header && scrolled !== lastScrollState) {
      header.classList.toggle('is-scrolled', scrolled);
      lastScrollState = scrolled;
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Navegación activa ---------- */
  const desktopLinks = $$('.desktop-nav a');
  const navSections = desktopLinks
    .map((link) => {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.getElementById(id.slice(1)) : null;
    })
    .filter(Boolean);

  function updateActiveNav() {
    if (!navSections.length) return;
    const marker = window.scrollY + window.innerHeight * 0.35;
    let current = null;

    navSections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });

    desktopLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  const revealItems = $$('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* ---------- Teclado ---------- */
  document.addEventListener('keydown', (event) => {
    if (!lightbox || !lightbox.open) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepLightbox(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepLightbox(1);
    }
  });

  /* ---------- Año del pie ---------- */
  $$('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  /* ---------- Estado inicial ---------- */
  applyProductFilter('Todos');
  applyGalleryFilter('Todas');
  onScroll();

  if (WHATSAPP) {
    const note = $('[data-contact-note]');
    if (note) note.textContent = 'Respondemos consultas por WhatsApp en horario comercial.';
  }
})();
