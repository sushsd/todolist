from flask import Flask
from flask_restful import Api
from auth import LoginResource, RegisterResource
from tasks import TaskOverviewResource,CreateTaskResource,SearchResource,ModifyTaskResource,DeleteTaskResource,SetDoneResource
from models import db

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'


def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_object('config.Config')
    app.config.from_pyfile(config_file, silent=True)

    db.init_app(app)


    with app.app_context():
        db.create_all()

    api = Api(app)

    api.add_resource(LoginResource, '/api/login')
    api.add_resource(RegisterResource, '/api/register')
    api.add_resource(TaskOverviewResource, '/api/task_overview')
    api.add_resource(CreateTaskResource, '/api/create_task')
    api.add_resource(SetDoneResource, '/api/set_done')
    api.add_resource(ModifyTaskResource, '/api/modified_task')
    api.add_resource(DeleteTaskResource, '/api/deleted_task')
    api.add_resource(SearchResource, '/api/search')


    return app

if __name__ == '__main__':
    create_app().run(debug=True, port=3000)
