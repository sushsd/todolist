import json

from flask import session,request
from models import db, UserLoginDetails, UserTask
from flask_restful import Resource, Api



api = Api()

class TaskOverviewResource(Resource):
    def get(self):
        logged_in_user = session.get('loggedInUser')

        if logged_in_user:
            user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

            if user:
                tasks = UserTask.query.filter_by(user_id=user.id).all()
                task_list = [
                    {
                        'id': task.id,
                        'title': task.task_title,
                        'description': task.description,
                        'done': task.is_done,
                        'created_time': json.dumps(task.created_time, indent=4, sort_keys=True, default=str),
                        'updated_time': json.dumps(task.updated_time, indent=4, sort_keys=True, default=str)
                    }
                    for task in tasks
                ]
                return {'message': 'success', 'username': logged_in_user, 'tasks': task_list}
            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "User not logged in"}, 401

api.add_resource(TaskOverviewResource,'/api/task_overview')


class CreateTaskResource(Resource):

    def post(self):
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

api.add_resource(CreateTaskResource,'/api/create_task')

class SetDoneResource(Resource):

    def post(self):
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

api.add_resource(SetDoneResource,'/api/set_done')


class ModifyTaskResource(Resource):

    def put(self):
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

api.add_resource(ModifyTaskResource,'/api/modified_task')


class DeleteTaskResource(Resource):
    def delete(self):
        logged_in_user = session.get('loggedInUser')
        if logged_in_user:
            user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

            if user:
                json_data = request.get_json()
                task_id = json_data.get('id')
                task = UserTask.query.filter_by(id=task_id, user_id=user.id).first()

                if task:
                    db.session.delete(task)
                    db.session.commit()
                    return {"message": "Success"}

api.add_resource(DeleteTaskResource,'/api/deleted_task')

class SearchResource(Resource):

    def post(self):
        logged_in_user = session.get('loggedInUser')

        if logged_in_user:
            user = UserLoginDetails.query.filter_by(username=logged_in_user).first()

            if user:
                json_data = request.get_json()
                task_title = json_data.get('title')
                search_results = UserTask.query.filter(UserTask.task_title.ilike(f"%{task_title}%"), UserTask.user_id == user.id).all()

                if search_results:
                    task_list = [
                        {
                            'id': task.id,
                            'title': task.task_title,
                            'description': task.description,
                            'done': task.is_done,
                            'created_time': task.created_time,
                            'updated_time': task.updated_time
                        }
                        for task in search_results
                    ]
                    return {"message": "success", 'username': logged_in_user, 'tasks': task_list}
                else:
                    return {"message": "No matching result"}

            else:
                return {"message": "User not found"}, 404
        else:
            return {"message": "User not logged in"}, 401

api.add_resource(SearchResource,'/api/search')


