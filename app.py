from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../frontend")
CORS(app)

todos = []

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.get_json()
    todos.append({"task": data["task"], "done": False})
    return jsonify({"message": "Added"}), 201

@app.route("/todos/<int:index>", methods=["PUT"])
def mark_done(index):
    if 0 <= index < len(todos):
        todos[index]["done"] = True
        return jsonify({"message": "Updated"}), 200
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
