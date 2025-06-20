document.addEventListener('DOMContentLoaded', function() {
    // Initialize active nav state
    initializeActiveNav();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            scrollToSection(targetId, this);
        });
    });
    
    // "More About Me" button functionality
    const aboutMeBtn = document.getElementById('about-me-btn');
    if (aboutMeBtn) {
        aboutMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutLink = document.querySelector('a[href="#about"]');
            scrollToSection('#about', aboutLink);
        });
    }
    
    // Scroll event handler with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateNavOnScroll, 100);
    });
    
    // Download button functionality - REPLACE WITH YOUR PDF PATH
    // Handle both download buttons in a single block
        const downloadButtons = [
            {
                selector: '.download-btn',
                filePath: 'pdf/resume.pdf',
                fileName: 'Darshil-Soni_Resume.pdf'
            },
            {
                selector: '.download-btn1',
                filePath: 'pdf/portfolio.pdf',
                fileName: 'Darshil-Soni_Portfolio.pdf'
            }
        ];

        downloadButtons.forEach(btn => {
            const element = document.querySelector(btn.selector);
            if (element) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();

                    const link = document.createElement('a');
                    link.href = btn.filePath;
                    link.download = btn.fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
        });


    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted! In a real implementation, this would send the data to a server.');
            this.reset();
        });
    }
    
    // Background elements color change
    setupBackgroundEffects();

    // Helper Functions //

    function initializeActiveNav() {
        // Check current scroll position and set initial active nav
        updateNavOnScroll();
        
        // If no section is active, default to home
        if (!document.querySelector('.nav-link.active, .mobile-nav-link.active')) {
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) updateActiveNav(homeLink);
        }
    }

    function scrollToSection(targetId, clickedLink) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Smooth scroll to section
        try {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } catch (e) {
            targetElement.scrollIntoView(true);
        }
        
        // Update active nav
        updateActiveNav(clickedLink);
    }

    function updateNavOnScroll() {
        const sections = document.querySelectorAll('.fullpage-section');
        let currentSection = '';
        const scrollPosition = window.pageYOffset + (window.innerHeight / 3);
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            const currentLink = document.querySelector(`.nav-link[href="#${currentSection}"], .mobile-nav-link[href="#${currentSection}"]`);
            if (currentLink) {
                updateActiveNav(currentLink);
            }
        }
    }

    function updateActiveNav(activeLink) {
        if (!activeLink) return;
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link and its counterpart
        activeLink.classList.add('active');
        
        const href = activeLink.getAttribute('href');
        if (href) {
            // Find corresponding link in other nav (desktop/mobile)
            const counterpartSelector = activeLink.classList.contains('nav-link') ? 
                `.mobile-nav-link[href="${href}"]` : `.nav-link[href="${href}"]`;
            
            const counterpartLink = document.querySelector(counterpartSelector);
            if (counterpartLink) {
                counterpartLink.classList.add('active');
            }
        }
    }

    function setupBackgroundEffects() {
        const bgElements = document.querySelectorAll('.circle, .square, .triangle');
        if (bgElements.length > 0) {
            const colors = ['#6e45e2', '#88d3ce', '#ff7e5f', '#f9d423', '#50c9c3'];
            
            setInterval(() => {
                bgElements.forEach(element => {
                    if (Math.random() > 0.7) {
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        if (element.classList.contains('triangle')) {
                            element.style.borderBottomColor = randomColor;
                            element.style.backgroundColor = 'transparent';
                        } else {
                            element.style.backgroundColor = randomColor;
                        }
                    }
                });
            }, 3000);
        }
    }
});