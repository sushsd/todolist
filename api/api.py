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
    is_done = db.Column(db.Boolean,default=False)


@app.route('/api/login', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['name']
        password = jsonData['password']

        user = UserLoginDetails.query.filter_by(username=username).first()

        if not user:
            return {"message": "User not found"}

        else:
            if user.password == password:
                global loggedInUser
                loggedInUser = username

                return {"message": "success"}
            else:
                return {"message": "Incorrect Password"}

@app.route('/api/register',methods=['GET','POST'])
def register():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['name']
        password = jsonData['password']
    user = UserLoginDetails.query.filter_by(username=username).first()

    if user:
        return {"message": "User already exists"}

    else:
        user = UserLoginDetails(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        global loggedInUser
        loggedInUser = username
        return {"message": "success"}


@app.route('/api/task_overview', methods=['GET'])
def task_overview():

    user = UserLoginDetails.query.filter_by(username=loggedInUser).first()

    if user:
        tasks = UserTask.query.filter_by(user_id=user.id).all()
        task_list = [
            {'id': task.id, 'title': task.task_title, 'description': task.description, 'done': False}
            for task in tasks
        ]
        return {'message': 'success', 'username': loggedInUser, 'tasks': task_list}
    else:
        return {"message": "User not found"}, 404


@app.route('/api/create_task', methods=['GET', 'POST'])
def create_task():
    user = UserLoginDetails.query.filter_by(username=loggedInUser).first()
    if user:
        json_data = request.get_json()
        new_task = UserTask(user_id=user.id, task_title=json_data['newTaskTitle'], description=json_data['newTaskDescription'])
        db.session.add(new_task)
        db.session.commit()
        return {"message": "success"}


@app.route('/api/set_done', methods=['POST'])
def task_done():
    user = UserLoginDetails.query.filter_by(username=loggedInUser).first()
    if user:
        json_data = request.get_json()
        task_id = json_data.get('id')
        task = UserTask.query.filter_by(id=task_id, user_id=user.id).first()
        if task:
            task.is_done = json_data.get('done')
            db.session.commit()
            return {"message" : "success"}

@app.route('/api/modified_task',methods=['PUT'])
def modified_task():
    user = UserLoginDetails.query.filter_by(username=loggedInUser).first()
    if user:
        json_data = request.get_json()
        task_id = json_data.get('id')
        new_title = json_data.get('title')
        new_descritpion = json_data.get('description')
        task = UserTask.query.filter_by(id=task_id, user_id=user.id).first()
        if task:
            task.task_title = new_title
            task.description = new_descritpion
            db.session.commit()
            return {"message" : "success"}




if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=3000)
