// Integration for Client Portal CRM System
class ClientPortalIntegration {
    constructor() {
        this.LEAD_API = 'http://localhost:5000/api/leads';
        this.CRM_API = 'http://localhost:3000/api/crm/leads'; // Client portal API
        this.initIntegration();
    }

    initIntegration() {
        this.syncCRMLeads();
        this.setupBidirectionalSync();
    }

    // Sync leads from social media system to client portal
    async syncCRMLeads() {
        try {
            const socialLeads = await fetch(this.LEAD_API).then(r => r.json());
            
            for (const lead of socialLeads) {
                await this.createCRMLead(lead);
            }
        } catch (error) {
            console.error('CRM sync error:', error);
        }
    }

    async createCRMLead(socialLead) {
        const crmLead = {
            firstName: socialLead.name.split(' ')[0],
            lastName: socialLead.name.split(' ').slice(1).join(' '),
            email: socialLead.email,
            phone: socialLead.phone,
            source: socialLead.source,
            status: 'new',
            priority: this.calculatePriority(socialLead),
            projectDetails: {
                type: socialLead.project_type,
                service: socialLead.service_required,
                location: socialLead.location,
                timeline: socialLead.timeline,
                budget: socialLead.budget,
                requirements: socialLead.message
            },
            createdAt: socialLead.created_at,
            tags: this.generateTags(socialLead)
        };

        try {
            await fetch(this.CRM_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(crmLead)
            });
        } catch (error) {
            console.error('CRM lead creation error:', error);
        }
    }

    calculatePriority(lead) {
        let score = 0;
        
        // Budget scoring
        if (lead.budget === 'above-100') score += 10;
        else if (lead.budget === '50-100') score += 8;
        else if (lead.budget === '25-50') score += 6;
        
        // Timeline scoring
        if (lead.timeline === 'immediate') score += 8;
        else if (lead.timeline === 'short') score += 6;
        
        // Source scoring
        if (lead.source === 'lasanidesigns_website') score += 5;
        else if (lead.source === 'linkedin') score += 4;
        
        if (score >= 15) return 'high';
        if (score >= 10) return 'medium';
        return 'low';
    }

    generateTags(lead) {
        const tags = [];
        
        if (lead.source.includes('social')) tags.push('social-media');
        if (lead.project_type) tags.push(lead.project_type);
        if (lead.service_required) tags.push(lead.service_required);
        if (lead.location) tags.push(lead.location.toLowerCase());
        
        return tags;
    }

    setupBidirectionalSync() {
        // Listen for CRM updates and sync back to social media system
        setInterval(() => {
            this.syncUpdatesFromCRM();
        }, 300000); // Every 5 minutes
    }

    async syncUpdatesFromCRM() {
        try {
            const crmLeads = await fetch(this.CRM_API).then(r => r.json());
            
            for (const crmLead of crmLeads) {
                if (crmLead.updatedAt > crmLead.lastSyncedAt) {
                    await this.updateSocialLead(crmLead);
                }
            }
        } catch (error) {
            console.error('CRM sync back error:', error);
        }
    }

    async updateSocialLead(crmLead) {
        const updateData = {
            status: crmLead.status,
            priority: crmLead.priority,
            notes: crmLead.notes,
            lastUpdated: new Date().toISOString()
        };

        try {
            await fetch(`${this.LEAD_API}/${crmLead.socialLeadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
        } catch (error) {
            console.error('Social lead update error:', error);
        }
    }
}

// Initialize integration
new ClientPortalIntegration();