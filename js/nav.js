/* ========================================
   Los Santos Guide — Navigation & Search
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Mobile Menu Toggle ----------
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    if (toggle && nav && header) {
        const toggleIcon = toggle;
        const headerContainer = header.querySelector('.container');
        let navMoved = false;

        function openMenu() {
            // Move nav-links to body to escape header's stacking context
            if (!navMoved) {
                document.body.appendChild(nav);
                navMoved = true;
            }
            nav.classList.add('open');
            toggleIcon.innerHTML = '&#10005;'; // X icon
            toggleIcon.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            nav.classList.remove('open');
            // Move nav-links back into header for desktop layout
            if (navMoved && headerContainer) {
                headerContainer.appendChild(nav);
                navMoved = false;
            }
            toggleIcon.innerHTML = '&#9776;'; // hamburger icon
            toggleIcon.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.contains('open') ? closeMenu() : openMenu();
        });

        // Close on outside click/tap
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header') && !e.target.closest('.nav-links') && nav.classList.contains('open')) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
        });

        // On window resize: if going back to desktop, close menu and restore position
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // ---------- Search ----------
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                const q = encodeURIComponent(searchInput.value.trim());
                window.location.href = 'search.html?q=' + q;
            }
        });
    }

    // ---------- Highlight Current Nav ----------
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && currentPath.endsWith(href)) {
            a.classList.add('active');
        }
    });
});
