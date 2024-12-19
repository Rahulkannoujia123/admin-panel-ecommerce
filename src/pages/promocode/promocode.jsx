import React, { useState, useEffect } from "react";
import axios from "axios";
import "./promocode.css"; // Make sure to add styling for your table

const PromocodeList = () => {
  const [promocodes, setPromocodes] = useState([]); // Store the fetched promocodes
  const [selectedPromocodes, setSelectedPromocodes] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPromocode, setEditPromocode] = useState({
    id: "",
    promoCode: "",
    type: "",
    value: "",
    startDate: "",
    endDate: "",
  });
  const [newPromocode, setNewPromocode] = useState({
    promoCode: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch promocodes from API on component mount
    const fetchPromocodes = async () => {
      try {
        const response = await axios.get("https://ecommerce-backend-eight-umber.vercel.app/user/get-promocode");
        setPromocodes(response.data);
      } catch (error) {
        console.error("Error fetching promocodes:", error);
      }
    };

    fetchPromocodes();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPromocodes(promocodes.map((promo) => promo._id));
    } else {
      setSelectedPromocodes([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedPromocodes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((promoId) => promoId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      setPromocodes(promocodes.filter((promo) => promo._id !== id));
      setSuccessMessage("Promocode deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting promocode:", error);
    }
  };

  const handleEdit = (id) => {
    const promoToEdit = promocodes.find((promo) => promo._id === id);
    setEditPromocode(promoToEdit);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditPromocode({
      id: "",
      promoCode: "",
      type: "",
      value: "",
      startDate: "",
      endDate: "",
    });
    setNewPromocode({
      promoCode: "",
      type: "percentage",
      value: "",
      startDate: "",
      endDate: "",
    });
  };

  // New handleEditPromocode function for handling edit promocode form submission
  const handleEditPromocode = async (e) => {
    e.preventDefault();
  
    const updatedPromocode = {
      promoCode: editPromocode.promoCode,
      type: editPromocode.type,
      value: editPromocode.value,
      timespan: {
        start: editPromocode.startDate,
        end: editPromocode.endDate,
      },
    };
  
    try {
      // Assuming 'id' is already part of the URL or passed as a prop
      const response = await fetch(
        `https://ecommerce-backend-eight-umber.vercel.app/user/update-promocode?id=${editPromocode._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPromocode),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        // Assuming you handle success in your app here
        alert(data.message); // Display success message
        // Optionally, update your state to reflect the changes
        setPromocodes((prev) =>
          prev.map((promocode) =>
            promocode._id === editPromocode._id ? data.updatedPromocode : promocode
          )
        );
        handleModalClose(); // Close the modal after successful update
      } else {
        // Handle error responses
        alert("Error updating promocode: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the promocode.");
    }
  };
  

  const handleAddPromocode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://ecommerce-backend-eight-umber.vercel.app/user/add-promocode", {
        promoCode: newPromocode.promoCode,
        type: newPromocode.type,
        value: newPromocode.value,
        timespan: {
          start: newPromocode.startDate,
          end: newPromocode.endDate
        }
      });
      setPromocodes([...promocodes, response.data]);
      setSuccessMessage("Promocode added successfully!");
      setIsAddModalOpen(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setNewPromocode({
        promoCode: "",
        type: "percentage",
        value: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error adding promocode:", error);
    }
  };

  return (
    <div className="promocode-container">
      <h1 className="promocode-title">Promocode List</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button className="add-promocode-btn" onClick={() => setIsAddModalOpen(true)}>
        Add Promocode
      </button>
      <table className="promocode-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedPromocodes.length === promocodes.length}
              />
            </th>
            <th>SR No</th>
            <th>Code</th>
            <th>Type</th>
            <th>Value</th>
            <th>Timespan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {promocodes.length > 0 ? (
            promocodes.map((promo, index) => (
              <tr key={promo._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPromocodes.includes(promo._id)}
                    onChange={() => handleSelectOne(promo._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td className="code-cell" style={{ color: "purple" }}>
                  {promo.promoCode}
                </td>
                <td>{promo.type}</td>
                <td>{promo.value}</td>
                <td>
                  {promo.timespan
                    ? `${new Date(promo.timespan.start).toLocaleDateString()} - ${new Date(promo.timespan.end).toLocaleDateString()}` 
                    : "N/A"}
                </td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(promo._id)}>
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(promo._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No promocodes found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Promocode Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Add Promocode</h2>
            <form onSubmit={handleAddPromocode}>
              <label htmlFor="promoCode">Promocode:</label>
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                value={newPromocode.promoCode}
                onChange={(e) =>
                  setNewPromocode({ ...newPromocode, promoCode: e.target.value })
                }
                required
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={newPromocode.type}
                onChange={(e) =>
                  setNewPromocode({ ...newPromocode, type: e.target.value })
                }
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
              <label htmlFor="value">Value:</label>
              <input
                type="number"
                id="value"
                name="value"
                value={newPromocode.value}
                onChange={(e) =>
                  setNewPromocode({ ...newPromocode, value: e.target.value })
                }
                required
              />
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={newPromocode.startDate}
                onChange={(e) =>
                  setNewPromocode({ ...newPromocode, startDate: e.target.value })
                }
                required
              />
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={newPromocode.endDate}
                onChange={(e) =>
                  setNewPromocode({ ...newPromocode, endDate: e.target.value })
                }
                required
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Promocode Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Edit Promocode</h2>
            <form onSubmit={handleEditPromocode}>
              <label htmlFor="promoCode">Promocode:</label>
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                value={editPromocode.promoCode}
                onChange={(e) =>
                  setEditPromocode({ ...editPromocode, promoCode: e.target.value })
                }
                required
              />
              <label htmlFor="type">Type:</label>
              <select
                id="type"
                name="type"
                value={editPromocode.type}
                onChange={(e) =>
                  setEditPromocode({ ...editPromocode, type: e.target.value })
                }
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
              <label htmlFor="value">Value:</label>
              <input
                type="number"
                id="value"
                name="value"
                value={editPromocode.value}
                onChange={(e) =>
                  setEditPromocode({ ...editPromocode, value: e.target.value })
                }
                required
              />
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={editPromocode.startDate}
                onChange={(e) =>
                  setEditPromocode({ ...editPromocode, startDate: e.target.value })
                }
                required
              />
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={editPromocode.endDate}
                onChange={(e) =>
                  setEditPromocode({ ...editPromocode, endDate: e.target.value })
                }
                required
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromocodeList;
