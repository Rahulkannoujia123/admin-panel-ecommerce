import React, { useState } from 'react';
import './taxes.css';

const Taxes = () => {
  const [taxes, setTaxes] = useState([
    { id: 1, name: 'GST', percentage: 18 },
    { id: 2, name: 'VAT', percentage: 12 },
  ]);
  const [newTax, setNewTax] = useState({ name: '', percentage: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedTaxes, setSelectedTaxes] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTaxes(taxes.map(tax => tax.id));
    } else {
      setSelectedTaxes([]);
    }
  };

  const handleTaxSelection = (e, taxId) => {
    if (e.target.checked) {
      setSelectedTaxes([...selectedTaxes, taxId]);
    } else {
      setSelectedTaxes(selectedTaxes.filter(id => id !== taxId));
    }
  };

  const handleAddTaxClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTax.name && newTax.percentage) {
      const newTaxObj = { ...newTax, id: taxes.length + 1 };
      setTaxes([...taxes, newTaxObj]);
      setNewTax({ name: '', percentage: '' });
      setIsPopupOpen(false);
    }
  };

  const handleDeleteTax = (taxId) => {
    setTaxes(taxes.filter(tax => tax.id !== taxId));
  };

  const handleEditTax = (taxId) => {
    const taxToEdit = taxes.find(tax => tax.id === taxId);
    setNewTax({ name: taxToEdit.name, percentage: taxToEdit.percentage });
    setIsPopupOpen(true);
  };

  return (
    <div className="taxes-page">
      <h2>Taxes List</h2> {/* Added h1 here */}
      <div className="header">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Taxes"
        />
        <button className="add-tax-btn" onClick={handleAddTaxClick}>Add Tax</button>
      </div>

      <table className="taxes-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedTaxes.length === taxes.length}
              />
            </th>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Percentage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taxes
            .filter(tax => tax.name.toLowerCase().includes(search.toLowerCase()))
            .map((tax, index) => (
              <tr key={tax.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTaxes.includes(tax.id)}
                    onChange={(e) => handleTaxSelection(e, tax.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{tax.name}</td>
                <td>{tax.percentage}%</td>
                <td>
                  <button onClick={() => handleEditTax(tax.id)}>Edit</button>
                  <button onClick={() => handleDeleteTax(tax.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Add Tax</h3>
            <form onSubmit={handleFormSubmit}>
              <label>Tax Name:</label>
              <input
                type="text"
                value={newTax.name}
                onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                required
              />
              <label>Tax Percentage:</label>
              <input
                type="number"
                value={newTax.percentage}
                onChange={(e) => setNewTax({ ...newTax, percentage: e.target.value })}
                required
              />
              <div className="form-buttons">
                <button type="button" onClick={handlePopupClose}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taxes;
