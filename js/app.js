/**
 * ============================================
 * SMA AGENCY - JAVASCRIPT PARTAGÉ
 * ============================================
 * Fonctionnalités : Loader, Dark Mode, Menu Mobile,
 * Carousel, Configurateur, WhatsApp, Animations
 * ============================================
 */

(function() {
    'use strict';

    // ==================== UTILITAIRES ====================
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    // ==================== LOADER ====================
    function initLoader() {
        const loader = $('#logoLoader');
        if (!loader) return;
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 700);
            }, 1800);
        });
        // Fallback si le chargement prend trop de temps
        setTimeout(() => {
            if (loader && !loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                setTimeout(() => {
                    if (loader.parentNode) loader.parentNode.removeChild(loader);
                }, 700);
            }
        }, 5000);
    }

    // ==================== DARK MODE ====================
    function initDarkMode() {
        const toggle = $('#themeToggle');
        if (!toggle) return;
        
        // Appliquer le mode sauvegardé
        if (localStorage.getItem('sma-dark-mode') === 'true') {
            document.body.classList.add('dark');
        }
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('sma-dark-mode', document.body.classList.contains('dark'));
        });
    }

    // ==================== MENU MOBILE ====================
    function initMobileMenu() {
        const burger = $('#menuBurger');
        const nav = $('#navLinks');
        if (!burger || !nav) return;
        
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active');
            burger.setAttribute('aria-expanded', expanded);
        });
        
        // Fermer au clic sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fermer au clic sur l'overlay (si présent)
        const overlay = $('#overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                overlay.classList.remove('active');
            });
        }
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    function initNavbarScroll() {
        const navbar = $('#navbar');
        if (!navbar) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==================== CAROUSEL (Page Accueil) ====================
    function initCarousel() {
        const slidesContainer = $('#carouselSlides');
        const dotsContainer = $('#carouselDots');
        const prevBtn = $('#carouselPrev');
        const nextBtn = $('#carouselNext');
        
        if (!slidesContainer || !dotsContainer) return;
        
        // Images locales avec fallback
        const slides = [
            {
                image: 'images/intel.png',
                fallback: 'https://images.unsplash.com/photo-1523803326055-b6b44c32e1a6?w=800&h=550&fit=crop',
                title: 'Innovation Digitale en Afrique',
                description: 'Des solutions intelligentes adaptees au marche congolais'
            },
            {
                image: 'images/strategie.webp',
                fallback: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&h=550&fit=crop',
                title: 'Strategie Social Media',
                description: 'Campagnes engageantes pour le public africain'
            },
            {
                image: 'images/iapro.png',
                fallback: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=550&fit=crop',
                title: 'IA et Automatisation locale',
                description: 'Booster votre productivite avec l intelligence artificielle'
            },
            {
                image: 'images/logiciel.png',
                fallback: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=550&fit=crop',
                title: 'Business Africain 2.0',
                description: 'Propulser votre entreprise vers le futur digital'
            }
        ];
        
        let currentSlide = 0;
        let autoplayInterval;
        
        // Générer les slides
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'carousel-slide';
            slideEl.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" 
                     loading="${index === 0 ? 'eager' : 'lazy'}"
                     onerror="this.onerror=null; this.src='${slide.fallback}';">
                <div class="carousel-slide-overlay">
                    <h3>${slide.title}</h3>
                    <p>${slide.description}</p>
                </div>
            `;
            slidesContainer.appendChild(slideEl);
            
            // Dots
            const dot = document.createElement('span');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const allDots = $$('.carousel-dot', dotsContainer);
        
        function goToSlide(index) {
            currentSlide = index;
            slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            allDots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
        }
        
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        
        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 4500);
        }
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }
        
        // Touch swipe pour mobile
        let touchStartX = 0;
        slidesContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        slidesContainer.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
                resetAutoplay();
            }
        });
        
        startAutoplay();
        slidesContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        slidesContainer.addEventListener('mouseleave', startAutoplay);
    }

    // ==================== SECTEURS & SERVICES (Page Services) ====================
    function initSectorsAndServices() {
        const secteursGrid = $('#secteursGrid');
        const servicesGrid = $('#servicesGrid');
        
        const secteurs = [
            { name: 'Ecoles & Universites', icon: 'fa-graduation-cap', desc: 'Plateformes e-learning intelligentes' },
            { name: 'Magasins & E-commerce', icon: 'fa-store', desc: 'Boutiques en ligne performantes' },
            { name: 'PME & Startups', icon: 'fa-rocket', desc: 'Sites vitrine, branding complet' },
            { name: 'ONG & Associations', icon: 'fa-hand-holding-heart', desc: 'Visibilite, collecte de dons' },
            { name: 'Hotels & Restaurants', icon: 'fa-hotel', desc: 'Reservation en ligne, menus digitaux' },
            { name: 'Hopitaux & Cliniques', icon: 'fa-hospital', desc: 'RDV en ligne, information patient' },
            { name: 'Industrie Miniere', icon: 'fa-gem', desc: 'Communication corporate digitale' },
            { name: 'Autres secteurs', icon: 'fa-building', desc: 'Solution sur mesure' }
        ];
        
        const services = [
            { name: 'Creation Sites Web', icon: 'fa-globe', desc: 'Sites vitrine, e-commerce, institutionnels' },
            { name: 'Applications Web', icon: 'fa-mobile-screen', desc: 'PWAs, dashboards, outils metier' },
            { name: 'Automatisation', icon: 'fa-robot', desc: 'Chatbots, workflows, CRM intelligents' },
            { name: 'Marketing Digital', icon: 'fa-bullhorn', desc: 'SEO, SEA, reseaux sociaux' },
            { name: 'Branding & Design', icon: 'fa-palette', desc: 'Logo, charte graphique complete' },
            { name: 'Community Management', icon: 'fa-comments', desc: 'Contenu engageant, veille' }
        ];
        
        if (secteursGrid) {
            secteursGrid.innerHTML = secteurs.map(s => `
                <div class="card">
                    <div class="card-icon"><i class="fas ${s.icon}"></i></div>
                    <h3>${s.name}</h3>
                    <p>${s.desc}</p>
                </div>
            `).join('');
        }
        
        if (servicesGrid) {
            servicesGrid.innerHTML = services.map(s => `
                <div class="card">
                    <div class="card-icon"><i class="fas ${s.icon}"></i></div>
                    <h3>${s.name}</h3>
                    <p>${s.desc}</p>
                </div>
            `).join('');
        }
    }

    // ==================== CONFIGURATEUR (Page Configurateur) ====================
    function initConfigurator() {
        const steps = $$('.step-content');
        const stepDots = $$('.step-dot');
        const progressFill = $('#progressFill');
        const prevBtn = $('#prevBtn');
        const nextBtn = $('#nextBtn');
        const whatsappLink = $('#whatsappLink');
        const sectorOptions = $('#sectorOptions');
        const serviceOptions = $('#serviceOptions');
        const summaryBox = $('#summaryBox');
        const totalPriceEl = $('#totalPrice');
        
        if (!steps.length || !nextBtn) return;
        
        let currentStep = 0;
        let selectedSector = null;
        let selectedServices = [];
        
        const secteursList = ['Ecoles', 'Magasins & E-commerce', 'PME & Startups', 'ONG', 'Hotels & Restaurants', 'Hopitaux & Cliniques', 'Industrie Miniere', 'Autres'];
        const servicesList = [
            { name: 'Creation Site Web', price: 500, icon: 'fa-globe' },
            { name: 'Application Web', price: 800, icon: 'fa-mobile-screen' },
            { name: 'Automatisation Digitale', price: 600, icon: 'fa-robot' },
            { name: 'Marketing Digital', price: 400, icon: 'fa-bullhorn' },
            { name: 'Branding & Design', price: 350, icon: 'fa-palette' },
            { name: 'Community Management', price: 250, icon: 'fa-comments' }
        ];
        
        // Générer options secteurs
        if (sectorOptions) {
            sectorOptions.innerHTML = secteursList.map(s => `
                <div class="option-card" data-sector="${s}">
                    <i class="fas fa-building"></i>
                    <div>${s}</div>
                </div>
            `).join('');
        }
        
        // Générer options services
        if (serviceOptions) {
            serviceOptions.innerHTML = servicesList.map(s => `
                <div class="option-card" data-service="${s.name}" data-price="${s.price}">
                    <i class="fas ${s.icon}"></i>
                    <div>${s.name}</div>
                    <small>+${s.price}$</small>
                </div>
            `).join('');
        }
        
        // Gérer sélection secteur
        sectorOptions?.addEventListener('click', (e) => {
            const card = e.target.closest('.option-card');
            if (!card) return;
            $$('.option-card', sectorOptions).forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedSector = card.dataset.sector;
        });
        
        // Gérer sélection services
        serviceOptions?.addEventListener('click', (e) => {
            const card = e.target.closest('.option-card');
            if (!card) return;
            card.classList.toggle('selected');
            const service = card.dataset.service;
            const price = parseInt(card.dataset.price);
            if (card.classList.contains('selected')) {
                selectedServices.push({ name: service, price });
            } else {
                selectedServices = selectedServices.filter(s => s.name !== service);
            }
        });
        
        // Navigation
        function updateStep() {
            steps.forEach((s, i) => s.classList.toggle('active', i === currentStep));
            stepDots.forEach((d, i) => {
                d.classList.remove('active', 'done');
                if (i < currentStep) d.classList.add('done');
                if (i === currentStep) d.classList.add('active');
            });
            if (progressFill) progressFill.style.width = ((currentStep + 1) / steps.length * 100) + '%';
            
            prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
            
            if (currentStep === 3) {
                nextBtn.style.display = 'none';
                if (whatsappLink) whatsappLink.style.display = 'inline-flex';
                
                const maintenance = $('#maintenance')?.checked || false;
                const seo = $('#seo')?.checked || false;
                const hosting = $('#hosting')?.checked || false;
                const formation = $('#formation')?.checked || false;
                
                let total = selectedServices.reduce((sum, s) => sum + s.price, 0);
                if (maintenance) total += 50;
                if (seo) total += 200;
                if (hosting) total += 30;
                if (formation) total += 100;
                
                if (summaryBox) {
                    let html = `<div class="summary-item"><span><strong>Secteur</strong></span><span>${selectedSector || 'Non selectionne'}</span></div>`;
                    html += `<div class="summary-item"><span><strong>Services</strong></span><span>${selectedServices.map(s => s.name).join(', ') || 'Aucun'}</span></div>`;
                    if (maintenance) html += `<div class="summary-item"><span>Maintenance mensuelle</span><span>+50$/mois</span></div>`;
                    if (seo) html += `<div class="summary-item"><span>Referencement SEO</span><span>+200$</span></div>`;
                    if (hosting) html += `<div class="summary-item"><span>Hebergement Premium</span><span>+30$/mois</span></div>`;
                    if (formation) html += `<div class="summary-item"><span>Formation utilisateur</span><span>+100$</span></div>`;
                    summaryBox.innerHTML = html;
                }
                if (totalPriceEl) totalPriceEl.textContent = total + ' $';
                
                // WhatsApp message
                if (whatsappLink) {
                    const message = `🛒 *Nouvelle commande SMA Agency*%0A%0A🏢 Secteur: ${selectedSector || 'N/A'}%0A🛠 Services: ${selectedServices.map(s => s.name).join(', ') || 'N/A'}%0A%0A📋 Options supplementaires:%0A${maintenance ? '✅ Maintenance: +50$/mois%0A' : ''}${seo ? '✅ SEO: +200$%0A' : ''}${hosting ? '✅ Hebergement: +30$/mois%0A' : ''}${formation ? '✅ Formation: +100$%0A' : ''}%0A💰 Estimation totale: *${total}$*%0A%0A⚠️ Cette estimation peut varier selon la complexite du projet.%0A%0AMerci de me recontacter pour un devis precis !`;
                    whatsappLink.href = `https://wa.me/243817098280?text=${message}`;
                }
                
                localStorage.setItem('sma-config', JSON.stringify({
                    sector: selectedSector,
                    services: selectedServices,
                    maintenance, seo, hosting, formation, total
                }));
            } else {
                nextBtn.style.display = 'inline-flex';
                if (whatsappLink) whatsappLink.style.display = 'none';
            }
        }
        
        nextBtn.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateStep();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateStep();
            }
        });
        
        updateStep();
    }

    // ==================== ANIMATIONS SCROLL ====================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
            observer.observe(el);
        });
    }

    // ==================== STATS COUNTER (Page Accueil) ====================
    function initStatsCounter() {
        const statNumbers = $$('.stat-number[data-target]');
        if (!statNumbers.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    let current = 0;
                    const duration = 1800;
                    const increment = target / (duration / 16);
                    
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target + '+';
                            clearInterval(counter);
                        } else {
                            el.textContent = Math.floor(current) + '+';
                        }
                    }, 16);
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.6 });
        
        statNumbers.forEach(el => observer.observe(el));
    }

    // ==================== INITIALISATION ====================
    function init() {
        initLoader();
        initDarkMode();
        initMobileMenu();
        initNavbarScroll();
        initCarousel();
        initSectorsAndServices();
        initConfigurator();
        initScrollAnimations();
        initStatsCounter();
    }

    // Démarrer quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();