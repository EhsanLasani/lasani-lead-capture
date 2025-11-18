import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import awsExports from '../src/aws-exports.js';

Amplify.configure(awsExports);
const client = generateClient();

// GraphQL mutations
const createLead = `
  mutation CreateLead($input: CreateLeadInput!) {
    createLead(input: $input) {
      id name email phone source message createdAt
    }
  }
`;

const createSEOData = `
  mutation CreateSEOData($input: CreateSEODataInput!) {
    createSEOData(input: $input) {
      id url title metaDescription pageSpeed mobileFriendly createdAt
    }
  }
`;

// GraphQL queries
const listLeads = `
  query ListLeads {
    listLeads {
      items {
        id name email phone source message createdAt
      }
    }
  }
`;

// Lead capture function
export async function captureLeadAmplify(leadData) {
  try {
    const result = await client.graphql({
      query: createLead,
      variables: {
        input: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          source: leadData.source,
          message: leadData.message
        }
      }
    });
    return result.data.createLead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

// SEO data function
export async function saveSEODataAmplify(seoData) {
  try {
    const result = await client.graphql({
      query: createSEOData,
      variables: {
        input: {
          url: seoData.url,
          title: seoData.title,
          metaDescription: seoData.metaDescription,
          pageSpeed: seoData.pageSpeed,
          mobileFriendly: seoData.mobileFriendly
        }
      }
    });
    return result.data.createSEOData;
  } catch (error) {
    console.error('Error saving SEO data:', error);
    throw error;
  }
}

// Get leads function
export async function getLeadsAmplify() {
  try {
    const result = await client.graphql({ query: listLeads });
    return result.data.listLeads.items;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}