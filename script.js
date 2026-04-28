// ============================================
// WEDDING LAB - PORTFOLIO SCRIPT (NO DATA COLLECTION)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    const body = document.body;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const setMenuState = (isOpen) => {
        if (!navLinks || !menuToggle) return;

        navLinks.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
        body.classList.toggle('menu-open', isOpen);
    };
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            setMenuState(!navLinks.classList.contains('active'));
        });
    }

    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (navLinks && navLinks.classList.contains('active')) {
                    setMenuState(false);
                }
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!navLinks || !menuToggle || !navLinks.classList.contains('active')) return;
        if (navLinks.contains(e.target) || menuToggle.contains(e.target)) return;
        setMenuState(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navLinks && navLinks.classList.contains('active')) {
            setMenuState(false);
        }
    });

    // 4. CURRENT YEAR IN FOOTER
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('#currentYear').forEach(el => {
        el.textContent = currentYear;
    });

    // 5. BACK TO TOP BUTTON
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. OPEN DEMO LINKS IN MOBILE-SIZE WINDOW
    // Находим все ссылки "Демо" и открываем их в окне мобильного размера
    const allDemoLinks = document.querySelectorAll('.portfolio-link');
    
    allDemoLinks.forEach(link => {
        // Проверяем, что это ссылка "Демо" (имеет иконку external-link-alt)
        const hasDemoIcon = link.querySelector('.fa-external-link-alt');
        
        if (hasDemoIcon) {
            const href = link.getAttribute('href');
            
            // Только если ссылка реальная (не пустая и не #)
            if (href && href !== '#' && href !== '') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const url = this.getAttribute('href');
                    
                    // Размеры мобильного окна
                    const width = 400;
                    const height = 844;
                    
                    // Вычисляем позицию для центрирования окна
                    const left = (window.screen.width - width) / 2;
                    const top = (window.screen.height - height) / 2;
                    
                    // Параметры окна
                    const windowFeatures = [
                        `width=${width}`,
                        `height=${height}`,
                        `left=${left}`,
                        `top=${top}`,
                        'menubar=no',
                        'toolbar=no',
                        'location=no',
                        'status=no',
                        'scrollbars=yes',
                        'resizable=yes'
                    ].join(',');
                    
                    // Открываем новое окно с мобильными размерами
                    const mobileWindow = window.open(url, '_blank', windowFeatures);
                    
                    // Проверка на блокировку всплывающих окон
                    if (!mobileWindow || mobileWindow.closed || typeof mobileWindow.closed === 'undefined') {
                        alert('⚠️ Всплывающее окно заблокировано браузером.\n\nПожалуйста, разрешите всплывающие окна для этого сайта, чтобы просматривать шаблоны в мобильном формате.\n\nИли откройте ссылку вручную:\n' + url);
                    }
                });
            }
        }
    });

    console.log('WeddingLab Portfolio — информационный сайт. Сбор данных не ведется. Демо-ссылки открываются в мобильном окне.');
});

// ============================================
// IMAGE MODAL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    
    // Close modal when clicking on X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle "Подробнее" links (show modal with image)
    // Handle "Подробнее" links (show modal with image)
const allLinks = document.querySelectorAll('.portfolio-link');

allLinks.forEach(link => {
    const isDetailLink = link.querySelector('.fa-code');
    
    // Только для ссылок "Подробнее"
    if (isDetailLink) {
        const href = link.getAttribute('href');
        
        // Если ссылка пустая - показываем модальное окно с фото
        if (!href || href === '#' || href === '') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const portfolioItem = this.closest('.portfolio-item');
                const img = portfolioItem.querySelector('.portfolio-image');
                const title = portfolioItem.querySelector('.portfolio-title').textContent;
                
                if (modal && modalImg && img) {
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    modalCaption.textContent = `${title} - полноразмерный просмотр`;
                    
                    // Очищаем и добавляем структуру с контейнером
                    modal.innerHTML = '';
                    
                    const closeBtn = document.createElement('span');
                    closeBtn.className = 'modal-close';
                    closeBtn.innerHTML = '&times;';
                    
                    const container = document.createElement('div');
                    container.className = 'modal-container';
                    
                    const newModalImg = document.createElement('img');
                    newModalImg.className = 'modal-content-img';
                    newModalImg.src = img.src;
                    newModalImg.alt = img.alt;
                    
                    const caption = document.createElement('div');
                    caption.className = 'modal-caption';
                    caption.textContent = `${title} - полноразмерный просмотр`;
                    
                    container.appendChild(newModalImg);
                    modal.appendChild(closeBtn);
                    modal.appendChild(container);
                    modal.appendChild(caption);
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Пересохраняем ссылки на элементы
                    window.modalImgElement = newModalImg;
                    
                    // Закрытие по клику на крестик
                    closeBtn.onclick = function() {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    };
                    
                    // Закрытие по клику вне изображения
                    modal.onclick = function(e) {
                        if (e.target === modal) {
                            modal.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }
                    };
                }
            });
        }
    }
});
});
