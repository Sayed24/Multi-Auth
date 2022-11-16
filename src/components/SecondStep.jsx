import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SecondStep = ({ user, updateUser }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      user_email: user.user_email,
      user_password: user.user_password,
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    updateUser(data);
    navigate('/third');
  };
  return (
    <Form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className='col-md-6 offset-md-3'
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Form.Group controlId='user_email' className='mt-1'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name='user_email'
            placeholder='Enter email address'
            type='text'
            ref={register({
              required: 'Email is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'THis is not a valid email address',
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
            placeholder='Choose your password'
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
          Go to last page...
        </Button>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
