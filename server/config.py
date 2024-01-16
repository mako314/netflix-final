from flask import Flask
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from sqlalchemy import MetaData
# from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
import os

# load_dotenv('../.env.local')

app = Flask(__name__)

# allows JWTs to be sent to the web app via cookies
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

# Change to true for prod. When true, will only allow JWTs encapsulated within cookies to be sent over https
app.config["JWT_COOKIE_SECURE"] = False

# Should probably route to some env file secret key
app.config["JWT_SECRET_KEY"] = "super-secret-key"

jwt = JWTManager(app)

# app.secret_key = os.getenv('FLASK_SECRET_KEY') # signature for Flask session
app.secret_key = "TESTING123456789"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

bcrypt = Bcrypt(app) # allows for encryption/hashing

CORS(app)