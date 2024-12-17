import React, { useState } from 'react';
import './newsletter.css';

const NewsletterList = () => {
  const [search, setSearch] = useState('');
  const [emails, setEmails] = useState([
    { id: 1, email: 'user1@example.com', created: '2024-12-01' },
    { id: 2, email: 'test@example.com', created: '2024-12-02' },
    { id: 3, email: 'ankit@example.com', created: '2024-12-03' },
    { id: 4, email: 'rahul@example.com', created: '2024-12-03' },
    { id: 5, email: 'rohit@example.com', created: '2024-12-03' },
    { id: 6, email: 'sahil@example.com', created: '2024-12-03' },
    { id: 7, email: 'sara@example.com', created: '2024-12-03' },
    { id: 8, email: 'kartik@example.com', created: '2024-12-03' },
    { id: 9, email: 'karan@example.com', created: '2024-12-03' },
    { id: 10, email: 'nayar@example.com', created: '2024-12-03' },
    { id: 11, email: 'risi@example.com', created: '2024-12-03' },
  ]);
  const [selected, setSelected] = useState([]);

  // Handle delete action
  const handleDelete = (id) => {
    setEmails(emails.filter(email => email.id !== id));
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(emails.map(email => email.id));
    } else {
      setSelected([]);
    }
  };

  // Handle individual checkbox
  const handleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Handle search filter
  const filteredEmails = emails.filter(email =>
    email.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="newsletter-container">
      <h1>Newsletter List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="newsletter-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selected.length === emails.length && emails.length > 0}
              />
            </th>
            <th>Sr. No</th>
            <th>Email</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email, index) => (
              <tr key={email.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(email.id)}
                    onChange={() => handleSelect(email.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{email.email}</td>
                <td>{email.created}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(email.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">
                No emails found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterList;
