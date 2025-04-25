import React, { useEffect, useState } from "react";
import axios from "axios";
import './Complaints.css';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ roomno: "", complaint: "" });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    axios.get("http://localhost:5000/complaints").then((res) => setComplaints(res.data));
  };

  const submitComplaint = () => {
    if (!form.roomno || !form.complaint) {
      return alert("Please fill all fields");
    }
    axios.post("http://localhost:5000/complaints", form).then(() => {
      setForm({ roomno: "", complaint: "" });
      fetchComplaints();
    });
  };

  const removeComplaint = (id) => {
    axios
      .delete(`http://localhost:5000/complaints/${id}`)
      .then(fetchComplaints)
      .catch((err) => {
        console.error("Error removing complaint:", err);
        alert("Failed to delete complaint. Please try again.");
      });
  };

  return (
    <div className="complaints-container">
      <div className="complaint-form">
        <h2>Submit a Complaint</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Room No"
            value={form.roomno}
            onChange={(e) => setForm({ ...form, roomno: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Enter your complaint"
            rows="4"
            value={form.complaint}
            onChange={(e) => setForm({ ...form, complaint: e.target.value })}
            className="textarea-field"
          />
          <button onClick={submitComplaint} className="submit-btn">
            Submit
          </button>
        </div>
      </div>

      <div className="complaint-list">
        <h3>All Complaints</h3>
        <ul>
          {complaints.map((c) => (
            <li key={c.id} className="complaint-item">
              <div className="roomno">Room No: {c.roomno}</div>
              <div className="complaint">{c.complaint}</div>
              <div className="button-container">
                <button className="complete-btn" onClick={() => removeComplaint(c.id)}>
                  ✅ Completed
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeComplaint(c.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
