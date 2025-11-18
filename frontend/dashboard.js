const API_BASE = 'http://localhost:5000/api';

// Lead Form Handler
document.getElementById('leadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const leadData = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(`${API_BASE}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });
        
        if (response.ok) {
            alert('Lead captured successfully!');
            e.target.reset();
            loadLeads();
            updateMetrics();
        } else {
            alert('Error capturing lead');
        }
    } catch (error) {
        alert('Network error: ' + error.message);
    }
});

// SEO Form Handler
document.getElementById('seoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = document.getElementById('url').value;
    const resultsDiv = document.getElementById('seoResults');
    
    resultsDiv.innerHTML = '<p>Analyzing... Please wait.</p>';
    
    try {
        // Simulate SEO analysis (replace with actual API call)
        setTimeout(() => {
            const mockResults = {
                title: 'Sample Page Title',
                meta_description: 'Sample meta description for the page',
                page_speed: 2.3,
                mobile_friendly: true,
                recommendations: [
                    'Optimize images for faster loading',
                    'Add more internal links',
                    'Improve meta description length'
                ]
            };
            
            displaySEOResults(mockResults);
        }, 2000);
        
    } catch (error) {
        resultsDiv.innerHTML = '<p>Error analyzing SEO: ' + error.message + '</p>';
    }
});

function displaySEOResults(results) {
    const resultsDiv = document.getElementById('seoResults');
    
    resultsDiv.innerHTML = `
        <h3>SEO Analysis Results</h3>
        <p><strong>Title:</strong> ${results.title}</p>
        <p><strong>Meta Description:</strong> ${results.meta_description}</p>
        <p><strong>Page Speed:</strong> ${results.page_speed}s</p>
        <p><strong>Mobile Friendly:</strong> ${results.mobile_friendly ? 'Yes' : 'No'}</p>
        
        <h4>Recommendations:</h4>
        <ul>
            ${results.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    `;
}

// Load and display leads
async function loadLeads() {
    try {
        const response = await fetch(`${API_BASE}/leads`);
        const leads = await response.json();
        
        const leadsList = document.getElementById('leadsList');
        leadsList.innerHTML = leads.map(lead => `
            <div class="lead-item">
                <strong>${lead.name}</strong> (${lead.email})
                <br>Source: ${lead.source}
                <br>Date: ${new Date(lead.created_at).toLocaleDateString()}
                ${lead.message ? `<br>Message: ${lead.message}` : ''}
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading leads:', error);
    }
}

// Update dashboard metrics
async function updateMetrics() {
    try {
        const response = await fetch(`${API_BASE}/leads`);
        const leads = await response.json();
        
        const totalLeads = leads.length;
        const currentMonth = new Date().getMonth();
        const monthlyLeads = leads.filter(lead => 
            new Date(lead.created_at).getMonth() === currentMonth
        ).length;
        
        // Calculate top source
        const sources = {};
        leads.forEach(lead => {
            sources[lead.source] = (sources[lead.source] || 0) + 1;
        });
        const topSource = Object.keys(sources).reduce((a, b) => 
            sources[a] > sources[b] ? a : b, '-'
        );
        
        document.getElementById('totalLeads').textContent = totalLeads;
        document.getElementById('monthlyLeads').textContent = monthlyLeads;
        document.getElementById('conversionRate').textContent = '2.5%'; // Mock data
        document.getElementById('topSource').textContent = topSource;
        
    } catch (error) {
        console.error('Error updating metrics:', error);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadLeads();
    updateMetrics();
});