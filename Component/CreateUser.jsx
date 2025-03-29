import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Createuser.css";

const CreateUser = () => {
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reqres.in/api/users", user);
      navigate("/users");
    } catch (err) {
      setError("Failed to create user");
    }
  };

  return (
    <div className="create-user-container">
      <div className="create-user-form">
        <h2 className="create-user-title">Create New User</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleCreate}>
          <input 
            type="text" 
            placeholder="First Name" 
            value={user.first_name} 
            onChange={(e) => setUser({ ...user, first_name: e.target.value })} 
            className="input-field"
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={user.last_name} 
            onChange={(e) => setUser({ ...user, last_name: e.target.value })} 
            className="input-field"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
            className="input-field"
          />
          <button type="submit" className="submit-btn">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
