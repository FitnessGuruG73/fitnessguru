from flask import Flask, request, jsonify, send_file,Blueprint
from flask_pymongo import PyMongo
from flask_cors import CORS
from gridfs import GridFS
from bson import ObjectId
import io

mongo = PyMongo() 
video_bp = Blueprint('video', __name__) 


@video_bp.route('/file/<file_id>', methods=['GET'])   
def get_file(file_id):
    try:
        file = fs.get(ObjectId(file_id))
        return send_file(
            io.BytesIO(file.read()),
            mimetype='video/mp4',
            as_attachment=True,
            download_name=file.filename
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 404 



