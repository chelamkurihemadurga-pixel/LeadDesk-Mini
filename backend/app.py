from flask import *
from flask_cors import CORS
from flask_jwt_extended import *
import sqlite3
import bcrypt
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "leaddesk-secret-key"

jwt = JWTManager(app)
def init_db():

    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS admin(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT
        )
    """)

    cursor.execute("""
CREATE TABLE IF NOT EXISTS leads(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    budget TEXT,
    message TEXT,
    status TEXT DEFAULT 'New'
)
""")

    # Check if admin already exists
    cursor.execute("SELECT * FROM admin")

    if cursor.fetchone() is None:

        password = bcrypt.hashpw(
            "admin123".encode(),
            bcrypt.gensalt()
        ).decode()

        cursor.execute(
            "INSERT INTO admin(username,password) VALUES(?,?)",
            ("admin", password)
        )

    conn.commit()
    conn.close()

init_db()
@app.route("/lead", methods=["POST"])
def add_lead():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    budget = data.get("budget")
    message = data.get("message")

    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO leads(name,email,budget,message,status)
        VALUES(?,?,?,?,?)
        """,
        (name, email, budget, message, "New")
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Lead Added Successfully"}), 200
   
@app.route("/leads", methods=["GET"])
@jwt_required()
def get_leads():

    search = request.args.get("search", "")
    status = request.args.get("status", "All")

    conn = sqlite3.connect("project.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    if status == "All":

        cursor.execute(
            """
            SELECT * FROM leads
            WHERE name LIKE ? OR email LIKE ?
            ORDER BY id DESC
            """,
            (f"%{search}%", f"%{search}%")
        )

    else:

        cursor.execute(
            """
            SELECT * FROM leads
            WHERE (name LIKE ? OR email LIKE ?)
            AND status=?
            ORDER BY id DESC
            """,
            (f"%{search}%", f"%{search}%", status)
        )

    leads = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(leads), 200
@app.route("/update_status/<int:id>", methods=["PUT"])
@jwt_required()
def update_status(id):

    data = request.json
    status = data["status"]

    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE leads SET status=? WHERE id=?",
        (status,id)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message":"Status updated"
    })
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    print("Username:", username)
    print("Password:", password)

    conn = sqlite3.connect("project.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM admin WHERE username=?",
        (username,)
    )

    admin = cursor.fetchone()

    print("Admin:", admin)

    conn.close()

    if admin is None:
        return jsonify({"message": "Invalid Username"}), 401

    if not bcrypt.checkpw(password.encode(), admin["password"].encode()):
        return jsonify({"message": "Invalid Password"}), 401

    token = create_access_token(identity=admin["username"])

    return jsonify({
        "message": "Login Successful",
        "token": token
    }), 200
@app.route("/delete_lead/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_lead(id):

    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM leads WHERE id=?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Lead Deleted Successfully"
    }), 200
if __name__ == "__main__":
    app.run(debug=True)