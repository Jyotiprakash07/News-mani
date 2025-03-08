from flask import Flask, request, jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# In-memory user storage for demonstration purposes
users = {
    "user1": generate_password_hash("password123"),
    "user2": generate_password_hash("mypassword")
}

@app.route('/')
def index():
    return render_template('buy.html')

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and check_password_hash(users[username], password):
        return jsonify(success=True)
    else:
        return jsonify(success=False, message='Invalid username or password.')

if __name__ == '__main__':
    app.run(debug=True)
