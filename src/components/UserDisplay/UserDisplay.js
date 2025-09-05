import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import EditUserIcon from '../Logo/EditUserIcon';
import DeleteUserIcon from '../Logo/DeleteUserIcon';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

function UserDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const newUser = location.state?.newUser;
  const updatedUser = location.state?.updatedUser;

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(baseURL)
      .then((response) => {
        let users = response.data;

        if (newUser) {
          newUser.id = newUser.id || Date.now();
          users = [newUser, ...users];
        }

        if (updatedUser) {
          users = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
        }

        setUserData(users);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to load users.');
        setLoading(false);
      });
  }, [newUser, updatedUser]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      Axios.delete(`${baseURL}/${id}`)
        .then(() => {
          setUserData((prev) => prev.filter((user) => user.id !== id));
          alert('User deleted successfully.');
        })
        .catch((error) => {
          console.error('Delete error:', error);
          alert('Failed to delete user.');
        });
    }
  };

  return (
    <Container fluid style={{marginTop:'6rem'}}>
      <Container fluid className="mt-4 text-center">
        <Button style={{ width: '70%' }} onClick={() => navigate('/AddUser')}>
          Add User
        </Button>
      </Container>

      {loading ? (
        <div className="text-center my-5 spinner-border text-primary" role="status">
        </div>
      ) : (
        <Container fluid className="pt-4">
          <Row className="g-4">
            {userData.map((data) => (
              <Col key={data.id} xs={12} sm={12} md={6} lg={6}>
                <Card className="h-100 shadow">
                  <Row className="g-0 align-items-center">
                    <Col xs={12} sm={4} md={3} className="text-center p-3">
                      <Card.Img
                        src={require('../img/UserIcon.png')}
                        alt="User"
                      />
                    </Col>
                    <Col xs={12} sm={8} md={7} style={{ textAlign: 'left' }}>
                      <Card.Body>
                        <Card.Title>Name: {data.name}</Card.Title>
                        <Card.Text>Username: {data.username}</Card.Text>
                        <Card.Text>Email: {data.email}</Card.Text>
                      </Card.Body>
                    </Col>
                    <Col xs={12} sm={12} md={2} className="text-center p-3">
                      <Button variant="primary" className="mb-2" style={{ width: '80%' }} onClick={() => navigate(`/UserEdit/${data.id}`, { state: { user: data } })}>
                        <EditUserIcon/> 
                      </Button>
                      <Button variant="danger" style={{ width: '80%' }}onClick={() => handleDelete(data.id)}> <DeleteUserIcon/> </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default UserDisplay;
