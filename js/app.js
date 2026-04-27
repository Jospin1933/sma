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
        const loader = $('#loader');
        if (!loader) return;
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 600);
        });
    }

    // ==================== DARK MODE ====================
    function initDarkMode() {
        const toggle = $('#themeToggle');
        if (!toggle) return;
        
        // Appliquer le mode sauvegardé
        if (localStorage.getItem('sma-dark') === 'true') {
            document.body.classList.add('dark');
        }
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('sma-dark', document.body.classList.contains('dark'));
        });
    }

    // ==================== MENU MOBILE ====================
    function initMobileMenu() {
        const toggle = $('#menuToggle');
        const nav = $('#navLinks');
        if (!toggle || !nav) return;
        
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active');
            toggle.setAttribute('aria-expanded', expanded);
        });
        
        // Fermer au clic sur un lien
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==================== CAROUSEL (Page Accueil) ====================
    function initCarousel() {
        const slidesContainer = $('#carouselSlides');
        const dotsContainer = $('#carouselDots');
        const prevBtn = $('#carouselPrev');
        const nextBtn = $('#carouselNext');
        
        if (!slidesContainer || !dotsContainer) return;
        
        const slides = [
            {
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
                title: 'Stratégie Digitale',
                description: 'Des campagnes qui performent'
            },
            {
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
                title: 'Création Web Premium',
                description: 'Sites modernes et performants'
            },
            {
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
                title: 'Automatisation',
                description: 'Optimisez vos processus'
            }
        ];
        
        let currentSlide = 0;
        let autoplayInterval;
        
        // Générer les slides
        slides.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = 'carousel-slide';
            slideEl.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" loading="${index === 0 ? 'eager' : 'lazy'}">
                <div class="carousel-slide-content">
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
        
        const allSlides = $$('.carousel-slide', slidesContainer);
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
        
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 4000);
        }
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        startAutoplay();
        slidesContainer.addEventListener('mouseenter', stopAutoplay);
        slidesContainer.addEventListener('mouseleave', startAutoplay);
    }

    // ==================== SECTEURS & SERVICES (Page Services) ====================
    function initSectorsAndServices() {
        const secteursGrid = $('#secteursGrid');
        const servicesGrid = $('#servicesGrid');
        
        const secteurs = [
            { name: 'Écoles', icon: 'fa-graduation-cap', desc: 'Solutions éducatives digitales' },
            { name: 'Magasins', icon: 'fa-store', desc: 'E-commerce & vitrine' },
            { name: 'PME', icon: 'fa-building', desc: 'Croissance digitale' },
            { name: 'ONG', icon: 'fa-hand-holding-heart', desc: 'Visibilité & dons' },
            { name: 'Hôtels', icon: 'fa-hotel', desc: 'Réservation en ligne' },
            { name: 'Hôpitaux', icon: 'fa-hospital', desc: 'Prise de RDV digitale' },
            { name: 'Minings', icon: 'fa-gem', desc: 'Communication corporate' },
            { name: 'Autres', icon: 'fa-ellipsis', desc: 'Sur mesure' }
        ];
        
        const services = [
            { name: 'Création site web', icon: 'fa-globe', desc: 'Sites vitrine & e-commerce' },
            { name: 'Applications web', icon: 'fa-mobile-screen', desc: 'PWAs performantes' },
            { name: 'Automatisation', icon: 'fa-robot', desc: 'Processus optimisés' },
            { name: 'Marketing digital', icon: 'fa-bullhorn', desc: 'SEO, SEA, SMM' },
            { name: 'Branding', icon: 'fa-palette', desc: 'Identité visuelle' }
        ];
        
        if (secteursGrid) {
            secteurs.forEach(s => {
                secteursGrid.innerHTML += `
                    <div class="card">
                        <div class="card-icon"><i class="fas ${s.icon}"></i></div>
                        <h3>${s.name}</h3>
                        <p>${s.desc}</p>
                    </div>`;
            });
        }
        
        if (servicesGrid) {
            services.forEach(s => {
                servicesGrid.innerHTML += `
                    <div class="card">
                        <div class="card-icon"><i class="fas ${s.icon}"></i></div>
                        <h3>${s.name}</h3>
                        <p>${s.desc}</p>
                    </div>`;
            });
        }
    }

    // ==================== CONFIGURATEUR (Page Configurateur) ====================
    function initConfigurator() {
        const steps = $$('.step-content');
        const stepDots = $$('.step-dot');
        const progressFill = $('#progressFill');
        const prevBtn = $('#prevBtn');
        const nextBtn = $('#nextBtn');
        const whatsappBtn = $('#whatsappBtn');
        const sectorOptions = $('#sectorOptions');
        const serviceOptions = $('#serviceOptions');
        const summaryBox = $('#summaryBox');
        const totalPriceEl = $('#totalPrice');
        
        if (!steps.length || !nextBtn) return;
        
        let currentStep = 0;
        let selectedSector = null;
        let selectedServices = [];
        
        const secteurs = ['Écoles', 'Magasins', 'PME', 'ONG', 'Hôtels & Restaurants', 'Hôpitaux', 'Minings', 'Autres'];
        const servicesList = [
            { name: 'Création site web', price: 500 },
            { name: 'Applications web', price: 800 },
            { name: 'Automatisation digitale', price: 600 },
            { name: 'Marketing digital', price: 400 },
            { name: 'Branding', price: 350 }
        ];
        
        // Générer options secteurs
        if (sectorOptions) {
            secteurs.forEach(s => {
                sectorOptions.innerHTML += `
                    <div class="option-card" data-sector="${s}">
                        <i class="fas fa-building"></i>
                        <div>${s}</div>
                    </div>`;
            });
        }
        
        // Générer options services
        if (serviceOptions) {
            servicesList.forEach(s => {
                serviceOptions.innerHTML += `
                    <div class="option-card" data-service="${s.name}" data-price="${s.price}">
                        <i class="fas fa-check-circle"></i>
                        <div>${s.name}</div>
                        <small>+${s.price}€</small>
                    </div>`;
            });
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
            nextBtn.style.display = currentStep >= steps.length - 1 ? 'none' : 'inline-flex';
            whatsappBtn.style.display = currentStep >= steps.length - 1 ? 'inline-flex' : 'none';
            
            // Générer résumé
            if (currentStep === 3) {
                const maintenance = $('#maintenance')?.checked || false;
                const seo = $('#seo')?.checked || false;
                const hosting = $('#hosting')?.checked || false;
                
                let total = selectedServices.reduce((sum, s) => sum + s.price, 0);
                if (maintenance) total += 100;
                if (seo) total += 300;
                if (hosting) total += 50;
                
                if (summaryBox) {
                    summaryBox.innerHTML = `
                        <div class="summary-item"><span>Secteur</span><strong>${selectedSector || 'Non sélectionné'}</strong></div>
                        <div class="summary-item"><span>Services</span><strong>${selectedServices.map(s => s.name).join(', ') || 'Aucun'}</strong></div>
                        ${maintenance ? '<div class="summary-item"><span>Maintenance</span><strong>+100€/mois</strong></div>' : ''}
                        ${seo ? '<div class="summary-item"><span>SEO</span><strong>+300€</strong></div>' : ''}
                        ${hosting ? '<div class="summary-item"><span>Hébergement</span><strong>+50€/mois</strong></div>' : ''}
                    `;
                }
                if (totalPriceEl) totalPriceEl.textContent = `Estimation : ${total}€`;
                
                // Sauvegarder dans localStorage
                localStorage.setItem('sma-config', JSON.stringify({
                    sector: selectedSector,
                    services: selectedServices,
                    maintenance, seo, hosting, total
                }));
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
        
        // WhatsApp
        whatsappBtn?.addEventListener('click', () => {
            const data = JSON.parse(localStorage.getItem('sma-config') || '{}');
            const message = `Bonjour SMA Agency,%0A%0A📋 *Configuration de mon projet*%0A🏢 Secteur: ${data.sector || 'N/A'}%0A🛠 Services: ${data.services?.map(s => s.name).join(', ') || 'N/A'}%0A💰 Estimation: ${data.total || 0}€%0A%0AMerci de me recontacter !`;
            window.open(`https://wa.me/243123456789?text=${message}`, '_blank');
        });
        
        updateStep();
    }

    // ==================== ANIMATIONS SCROLL ====================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.card, .option-card, .glass-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
                    const duration = 1500;
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
        }, { threshold: 0.5 });
        
        statNumbers.forEach(el => observer.observe(el));
    }

    // ==================== INITIALISATION ====================
    function init() {
        initLoader();
        initDarkMode();
        initMobileMenu();
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