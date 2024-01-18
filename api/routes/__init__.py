from flask import Blueprint

bp = Blueprint('routes', __name__, url_prefix='/api')


from .auth import bp as auth_bp
from .tasks import bp as tasks_bp
