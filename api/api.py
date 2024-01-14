import time
from flask import Flask
from flask import request

app = Flask(__name__)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/hello')
def hello():
    return {'message':"Hello World!"}

@app.route('/api/hello')
def apiHello():
    return {'message':"Hello World!"}

@app.route('/api/login', methods=['GET','POST'])
def form():
    if request.method == 'POST':
        jsonData = request.get_json()
        print(jsonData['name'])
        print(jsonData['password'])
        return "success"

@app.route('/api/task_overview', methods=['GET'])
def task_overview():
    return { 'tasks': [
        {
            'id': 1,
            'title': 'Say Hello to bachha',
            'description': 'I have to say hello to my bachha',
            'done': False
        },
        {
            'id': 2,
            'title': 'Task 2',
            'description': 'Task 2 Description',
            'done': False
        },
        {
            'id': 3,
            'title': 'Task 3',
            'description': 'Task 3 Description',
            'done': True
        }
    ]}
