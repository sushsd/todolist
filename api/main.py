from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from models import db
from task import ViewTask, CreateTask, ModifyTask, DeleteTask,SearchTask,Logout
from auth import LoginResource, RegisterResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///models.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'
migrate = Migrate(app, db, render_as_batch=True)
db.init_app(app)
def create_tables():

    #migrate.init_app(app, db)

    with app.app_context():
        db.create_all()

    api = Api(app)
    api.add_resource(LoginResource, '/api/login')
    api.add_resource(RegisterResource, '/api/register')
    api.add_resource(ViewTask, '/api/task_overview')
    api.add_resource(CreateTask, '/api/create_task')
    api.add_resource(ModifyTask, '/api/modify_task')
    api.add_resource(DeleteTask, '/api/delete')
    api.add_resource(SearchTask, '/api/search')
    api.add_resource(Logout, '/api/logout')


    return app


if __name__ == "__main__":
    create_tables().run(debug=True)


