import os
from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

# 1. Load configuration
load_dotenv()

app = Flask(__name__)
CORS(app)

# 2. Supabase Connection (Direct HTTPS Client)
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# ==========================================
# --- API ROUTES ---
# ==========================================

# GET all members
@app.route("/api/members", methods=["GET"])
def get_members():
    try:
        # Check your Supabase Table Editor: 
        # If the table is plural, change 'member' to 'members'
        response = supabase.table('member').select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# POST a new member
@app.route("/api/members", methods=["POST"])
def create_member():
    try:
        data = request.json
        name = data.get("name")
        gender = data.get("gender")
        
        new_member = {
            "name": name,
            "role": data.get("role"),
            "description": data.get("description"),
            "gender": gender,
            "img_url": f"https://avatar.iran.liara.run/public/boy?username={name}" if gender == 'male' else f"https://avatar.iran.liara.run/public/girl?username={name}"
        }
        
        response = supabase.table('member').insert(new_member).execute()
        return jsonify(response.data[0]), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# GET all tasks
@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    try:
        response = supabase.table('task').select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# --- FRONTEND SERVING ---
# ==========================================

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    # This ensures API requests don't get 'eaten' by the frontend server
    if filename.startswith("api/"):
        return jsonify({"error": "Endpoint not found"}), 404

    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

if __name__ == "__main__":
    # Check your terminal: it should be http://127.0.0.1:5000
    app.run(debug=True)