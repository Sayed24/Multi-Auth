import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
// import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState('');

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, data);
      setSuccess('User found');
      setErrorMessage('');
      setUserDetails(response.data);
    } catch (e) {
      console.log(e.response.data);
      setErrorMessage(e.response.data);
    }
  };
  return (
    <Form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='col-md-6 offset-md-3'>
        <h1>Login Page</h1>
        {errorMessage ? (
          <p className='errorMsg login-error'>{errorMessage}</p>
        ) : (
          <div>
            <p className='successMsg'> {success}</p>
            {userDetails && (
              <div className='user-details'>
                <p>First name: {userDetails.first_name}</p>
                <p>Last name: {userDetails.last_name}</p>
                <p>Email: {userDetails.user_email}</p>
                <p>Country: {userDetails.country}</p>
                <p>State: {userDetails.state}</p>
                <p>City: {userDetails.city}</p>
              </div>
            )}
          </div>
        )}
        <Form.Group controlId='user_email' className='mt-1'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name='user_email'
            placeholder='Login with email address'
            type='text'
            ref={register({
              required: 'Email is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'This is not a valid email address',
              },
            })}
            className={`${errors.user_email ? 'input-error' : ''}`}
          />
          {errors.user_email && (
            <p className='errorMsg'>{errors.user_email.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId='password' className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='user_password'
            placeholder='Enter your password'
            type='password'
            ref={register({
              required: 'Password is required',
              minlength: {
                value: 8,
                message: 'Password should be at least 8 characters',
              },
            })}
            className={`${errors.user_password ? 'input-error' : ''}`}
          />
          {errors.user_password && (
            <p className='errorMsg'>{errors.user_password.message}</p>
          )}
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-3'>
          Login
        </Button>

      </div>
    </Form>
  );
};

export default Login;
