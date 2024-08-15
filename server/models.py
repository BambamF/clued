from config import db
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from sqlalchemy_utils import JSONType
import base64

# structure for users in the app
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(30), unique=True, nullable=False, index=True)
    dob = db.Column(db.String(30), unique=False, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    clues = db.relationship('Clue', backref='user', lazy=True)
    profile = db.relationship('Profile', backref='user', uselist=False)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "username": self.username,
            "dob": self.dob,
        }
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


class Clue(db.Model):
    __tablename__ = 'clues'

    clue_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    collection_id = db.Column(db.Integer, nullable=True)
    date_created = db.Column(db.String(120), nullable=False)
    time_created = db.Column(db.String(120), nullable=False)
    clue_title = db.Column(db.String(120), nullable=False)
    clue_location = db.Column(db.String(255), nullable=True)
    clue_notes = db.Column(db.Text, nullable=True)
    clue_audio = db.Column(JSONType, nullable=True)
    clue_links = db.Column(JSONType, nullable=True)
    clue_main = db.Column(db.LargeBinary, nullable=False)
    clue_main_type = db.Column(db.String(120), nullable=False)

    def to_json(self):
        return {
            "clueId": self.clue_id,
            "userId": self.user_id,
            "collectionId": self.collection_id,
            "dateCreated": self.date_created,
            "timeCreated": self.time_created,
            "userClueTitle": self.clue_title,
            "clueLocation": self.clue_location,
            "userClueNotes": self.clue_notes,
            "clueAudio": self.clue_audio,
            "clueLinks": self.clue_links,
            'clueMain': base64.b64encode(self.clue_main).decode('utf-8') if self.clue_main else None,
            "clueMainType": self.clue_main_type
        }

class Profile(db.Model):
    __tablename__ = "profile"

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    profile_id = db.Column(db.Integer, primary_key=True)
    screenname = db.Column(db.String(120), nullable=True)
    user_interests = db.Column(JSONType, nullable=True)
    profile_image = db.Column(db.LargeBinary, nullable=True)

    def to_json(self):
        return {
            "userId": self.user_id,
            "screenName": self.screenname,
            "userInterests": self.user_interests,
            "profileImage": base64.b64encode(self.profile_image).decode('utf-8') if self.profile_image else None
        }
    