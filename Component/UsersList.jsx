import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Userlist.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } catch (err) {
        console.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, [page]);

  // Search Filter
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className="users-container">
      <h2>Users List</h2>

      {/* Search & Create Button */}
      <div className="search-create-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => navigate("/create-user")} className="create">
          + Create User
        </button>
      </div>
      <div className="users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.first_name} className="user-avatar" />
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>

              <button onClick={() => navigate(`/edit-user/${user.id}`)} className="edit">
                Edit
              </button>
              <button
                className="del"
                onClick={async () => {
                  await axios.delete(`https://reqres.in/api/users/${user.id}`);
                  setUsers(users.filter(u => u.id !== user.id));
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="btn" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <button className="btn" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersList;
