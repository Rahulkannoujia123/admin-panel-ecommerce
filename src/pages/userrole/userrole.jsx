import React, { useState } from "react";
import "./userrole.css";

const UserRoleList = () => {
  const [userRoles, setUserRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Employee" },
    { id: 4, name: "Customer" },
  ]);
  
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState(""); // To store the new role name

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRoles(userRoles.map((role) => role.id));
    } else {
      setSelectedRoles([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedRoles((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((roleId) => roleId !== id)
        : [...prevSelected, id]
    );
  };

  const handleEdit = (id) => {
    const role = userRoles.find((role) => role.id === id);
    setCurrentRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setUserRoles(userRoles.filter((role) => role.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRole(null);
    setNewRoleName(""); // Clear the new role name when closing modal
  };

  const handleSaveRole = () => {
    if (currentRole) {
      setUserRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === currentRole.id ? currentRole : role
        )
      );
    } else {
      // Add new role logic
      const newRole = { id: Date.now(), name: newRoleName };
      setUserRoles([...userRoles, newRole]);
    }
    handleCloseModal();
  };

  const handleAddNewRole = () => {
    setIsModalOpen(true); // Open modal for adding a new role
    setCurrentRole(null); // Reset currentRole to null to signify new role creation
    setNewRoleName(""); // Clear the new role name input field
  };

  return (
    <div className="userrole-container">
      <h1 className="userrole-title">User Role List</h1>
      
      {/* Button to add a new role */}
      <button className="add-role-button" onClick={handleAddNewRole}>
        Add New Role
      </button>

      <table className="userrole-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRoles.length === userRoles.length}
              />
            </th>
            <th>SR No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userRoles.length > 0 ? (
            userRoles.map((role, index) => (
              <tr key={role.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleSelectOne(role.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{role.name}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(role.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No user roles found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{currentRole ? "Edit" : "Add"} User Role</h2>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  value={currentRole ? currentRole.name : newRoleName}
                  onChange={(e) =>
                    currentRole
                      ? setCurrentRole({ ...currentRole, name: e.target.value })
                      : setNewRoleName(e.target.value)
                  }
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="button" onClick={handleSaveRole}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoleList;