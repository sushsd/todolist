
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from datetime import datetime

naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
db = SQLAlchemy(metadata=MetaData(naming_convention=naming_convention))

class UserLogins(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100))


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user_logins.id'), nullable=False)
    task_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    is_done = db.Column(db.Boolean, default=False)
    created_time = db.Column(db.DateTime, default=datetime.utcnow())
    updated_time = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    tags = db.Column(db.String(400))
