import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import './RegistrationForm.css';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    email_id: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({ video: true }).catch((err) => {
        console.error('Camera access error:', err);
        setShowCamera(false);
      });
    }
  }, [showCamera]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.user_id) newErrors.user_id = 'User ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!emailRegex.test(formData.email_id)) newErrors.email_id = 'Invalid email format';
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (images.length !== 5) newErrors.images = 'Please capture exactly 5 images';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const base64ToFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (images.length < 5 && imageSrc) {
      const file = base64ToFile(imageSrc, `captured_${Date.now()}.jpg`);
      setImages([...images, file]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((img) => data.append('images', img));

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, data);
      alert('✅ Registration successful!');
    } catch (error) {
      console.error(error);
      // ✅ Check for 400 Bad Request with custom message
      if (error.response && error.response.status === 400 && error.response.data.detail) {
        alert(`❌ ${error.response.data.detail}`);
      } else {
        alert('❌ Registration failed. Please try again.');
      }
    }
    // ✅ Clear form and images after success
    setFormData({
      user_id: '',
      name: '',
      email_id: '',
      phone: '',
    });
    setImages([]);
    setErrors({});
    setShowCamera(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="registration-container">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <input type="text" name="user_id" value={formData.user_id} onChange={handleInputChange} />
          {errors.user_id && <span className="error">{errors.user_id}</span>}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email_id" value={formData.email_id} onChange={handleInputChange} />
          {errors.email_id && <span className="error">{errors.email_id}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Capture Images (5 required):</label>
          <button type="button" onClick={() => setShowCamera(!showCamera)}>
            {showCamera ? 'Close Camera' : 'Open Camera'}
          </button>

          {showCamera && (
            <div className="camera-section">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"/>
              <br />
              <button type="button" onClick={captureImage} disabled={images.length >= 5}>
                Capture Image ({5 - images.length} remaining)
              </button>
            </div>
          )}

          <div className="preview-images">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt={`img-${idx}`}
                style={{ width: '100px', margin: '5px', borderRadius: '5px' }}
              />
            ))}
          </div>
          {errors.images && <span className="error">{errors.images}</span>}
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
