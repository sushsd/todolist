from flask import Blueprint,request,session
from models import db, UserLoginDetails, UserTask


bp = Blueprint('auth', __name__, url_prefix='/api')

@bp.route('/hello',methods=['GET'])
def hello():
    return "Hello"

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        jsonData = request.get_json()
        username = jsonData['name']
        password = jsonData['password']

        user = UserLoginDetails.query.filter_by(username=username).first()

        if not user:
            return {"message": "User not found"}

        else:
            if user.password == password:
                session['loggedInUser'] = username


                return {"message": "success"}
            else:
                return {"message": "Incorrect Password"}

@bp.route('/register', methods=['GET', 'POST'])
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
            session['loggedInUser'] = username
            return {"message": "success"}
    else:
        return {"message": "Invalid request method"}
