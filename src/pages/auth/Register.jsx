import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/Projet/webapi/auth/register", {
        username,
        password,
      })
      .then(() => navigate("/entreprises"))
      .catch((error) => console.error("Error registering:", error));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-center mb-4">
        Welcome to Big Companies 😊 register for free!
      </h1>
      <div className="mb-4"></div>
      <div
        className="card p-4 shadow card-hover"
        style={{
          width: "400px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
