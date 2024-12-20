import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './slider.css'; // Add the CSS for styling

const SliderPage = () => {
  const [sliders, setSliders] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSlider, setEditSlider] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [actionType, setActionType] = useState(''); // State to manage success popup visibility

  // Fetch sliders from the API
  useEffect(() => {
    axios
      .get('https://ecommerce-backend-eight-umber.vercel.app/user/get-slider')
      .then((response) => {
        setSliders(response?.data?.slider || []); // Use optional chaining to prevent accessing undefined properties
      })
      .catch((error) => console.error('Error fetching sliders:', error));
  }, []);

  // Handle Add slider
  const handleAddSlider = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('link', link);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('https://ecommerce-backend-eight-umber.vercel.app/user/add-slider', formData);

      // Check if the response contains the "banner" object with the added slider
      if (response.data?.banner) {
        setSliders([...sliders, response.data.banner]); // Add the new slider to the list
        setName('');
        setLink('');
        setImage(null);
        setIsModalOpen(false);
        setSuccessPopup(true); // Show success popup
        setTimeout(() => {
          setSuccessPopup(false); // Hide the popup after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding slider:', error);
      alert('Failed to add slider.');
    }
  };

  // Handle Delete slider
  const handleDeleteSlider = async (id) => {
    try {
      // Send a DELETE request with the slider ID in the query string
      const response = await axios.delete(`https://ecommerce-backend-eight-umber.vercel.app/user/delete-slider?id=${id}`);
  
      // If the slider is deleted successfully, update the UI
      if (response.data?.message === 'Slider deleted successfully') {
        setSliders(sliders.filter((slider) => slider._id !== id));
        alert('Slider deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting slider:', error);
      alert('Failed to delete slider.');
    }
  };
  

  // Handle Edit slider
  const handleEditSlider = (slider) => {
    setEditSlider(slider);
    setName(slider.name);
    setLink(slider.link);
    setIsModalOpen(true);
  };

  // Handle Update slider
  const handleUpdateSlider = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('link', link);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post(
        `https://ecommerce-backend-eight-umber.vercel.app/user/update-slider?id=${editSlider._id}`,
        formData
      );

      if (response.data?.banner) {
        setSliders(sliders.map((slider) =>
          slider._id === editSlider._id ? response.data.banner : slider
        ));
        setName('');
        setLink('');
        setImage(null);
        setIsModalOpen(false);
        setEditSlider(null);
        setActionType('edit');
        setSuccessPopup(true); // Show success popup
        setTimeout(() => {
          setSuccessPopup(false); // Hide the popup after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating slider:', error);
      alert('Failed to update slider.');
    }
  };

  // Handle Modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setName('');
    setLink('');
    setImage(null);
    setEditSlider(null);
  };

  return (
    <div className="slider-page">
      <h1>Slider List</h1>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>Add Slider</button>

      <div className="slider-list">
        <h2>Existing Sliders</h2>
        <table className="slider-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sliders.length > 0 ? (
              sliders.map((slider, index) => (
                slider && slider._id ? (
                  <tr key={slider._id}>
                    <td>{index + 1}</td>
                    <td>{slider?.name || 'N/A'}</td> {/* Safe access */}
                    <td>
                      {slider?.image ? (
                        <img src={slider.image} alt={slider.name} className="slider-image" />
                      ) : (
                        'No image available'
                      )}
                    </td>
                    <td><a href={slider?.link} target="_blank" rel="noopener noreferrer">View</a></td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEditSlider(slider)}>Edit</button>
                      <button onClick={() => handleDeleteSlider(slider._id)}>Delete</button>
                    </td>
                  </tr>
                ) : null
              ))
            ) : (
              <tr>
                <td colSpan="5">No sliders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>{editSlider ? 'Edit Slider' : 'Add Slider'}</h2>
            <form onSubmit={editSlider ? handleUpdateSlider : handleAddSlider} className="modal-form">
              <input
                type="text"
                placeholder="Enter Slider Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
              <input
                type="text"
                placeholder="Enter Slider Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
              <button type="submit">{editSlider ? 'Update Slider' : 'Add Slider'}</button>
            </form>
          </div>
        </div>
      )}

         {/* Success Popup */}
         {successPopup && (
        <div className="success-popup">
          <p>{actionType === 'add' ? 'Slider added successfully!' : 'Slider updated successfully!'}</p>
        </div>
      )}
    </div>
  );
};

export default SliderPage;
