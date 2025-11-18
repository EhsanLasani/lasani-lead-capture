import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import json

class SEOAnalyzer:
    def __init__(self):
        self.chrome_options = Options()
        self.chrome_options.add_argument("--headless")
        self.chrome_options.add_argument("--no-sandbox")
        self.chrome_options.add_argument("--disable-dev-shm-usage")

    def analyze_page(self, url):
        """Analyze a webpage for SEO metrics"""
        try:
            response = requests.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Basic SEO elements
            title = soup.find('title').text if soup.find('title') else ''
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            meta_desc = meta_desc.get('content') if meta_desc else ''
            
            # Keywords from meta tags
            keywords = soup.find('meta', attrs={'name': 'keywords'})
            keywords = keywords.get('content') if keywords else ''
            
            # Page speed (simplified - using response time)
            start_time = time.time()
            requests.get(url)
            page_speed = time.time() - start_time
            
            # Check mobile-friendly viewport
            viewport = soup.find('meta', attrs={'name': 'viewport'})
            mobile_friendly = bool(viewport)
            
            return {
                'url': url,
                'title': title,
                'meta_description': meta_desc,
                'keywords': keywords,
                'page_speed': round(page_speed, 2),
                'mobile_friendly': mobile_friendly,
                'status': 'success'
            }
        except Exception as e:
            return {'url': url, 'status': 'error', 'error': str(e)}

    def get_backlink_count(self, domain):
        """Simplified backlink analysis"""
        # In production, integrate with tools like Ahrefs, SEMrush, or Moz API
        return 0  # Placeholder

    def analyze_competitors(self, keywords):
        """Analyze competitor rankings for given keywords"""
        # Placeholder for competitor analysis
        return []

    def generate_recommendations(self, seo_data):
        """Generate SEO improvement recommendations"""
        recommendations = []
        
        if not seo_data.get('title') or len(seo_data.get('title', '')) < 30:
            recommendations.append("Add a descriptive title tag (30-60 characters)")
        
        if not seo_data.get('meta_description') or len(seo_data.get('meta_description', '')) < 120:
            recommendations.append("Add a compelling meta description (120-160 characters)")
        
        if seo_data.get('page_speed', 0) > 3:
            recommendations.append("Improve page loading speed (currently > 3 seconds)")
        
        if not seo_data.get('mobile_friendly'):
            recommendations.append("Add mobile-friendly viewport meta tag")
        
        return recommendations