import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const loggedInEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${loggedInEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    fetchProfile();
  }, [loggedInEmail]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Implement save functionality here
    setIsEditing(false);
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <h3>{profileData.first_name} {profileData.last_name}</h3>
          <button onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        <div className="profile-details">
          {['email', 'role', 'nin', 'date_of_birth', 'next_of_kin_name', 'next_of_kin_phone', 'next_of_kin_relationship'].map(field => (
            <div className="profile-field" key={field}>
              <label>{field.replace(/_/g, ' ').toUpperCase()}:</label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={profileData[field] || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{profileData[field]}</p>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
