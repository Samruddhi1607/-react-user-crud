import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Edituser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/users");
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdate} className="edit-user-form">
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
        <div className="button-group">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/users")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
