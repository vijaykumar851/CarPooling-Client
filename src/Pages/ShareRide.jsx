import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useRideContext } from "../Context/RideContext";
import "./ShareRide.css";

const ShareRide = ({ user }) => {
  const navigate = useNavigate();
  const { addRide } = useRideContext(); // Access the addRide function from context

  const [newRide, setNewRide] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "",
    price: "",
    driverName: user?.name || "", // Default to the logged-in user's name
    driverImage: "", // Base64 or URL for the driver's image
    preferences: {
      smoking: false,
      pets: false,
      music: false,
      luggage: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // List of predefined places for auto-suggestions
  const places = ["Hyderabad","Bangalore","Chennai","Mumbai","Delhi","Pune",
    "Kolkata","Vijayawada","Warangal","Medak","Goa","Jaipur","Lucknow","Ahmedabad",
    "Surat",'visakhapatam','tirupati','rajahmundry','nizamabad','kakinada'];

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleNewRideInputChange = (field, value) => {
    setNewRide({ ...newRide, [field]: value });

    if(field === "seats" && value > 7) {
      alert("you can only select a maximum of 7 seats");
      return;
    }
    

    if (field === "from") {
      if (value.length >= 1) {
        const filteredSuggestions = places.filter((place) =>
          place.toLowerCase().startsWith(value.toLowerCase())
        );
        setFromSuggestions(filteredSuggestions);
      } else {
        setFromSuggestions([]);
      }
    }

    if (field === "to") {
      if (value.length >= 1) {
        const filteredSuggestions = places.filter((place) =>
          place.toLowerCase().startsWith(value.toLowerCase())
        );
        setToSuggestions(filteredSuggestions);
      } else {
        setToSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (field, value) => {
    setNewRide({ ...newRide, [field]: value });
    if (field === "from") setFromSuggestions([]);
    if (field === "to") setToSuggestions([]);
  };

  const handleNewRidePreferenceChange = (preference) => {
    setNewRide((prevRide) => ({
      ...prevRide,
      preferences: {
        ...prevRide.preferences,
        [preference]: !prevRide.preferences[preference],
      },
    }));
  };

  const handleNonePreference = () => {
    setNewRide((prevRide) => ({
      ...prevRide,
      preferences: {
        smoking: false,
        pets: false,
        music: false,
        luggage: false,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRide((prevRide) => ({
          ...prevRide,
          driverImage: reader.result, // Save the Base64 string of the image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostRide = () => {
    setIsLoading(true);
    setTimeout(() => {
      addRide(newRide); // Add the ride to the shared state
      alert("Ride posted successfully!");
      setIsLoading(false);
      setNewRide({
        from: "",
        to: "",
        date: "",
        time: "",
        seats: "",
        price: "",
        driverName: user?.name || "",
        driverImage: "",
        preferences: {
          smoking: false,
          pets: false,
          music: false,
          luggage: false,
        },
      });
      navigate("/ride-sharing"); // Redirect to RideSharing page
    }, 2000);
  };

  return (
    <div className="post-ride-container">
      <h2>Offer a Ride</h2>
      <div className="post-ride-form">
        <div className="form-row">
          <div className="form-group">
            <label>From</label>
            <input
              type="text"
              placeholder="Departure city"
              value={newRide.from}
              onChange={(e) => handleNewRideInputChange("from", e.target.value)}
            />
            {fromSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {fromSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick("from", suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <label>To</label>
            <input
              type="text"
              placeholder="Destination city"
              value={newRide.to}
              onChange={(e) => handleNewRideInputChange("to", e.target.value)}
            />
            {toSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {toSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick("to", suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={newRide.date}
              onChange={(e) => handleNewRideInputChange("date", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              value={newRide.time}
              onChange={(e) => handleNewRideInputChange("time", e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Available Seats</label>
            <input
              type="number"
              min="1"
              max="7"
              value={newRide.seats}
              onChange={(e) => handleNewRideInputChange("seats", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price per Seat (₹)</label>
            <input
              type="number"
              min="0"
              placeholder="Price in rupees"
              value={newRide.price}
              onChange={(e) => handleNewRideInputChange("price", e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Driver Name</label>
            <input
              type="text"
              placeholder="Driver's name"
              value={newRide.driverName}
              onChange={(e) =>
                handleNewRideInputChange("driverName", e.target.value)
              }
            />
          </div>
          <div className="form-group">
            <label>Driver Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {newRide.driverImage && (
              <img
                src={newRide.driverImage}
                alt="Driver"
                className="driver-image-preview"
              />
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Ride Preferences</label>
          <div className="preferences-options">
            <div
              className={`preference-option ${
                newRide.preferences.smoking ? "active" : ""
              }`}
              onClick={() => handleNewRidePreferenceChange("smoking")}
            >
              <span className="preference-icon">🚬</span>
              <span>Smoking allowed</span>
            </div>
            <div
              className={`preference-option ${
                newRide.preferences.pets ? "active" : ""
              }`}
              onClick={() => handleNewRidePreferenceChange("pets")}
            >
              <span className="preference-icon">🐾</span>
              <span>Pets allowed</span>
            </div>
            <div
              className={`preference-option ${
                newRide.preferences.music ? "active" : ""
              }`}
              onClick={() => handleNewRidePreferenceChange("music")}
            >
              <span className="preference-icon">🎵</span>
              <span>Music</span>
            </div>
            <div
              className={`preference-option ${
                newRide.preferences.luggage ? "active" : ""
              }`}
              onClick={() => handleNewRidePreferenceChange("luggage")}
            >
              <span className="preference-icon">🧳</span>
              <span>Extra luggage</span>
            </div>
            <div
              className="preference-option none-option"
              onClick={handleNonePreference}
            >
              <span className="preference-icon">❌</span>
              <span>None</span>
            </div>
          </div>
        </div>

        <button
          className="post-ride-button"
          onClick={handlePostRide}
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Publish Ride"}
        </button>
      </div>
    </div>
  );
};

ShareRide.propTypes = {
  user: PropTypes.object,
};

export default ShareRide;