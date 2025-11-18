# AWS Amplify Setup Guide

## 1. Initialize Amplify Project
```bash
amplify init
```
**Settings:**
- Project name: lead-capture-seo
- Environment: dev
- Default editor: Visual Studio Code
- App type: javascript
- Framework: none
- Source directory: src
- Distribution directory: frontend
- Build command: npm run build
- Start command: npm start

## 2. Add API (GraphQL)
```bash
amplify add api
```
**Settings:**
- Service: GraphQL
- Authorization: API key
- Schema template: Single object with fields
- Edit schema: Yes (use schema.graphql)

## 3. Add Storage (Optional)
```bash
amplify add storage
```
**Settings:**
- Service: DynamoDB
- Resource name: leadStorage

## 4. Deploy to AWS
```bash
amplify push
```

## 5. Update Configuration
After deployment, update `src/aws-exports.js` with:
- GraphQL endpoint URL
- API key
- Region

## 6. Integration Steps

### Replace Local Storage
Update `frontend/dashboard.js`:
```javascript
import { captureLeadAmplify, getLeadsAmplify } from './amplify-integration.js';

// Replace fetch calls with Amplify functions
async function captureLead(leadData) {
    return await captureLeadAmplify(leadData);
}

async function loadLeads() {
    return await getLeadsAmplify();
}
```

### Benefits of Amplify
- **Scalable**: Auto-scales with traffic
- **Secure**: Built-in authentication
- **Real-time**: GraphQL subscriptions
- **Offline**: Works without internet
- **Global**: CDN distribution

### Cost Estimation
- **Free Tier**: 250,000 queries/month
- **Paid**: $4 per million queries
- **Storage**: $0.25 per GB/month