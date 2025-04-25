import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-background">
        <div className="blob blob-blue"></div>
        <div className="blob blob-purple"></div>
      </div>

      <div className="landing-content">
        <div className="landing-card">
          <div className="icon-container">
            <img
              src="/assets/nit.png"
              alt="App Icon"
              className="icon-image"
            />
          </div>

          <h1 className="landing-title">
            NIT Jamshedpur <br /> Hostel Management System
          </h1>

          <p className="landing-description">
            Seamlessly manage students, rooms, complaints, and administrative tasks in one unified platform.
          </p>

          <div className="button-group">
            <button className="button-primary" onClick={() => navigate("/manage")}>
              Add Student
            </button>
            <button className="button-secondary" onClick={() => navigate("/complaints")}>
              Submit Complaint
            </button>
          </div>
        </div>

        <footer className="landing-footer">
          Harsh Kumar 2022UGCS007
        </footer>
      </div>
    </div>
  );
}
