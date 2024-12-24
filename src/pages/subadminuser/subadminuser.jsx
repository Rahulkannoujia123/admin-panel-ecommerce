import React, { useState, useEffect } from "react";
import axios from "axios";
import "./subadminuser.css";

const Subadmin = () => {
  // State for Users Table
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", username: "", role: "", password: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [loading, setLoading] = useState(false); // To show a loader during API requests
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]); // To store success message with timestamp

  // API endpoints
  const getUsersEndpoint = "https://ecommerce-backend-eight-umber.vercel.app/user/get-admin-user";
  const addUserEndpoint = "https://ecommerce-backend-eight-umber.vercel.app/user/add-user";
  const updateUserEndpoint = "https://ecommerce-backend-eight-umber.vercel.app/user/update-user";
  const deleteUserEndpoint = "https://ecommerce-backend-eight-umber.vercel.app/user/delete-admin-user"; 
  const deleteMultipleUsersEndpoint = "https://ecommerce-backend-eight-umber.vercel.app/user/delete-multiple-user"; // Delete user endpoint

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(getUsersEndpoint);
        console.log("Users fetched successfully:", response.data);
        setUsers(response.data.users); // Set users data from the API response
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  // Handle Add/Edit User Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.name && newUser.username && newUser.role && newUser.password) {
      try {
        setLoading(true); // Show loader

        let response;
        if (editingUserId) {
          // Update existing user with userId as query parameter
          response = await axios.post(
            `${updateUserEndpoint}?userId=${editingUserId}`,
            newUser
          );
        } else {
          // Add new user
          response = await axios.post(addUserEndpoint, newUser);
        }

        const updatedUser = response.data.user;

        if (editingUserId) {
          // Update user in the users state if it's an edit
          const updatedUsers = users.map((user) =>
            user._id === editingUserId ? { ...updatedUser } : user
          );
          setUsers(updatedUsers);
        } else {
          // Add the new user to the state if it's an add
          setUsers([...users, updatedUser]);
        }

        // Reset form and modal
        setNewUser({ name: "", username: "", role: "", password: "" });
        setShowModal(false);
        setEditingUserId(null);

        // Set success message with timestamp
        const timestamp = new Date().toLocaleString();
        setSuccessMessage(
          editingUserId
            ? `User successfully updated on ${timestamp}`
            : `User successfully added on ${timestamp}`
        );

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error saving user:", error);
        alert("Failed to save user. Please try again.");
      } finally {
        setLoading(false); // Hide loader
      }
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
    setEditingUserId(user._id);
    setShowModal(true);
  };

  // Handle Delete Button Click
  const handleDeleteClick = async (userId) => {
    try {
      const response = await axios.delete(`${deleteUserEndpoint}?userId=${userId}`);
      console.log(response.data.message); // Log success message from response
      // Remove the deleted user from the state
      setUsers(users.filter(user => user._id !== userId));
      // Set success message for deletion
      const timestamp = new Date().toLocaleString();
      setSuccessMessage(`User successfully deleted on ${timestamp}`);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };
  // Handle Select All Checkbox Change
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allUserIds = users.map((user) => user._id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle Individual Checkbox Change
  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Handle Delete Selected Users
  const handleDeleteMultipleClick = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select users to delete.");
      return;
    }
    try {
      await axios.delete(deleteMultipleUsersEndpoint, { data: { userIds: selectedUsers } });
      setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
      const timestamp = new Date().toLocaleString();
      setSuccessMessage(`Selected users successfully deleted on ${timestamp}`);
      setSelectedUsers([]); // Clear the selection
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error deleting users:", error);
      alert("Failed to delete selected users. Please try again.");
    }
  };
  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>Subadmin User List</h1>
        <button onClick={() => setShowModal(true)}>Add User</button>
        <button onClick={handleDeleteMultipleClick}>Delete Selected Users</button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
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
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
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
                <button className="delete-btn" onClick={() => handleDeleteClick(user._id)}>
                  Delete
                </button>
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
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Enter password"
                required
              />

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : editingUserId ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subadmin;
