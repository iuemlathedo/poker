$(document).ready(function() {
    // Smooth Scrolling for Navigation Links (top and bottom nav)
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Active Navigation Link on Scroll (top and bottom nav)
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        $('section').each(function() {
            var currentSection = $(this);
            var sectionTop = currentSection.offset().top - 100;
            var sectionBottom = sectionTop + currentSection.height();
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                var currentId = currentSection.attr('id');
                $('.main-nav a, .bottom-nav .nav-item').removeClass('active');
                $('.main-nav a[href="#' + currentId + '"], .bottom-nav .nav-item[href="#' + currentId + '"]').addClass('active');
            }
        });
    });

    // Also highlight on click (for bottom nav)
    $('.bottom-nav .nav-item').on('click', function() {
        $('.bottom-nav .nav-item').removeClass('active');
        $(this).addClass('active');
    });

    // Form Submission
    $('#appointmentForm').submit(function(e) {
        e.preventDefault();
        // Basic form validation
        var isValid = true;
        $(this).find('input, textarea').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        if (isValid) {
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        }
    });

    // Add error styling for form inputs
    $('.form-group input, .form-group textarea').on('input', function() {
        if ($(this).val()) {
            $(this).removeClass('error');
        }
    });

    // Header Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.mobile-menu-btn').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.main-nav').length) {
            $('.nav-links').removeClass('active');
        }
    });

    // Close mobile menu when window is resized above mobile breakpoint
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.nav-links').removeClass('active');
        }
    });

    // Toggle submenu on click (for mobile or desktop if needed)
    $(document).on('click', '.has-submenu > a', function(e) {
        e.preventDefault();
        var parentLi = $(this).parent();
        if (parentLi.hasClass('open')) {
            parentLi.removeClass('open');
        } else {
            $('.has-submenu').removeClass('open');
            parentLi.addClass('open');
        }
    });
});

// Prefetch cĂ¡c trang liĂªn káº¿t
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        if (link.href.startsWith(window.location.origin)) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
        }
    });
}); 
