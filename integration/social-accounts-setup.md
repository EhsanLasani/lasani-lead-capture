# Social Media Accounts Integration Guide

## 🎯 LasaniDesigns Social Media Setup

### **Facebook Integration**

#### 1. Facebook Business Page Setup

- **Page Name**: Lasani Designs
- **Category**: Interior Design Service
- **Bio**: Professional BIM-enabled Interior & Architectural Design Services | Mumbai & Dubai
- **Website Button**: https://www.lasanidesigns.com?utm_source=facebook&utm_medium=page&utm_campaign=website_visit

#### 2. Facebook Lead Ads Configuration

```javascript
// Webhook URL for lead capture
POST https://your-domain.com/api/leads

// Lead form fields to capture:
{
  "name": "Full Name",
  "email": "Email Address",
  "phone": "Phone Number",
  "project_type": "Residential/Commercial",
  "budget": "Budget Range",
  "location": "Project Location"
}
```

#### 3. UTM Links for Facebook Posts

```
General Posts: https://www.lasanidesigns.com?utm_source=facebook&utm_medium=social&utm_campaign=brand_awareness
Portfolio Posts: https://www.lasanidesigns.com?utm_source=facebook&utm_medium=social&utm_campaign=portfolio_showcase
Service Posts: https://www.lasanidesigns.com?utm_source=facebook&utm_medium=social&utm_campaign=service_promotion
```

### **Instagram Integration**

#### 1. Instagram Business Account Setup

- **Username**: @lasanidesigns
- **Bio**: 🏗️ BIM-Enabled Design Solutions
  📍 Mumbai | Dubai
  🎨 Residential & Commercial
  👇 Get Free Consultation
- **Link**: https://www.lasanidesigns.com?utm_source=instagram&utm_medium=bio&utm_campaign=free_consultation

#### 2. Instagram Story Links

```
Portfolio Stories: https://www.lasanidesigns.com?utm_source=instagram&utm_medium=story&utm_campaign=portfolio_view
Service Stories: https://www.lasanidesigns.com?utm_source=instagram&utm_medium=story&utm_campaign=service_inquiry
Contact Stories: https://www.lasanidesigns.com?utm_source=instagram&utm_medium=story&utm_campaign=contact_now
```

#### 3. Instagram Post Captions Template

```
🏠 Transform your space with professional BIM design
✨ See more projects: [link in bio]
📞 Free consultation: +91 83560 21693
#InteriorDesign #BIMDesign #MumbaiDesign #DubaiDesign
```

### **LinkedIn Integration**

#### 1. LinkedIn Company Page

- **Company Name**: Lasani Designs
- **Industry**: Architecture and Planning
- **Specialties**: BIM Coordination, Interior Design, MEP Engineering
- **Website**: https://www.lasanidesigns.com?utm_source=linkedin&utm_medium=company_page&utm_campaign=business_profile

#### 2. LinkedIn Lead Gen Forms

```javascript
// Form fields for LinkedIn campaigns
{
  "company_name": "Company Name",
  "contact_person": "Decision Maker Name",
  "email": "Business Email",
  "phone": "Contact Number",
  "project_scale": "Project Size",
  "industry": "Business Industry"
}
```

#### 3. LinkedIn Content Strategy

```
Educational Posts: BIM benefits, design trends, case studies
Project Showcases: Before/after transformations
Industry Insights: Construction technology, sustainability
```

### **WhatsApp Business Integration**

#### 1. WhatsApp Business Setup

- **Mumbai Number**: +91 83560 21693
- **Dubai Number**: +971 52 2339 312
- **Business Profile**: Professional Interior & Architectural Design Services

#### 2. WhatsApp Quick Replies

```
Welcome Message: "Hi! Thanks for contacting Lasani Designs. How can we help you today?"

Quick Replies:
1. 🏠 Residential Design
2. 🏢 Commercial Projects
3. 📋 Get Quote
4. 📞 Schedule Call
5. 📧 Email Us
```

#### 3. WhatsApp Lead Capture

```javascript
// Auto-capture WhatsApp leads
function captureWhatsAppLead(phoneNumber, message) {
  const leadData = {
    name: "WhatsApp User",
    phone: phoneNumber,
    source: "whatsapp_business",
    message: message,
    timestamp: new Date().toISOString(),
  };

  // Send to lead capture API
  fetch("/api/leads", {
    method: "POST",
    body: JSON.stringify(leadData),
  });
}
```

## 📊 Social Media Tracking Setup

### **UTM Parameter Strategy**

```
utm_source: facebook | instagram | linkedin | twitter | whatsapp
utm_medium: social | bio | story | post | ad | message
utm_campaign: brand_awareness | portfolio_showcase | service_promotion | free_consultation
utm_content: specific_post_id | ad_creative_version
```

### **Conversion Tracking**

```javascript
// Track social media conversions
function trackSocialConversion(source, action, value) {
  gtag("event", "conversion", {
    send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
    value: value,
    currency: "INR",
    custom_parameters: {
      source: source,
      action: action,
    },
  });
}
```

### **Social Media Content Calendar**

#### **Daily Posts Schedule**

- **Monday**: Project Showcase
- **Tuesday**: BIM Technology Focus
- **Wednesday**: Client Testimonial
- **Thursday**: Design Tips
- **Friday**: Behind the Scenes
- **Saturday**: Weekend Inspiration
- **Sunday**: Company Culture

#### **Weekly Campaigns**

- **Week 1**: Residential Projects Focus
- **Week 2**: Commercial Projects Focus
- **Week 3**: BIM & Technology
- **Week 4**: Client Success Stories

## 🔗 Implementation Checklist

### **Website Integration**

- [ ] Add social media tracking scripts
- [ ] Update contact forms with UTM capture
- [ ] Implement visitor behavior tracking
- [ ] Set up conversion pixels

### **Social Media Setup**

- [ ] Configure Facebook Business Manager
- [ ] Set up Instagram Business account
- [ ] Create LinkedIn Company Page
- [ ] Configure WhatsApp Business
- [ ] Set up social media management tools

### **Lead Capture Integration**

- [ ] Connect Facebook Lead Ads webhook
- [ ] Set up Instagram lead capture
- [ ] Configure LinkedIn Lead Gen Forms
- [ ] Implement WhatsApp lead tracking
- [ ] Test all lead capture flows

### **Analytics & Reporting**

- [ ] Set up Google Analytics goals
- [ ] Configure Facebook Pixel events
- [ ] Set up LinkedIn Insight Tag
- [ ] Create social media dashboards
- [ ] Set up automated reporting

This integration will capture leads from all social media touchpoints and funnel them into your centralized lead management system!
