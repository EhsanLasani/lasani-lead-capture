from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
CORS(app, origins=['https://www.lasanidesigns.com', 'http://localhost:3000'])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///leads_seo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    source = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text)
    project_type = db.Column(db.String(50))
    service_required = db.Column(db.String(50))
    location = db.Column(db.String(100))
    timeline = db.Column(db.String(50))
    budget = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/api/leads', methods=['POST'])
def capture_lead():
    data = request.json
    lead = Lead(
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        source=data.get('source', 'website'),
        message=data.get('message'),
        project_type=data.get('project_type'),
        service_required=data.get('service_required'),
        location=data.get('location'),
        timeline=data.get('timeline'),
        budget=data.get('budget')
    )
    db.session.add(lead)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Lead captured successfully', 'id': lead.id}), 201

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
        'project_type': lead.project_type,
        'service_required': lead.service_required,
        'location': lead.location,
        'timeline': lead.timeline,
        'budget': lead.budget,
        'created_at': lead.created_at.isoformat()
    } for lead in leads])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5001, debug=True)