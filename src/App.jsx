import React, { useState, useEffect } from 'react';
import './App.css';

// Event display component
const EventCard = ({ event, isLoggedIn, onRelatedEventClick }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };



  const getEventIcon = (type) => {
    switch (type) {
      case 'workshop': return '🔧';
      case 'activity': return '🎯';
      case 'tech_talk': return '💬';
      default: return '📅';
    }
  };

  const isPrivate = event.permission === 'private';
  
  // Don't show private events to non-logged-in users
  if (isPrivate && !isLoggedIn) {
    return null;
  }

  return (
    <div className={`event-card ${event.event_type} ${isPrivate ? 'private' : 'public'}`}>
      <div className="event-header">
  <div className="event-type">
    <span className="event-icon">{getEventIcon(event.event_type)}</span>
    <span className="event-type-text">{event.event_type.replace('_', ' ')}</span>
    {isPrivate && <span className="private-badge">Private</span>}
  </div>
  <div className="event-time">
    <div className="start-time">{formatTime(event.start_time)}</div>
    <div className="end-time">to {formatTime(event.end_time)}</div>
  </div>
</div>

{/* ADD THIS NEW LINE HERE */}
<div className="event-id">
  <span className="event-number">Event #{event.id}</span>
</div>

<h3 className="event-title">{event.name}</h3>
      
      {event.description && (
        <p className="event-description">{event.description}</p>
      )}
      
      {event.speakers && event.speakers.length > 0 && (
        <div className="speakers">
          <strong>Presented By: </strong>
          {event.speakers.map((speaker, idx) => (
            <span key={idx} className="speaker">
              {speaker.name}
              {idx < event.speakers.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
      
      <div className="event-actions">
        {(event.public_url || event.private_url) && (
          <a 
            href={isLoggedIn ? event.private_url : event.public_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="event-link"
          >
            Join Event →
          </a>
        )}
        
        {event.related_events && event.related_events.length > 0 && (
          <div className="related-events">
            <strong>Related:</strong>
            {event.related_events.map(relatedId => (
              <button
                key={relatedId}
                onClick={() => onRelatedEventClick(relatedId)}
                className="related-event-btn"
              >
                Event #{relatedId}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Login modal component
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'hacker' && password === 'htn2026') {
      onLogin();
      onClose();
      setError('');
    } else {
      setError('Invalid credentials. Use username: "hacker", password: "htn2026"');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Hacker Login</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <div className="login-hint">
          <small>Hint: username: "hacker", password: "htn2026"</small>
        </div>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.hackthenorth.com/v3/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        
        // Sort events by start time
        const sortedEvents = data.sort((a, b) => a.start_time - b.start_time);
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search, type filter, and login status
  useEffect(() => {
    let filtered = [...events];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.speakers.some(speaker => 
          speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by event type
    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.event_type === filterType);
    }

    // Filter by permission (hide private events if not logged in)
    if (!isLoggedIn) {
      filtered = filtered.filter(event => event.permission !== 'private');
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, filterType, isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRelatedEventClick = (eventId) => {
    const targetEvent = document.getElementById(`event-${eventId}`);
    if (targetEvent) {
      targetEvent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setSelectedEventId(eventId);
      setTimeout(() => setSelectedEventId(null), 3000); // Remove highlight after 3s
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading hackathon events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="hack">Hack</span> the <span className="north">North</span> 2026
          </h1>
          <p className="app-subtitle">Discover amazing events at Canada's biggest hackathon</p>
          
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="user-info">
                <span className="welcome-text">Welcome, Hacker! 🚀</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button 
                className="login-btn-header"
                onClick={() => setShowLoginModal(true)}
              >
                Login as Hacker
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-content">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search events, speakers, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <label htmlFor="event-type-filter">Filter by type:</label>
            <select
              id="event-type-filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Events</option>
              <option value="workshop">Workshops</option>
              <option value="activity">Activities</option>
              <option value="tech_talk">Tech Talks</option>
            </select>
          </div>
          
          <div className="event-stats">
            Showing {filteredEvents.length} of {events.length} events
            {!isLoggedIn && (
              <span className="private-notice">
                (Login to see private events)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Events List */}
      <main className="events-container">
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-search-btn"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                id={`event-${event.id}`}
                className={selectedEventId === event.id ? 'highlighted' : ''}
              >
                <EventCard
                  event={event}
                  isLoggedIn={isLoggedIn}
                  onRelatedEventClick={handleRelatedEventClick}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Footer */}
      <footer className="app-footer">
        <p>Built for Hack the North 2026 Frontend Challenge</p>
        <p>🏆 Hackathon Global Inc.™</p>
      </footer>
    </div>
  );
};

export default App;