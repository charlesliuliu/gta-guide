/* ========================================
   Los Santos Guide — Navigation & Search
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Mobile Menu Toggle ----------
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header')) nav.classList.remove('open');
        });
    }

    // ---------- Search ----------
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // Simple client-side search: redirects to a search page (or later, filter in-page)
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
