from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
from admin_auth import admin_login, admin_logout, login_required

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///leads_seo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
db = SQLAlchemy(app)

# Lead Model
class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    source = db.Column(db.String(50), nullable=False)  # website, facebook, instagram, etc.
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# SEO Data Model
class SEOData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255))
    meta_description = db.Column(db.Text)
    keywords = db.Column(db.Text)
    page_speed = db.Column(db.Float)
    mobile_friendly = db.Column(db.Boolean)
    backlinks = db.Column(db.Integer)
    organic_traffic = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/api/leads', methods=['POST'])
def capture_lead():
    data = request.json
    lead = Lead(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        source=data.get('source'),
        message=data.get('message')
    )
    db.session.add(lead)
    db.session.commit()
    return jsonify({'message': 'Lead captured successfully', 'id': lead.id}), 201

@app.route('/api/leads', methods=['GET'])
def get_leads():
    leads = Lead.query.order_by(Lead.created_at.desc()).all()
    return jsonify([{
        'id': lead.id,
        'name': lead.name,
        'email': lead.email,
        'phone': lead.phone,
        'source': lead.source,
        'message': lead.message,
        'created_at': lead.created_at.isoformat()
    } for lead in leads])

@app.route('/api/seo-data', methods=['POST'])
def add_seo_data():
    data = request.json
    seo_data = SEOData(
        url=data.get('url'),
        title=data.get('title'),
        meta_description=data.get('meta_description'),
        keywords=data.get('keywords'),
        page_speed=data.get('page_speed'),
        mobile_friendly=data.get('mobile_friendly'),
        backlinks=data.get('backlinks'),
        organic_traffic=data.get('organic_traffic')
    )
    db.session.add(seo_data)
    db.session.commit()
    return jsonify({'message': 'SEO data added successfully'}), 201

@app.route('/api/seo-data', methods=['GET'])
def get_seo_data():
    seo_data = SEOData.query.order_by(SEOData.created_at.desc()).all()
    return jsonify([{
        'id': data.id,
        'url': data.url,
        'title': data.title,
        'meta_description': data.meta_description,
        'keywords': data.keywords,
        'page_speed': data.page_speed,
        'mobile_friendly': data.mobile_friendly,
        'backlinks': data.backlinks,
        'organic_traffic': data.organic_traffic,
        'created_at': data.created_at.isoformat()
    } for data in seo_data])

@app.route('/')
def home():
    return jsonify({'message': 'Lead Capture & SEO API is running', 'status': 'active'})

@app.route('/api/admin/login', methods=['POST'])
def login():
    return admin_login()

@app.route('/api/admin/logout', methods=['POST'])
def logout():
    return admin_logout()

@app.route('/api/visitor-tracking', methods=['POST'])
def track_visitor():
    data = request.json
    print(f"Visitor: {data.get('page')} from {data.get('referrer')}")
    return jsonify({'status': 'tracked'}), 200

@app.route('/api/social-tracking', methods=['POST'])
def track_social():
    data = request.json
    print(f"Social: {data.get('platform')} - {data.get('campaign')}")
    return jsonify({'status': 'tracked'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)