// Visitor tracking for www.lasanidesigns.com
(function() {
    const API_ENDPOINT = 'http://localhost:5000/api/visitor-tracking';

    function trackPageView() {
        const visitorData = {
            page: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            source: getTrafficSource()
        };

        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitorData)
        }).catch(e => console.log('Tracking error:', e));
    }

    function getTrafficSource() {
        const referrer = document.referrer.toLowerCase();
        if (referrer.includes('facebook')) return 'facebook';
        if (referrer.includes('instagram')) return 'instagram';
        if (referrer.includes('twitter')) return 'twitter';
        if (referrer.includes('linkedin')) return 'linkedin';
        if (referrer.includes('google')) return 'google';
        return referrer ? 'referral' : 'direct';
    }

    // Track page view on load
    trackPageView();

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        navigator.sendBeacon(API_ENDPOINT, JSON.stringify({
            page: window.location.href,
            action: 'time_on_page',
            duration: timeOnPage
        }));
    });
})();