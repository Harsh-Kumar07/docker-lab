import React, { useEffect, useState } from "react";
import axios from "axios";
import './ManageStudents.css';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", rollno: "", roomno: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students").then((res) => setStudents(res.data));
  };

  const addStudent = () => {
    if (!form.name || !form.rollno || !form.roomno) {
      return alert("Please fill all fields");
    }
    axios.post("http://localhost:5000/students", form).then(() => {
      fetchStudents();
      setForm({ name: "", rollno: "", roomno: "" });
    });
  };

  const removeStudent = (rollno) => {
    axios.delete(`http://localhost:5000/students/${rollno}`).then(fetchStudents);
  };

  return (
    <div className="manage-container">
      <div className="manage-card">
        <h2>Add New Student</h2>
        <div className="manage-form-group">
          <input
            className="input-field"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Roll No"
            value={form.rollno}
            onChange={(e) => setForm({ ...form, rollno: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Room No"
            value={form.roomno}
            onChange={(e) => setForm({ ...form, roomno: e.target.value })}
          />
          <button className="add-btn" onClick={addStudent}>➕ Add Student</button>
        </div>
      </div>

      <div className="manage-card">
        <h2>Current Students</h2>
        <div className="student-list">
          {students.map((s) => (
            <div key={s.rollno} className="student-item">
              <span className="student-name">{s.name}</span>
              <span>Roll No: {s.rollno}</span>
              <span>Room No: {s.roomno}</span>
              <button
                className="delete-btn"
                onClick={() => removeStudent(s.rollno)}
                title="Remove student"
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
