import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './customer.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [updatedFullName, setUpdatedFullName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]); // Define selectedCustomers state

  // Fetch customers data from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-eight-umber.vercel.app/user/user-list');
        const data = await response.json();
        if (data && data.users) {
          setCustomers(data.users);
          setFilteredCustomers(data.users);
        } else {
          console.error("Failed to fetch customers.");
        }

        if (customerId) {
          // Fetch customer details by userId
          const customerDetailResponse = await fetch(`https://ecommerce-backend-eight-umber.vercel.app/user/get-user-detail?userId=${customerId}`);
          const customerDetailData = await customerDetailResponse.json();

          if (customerDetailData && customerDetailData.user) {
            setSelectedCustomer(customerDetailData.user);
            setUpdatedFullName(customerDetailData.user.fullName);
            setUpdatedEmail(customerDetailData.user.email);
            setUpdatedPhoneNumber(customerDetailData.user.phoneNumber);
          } else {
            console.error('Failed to fetch customer details');
          }
        }
      } catch (error) {
        console.error("Error fetching customers data:", error);
      }
    };

    fetchCustomers();
  }, [customerId]);

  // Update customer function
  const updateCustomer = async (updatedCustomer) => {
    try {
      const response = await fetch(
        `https://ecommerce-backend-eight-umber.vercel.app/user/update-user?userId=${updatedCustomer._id}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: updatedCustomer.fullName,
            email: updatedCustomer.email,
            phoneNumber: updatedCustomer.phoneNumber,
          }),
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message);
        
        // Update local state with the updated customer data
        const updatedCustomers = customers.map((customer) =>
          customer._id === updatedCustomer._id ? data.user : customer
        );
        
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
        setSelectedCustomer(data.user);
        setShowModal(false); // Close the modal after update
      } else {
        alert('Failed to update customer: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Error updating customer.');
    }
  };

  const handleSearch = () => {
    const filtered = customers.filter(
      (customer) =>
        customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  const handleCustomerClick = (id) => {
    navigate(`/customers/${id}`);
  };

  const handleBackClick = () => {
    navigate('/customers');
    setSelectedCustomer(null);
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setUpdatedFullName(customer.fullName);
    setUpdatedEmail(customer.email);
    setUpdatedPhoneNumber(customer.phoneNumber);
    setShowModal(true); // Open the modal when edit button is clicked
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`https://ecommerce-backend-eight-umber.vercel.app/user/delete-user?id=${id}`, {
          method: 'DELETE', // Use DELETE method for deleting
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message); // Show a success message

          // Remove the deleted customer from the state
          setCustomers(customers.filter((customer) => customer._id !== id));
          setFilteredCustomers(filteredCustomers.filter((customer) => customer._id !== id));
        } else {
          const errorData = await response.json();
          alert('Failed to delete customer: ' + errorData.message);
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer.');
      }
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(filteredCustomers.map((customer) => customer._id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((customerId) => customerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedCustomer = {
      _id: selectedCustomer._id,
      fullName: updatedFullName,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
    };
    updateCustomer(updatedCustomer);
  };

  return (
    <div className="customers-container">
      {selectedCustomer ? (
        <div className="customer-insight-container">
          <h1>Customer #{selectedCustomer._id} Details</h1>
          <div className="customer-details">
            <p><strong>Name:</strong> {selectedCustomer.fullName}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phoneNumber}</p>
            <p><strong>Status:</strong> Active</p>
            <p><strong>Registered On:</strong> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
            <button className="back-button" onClick={handleBackClick}>
              Back to Customer List
            </button>
            <button className="edit-button" onClick={() => handleEditClick(selectedCustomer)}>
              Edit Customer
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="header-container">
            <h1>Customers</h1>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
            </div>
          </div>
          <p>Manage and view customer details here.</p>
          <table className="customers-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedCustomers.length === filteredCustomers.length}
                  />
                </th>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer._id)}
                      onChange={() => handleCheckboxChange(customer._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{customer.fullName}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.email}</td>
                  <td>
                    <button
                      onClick={() => handleCustomerClick(customer._id)}
                      className="view-details-button"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEditClick(customer)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(customer._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Customer</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Full Name:
                <input
                  type="text"
                  value={updatedFullName}
                  onChange={(e) => setUpdatedFullName(e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={updatedPhoneNumber}
                  onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                  required
                />
              </label>
              <button type="submit" className="submit-button">Update</button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
