// Add this script to www.lasanidesigns.com contact forms
(function() {
    const API_ENDPOINT = 'http://localhost:5000/api/leads';

    function captureLead(formData) {
        const leadData = {
            name: formData.get('name') || formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone') || formData.get('telephone'),
            source: 'lasanidesigns_website',
            message: formData.get('message') || formData.get('inquiry')
        };

        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        }).catch(e => console.log('Lead capture error:', e));
    }

    // Auto-attach to existing contact forms
    document.addEventListener('DOMContentLoaded', function() {
        const forms = document.querySelectorAll('form[action*="contact"], form.contact-form, #contact-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const formData = new FormData(this);
                captureLead(formData);
            });
        });
    });
})();