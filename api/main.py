from flask import Flask, jsonify, request
from flask_restful import Api
from models import db
from task import ViewTask, CreateTask, ModifyTask, DeleteTask
from auth import LoginResource, RegisterResource


def create_tables():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///models.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'

    db.init_app(app)
    with app.app_context():
        db.create_all()
    api = Api(app)
    api.add_resource(LoginResource, '/api/login')
    api.add_resource(RegisterResource, '/api/register')
    api.add_resource(ViewTask, '/api/task_overview')
    api.add_resource(CreateTask, '/api/create_task')
    api.add_resource(ModifyTask, '/api/modify_task')
    api.add_resource(DeleteTask, '/api/delete')

    return app


if __name__ == "__main__":
    create_tables().run(debug=True)
