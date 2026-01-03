import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyAPI, authAPI } from '../services/api';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      setAdmin(JSON.parse(adminData));
    }
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await propertyAPI.getAll();
      if (response.data.success) {
        setProperties(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      navigate('/login', { replace: true });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      const response = await propertyAPI.delete(id);
      if (response.data.success) {
        alert('Property deleted successfully');
        fetchProperties();
      }
    } catch (error) {
      alert('Failed to delete property');
      console.error(error);
    }
  };

  const handleToggleActive = async (id, currentValue) => {
    try {
      const response = await propertyAPI.toggleStatus(
        id,
        'is_active',
        !currentValue
      );
      if (response.data.success) {
        fetchProperties();
      }
    } catch (error) {
      alert('Failed to update property status');
      console.error(error);
    }
  };

  const handleToggleTopSelling = async (id, currentValue) => {
    try {
      const response = await propertyAPI.toggleStatus(
        id,
        'is_top_selling',
        !currentValue
      );
      if (response.data.success) {
        fetchProperties();
      }
    } catch (error) {
      alert('Failed to update property status');
      console.error(error);
    }
  };

  const activeProperties = properties.filter((p) => p.is_active).length;
  const topSellingProperties = properties.filter((p) => p.is_top_selling).length;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <header className="admin-header">
        <div className="container">
          <h1>LoonCamp Admin Panel</h1>
          <div className="user-info">
            <span className="user-email">{admin?.email}</span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>{properties.length}</h3>
            <p>Total Properties</p>
          </div>
          <div className="dashboard-card">
            <h3>{activeProperties}</h3>
            <p>Active Properties</p>
          </div>
          <div className="dashboard-card">
            <h3>{topSellingProperties}</h3>
            <p>Top Selling</p>
          </div>
        </div>

        <div className="properties-section">
          <div className="properties-header">
            <h2>All Properties</h2>
            <button
              className="btn btn-success"
              onClick={() => navigate('/property/new')}
            >
              Add New Property
            </button>
          </div>

          {properties.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              No properties found. Add your first property!
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="properties-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.id}</td>
                      <td>{property.title}</td>
                      <td>
                        <span
                          style={{
                            textTransform: 'capitalize',
                            padding: '4px 8px',
                            background: '#e2e8f0',
                            borderRadius: '4px',
                            fontSize: '12px',
                          }}
                        >
                          {property.category}
                        </span>
                      </td>
                      <td>{property.location}</td>
                      <td>{property.price}</td>
                      <td>{property.rating}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          <span
                            className={`status-badge ${
                              property.is_active ? 'status-active' : 'status-inactive'
                            }`}
                          >
                            {property.is_active ? 'Active' : 'Inactive'}
                          </span>
                          {property.is_top_selling && (
                            <span className="status-badge status-top-selling">
                              Top Selling
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn action-btn-edit"
                            onClick={() => navigate(`/property/edit/${property.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="action-btn"
                            style={{
                              background: property.is_active ? '#f56565' : '#48bb78',
                              color: 'white',
                            }}
                            onClick={() =>
                              handleToggleActive(property.id, property.is_active)
                            }
                          >
                            {property.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            className="action-btn"
                            style={{
                              background: property.is_top_selling ? '#718096' : '#ed8936',
                              color: 'white',
                            }}
                            onClick={() =>
                              handleToggleTopSelling(
                                property.id,
                                property.is_top_selling
                              )
                            }
                          >
                            {property.is_top_selling ? 'Remove Top' : 'Mark Top'}
                          </button>
                          <button
                            className="action-btn action-btn-delete"
                            onClick={() => handleDelete(property.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
