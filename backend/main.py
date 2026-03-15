import os
from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client

# 1. Load configuration
load_dotenv()

app = Flask(__name__)
CORS(app)

# 2. Supabase Connection
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# ==========================================
# --- MEMBER API ROUTES ---
# ==========================================

@app.route("/api/members", methods=["GET"])
def get_members():
    try:
        response = supabase.table('member').select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

@app.route("/api/members/<int:id>", methods=["PATCH"])
def update_member(id):
    try:
        data = request.json
        # Only update the fields provided in the request body
        response = supabase.table('member').update(data).eq('id', id).execute()
        if not response.data:
            return jsonify({"error": "Member not found"}), 404
        return jsonify(response.data[0]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/members/<int:id>", methods=["DELETE"])
def delete_member(id):
    try:
        response = supabase.table('member').delete().eq('id', id).execute()
        return jsonify({"msg": "Member deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================
# --- TASK API ROUTES (KANBAN) ---
# ==========================================

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    try:
        response = supabase.table('task').select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks", methods=["POST"])
def create_task():
    try:
        data = request.json
        response = supabase.table('task').insert(data).execute()
        return jsonify(response.data[0]), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tasks/<int:id>", methods=["PATCH"])
def update_task(id):
    try:
        data = request.json
        response = supabase.table('task').update(data).eq('id', id).execute()
        return jsonify(response.data[0]), 200
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
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

if __name__ == "__main__":
    app.run(debug=True)