import time
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask import session

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
loggedInUser = ""


class UserLoginDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)


class UserTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_login_details.id'), nullable=False)
    task_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)


@app.route('/api/login', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['name']
        password = jsonData['password']

        user = UserLoginDetails.query.filter_by(username=username).first()

        if not user:
            return "failed"

        else:
            if user.password == password:
                global loggedInUser
                loggedInUser = username

                return "success"

@app.route('/api/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['name']
        password = jsonData['password']
    user = UserLoginDetails.query.filter_by(username=username).first()

    if user:
        return "You are already registered,Please Log In"

    else:
        user = UserLoginDetails(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return "success"


@app.route('/api/task_overview', methods=['GET'])
def task_overview():

    user = UserLoginDetails.query.filter_by(username=loggedInUser).first()

    if user:
        tasks = UserTask.query.filter_by(user_id=user.id).all()
        task_list = [
            {'id': task.id, 'title': task.task_title, 'description': task.description, 'done': False}
            for task in tasks
        ]
        return {'username': loggedInUser, 'tasks': task_list}
    else:
        return {'message': 'User not found'}, 404


@app.route('/api/create_task', methods=['GET', 'POST'])
def create_task():
    user = UserLoginDetails.query.filter_by(username=loggedInUser).first()
    if user:
        json_data = request.get_json()
        new_task = UserTask(user_id=user.id, task_title=json_data['newTaskTitle'], description=json_data['newTaskDescription'])
        db.session.add(new_task)
        db.session.commit()
        return "success"



if __name__ == "__main__":
#    with app.app_context():
#        db.drop_all()
#        db.create_all()
    app.run(debug=True, port=3000)
