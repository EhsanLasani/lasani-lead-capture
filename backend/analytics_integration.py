from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest
import os
from datetime import datetime, timedelta

class AnalyticsIntegration:
    def __init__(self):
        self.property_id = os.getenv('GOOGLE_ANALYTICS_PROPERTY_ID')
        self.credentials_path = os.getenv('GOOGLE_ANALYTICS_CREDENTIALS_PATH')
        
    def get_traffic_sources(self, days=30):
        """Get traffic sources from Google Analytics"""
        try:
            client = BetaAnalyticsDataClient()
            
            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                dimensions=[
                    Dimension(name="sessionSource"),
                    Dimension(name="sessionMedium")
                ],
                metrics=[
                    Metric(name="sessions"),
                    Metric(name="users"),
                    Metric(name="conversions")
                ],
                date_ranges=[DateRange(
                    start_date=f"{days}daysAgo",
                    end_date="today"
                )]
            )
            
            response = client.run_report(request=request)
            
            traffic_data = []
            for row in response.rows:
                traffic_data.append({
                    'source': row.dimension_values[0].value,
                    'medium': row.dimension_values[1].value,
                    'sessions': int(row.metric_values[0].value),
                    'users': int(row.metric_values[1].value),
                    'conversions': int(row.metric_values[2].value)
                })
            
            return traffic_data
            
        except Exception as e:
            return {'error': f'Analytics API error: {str(e)}'}
    
    def get_social_media_traffic(self):
        """Get specific social media traffic data"""
        social_sources = ['facebook', 'instagram', 'twitter', 'linkedin']
        
        try:
            client = BetaAnalyticsDataClient()
            
            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                dimensions=[Dimension(name="sessionSource")],
                metrics=[
                    Metric(name="sessions"),
                    Metric(name="bounceRate"),
                    Metric(name="averageSessionDuration")
                ],
                date_ranges=[DateRange(
                    start_date="30daysAgo",
                    end_date="today"
                )],
                dimension_filter={
                    'filter': {
                        'field_name': 'sessionSource',
                        'in_list_filter': {'values': social_sources}
                    }
                }
            )
            
            response = client.run_report(request=request)
            
            social_data = {}
            for row in response.rows:
                source = row.dimension_values[0].value
                social_data[source] = {
                    'sessions': int(row.metric_values[0].value),
                    'bounce_rate': float(row.metric_values[1].value),
                    'avg_session_duration': float(row.metric_values[2].value)
                }
            
            return social_data
            
        except Exception as e:
            return {'error': f'Social media analytics error: {str(e)}'}
    
    def track_conversion_funnel(self):
        """Track conversion funnel from social media to leads"""
        try:
            # This would track the complete funnel:
            # Social Media -> Website Visit -> Lead Form -> Conversion
            
            funnel_data = {
                'social_visits': 0,
                'form_views': 0,
                'form_submissions': 0,
                'qualified_leads': 0,
                'conversion_rate': 0
            }
            
            # Implement actual funnel tracking logic here
            return funnel_data
            
        except Exception as e:
            return {'error': f'Funnel tracking error: {str(e)}'}
    
    def generate_utm_report(self):
        """Generate report on UTM campaign performance"""
        try:
            client = BetaAnalyticsDataClient()
            
            request = RunReportRequest(
                property=f"properties/{self.property_id}",
                dimensions=[
                    Dimension(name="sessionCampaignName"),
                    Dimension(name="sessionSource"),
                    Dimension(name="sessionMedium")
                ],
                metrics=[
                    Metric(name="sessions"),
                    Metric(name="conversions"),
                    Metric(name="totalRevenue")
                ],
                date_ranges=[DateRange(
                    start_date="30daysAgo",
                    end_date="today"
                )]
            )
            
            response = client.run_report(request=request)
            
            utm_data = []
            for row in response.rows:
                utm_data.append({
                    'campaign': row.dimension_values[0].value,
                    'source': row.dimension_values[1].value,
                    'medium': row.dimension_values[2].value,
                    'sessions': int(row.metric_values[0].value),
                    'conversions': int(row.metric_values[1].value),
                    'revenue': float(row.metric_values[2].value)
                })
            
            return utm_data
            
        except Exception as e:
            return {'error': f'UTM report error: {str(e)}'}