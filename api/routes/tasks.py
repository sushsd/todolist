from flask import request,session,Blueprint
from models import db,UserLoginDetails,UserTask

bp = Blueprint('tasks', __name__, url_prefix='/api')

@bp.route('/task_overview', methods=['GET'])
def task_overview():
    logged_in_user = session.get('loggedInUser')

    if logged_in_user:
        user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

        if user:
            tasks = UserTask.query.filter_by(user_id=user.id).all()
            task_list = [
                {'id': task.id, 'title': task.task_title, 'description': task.description, 'done': task.is_done}
                for task in tasks
            ]
            return {'message': 'success', 'username': logged_in_user, 'tasks': task_list}
        else:
            return {"message": "User not found"}, 404
    else:
        return {"message": "User not logged in"}, 401

@bp.route('/create_task', methods=['POST'])
def create_task():
    logged_in_user = session.get('loggedInUser')

    if logged_in_user:
        user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

        if user:
            json_data = request.get_json()
            new_task = UserTask(user_id=user.id, task_title=json_data['newTaskTitle'], description=json_data['newTaskDescription'])
            db.session.add(new_task)
            db.session.commit()
            return {"message": "success"}
        else:
            return {"message": "User not found"}, 404
    else:
        return {"message": "User not logged in"}, 401

@bp.route('/set_done', methods=['POST'])
def task_done():
    logged_in_user = session.get('loggedInUser')

    if logged_in_user:
        user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

        if user:
            json_data = request.get_json()
            task_id = json_data.get('id')
            task = UserTask.query.filter_by(id=task_id, user_id=user.id).first()

            if task:
                task.is_done = json_data.get('done')
                db.session.commit()
                return {"message": "success"}
            else:
                return {"message": "Task not found"}, 404
        else:
            return {"message": "User not found"}, 404
    else:
        return {"message": "User not logged in"}, 401

@bp.route('/modified_task', methods=['PUT'])
def modified_task():
    logged_in_user = session.get('loggedInUser')

    if logged_in_user:
        user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

        if user:
            json_data = request.get_json()
            task_id = json_data.get('id')
            new_title = json_data.get('title')
            new_description = json_data.get('description')
            task = UserTask.query.filter_by(id=task_id, user_id=user.id).first()

            if task:
                task.task_title = new_title
                task.description = new_description
                db.session.commit()
                return {"message": "success"}
            else:
                return {"message": "Task not found"}, 404
        else:
            return {"message": "User not found"}, 404
    else:
        return {"message": "User not logged in"}, 401
