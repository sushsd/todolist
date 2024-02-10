from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()



class UserLoginDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

class UserTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_login_details.id'), nullable=False)
    task_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    created_time = db.Column(db.DateTime,default=datetime.utcnow())
    updated_time = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


    is_done = db.Column(db.Boolean,default=False)
