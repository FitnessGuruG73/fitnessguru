from flask import request, jsonify, Blueprint, current_app
from flask_bcrypt import check_password_hash
from flask_pymongo import PyMongo
import jwt
from datetime import datetime, timedelta
import os

# Initialize PyMongo
mongo = PyMongo()

login_bp = Blueprint('login', __name__) 

# Get secret key from environment variable
SECRET_KEY = os.getenv('SECRET_KEY')
print(SECRET_KEY)

@login_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    mongo = current_app.config['pymongo']
    
    # Retrieve user from database
    user = mongo.db.Users.find_one({'username': username})
    
    if user and check_password_hash(user['password'], password): 
        # Password verification successful, generate JWT
        expiration_time = datetime.utcnow() + timedelta(hours=2)
        access_token = jwt.encode({
            'username': username,
            'exp': expiration_time
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({"message": "Login successful",'token': access_token})
    
    return jsonify({'message': 'Invalid username or password'})
