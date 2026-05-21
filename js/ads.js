/* ========================================
   Los Santos Guide — Google AdSense Config
   ========================================
   To activate ads:
   1. Sign up at https://adsense.google.com
   2. Get your publisher ID (ca-pub-XXXXXXXXXXXXXX)
   3. Replace PUBLISHER_ID below
   4. Uncomment the AdSense script in each page's <head>
   ======================================== */

const ADS_CONFIG = {
    // Replace with your actual AdSense publisher ID
    PUBLISHER_ID: 'ca-pub-0000000000000000',
    enabled: false, // Set to true after you get approved
};

/* Ad slot dimensions for manual placements */
const AD_SLOTS = {
    banner: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    leaderboard: { width: 728, height: 90 },
    inarticle: { width: 468, height: 60 },
};

/**
 * Insert a manual AdSense ad unit into an element.
 * Usage: insertAd(document.getElementById('ad-slot-1'), 'banner')
 */
function insertAd(container, slotType) {
    if (!ADS_CONFIG.enabled || !container) return;
    const slot = AD_SLOTS[slotType] || AD_SLOTS.rectangle;
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'inline-block';
    ins.style.width = slot.width + 'px';
    ins.style.height = slot.height + 'px';
    ins.dataset.adClient = ADS_CONFIG.PUBLISHER_ID;
    ins.dataset.adSlot = ''; // Fill in your ad unit ID from AdSense
    container.appendChild(ins);
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
}

/**
 * Load AdSense SDK dynamically (use if not using static script tag).
 */
function loadAdSense() {
    if (!ADS_CONFIG.enabled || document.querySelector('script[src*="adsbygoogle"]')) return;
    const s = document.createElement('script');
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADS_CONFIG.PUBLISHER_ID;
    s.crossOrigin = 'anonymous';
    s.async = true;
    document.head.appendChild(s);
}
