from main import supabase
from flask import request, jsonify, Blueprint

api_bp = Blueprint('api_bp', __name__)

# --- MEMBER API ---
@api_bp.route("/api/members", methods=["GET"])
def get_members():
    try:
        response = supabase.table('member').select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route("/api/members", methods=["POST"])
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
        
        # Inserts directly into the 'member' table
        response = supabase.table('member').insert(new_member).execute()
        return jsonify(response.data[0]), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- TASK API (KANBAN) ---
@api_bp.route("/api/tasks", methods=["GET"])
def get_tasks():
    try:
        response = supabase.table('task').select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route("/api/tasks", methods=["POST"])
def create_task():
    try:
        data = request.json
        new_task = {
            "title": data.get("title"),
            "priority": data.get("priority", "Medium"),
            "description": data.get("description", ""),
            "status": data.get("status", "To Do")
        }
        response = supabase.table('task').insert(new_task).execute()
        return jsonify(response.data[0]), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500