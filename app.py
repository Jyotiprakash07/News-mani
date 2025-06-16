from flask import Flask, request, jsonify, render_template, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-very-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///news_mani.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    published_at = db.Column(db.Date, nullable=False)

# Routes
@app.route('/')
def index():
    news_items = News.query.order_by(News.published_at.desc()).all()
    return render_template('index.html', news_items=news_items)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if not username or not email or not password:
            flash('All fields are required.', 'danger')
            return redirect(url_for('signup'))
        if User.query.filter((User.username == username) | (User.email == email)).first():
            flash('Username or email already exists.', 'danger')
            return redirect(url_for('signup'))
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        flash('Signup successful. Please sign in.', 'success')
        return redirect(url_for('signin'))
    return render_template('signup.html')

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        data = request.form
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        if user and user.verify_password(password):
            session['user_id'] = user.id
            session['username'] = user.username
            flash('Signed in successfully!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password.', 'danger')
            return redirect(url_for('signin'))
    return render_template('signin.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out.', 'info')
    return redirect(url_for('index'))

@app.route('/search_by_date', methods=['GET', 'POST'])
def search_by_date():
    results = []
    error = None
    if request.method == 'POST':
        date_str = request.form.get('search_date')
        if not date_str:
            error = 'Date is required.'
        else:
            try:
                search_date = datetime.strptime(date_str, "%Y-%m-%d").date()
                results = News.query.filter_by(published_at=search_date).all()
                if not results:
                    error = 'No news found for this date.'
            except ValueError:
                error = 'Invalid date format. Please use YYYY-MM-DD.'
    return render_template('date.html', results=results, error=error)

@app.route('/contact', methods=['POST'])
def contact():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    # Here, you would typically save this to the DB or send an email
    print(f"Contact form submitted: {name}, {email}, {message}")
    flash('Thank you for contacting us!', 'success')
    return redirect(url_for('index'))

# REST API endpoints (for AJAX/dynamic front-end)
@app.route('/api/news', methods=['GET'])
def api_news():
    news_list = News.query.order_by(News.published_at.desc()).all()
    return jsonify([
        {
            'id': n.id,
            'title': n.title,
            'content': n.content,
            'published_at': n.published_at.strftime('%Y-%m-%d')
        } for n in news_list
    ])

@app.route('/api/news/<int:news_id>', methods=['GET'])
def api_single_news(news_id):
    n = News.query.get_or_404(news_id)
    return jsonify({
        'id': n.id,
        'title': n.title,
        'content': n.content,
        'published_at': n.published_at.strftime('%Y-%m-%d')
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
