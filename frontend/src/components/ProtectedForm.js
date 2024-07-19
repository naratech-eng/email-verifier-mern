import React, { useState } from 'react';
import axios from 'axios';

const ProtectedForm = ({ email }) => {
  const [formData, setFormData] = useState({
    animalId: '',
    animalName: '',
    birthLocation: '',
    milkProduction: '',
    healthStatus: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/emails/submit-form', { email, formData });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Protected Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="animalId" placeholder="Animal ID" value={formData.animalId} onChange={handleChange} required />
        <input type="text" name="animalName" placeholder="Animal Name" value={formData.animalName} onChange={handleChange} required />
        <input type="text" name="birthLocation" placeholder="Birth Location" value={formData.birthLocation} onChange={handleChange} required />
        <input type="text" name="milkProduction" placeholder="Milk Production" value={formData.milkProduction} onChange={handleChange} required />
        <input type="text" name="healthStatus" placeholder="Health Status" value={formData.healthStatus} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProtectedForm;
