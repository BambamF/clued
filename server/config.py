from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#create the flask app
app = Flask(__name__)
CORS(app)

#config for the flask app
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# database variable using SQLAlchemy
db = SQLAlchemy(app)

