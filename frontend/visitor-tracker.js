// Add this script to your website pages to track visitors
(function() {
    // Track page visit
    function trackVisitor() {
        const visitorData = {
            page: window.location.href,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent
        };
        
        fetch('http://localhost:5000/api/visitor-tracking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitorData)
        }).catch(e => console.log('Tracking error:', e));
    }
    
    // Track when visitor leaves email (lead magnet)
    function trackEmailCapture(email, source = 'website') {
        const leadData = {
            name: 'Website Visitor',
            email: email,
            source: source,
            message: 'Email captured from ' + window.location.href
        };
        
        fetch('http://localhost:5000/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });
    }
    
    // Auto-track page visit
    trackVisitor();
    
    // Make functions available globally
    window.trackEmailCapture = trackEmailCapture;
})();