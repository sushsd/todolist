from flask import request, session
from flask_restful import Resource, Api
from models import db, UserLoginDetails

api = Api()

class LoginResource(Resource):
    def post(self):
        json_data = request.get_json()
        print(json_data)
        username = json_data['name']
        password = json_data['password']

        user = UserLoginDetails.query.filter_by(username=username).first()

        if not user:
            return {"message": "User not found"}

        else:
            if user.password == password:
                session['loggedInUser'] = username
                return {"message": "success"}
            else:
                return {"message": "Incorrect Password"}

class RegisterResource(Resource):
    def post(self):
        json_data = request.get_json()
        username = json_data['name']
        password = json_data['password']

        user = UserLoginDetails.query.filter_by(username=username).first()

        if user:
            return {"message": "User already exists"}
        else:
            user = UserLoginDetails(username=username, password=password)
            db.session.add(user)
            db.session.commit()
            session['loggedInUser'] = username
            return {"message": "success"}

api.add_resource(LoginResource, '/api/login')
api.add_resource(RegisterResource, '/api/register')
