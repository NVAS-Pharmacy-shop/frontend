import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import styles from './form.module.css';

const LoginPage = () => {
  let { registerUser }: any = useContext(AuthContext);

  return (
   
      <Container className={styles.formContainer}>
      <Form onSubmit={registerUser}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required
        />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registruj se
      </Button>
    </Form>
      </Container>

  );
};

export default LoginPage;
