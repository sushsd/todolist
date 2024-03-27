from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class UserLogins(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(50),unique=True,nullable=False)
    password = db.Column(db.String(50),nullable=False)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_logins.id'), nullable=False)
    task_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    is_done = db.Column(db.Boolean,default=False)
    created_time = db.Column(db.DateTime,default=datetime.utcnow())
    updated_time = db.Column(db.DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
