from main import db

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    
    def to_json(self):
        return {"id": self.id, "name": self.name, "role": self.role, "description": self.description, "gender": self.gender, "img_url": self.img_url}

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(50), nullable=False, default="Medium")
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), nullable=False, default="To Do")
    
    def to_json(self):
        return {"id": str(self.id), "title": self.title, "priority": self.priority, "description": self.description, "status": self.status}