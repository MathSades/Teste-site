document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger para mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Scroll suave para links do menu
    const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header-fixo').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fechar menu mobile após clicar
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Scroll suave para botão hero
    const heroBtn = document.querySelector('.btn-hero');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#livros');
            if (targetSection) {
                const headerHeight = document.querySelector('.header-fixo').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Funcionalidade do formulário newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado por se inscrever! Em breve você receberá novidades sobre os livros da Nicojoshii.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }

    // Animações ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Verificar se IntersectionObserver é suportado
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Aplicar animação aos cards de obras
        const obraCards = document.querySelectorAll('.obra-card');
        obraCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    } else {
        // Fallback para navegadores sem suporte
        const obraCards = document.querySelectorAll('.obra-card');
        obraCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // Efeito no header ao fazer scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-fixo');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(210, 105, 30, 0.98)';
        } else {
            header.style.background = 'rgba(210, 105, 30, 0.95)';
        }

        lastScrollTop = scrollTop;
    });

    // Adicionar classe ativa ao menu baseado na seção visível
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavItem() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavItem);

    // Adicionar estilos CSS para item ativo via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: #ffd700 !important;
            border-bottom: 2px solid #ffd700;
        }

        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(210, 105, 30, 0.98);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: right 0.3s ease;
            }

            .nav-links.active {
                right: 0;
            }

            .nav-links li {
                margin: 1rem 0;
            }

            .hamburger.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);

    // Funcionalidade do Carrossel de Histórias
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const track = document.querySelector('.carousel-track');
    let autoSlideInterval;

    function updateCarousel() {
        if (!slides.length || !dots.length || !track) return;
        
        // Remover classe active de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Adicionar classe active ao slide e dot atual
        if (slides[currentSlide] && dots[currentSlide]) {
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Mover o track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 10000); // 10 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Inicializar carrossel se existir
    if (slides.length > 0 && dots.length > 0) {
        // Configurar event listeners para os dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });

        // Event listeners para clique nas histórias (vai para seção obras)
        slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                e.preventDefault();
                const obrasSection = document.querySelector('#obras');
                if (obrasSection) {
                    const headerHeight = document.querySelector('.header-fixo').offsetHeight;
                    const targetPosition = obrasSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Pausar auto-slide ao passar o mouse
        const carousel = document.querySelector('.stories-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }

        // Iniciar o carrossel automático
        startAutoSlide();
    }

    // ===================== ANIMAÇÕES DE ESTATÍSTICAS =====================

    // Função para animar contadores
    function animateCounter(element, target, duration = 2000) {
        // Em dispositivos móveis ou se o elemento não estiver visível, mostrar valor direto
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile || !element.offsetParent) {
            // Mostrar valor final imediatamente em dispositivos móveis
            if (target >= 1000) {
                element.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
            } else {
                element.textContent = target;
            }
            return;
        }

        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (easeOutQuad)
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(start + (target - start) * easeProgress);

            if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(current >= 10000 ? 0 : 1) + 'K';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (target >= 1000) {
                    element.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
                } else {
                    element.textContent = target;
                }
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Configurar Intersection Observer para estatísticas
    const statsObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };

    if ('IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');

                    // Animar números
                    const countElements = entry.target.querySelectorAll('[data-count]');
                    countElements.forEach(element => {
                        const target = parseInt(element.dataset.count);
                        // Garantir que o número seja exibido
                        if (!element.textContent || element.textContent === '0') {
                            animateCounter(element, target);
                        }
                    });

                    // Animar barras de progresso
                    const progressBars = entry.target.querySelectorAll('.progress-bar[data-width]');
                    progressBars.forEach(bar => {
                        setTimeout(() => {
                            bar.style.width = bar.dataset.width;
                        }, 500);
                    });

                    // Animar cards com delay
                    const statCards = entry.target.querySelectorAll('.stat-card, .achievement-item');
                    statCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, statsObserverOptions);

        // Observar seção de estatísticas
        const statsSection = document.querySelector('.estatisticas');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    } else {
        // Fallback: mostrar números diretamente se IntersectionObserver não estiver disponível
        const statsSection = document.querySelector('.estatisticas');
        if (statsSection) {
            const countElements = statsSection.querySelectorAll('[data-count]');
            countElements.forEach(element => {
                const target = parseInt(element.dataset.count);
                if (target >= 1000) {
                    element.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
                } else {
                    element.textContent = target;
                }
            });
        }
    }

    // Garantir que os números sejam exibidos no carregamento em dispositivos móveis
    window.addEventListener('load', function() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            const countElements = document.querySelectorAll('[data-count]');
            countElements.forEach(element => {
                if (!element.textContent || element.textContent === '0') {
                    const target = parseInt(element.dataset.count);
                    if (target >= 1000) {
                        element.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
                    } else {
                        element.textContent = target;
                    }
                }
            });
        }
    });

    // ===================== ANIMAÇÕES DE CONTATO =====================

    // Configurar animações para seção de contato
    if ('IntersectionObserver' in window) {
        const contactObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('contact-animated')) {
                    entry.target.classList.add('contact-animated');

                    // Animar cards de plataforma com delay
                    const platformCards = entry.target.querySelectorAll('.platform-card');
                    platformCards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });

                    // Animar opções de contato
                    const contactOptions = entry.target.querySelectorAll('.contact-option');
                    contactOptions.forEach((option, index) => {
                        option.style.opacity = '0';
                        option.style.transform = 'translateX(-30px)';
                        option.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

                        setTimeout(() => {
                            option.style.opacity = '1';
                            option.style.transform = 'translateX(0)';
                        }, index * 100 + 600);
                    });
                }
            });
        }, { threshold: 0.2 });

        // Observar seção de contato
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactObserver.observe(contactSection);
        }
    }

    // ===================== MELHORIAS NO FORMULÁRIO =====================

    // Melhorar formulário de newsletter
    const enhancedForm = document.querySelector('.newsletter-form-enhanced');
    if (enhancedForm) {
        enhancedForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.innerHTML;

            if (email) {
                // Animação de loading
                button.innerHTML = '<span>Enviando... 🚀</span>';
                button.disabled = true;

                setTimeout(() => {
                    button.innerHTML = '<span>Sucesso! 🎉</span>';
                    button.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';

                    setTimeout(() => {
                        alert('🦊 Parabéns! Você agora faz parte da nossa comunidade exclusiva! Em breve você receberá conteúdos incríveis da Nicojoshii diretamente na sua caixa de entrada.');
                        this.querySelector('input[type="email"]').value = '';
                        button.innerHTML = originalText;
                        button.disabled = false;
                        button.style.background = 'linear-gradient(45deg, #fdcb6e, #fd79a8)';
                    }, 2000);
                }, 1500);
            }
        });

        // Efeito de foco no input
        const emailInput = enhancedForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.boxShadow = '0 10px 30px rgba(253, 203, 110, 0.3)';
            });

            emailInput.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                this.parentElement.style.boxShadow = 'none';
            });
        }
    }

    // ===================== EFEITOS VISUAIS EXTRAS =====================

    // Efeito de partículas nas estatísticas (opcional)
    function createFloatingEmoji() {
        const emojis = ['✨', '🌟', '💫', '⭐', '🔥', '💜', '🦊'];
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.fontSize = '1.5rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '1000';
        emoji.style.left = Math.random() * window.innerWidth + 'px';
        emoji.style.top = window.innerHeight + 'px';
        emoji.style.opacity = '0.7';
        emoji.style.animation = 'float-up 4s ease-out forwards';

        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 4000);
    }

    // Adicionar animação CSS para emoji flutuante
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(floatStyle);

    // Criar emojis flutuantes ocasionalmente quando estiver na seção de estatísticas
    setInterval(() => {
        const statsSection = document.querySelector('.estatisticas');
        if (statsSection && statsSection.classList.contains('animated')) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (Math.random() < 0.3) { // 30% de chance
                    createFloatingEmoji();
                }
            }
        }
    }, 3000);
});
