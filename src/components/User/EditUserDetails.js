import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedUser, setUpdatedUser] = useState({
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
  useEffect(() => {
    Axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        initializeForm(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("User not found.");
        navigate('/');
      });
  }, [id, navigate]);

  const initializeForm = (user) => {
    setUpdatedUser({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      website: user.website || '',
      street: user.address?.street || '',
      suite: user.address?.suite || '',
      city: user.address?.city || '',
      zipcode: user.address?.zipcode || '',
      lat: user.address?.geo?.lat || '',
      lng: user.address?.geo?.lng || '',
      companyName: user.company?.name || '',
      catchPhrase: user.company?.catchPhrase || '',
      bs: user.company?.bs || ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalUpdatedUser = {
      id: Number(id),
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      website: updatedUser.website,
      address: {
        street: updatedUser.street,
        suite: updatedUser.suite,
        city: updatedUser.city,
        zipcode: updatedUser.zipcode,
        geo: {
          lat: updatedUser.lat,
          lng: updatedUser.lng
        }
      },
      company: {
        name: updatedUser.companyName,
        catchPhrase: updatedUser.catchPhrase,
        bs: updatedUser.bs
      }
    };

    Axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, finalUpdatedUser)
      .then(() => {
        alert("User updated successfully!");
        navigate('/', { state: { updatedUser: finalUpdatedUser } });
      })
      .catch(err => {
        console.error(err);
        alert("Update failed.");
      });
  };

  return (
    <Container className="py-5 mt-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <h5 className="mb-3">Basic Info</h5>
              {['name', 'username', 'email', 'phone', 'website'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input type="text" className="form-control" name={field} value={updatedUser[field]} onChange={handleChange} placeholder={`Enter ${field}`} />
                </div>
              ))}
            </Col>
            <Col md={4}>
              <h5 className="mb-3">Address</h5>
              {['street', 'suite', 'city', 'zipcode', 'lat', 'lng'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input type="text" className="form-control" name={field} value={updatedUser[field]} onChange={handleChange} placeholder={`Enter ${field}`} />
                </div>
              ))}
            </Col>
            <Col md={4}>
              <h5 className="mb-3">Company</h5>
              {['companyName', 'catchPhrase', 'bs'].map(field => (
                <div className="mb-3" key={field}>
                  <label className="form-label">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input type="text" className="form-control" name={field} value={updatedUser[field]} onChange={handleChange} placeholder={`Enter ${field}`} />
                </div>
              ))}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button variant="success" type="submit" className="w-100">
                Save Changes
              </Button>
            </Col>
          </Row>
        </form>
      </Card>
    </Container>
  );
}

export default EditUserDetails;
