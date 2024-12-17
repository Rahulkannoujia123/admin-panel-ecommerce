import React, { useState } from "react";
import "./subadminuser.css";

const Subadmin = () => {
  // State for Users Table
  const [users, setUsers] = useState([
    { id: 1, name: "sanu", username: "sanu kumar", role: "Admin", password: "1234" },
    { id: 2, name: "rohit", username: "rohit singh", role: "Editor", password: "5678" },
    { id: 3, name: "ankit", username: "ankit sharma", role: "Viewer", password: "91011" },
  ]);

  // State for Modal Popup
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", username: "", role: "", password: "" });
  const [editingUserId, setEditingUserId] = useState(null);

  // State for Select All Checkbox
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Handle Select All Checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle Single Row Checkbox
  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  // Handle Add User Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.username && newUser.role && newUser.password) {
      if (editingUserId) {
        // Update existing user
        const updatedUsers = users.map((user) =>
          user.id === editingUserId
            ? { ...user, ...newUser }
            : user
        );
        setUsers(updatedUsers);
      } else {
        // Add new user
        const updatedUsers = [
          ...users,
          {
            id: users.length + 1,
            name: newUser.name,
            username: newUser.username,
            role: newUser.role,
            password: newUser.password,
          },
        ];
        setUsers(updatedUsers);
      }
      setNewUser({ name: "", username: "", role: "", password: "" });
      setShowModal(false);
      setEditingUserId(null);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (user) => {
    setNewUser({
      name: user.name,
      username: user.username,
      role: user.role,
      password: user.password,
    });
    setEditingUserId(user.id);
    setShowModal(true);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>Subadmin User List</h1>
        <button onClick={() => setShowModal(true)}>Add User</button>
      </div>

      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(user)}>
                  Edit
                </button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>{editingUserId ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                placeholder="Enter name"
                required
              />

              <label>Username:</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                placeholder="Enter username"
                required
              />

              <label>Role:</label>
              <input
                type="text"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                placeholder="Enter role"
                required
              />

              <label>Password:</label>
              <input
                type="text"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Enter password"
                required
              />

              <button type="submit" className="submit-btn">
                {editingUserId ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subadmin;
