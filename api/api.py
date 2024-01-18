from flask import Flask

from routes import bp as routes_bp
from routes.auth import bp as auth_bp
from routes.tasks import bp as tasks_bp
from models import db

def create_app(config_file='config.py'):
    app = Flask(__name__)
    app.config.from_object('config.Config')
    app.config.from_pyfile(config_file,silent=True)

    db.init_app(app)
    with app.app_context():
        db.create_all()


    app.register_blueprint(routes_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(tasks_bp)

    return app

if __name__ == '__main__':
    create_app().run(debug=True, port=3000)
