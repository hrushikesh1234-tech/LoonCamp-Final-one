import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { propertyAPI } from '../services/api';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'camping',
    location: '',
    rating: 4.5,
    price: '',
    price_note: 'per person with meal',
    capacity: 4,
    check_in_time: '2:00 PM',
    check_out_time: '11:00 AM',
    status: 'Verified',
    is_top_selling: false,
    is_active: true,
    contact: '+91 8669505727',
    amenities: [''],
    activities: [''],
    highlights: [''],
    policies: [''],
    images: [''],
  });

  useEffect(() => {
    if (isEditMode) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const response = await propertyAPI.getById(id);
      if (response.data.success) {
        const property = response.data.data;
        // Ensure images are strings
        const imageUrls = Array.isArray(property.images) 
          ? property.images.map(img => typeof img === 'string' ? img : img.image_url).filter(Boolean)
          : [];
          
        setFormData({
          title: property.title || '',
          description: property.description || '',
          category: property.category || 'camping',
          location: property.location || '',
          rating: property.rating || 4.5,
          price: property.price || '',
          price_note: property.price_note || 'per person with meal',
          capacity: property.capacity || 4,
          check_in_time: property.check_in_time || '2:00 PM',
          check_out_time: property.check_out_time || '11:00 AM',
          status: property.status || 'Verified',
          is_top_selling: property.is_top_selling || false,
          is_active: property.is_active !== undefined ? property.is_active : true,
          contact: property.contact || '+91 8669505727',
          amenities: property.amenities?.length > 0 ? property.amenities : [''],
          activities: property.activities?.length > 0 ? property.activities : [''],
          highlights: property.highlights?.length > 0 ? property.highlights : [''],
          policies: property.policies?.length > 0 ? property.policies : [''],
          images: imageUrls.length > 0 ? imageUrls : [''],
        });
      }
    } catch (error) {
      alert('Failed to fetch property details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => {
      const newArray = prev[field].filter((_, i) => i !== index);
      return {
        ...prev,
        [field]: newArray.length > 0 ? newArray : [''],
      };
    });
  };

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await propertyAPI.uploadImage(formData);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Upload failed');
        }
        return response.data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images.filter(img => typeof img === 'string' && img.trim() !== ''), ...uploadedUrls],
      }));
    } catch (error) {
      alert(`Failed to upload images: ${error.message}`);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean up arrays - remove empty strings
      const cleanedData = {
        ...formData,
        amenities: formData.amenities.filter((item) => typeof item === 'string' && item.trim() !== ''),
        activities: formData.activities.filter((item) => typeof item === 'string' && item.trim() !== ''),
        highlights: formData.highlights.filter((item) => typeof item === 'string' && item.trim() !== ''),
        policies: formData.policies.filter((item) => typeof item === 'string' && item.trim() !== ''),
        images: formData.images.filter((item) => typeof item === 'string' && item.trim() !== ''),
        rating: parseFloat(formData.rating),
        capacity: parseInt(formData.capacity),
      };

      let response;
      if (isEditMode) {
        response = await propertyAPI.update(id, cleanedData);
      } else {
        response = await propertyAPI.create(cleanedData);
      }

      if (response.data.success) {
        alert(
          isEditMode
            ? 'Property updated successfully!'
            : 'Property created successfully!'
        );
        navigate('/');
      }
    } catch (error) {
      alert('Failed to save property. Please check all fields.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="loading">Loading property details...</div>;
  }

  return (
    <div>
      <header className="admin-header">
        <div className="container">
          <h1>{isEditMode ? 'Edit Property' : 'Add New Property'}</h1>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="container">
        <form className="property-form" onSubmit={handleSubmit}>
          <h2>{isEditMode ? 'Edit Property' : 'Create New Property'}</h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Property Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Luxury Dome Resort"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="camping">Camping</option>
                <option value="cottage">Cottage</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Pawna Lake, Maharashtra"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g., ₹7,499"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_note">Price Note *</label>
              <input
                type="text"
                id="price_note"
                name="price_note"
                value={formData.price_note}
                onChange={handleChange}
                required
                placeholder="e.g., per person with meal"
              />
            </div>

            <div className="form-group">
              <label htmlFor="capacity">Capacity (persons) *</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (0-5) *</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="check_in_time">Check-in Time</label>
              <input
                type="text"
                id="check_in_time"
                name="check_in_time"
                value={formData.check_in_time}
                onChange={handleChange}
                placeholder="e.g., 2:00 PM"
              />
            </div>

            <div className="form-group">
              <label htmlFor="check_out_time">Check-out Time</label>
              <input
                type="text"
                id="check_out_time"
                name="check_out_time"
                value={formData.check_out_time}
                onChange={handleChange}
                placeholder="e.g., 11:00 AM"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="e.g., Verified"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g., +91 8669505727"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe your property in detail..."
            />
          </div>

          <div className="form-grid">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label htmlFor="is_active">Active (visible to public)</label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="is_top_selling"
                name="is_top_selling"
                checked={formData.is_top_selling}
                onChange={handleChange}
              />
              <label htmlFor="is_top_selling">Mark as Top Selling</label>
            </div>
          </div>

          <div className="array-input">
            <h4>Amenities</h4>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) =>
                    handleArrayChange('amenities', index, e.target.value)
                  }
                  placeholder="e.g., Private Washroom, AC, Pool"
                />
                {formData.amenities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('amenities', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-item-btn"
              onClick={() => addArrayItem('amenities')}
            >
              + Add Amenity
            </button>
          </div>

          <div className="array-input">
            <h4>Activities</h4>
            {formData.activities.map((activity, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) =>
                    handleArrayChange('activities', index, e.target.value)
                  }
                  placeholder="e.g., Boating, Swimming, Bonfire"
                />
                {formData.activities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('activities', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-item-btn"
              onClick={() => addArrayItem('activities')}
            >
              + Add Activity
            </button>
          </div>

          <div className="array-input">
            <h4>Highlights (What You'll Love)</h4>
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) =>
                    handleArrayChange('highlights', index, e.target.value)
                  }
                  placeholder="e.g., Panoramic lake views, Private pool"
                />
                {formData.highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('highlights', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-item-btn"
              onClick={() => addArrayItem('highlights')}
            >
              + Add Highlight
            </button>
          </div>

          <div className="array-input">
            <h4>Policies (Good to Know)</h4>
            {formData.policies.map((policy, index) => (
              <div key={index} className="array-item">
                <input
                  type="text"
                  value={policy}
                  onChange={(e) =>
                    handleArrayChange('policies', index, e.target.value)
                  }
                  placeholder="e.g., Free cancellation up to 7 days"
                />
                {formData.policies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('policies', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-item-btn"
              onClick={() => addArrayItem('policies')}
            >
              + Add Policy
            </button>
          </div>

          <div className="array-input">
            <h4>Images</h4>
            <div className="upload-section" style={{ marginBottom: '20px' }}>
              <label className="btn btn-secondary" style={{ cursor: 'pointer', display: 'inline-block' }}>
                {uploading ? 'Uploading...' : '↑ Upload Images to Cloudinary'}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
              <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                Upload multiple images directly. They will be automatically optimized.
              </p>
            </div>

            <div className="image-previews" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              {formData.images.filter(url => typeof url === 'string' && url.trim() !== '').map((image, index) => (
                <div key={index} className="image-preview-item" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                  <img 
                    src={typeof image === 'string' ? image.replace('/upload/', '/upload/w_300,f_auto,q_auto/') : ''} 
                    alt={`Property ${index + 1}`} 
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('images', index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'rgba(255,0,0,0.7)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="manual-urls">
              <details>
                <summary style={{ cursor: 'pointer', color: '#666', fontSize: '0.9rem' }}>Manual Image URLs (Advanced)</summary>
                {formData.images.map((image, index) => (
                  <div key={index} className="array-item" style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) =>
                        handleArrayChange('images', index, e.target.value)
                      }
                      placeholder="Enter image URL manually"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('images', index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-item-btn"
                  onClick={() => addArrayItem('images')}
                  style={{ marginTop: '10px' }}
                >
                  + Add Manual URL
                </button>
              </details>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? 'Saving...'
                : isEditMode
                ? 'Update Property'
                : 'Create Property'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
