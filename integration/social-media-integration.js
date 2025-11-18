// Social Media Integration for LasaniDesigns
class SocialMediaIntegration {
    constructor() {
        this.API_BASE = 'http://localhost:5000/api';
        this.initSocialTracking();
    }

    // Generate UTM links for social media posts
    generateUTMLink(baseUrl, campaign, source, medium = 'social') {
        const params = new URLSearchParams({
            utm_source: source,
            utm_medium: medium,
            utm_campaign: campaign,
            utm_content: 'lasanidesigns'
        });
        return `${baseUrl}?${params.toString()}`;
    }

    // Track social media clicks
    trackSocialClick(platform, campaign) {
        fetch(`${this.API_BASE}/social-tracking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                platform: platform,
                campaign: campaign,
                timestamp: new Date().toISOString(),
                action: 'click'
            })
        });
    }

    // Initialize social media tracking
    initSocialTracking() {
        // Track clicks on social media links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.isSocialLink(link.href)) {
                const platform = this.getPlatform(link.href);
                this.trackSocialClick(platform, 'website_link');
            }
        });
    }

    isSocialLink(url) {
        return /facebook|instagram|twitter|linkedin|youtube/i.test(url);
    }

    getPlatform(url) {
        if (url.includes('facebook')) return 'facebook';
        if (url.includes('instagram')) return 'instagram';
        if (url.includes('twitter')) return 'twitter';
        if (url.includes('linkedin')) return 'linkedin';
        if (url.includes('youtube')) return 'youtube';
        return 'unknown';
    }
}

// Initialize social media integration
new SocialMediaIntegration();