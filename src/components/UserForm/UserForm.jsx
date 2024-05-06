import { useState } from 'react';
import { createUser } from '../../services/api';
/* import './UserForm.css'; */

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    first_surname: '',
    second_surname: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setFormData({
        name: '',
        first_surname: '',
        second_surname: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="user-form">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        {/* Render form fields */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
