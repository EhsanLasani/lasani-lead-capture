// Integration for LasaniDesigns Website Contact Form
class LasaniWebsiteIntegration {
    constructor() {
        this.API_ENDPOINT = 'http://localhost:5000/api/leads';
        this.initIntegration();
    }

    initIntegration() {
        // Override existing form submission
        this.interceptContactForm();
        this.trackVisitorBehavior();
        this.setupSocialMediaTracking();
    }

    interceptContactForm() {
        // Wait for React component to mount
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const form = contactSection.querySelector('form');
                if (form) {
                    form.addEventListener('submit', this.handleFormSubmission.bind(this));
                }
            }
        }, 2000);
    }

    async handleFormSubmission(event) {
        const formData = new FormData(event.target);
        
        const leadData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            source: 'lasanidesigns_website',
            message: this.buildProjectMessage(formData),
            project_type: formData.get('projectType'),
            service_required: formData.get('serviceRequired'),
            location: formData.get('location'),
            timeline: formData.get('timeline'),
            budget: formData.get('budget')
        };

        try {
            await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData)
            });
            
            // Track conversion
            this.trackConversion('contact_form_submission', leadData);
            
        } catch (error) {
            console.error('Lead capture error:', error);
        }
    }

    buildProjectMessage(formData) {
        return `Project Type: ${formData.get('projectType')}
Service: ${formData.get('serviceRequired')}
Location: ${formData.get('location')}
Timeline: ${formData.get('timeline')}
Budget: ${formData.get('budget')}
Requirements: ${formData.get('requirements')}`;
    }

    trackVisitorBehavior() {
        // Track page sections viewed
        const sections = ['hero', 'portfolio', 'process', 'contact'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                this.observeSection(section, sectionId);
            }
        });
    }

    observeSection(element, sectionName) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackEvent('section_viewed', { section: sectionName });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    setupSocialMediaTracking() {
        // Track WhatsApp clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href.includes('wa.me')) {
                this.trackEvent('whatsapp_click', {
                    office: link.href.includes('918356021693') ? 'mumbai' : 'dubai'
                });
            }
            
            // Track phone clicks
            if (link && link.href.startsWith('tel:')) {
                this.trackEvent('phone_click', {
                    number: link.href.replace('tel:', '')
                });
            }
        });
    }

    trackEvent(eventName, data) {
        fetch('http://localhost:5000/api/visitor-tracking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: eventName,
                data: data,
                page: window.location.href,
                timestamp: new Date().toISOString()
            })
        }).catch(e => console.log('Tracking error:', e));
    }

    trackConversion(type, leadData) {
        fetch('http://localhost:5000/api/social-tracking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                platform: 'website',
                campaign: 'contact_form',
                action: 'conversion',
                lead_data: leadData,
                timestamp: new Date().toISOString()
            })
        }).catch(e => console.log('Conversion tracking error:', e));
    }
}

// Initialize integration when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LasaniWebsiteIntegration();
    });
} else {
    new LasaniWebsiteIntegration();
}