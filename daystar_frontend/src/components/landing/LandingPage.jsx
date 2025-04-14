import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const BABYSITTERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    area: "Downtown",
    photo: "https://source.unsplash.com/300x300/?woman,portrait",
    rating: 4.8,
    experience: "5 years",
    availability: "Full-time",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    area: "West Side",
    photo: "https://source.unsplash.com/300x300/?man,portrait",
    rating: 4.9,
    experience: "3 years",
    availability: "Part-time",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    area: "North District",
    photo: "https://source.unsplash.com/300x300/?woman,face",
    rating: 4.7,
    experience: "4 years",
    availability: "Weekends",
    verified: true
  },
  // Add more babysitters as needed
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>Daystar Daycare</h1>
            </Link>
          </div>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Log in</Link>
            <Link to="/register" className="signup-btn">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Quality Childcare Services</h1>
          <p>Find the perfect daycare solution for your family</p>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Enter your location"
              className="location-input"
            />
            <button className="search-btn">Find Daycare</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
            <img src="https://source.unsplash.com/400x300/?daycare" alt="Safe Environment" />
            <h3>Safe Environment</h3>
            <p>Licensed and monitored facilities for your peace of mind</p>
          </div>
          <div className="feature-card">
            <img src="https://source.unsplash.com/400x300/?children-playing" alt="Educational Programs" />
            <h3>Educational Programs</h3>
            <p>Age-appropriate learning activities and development</p>
          </div>
          <div className="feature-card">
            <img src="https://source.unsplash.com/400x300/?teacher-child" alt="Professional Staff" />
            <h3>Professional Staff</h3>
            <p>Experienced and caring childcare professionals</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Search</h3>
            <p>Find daycare centers in your area</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Compare</h3>
            <p>Review programs and pricing</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Visit</h3>
            <p>Schedule a tour of our facility</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Enroll</h3>
            <p>Register your child and get started</p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-indicators">
        <div className="indicators-grid">
          <div className="indicator">
            <h4>Licensed</h4>
            <p>State-approved facility</p>
          </div>
          <div className="indicator">
            <h4>Background Checked</h4>
            <p>Verified staff members</p>
          </div>
          <div className="indicator">
            <h4>First Aid Certified</h4>
            <p>Trained in emergency response</p>
          </div>
        </div>
      </section>

      {/* Babysitters Section */}
      <section className="babysitters-section">
        <div className="section-header">
          <h2>Meet Our Verified Babysitters</h2>
          <p>Trusted childcare professionals in your area</p>
        </div>
        
        <div className="babysitters-grid">
          {BABYSITTERS.map(sitter => (
            <div key={sitter.id} className="babysitter-card">
              <div className="sitter-photo">
                <img src={sitter.photo} alt={sitter.name} />
                {sitter.verified && (
                  <div className="verified-badge">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </div>
              
              <div className="sitter-info">
                <h3>{sitter.name}</h3>
                <p className="area">
                  <i className="fas fa-map-marker-alt"></i> {sitter.area}
                </p>
                
                <div className="sitter-details">
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <span>{sitter.rating}</span>
                  </div>
                  <div className="experience">
                    <i className="fas fa-clock"></i>
                    <span>{sitter.experience}</span>
                  </div>
                </div>

                <div className="availability">
                  <span className="availability-tag">{sitter.availability}</span>
                </div>

                <button className="contact-sitter">
                  Contact Babysitter
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-container">
          <button className="view-all-btn">
            View All Babysitters
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <ul>
              <li><a href="#about">About Daystar</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Safety Center</a></li>
              <li><a href="#community">Community Guidelines</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Email: info@daystar.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Daycare St</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Daystar Daycare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 