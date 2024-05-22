from flask import request, jsonify
from config import app, db
from models import User
from sqlalchemy.exc import IntegrityError
import os

# route to get all users in the database
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users})

@app.route("/sign-in", methods=["POST"])
def sign_in():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email).first()

    if not email or not password:
        return(
            jsonify({"message": "All fields are required!"}),
            400
        )
    if not user or not user.check_password(password):
        return (
            jsonify({"message": "User not found or incorrect password!"}),
            404
        )
    return (
        jsonify({"message": "User authenticated!", "user": user.to_json()}),
        200
    )
    

# route to add a new user to the database
@app.route("/sign-up", methods=["POST"])
def sign_up():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    username = request.json.get("username")
    email = request.json.get("email")
    dob = request.json.get("dob")
    password = request.json.get("createPassword")
    
    # handle missing user credentials
    if not first_name or not last_name or not username or not email or not dob or not password:
        return (
            jsonify({"message": "All fields are required"}), 
            400,
                )
    
    new_user = User(first_name=first_name, last_name=last_name, username=username, email=email, dob=dob)
    new_user.set_password(password)

    #handle adding of the user to the database
    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        # Handle unique constraint violations for email and username
        if 'email' in str(e.orig):
            return jsonify({"message": "Email already exists"}), 400
        elif 'username' in str(e.orig):
            return jsonify({"message": "Username already exists"}), 400
        else:
            return jsonify({"message": str(e)}), 400
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!", "user": new_user.to_json()}), 201

# route to update a users credentials
@app.route("/update-user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):

    user = User.query.get(user_id)

    # handle user not found in database
    if not user:
        return (
            jsonify({"message": "User not found"}),
            404,
        )
    
    data = request.get_json()

    user.first_name = data.get("firstName", user.first_name)
    user.last_name = data.get("lastName", user.last_name)
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.dob = data.get("dob", user.dob)

    db.session.commit()

    return (
        jsonify({"message": "User Updated", "user": user.to_json()}),
        200,
    )

# route to delete user from database
@app.route("/delete-user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):

    user = User.query.get(user_id)

    # handle user not found in database
    if not user:
        return (
            jsonify({"message": "User not found"}),
            404,
        )

    # delete the user from the database
    db.session.delete(user)
    db.session.commit()

    return (
        jsonify({"message": "User Deleted"}),
        200,
    )

# spin up the database
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)