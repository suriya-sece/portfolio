import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './App.css'; // Corrected path

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '/images.jpeg', // Assuming the avatar.png is in the public folder
  });
  const [error] = useState(null);

  useEffect(() => {
    // Mock API Call to simulate fetching user data
    setTimeout(() => {
      setUser({
        name: '',
        email: '',
        avatar: '/images.jpeg', // Assuming the avatar.png is in the public folder
      });
    }, 1000);
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    // Update user information on form submission
    setUser({
      ...user,
      name: values.name,
      email: values.email,
    });
    setSubmitting(false);
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-info">
        {/* Avatar Section */}
        <div className="avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">{user.name ? user.name[0] : 'A'}</div>
          )}
        </div>

        <h2>{user.name || 'Your Name'}</h2>
        <p>{user.email || 'Your Email'}</p>

        {/* Form to update user information */}
        <Formik
          initialValues={{ name: user.name, email: user.email }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" placeholder="Enter your name" />
                {errors.name && touched.name && <div className="error">{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" placeholder="Enter your email" type="email" />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
              </div>
              <button type="submit" disabled={isSubmitting}>
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePage;
