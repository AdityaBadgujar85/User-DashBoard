import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    lat: '',
    lng: '',
    companyName: '',
    catchPhrase: '',
    bs: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email);
    if (!userData.name || !userData.username || !userData.email || !isEmailValid) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const finalUser = {
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      address: {
        street: userData.street,
        suite: userData.suite,
        city: userData.city,
        zipcode: userData.zipcode,
        geo: {
          lat: userData.lat,
          lng: userData.lng
        }
      },
      company: {
        name: userData.companyName,
        catchPhrase: userData.catchPhrase,
        bs: userData.bs
      }
    };

    Axios.post("https://jsonplaceholder.typicode.com/users", finalUser)
      .then((response) => {
        alert("User added successfully!");
        navigate('/', { state: { newUser: response.data } });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Add New User</h2>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <h5 className="mb-3">Basic Info</h5>
              {['name', 'username', 'email', 'phone', 'website'].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={userData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    required={['name', 'username', 'email'].includes(field)}
                  />
                </Form.Group>
              ))}
            </Col>

            <Col md={6}>
              <h5 className="mb-3">Address</h5>
              {['street', 'suite', 'city', 'zipcode', 'lat', 'lng'].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={userData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                  />
                </Form.Group>
              ))}
            </Col>
          </Row>

          <hr />

          <Row>
            <Col>
              <h5 className="mb-3">Company Info</h5>
              {['companyName', 'catchPhrase', 'bs'].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.replace(/([A-Z])/g, ' $1')}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={userData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                  />
                </Form.Group>
              ))}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}

export default AddUser;
