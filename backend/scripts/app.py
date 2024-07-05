from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes.signup import signup_bp  # Ensure to import the mongo object
from routes.login import login_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

mongo_uri = "mongodb+srv://srishmaalladi14:8Vp7FYYqSLVXBAMw@cluster0.jtgcpyd.mongodb.net/Videos?retryWrites=true&w=majority&appName=Cluster0"
# Configure the MongoDB URI
app.config["MONGO_URI"] = mongo_uri

mongo = PyMongo(app)
app.config['pymongo'] = mongo

# # Initialize PyMongo with the Flask app
# mongo.init_app(app)

# Define a route for the home page
@app.route('/')
def home():
    return "Hello, Flask with MongoDB!"

# Register Blueprints
app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)

# if __name__ == '__main__':
#     # Run the Flask app in debug mode
#     app.run(host='0.0.0.0' ,debug=True,port=5000)
