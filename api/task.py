import json
import math

from flask import request, session

from models import db, UserLogins, Task
from flask_restful import Resource, Api

api = Api()


class ViewTask(Resource):
    def get(self):
        logged_in_user = session.get('loggedInUser')
        if logged_in_user:
            user = UserLogins.query.filter_by(username=logged_in_user).first()

            if user:
                page = int(request.args.get('page', 1))
                per_page = int(request.args.get('per_page', 10))
                tasks_pagination = Task.query.filter_by(user_id=user.id).paginate(
                    page=page, per_page=per_page, error_out=False)
                task_list = [
                    {
                        'id': task.id,
                        'title': task.task_title,
                        'description': task.description,
                        'done': task.is_done,
                        'created_time': json.dumps(task.created_time, indent=4, sort_keys=True, default=str),
                        'updated_time': json.dumps(task.updated_time, indent=4, sort_keys=True, default=str)

                    }
                    for task in tasks_pagination.items
                ]
                return {'message': 'success',
                        'username': logged_in_user,
                        'tasks': task_list,
                        'page': tasks_pagination.page,
                        'total_pages': math.ceil(tasks_pagination.total / per_page)
                        }

            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "User not logged in"}, 401


api.add_resource(ViewTask, '/api/task_overview')


class CreateTask(Resource):
    def post(self):
        logged_in_user = session.get('loggedInUser')
        if logged_in_user:
            user = UserLogins.query.filter_by(
                username=logged_in_user).first()
            if user:
                json_data = request.get_json()
                new_task = Task(
                    user_id=user.id, task_title=json_data['newTaskTitle'], description=json_data['newTaskDescription'])
                db.session.add(new_task)
                db.session.commit()
                return {"message": "success"}
            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "User not logged in"}, 401


api.add_resource(CreateTask, '/api/create_task')


class ModifyTask(Resource):
    def put(self):
        logged_in_user = session.get('loggedInUser')
        if logged_in_user:
            user = UserLogins.query.filter_by(
                username=logged_in_user).first()
            if user:
                json_data = request.get_json()
                task_id = json_data.get('id')
                new_title = json_data.get('title')
                new_description = json_data.get('desciption')

                task = UserLogins.query.filter_by(
                    id=task_id, user_id=user.id).first()
                if task:
                    task.task_title = new_title
                    task.description = new_description
                    task.is_done = json_data.get('done')
                    db.session.commit()
                    return {"message": "success"}
                else:
                    return {"message": "Task not found"}, 404
            else:
                return {"message": "User not found"}, 404

        else:
            return {"message": "User not logged in"}, 401


api.add_resource(ModifyTask, '/api/modify_task')


class DeleteTask(Resource):
    def delete(self):
        logged_in_user = session.get('loggedInUser')
        if logged_in_user:
            user = UserLogins.query.filter_by(username=logged_in_user).first()
            if user:
                json_data = request.get_json()
                task_id = json_data.get('id')
                task = UserLogins.query.filter_by(
                    id=task_id, user_id=user.id).first()

                if task:
                    db.session.delete(task)
                    db.session.commit()
                    return {"message": "Sucesss"}
