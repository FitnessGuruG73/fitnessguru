from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes.signup import signup_bp 
from routes.login import login_bp
from routes.video import video_bp
from routes.personalinfo import personalinfo_bp


def createApp():
    app = Flask(__name__)
    app.config.from_prefixed_env() #importing flask environmental variables to config object
    mongo = PyMongo(app)
    app.config['pymongo'] = mongo
    CORS(app)  # Enable CORS for all routes 

    # Register Blueprints
    app.register_blueprint(signup_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(video_bp)
    app.register_blueprint(personalinfo_bp)
    return app

app = createApp() 

# Define a route for the home page
@app.route('/')
def home():
    return "Hello, Flask with MongoDB!"

if __name__ == '__main__':
    # Run the Flask app in debug mode
    app.run(host='0.0.0.0' ,debug=True,port=5500)
