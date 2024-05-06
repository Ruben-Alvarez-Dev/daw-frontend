import { useState } from 'react';

export const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    first_surname: '',
    second_surname: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.first_surname) {
      errors.first_surname = 'First surname is required';
      isValid = false;
    }

    if (!formData.second_surname) {
      errors.second_surname = 'Second surname is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'Phone is required';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Usuario creado exitosamente
          console.log('User created successfully');
          setFormData({
            name: '',
            first_surname: '',
            second_surname: '',
            email: '',
            phone: '',
            password: '',
          });
          setErrors({});
        } else {
          // Error al crear el usuario
          console.log('Error creating user');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="first_surname">First Surname:</label>
        <input
          type="text"
          id="first_surname"
          name="first_surname"
          value={formData.first_surname}
          onChange={handleChange}
        />
        {errors.first_surname && <span>{errors.first_surname}</span>}
      </div>
      <div>
        <label htmlFor="second_surname">Second Surname:</label>
        <input
          type="text"
          id="second_surname"
          name="second_surname"
          value={formData.second_surname}
          onChange={handleChange}
        />
        {errors.second_surname && <span>{errors.second_surname}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};