import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: 'Timothy Johnson',
    email: 'timothy@gmail.com',
    phone: '123-456-7890',
    address: '123 Main St, Springfield',
    bio: 'Experienced babysitter with a passion for childcare.',
    qualifications: 'CPR Certified, Early Childhood Education',
    experience: '5 years',
    preferences: 'No pets, Non-smoker'
  });

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
    // Save the updated profile data
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-header">
          <h3>{profileData.name}</h3>
          <button onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        <div className="profile-details">
          <div className="profile-field">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.email}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Phone:</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.phone}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.address}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Bio:</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.bio}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Qualifications:</label>
            {isEditing ? (
              <input
                type="text"
                name="qualifications"
                value={profileData.qualifications}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.qualifications}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Experience:</label>
            {isEditing ? (
              <input
                type="text"
                name="experience"
                value={profileData.experience}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.experience}</p>
            )}
          </div>
          <div className="profile-field">
            <label>Preferences:</label>
            {isEditing ? (
              <input
                type="text"
                name="preferences"
                value={profileData.preferences}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.preferences}</p>
            )}
          </div>
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
