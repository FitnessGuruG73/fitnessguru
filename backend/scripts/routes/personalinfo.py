from flask import request, jsonify, Blueprint, current_app
from flask_pymongo import PyMongo
import jwt

personalinfo_bp = Blueprint('personalinfo', __name__)

@personalinfo_bp.route('/personalinfo', methods=['POST'])
def personalinfo():
  data = request.json
  print(data)
  return jsonify({"message": "successful"})