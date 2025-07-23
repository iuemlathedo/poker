// Function to load HTML components
async function loadComponent(elementId, componentPath, priority = false) {
    try {
        const response = await fetch(componentPath, {
            priority: priority ? 'high' : 'auto'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = html;
            
            // Initialize scroll to top if this is the scroll-to-top component
            if (elementId === 'scroll-to-top-container') {
                initScrollToTop();
            }

            // Update active state for navigation components
            if (elementId === 'header-container' || elementId === 'bottom-nav-container') {
                updateActiveNav();
            }
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Function to update active state in navigation
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update main navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'trang-chu.html')) {
            link.classList.add('active');
        }
    });
    
    // Update bottom navigation
    document.querySelectorAll('.bottom-nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'trang-chu.html')) {
            link.classList.add('active');
        }
    });
}

// Function to initialize scroll to top
function initScrollToTop() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (!scrollToTopButton) {
        console.error('Scroll to top button not found');
        return;
    }

    // Show button if page is scrolled
    if (window.pageYOffset > 100) {
        scrollToTopButton.classList.add('visible');
    }

    // ThĂªm debounce Ä‘á»ƒ trĂ¡nh gá»i quĂ¡ nhiá»u láº§n
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Láº¥y vá»‹ trĂ­ scroll hiá»‡n táº¡i
            const scrollPosition = window.pageYOffset;
            // Láº¥y chiá»u cao cá»§a trang
            const pageHeight = document.documentElement.scrollHeight;
            // Láº¥y chiá»u cao cá»§a viewport
            const viewportHeight = window.innerHeight;
            
            // Hiá»ƒn thá»‹ button khi:
            // 1. Scroll xuá»‘ng quĂ¡ 100px
            // 2. Hoáº·c khi Ä‘Ă£ scroll gáº§n Ä‘áº¿n cuá»‘i trang (cĂ²n 200px)
            if (scrollPosition > 100 || (pageHeight - viewportHeight - scrollPosition) < 200) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        }, 10);
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Load components immediately when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load critical navigation components first in parallel
        await Promise.all([
            loadComponent('header-container', 'components/header.html', true),
            loadComponent('bottom-nav-container', 'components/bottom-nav.html', true)
        ]);
        
        // Load other components in parallel
        await Promise.all([
            loadComponent('footer-container', 'components/footer.html'),
            loadComponent('floating-social-container', 'components/floating-social.html'),
            loadComponent('scroll-to-top-container', 'components/scroll-to-top.html')
        ]);
    } catch (error) {
        console.error('Error loading components:', error);
    }
}); 
