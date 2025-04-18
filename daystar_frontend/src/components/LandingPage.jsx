import React, { useState } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!searchLocation) {
      setError('Please enter a location');
      return;
    }
    setIsLoading(true);
    // Search functionality here
    setIsLoading(false);
  };

  return (
    <>
      {/* Header/Navigation */}
      <header className="main-header">
        <div className="header-container">
          <Link to="/" className="logo">
            Daystar
          </Link>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Log in</Link>
            <Link to="/register" className="signup-btn">Sign up</Link>
          </div>
        </div>
      </header>

      <div className="landing-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Find trusted babysitters in your area</h1>
            <p className="hero-subtitle">Connect with experienced babysitters for quality childcare</p>
            <div className="search-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="location-input"
                />
                <button 
                  className="search-button"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    'Find Daycare'
                  )}
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h3>Search</h3>
              <p>Find babysitters in your area</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3>Connect</h3>
              <p>Choose a trusted babysitter</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3>Book</h3>
              <p>Schedule your childcare</p>
            </div>
          </div>
        </section>

        {/* Featured Babysitters Section */}
        <section className="verified-babysitters-section">
          <div className="section-header">
            <h2>Meet Our Verified Babysitters</h2>
            <p>Trusted, experienced, and background-checked babysitters ready to help</p>
          </div>
          <div className="babysitters-row">
            {[
              {
                id: 1,
                name: "Sarah Johnson",
                image: "/images/babysitters/image1.jpg",
                rating: 4.8,
                reviews: 127,
                specialties: ["Infant Care", "Early Education"]
              },
              {
                id: 2,
                name: "Michael Wilson",
                image: "/images/babysitters/image2.jpg",
                rating: 4.9,
                reviews: 184,
                specialties: ["Special Needs", "First Aid"]
              },
              {
                id: 3,
                name: "Emily Davis",
                image: "/images/babysitters/image3.jpg",
                rating: 4.7,
                reviews: 156,
                specialties: ["Multilingual", "Arts & Crafts"]
              },
              {
                id: 4,
                name: "David Thompson",
                image: "/images/babysitters/image4.jpg",
                rating: 4.9,
                reviews: 142,
                specialties: ["Music", "Physical Activities"]
              }
            ].map(sitter => (
              <div key={sitter.id} className="babysitter-card">
                <div className="image-container">
                  <img 
                    src={sitter.image} 
                    alt={sitter.name} 
                    className="babysitter-image"
                  />
                  <div className="overlay">
                    <button className="view-profile-btn">View Profile</button>
                  </div>
                </div>
                <div className="babysitter-info">
                  <h3>{sitter.name}</h3>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-number">{sitter.rating}</span>
                    <span className="reviews">({sitter.reviews} reviews)</span>
                  </div>
                  <div className="specialties">
                    {sitter.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us">
          <h2>Why Choose Our Service</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Verified Profiles</h3>
              <p>All babysitters undergo thorough background checks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Care</h3>
              <p>Experienced and highly-rated babysitters</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Flexible Rates</h3>
              <p>Find care within your budget</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Easy Booking</h3>
              <p>Simple and secure booking process</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer section containing footer components*/}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About Daystar</h3>
              <ul>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/how-it-works">How it works</Link></li>
                <li><Link to="/safety">Safety</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>For Parents</h3>
              <ul>
                <li><Link to="/find-babysitter">Find a babysitter</Link></li>
                <li><Link to="/childcare-guide">Childcare guide</Link></li>
                <li><Link to="/parent-resources">Resources</Link></li>
                <li><Link to="/parent-faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>For Babysitters</h3>
              <ul>
                <li><Link to="/become-babysitter">Become a babysitter</Link></li>
                <li><Link to="/babysitter-resources">Resources</Link></li>
                <li><Link to="/babysitter-guide">Babysitting guide</Link></li>
                <li><Link to="/babysitter-faq">FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-legal">
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms of Service</Link>
              <span className="separator">•</span>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; 2024 Daystar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;