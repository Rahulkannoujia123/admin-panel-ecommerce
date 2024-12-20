import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './offer.css';

const OfferPage = () => {
  const [banners, setBanners] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState(null);

  useEffect(() => {
    // Fetch existing banners
    axios
      .get('https://ecommerce-backend-eight-umber.vercel.app/user/get-banner')
      .then((response) => setBanners(response.data.banners || []))
      .catch((error) => console.error('Error fetching banners:', error));
  }, []);

  const handleAddOrUpdateBanner = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);

    try {
      if (editBanner) {
        // Update existing banner
        const response = await axios.post(
          `https://ecommerce-backend-eight-umber.vercel.app/user/update-banner?id=${editBanner._id}`,
          formData
        );
        setBanners(banners.map((banner) =>
          banner._id === editBanner._id ? response.data.banner : banner
        ));
        alert('Banner updated successfully!');
      } else {
        // Add new banner
        const response = await axios.post(
          'https://ecommerce-backend-eight-umber.vercel.app/user/add-banner',
          formData
        );
        setBanners([...banners, response.data.banner]);
        alert('Banner added successfully!');
      }

      // Reset form and close modal
      setName('');
      setImage(null);
      setIsModalOpen(false);
      setEditBanner(null);
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner.');
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await axios.delete(`https://ecommerce-backend-eight-umber.vercel.app/user/delete-banner?id=${id}`);
      setBanners(banners.filter((banner) => banner._id !== id));
      alert('Banner deleted successfully!');
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  };

  const handleEditBanner = (banner) => {
    setEditBanner(banner);
    setName(banner.name);
    setImage(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setName('');
    setImage(null);
    setEditBanner(null);
  };

  return (
    <div className="offer-page">
      <h1>Offer Page</h1>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>Add Offer</button>

      <div className="banner-list">
        <h2>Existing Banners</h2>
        <table className="banner-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner._id}>
                <td>{index + 1}</td>
                <td>{banner.name}</td>
                <td>
                  {banner.image && <img src={banner.image} alt={banner.name} className="banner-image" />}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditBanner(banner)}>Edit</button>
                  <button onClick={() => handleDeleteBanner(banner._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>{editBanner ? 'Edit Banner' : 'Add Banner'}</h2>
            <form onSubmit={handleAddOrUpdateBanner} className="modal-form">
              <input
                type="text"
                placeholder="Enter Banner Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
              <button type="submit">{editBanner ? 'Update Banner' : 'Add Banner'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferPage;
