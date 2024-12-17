import React, { useState } from "react";
import "./promocode.css";

const PromocodeList = () => {
  const [promocodes, setPromocodes] = useState([
    {
      id: 1,
      code: "PROMO123",
      type: "Percentage",
      value: 15,
      timespan: "2024-12-01 to 2024-12-31",
    },
    {
      id: 2,
      code: "PROMO456",
      type: "Fixed",
      value: 50,
      timespan: "2024-12-01 to 2024-12-31",
    },
    {
      id: 3,
      code: "PROMO789",
      type: "Percentage",
      value: 10,
      timespan: "2024-12-10 to 2024-12-20",
    },
    {
      id: 4,
      code: "PROMO000",
      type: "Fixed",
      value: 100,
      timespan: "2024-12-01 to 2024-12-15",
    },
    {
        id: 5,
        code: "PROMO000",
        type: "Fixed",
        value: 100,
        timespan: "2024-12-01 to 2024-12-15",
      },
      {
        id: 6,
        code: "PROMO000",
        type: "Fixed",
        value: 100,
        timespan: "2024-12-01 to 2024-12-15",
      },
      {
        id: 7,
        code: "PROMO000",
        type: "Fixed",
        value: 100,
        timespan: "2024-12-01 to 2024-12-15",
      },
      {
        id: 8,
        code: "PROMO000",
        type: "Fixed",
        value: 100,
        timespan: "2024-12-01 to 2024-12-15",
      },
      {
        id: 9,
        code: "PROMO000",
        type: "Fixed",
        value: 100,
        timespan: "2024-12-01 to 2024-12-15",
      },
  ]);

  const [selectedPromocodes, setSelectedPromocodes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPromocode, setEditPromocode] = useState({
    id: "",
    code: "",
    type: "",
    value: "",
    startDate: "",
    endDate: "",
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPromocodes(promocodes.map((promo) => promo.id));
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

  const handleDelete = (id) => {
    setPromocodes(promocodes.filter((promo) => promo.id !== id));
  };

  const handleEdit = (id) => {
    const promoToEdit = promocodes.find((promo) => promo.id === id);
    setEditPromocode(promoToEdit);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditPromocode({
      id: "",
      code: "",
      type: "",
      value: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleChange = (e) => {
    setEditPromocode({
      ...editPromocode,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPromocodes = promocodes.map((promo) =>
      promo.id === editPromocode.id ? editPromocode : promo
    );
    setPromocodes(updatedPromocodes);
    handleModalClose();
  };

  return (
    <div className="promocode-container">
      <h1 className="promocode-title">Promocode List</h1>

      {/* Add Promocode Button */}
      <button className="add-promocode-btn" onClick={() => setIsModalOpen(true)}>
        Add Promocode
      </button>

      {/* Promocode Table */}
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
              <tr key={promo.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPromocodes.includes(promo.id)}
                    onChange={() => handleSelectOne(promo.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td className="code-cell" style={{ color: "purple" }}>
                  {promo.code}
                </td>
                <td>{promo.type}</td>
                <td>{promo.value}</td>
                <td>{promo.timespan}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(promo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(promo.id)}
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

      {/* Modal for Edit Promocode */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Edit Promocode</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="type">Promocode Type:</label>
              <select
                id="type"
                name="type"
                value={editPromocode.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>

              <label htmlFor="code">Promocode:</label>
              <input
                type="text"
                id="code"
                name="code"
                value={editPromocode.code}
                onChange={handleChange}
                required
              />

              <label htmlFor="value">Promocode Value:</label>
              <input
                type="number"
                id="value"
                name="value"
                value={editPromocode.value}
                onChange={handleChange}
                required
              />

              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={editPromocode.startDate}
                onChange={handleChange}
                required
              />

              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={editPromocode.endDate}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button type="button" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromocodeList;
