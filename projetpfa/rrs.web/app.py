
import os
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import firebase_admin
from firebase_admin import credentials, auth
import requests

app = Flask(__name__)
app.secret_key = 'rrs_secret_key'

# Get the directory path of the current script
current_directory = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the JSON file
json_file_path = os.path.join(current_directory, 'static', 'assets', 'secure', 'my-application11-ae736-firebase-adminsdk-qlv6z-d648e34d7a.json')

# Use the absolute path in the credentials initialization
cred = credentials.Certificate(json_file_path)
# Initialize Firebase Admin SDK with service account
firebase_admin.initialize_app(cred)

API_KEY = "AIzaSyBe-tOxVlHdDpn7D5YONeGM93FCO5JDgr8"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def index_html():
    return render_template('index.html')

# Route for the login page
@app.route('/login')
def login():
    return render_template('login.html')

def authenticate_user(email, password):
    try:
        response = requests.post(
            f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}",
            json={"email": email, "password": password, "returnSecureToken": True}
        )
        data = response.json()
        if response.ok:
            return data  # Successful authentication
        else:
            error_message = data.get("error", {}).get("message", "Unknown error")
            print(f"Authentication failed: {error_message}")
            return None  # Handle authentication failure
    except Exception as e:
        print('Authentication error:', e)
        return None


# Flask route for login
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # Authenticate user
        user_data = authenticate_user(email, password)
        if user_data:
            session['user_id'] = user_data['localId']
            return redirect(url_for('dashboard'))
        else:
            return jsonify({'message': 'Invalid email or password'}), 401  # Handle authentication failure
    return redirect(url_for('login'))

# Flask route for dashboard (protected route)
@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        return render_template('dashboard.html')
    else:
        return redirect(url_for('login'))

# Flask route for logout
@app.route('/logout')
def logout():
    session.pop('user_id', None)  # Remove user_id from session
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
