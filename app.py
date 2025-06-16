from flask import Flask, request, jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
app = Flask(__name__)

# In-memory user storage for demonstration purposes
users = {
    "user1": generate_password_hash("password123"),
    "user2": generate_password_hash("mypassword")
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signin', methods=['GET''POST'])
def signin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and check_password_hash(users[username], password):
        return render_template('index.html')
    else:
        return jsonify(success=False, message='Invalid username or password.')
class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    published_at = db.Column(db.Date, nullable=False)

@app.route('/date', methods=['GET', 'POST'])
def search_by_date():
    results = []
    if request.method == 'POST':
        date_str = request.form['search_date']
        try:
            search_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            results = News.query.filter_by(published_at=search_date).all()
        except ValueError:
            results = []
    return render_template('date.html', results=results)


if __name__ == '__main__':
    app.run(debug=True)
