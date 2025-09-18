import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import Axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import EditUserIcon from '../Logo/EditUserIcon'
import DeleteUserIcon from '../Logo/DeleteUserIcon'

function UserDisplay() {
  const nav = useNavigate()
  const loc = useLocation()
  const newUser = loc.state?.newUser
  const updUser = loc.state?.updatedUser

  const [users, setUsers] = useState([])
  const [load, setLoad] = useState(true)

  useEffect(() => {
    console.log("loading users...")
    setLoad(true)
    Axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      let all = res.data
      if (newUser) {
        if (!newUser.id) {
          newUser.id = Date.now()
        }
        all = [newUser, ...all]
      }

      if (updUser) {
        let found = all.some(u => u.id === updUser.id)
        if (found) {
          all = all.map(u => u.id === updUser.id ? updUser : u)
        } else {
          all = [updUser, ...all]
        }
      }
      setUsers(all)
      setLoad(false)
    }).catch(err => {
      console.log("error", err)
      alert("cant load users")
      setLoad(false)
    })
  }, [newUser, updUser])

  const del = (id) => {
    if (window.confirm("really want to delete this?")) {
      Axios.delete('https://jsonplaceholder.typicode.com/users' + "/" + id).then(() => {
        setUsers(prev => prev.filter(x => x.id !== id))
        alert("deleted!!")
      }).catch(err => {
        alert("not deleted")
      })
    }
  }

  return (
    <Container fluid style={{ marginTop: '6rem', marginBottom:'2rem' }}>
      <Container fluid className="mt-4 text-center">
        <Button variant='dark' style={{ width: '70%' }} onClick={() => nav('/AddUser')}>Add User</Button>
      </Container>

      {load ? (
        <div className="text-center my-5 spinner-border text-primary" role="status"></div>
      ) : (
        <Container fluid className="pt-4">
          <Row className="g-4">
            {users.map(u => (
              <Col key={u.id} xs={12} sm={12} md={6} lg={6}>
                <Card className="h-100 shadow">
                  <Row className="g-0 align-items-center">
                    <Col xs={12} sm={4} md={3} className="text-center p-3">
                      <Card.Img src={require('../img/User-Profile-PNG-File.png')} alt="User"/>
                    </Col>
                    <Col xs={12} sm={8} md={7} style={{ textAlign: 'left' }}>
                      <Card.Body>
                        <Card.Title>Name: {u.name}</Card.Title>
                        <Card.Text>Username: {u.username}</Card.Text>
                        <Card.Text>Email: {u.email}</Card.Text>
                      </Card.Body>
                    </Col>
                    <Col xs={12} sm={12} md={2} className="text-center p-3">
                      <Button variant='warning' className="mb-2" style={{ width: '80%' }} onClick={() => nav(`/UserEdit/${u.id}`, { state: { user: u } })}>
                        <EditUserIcon/>
                      </Button>
                      <Button variant="danger" style={{ width: '80%' }} onClick={() => del(u.id)}>
                        <DeleteUserIcon/>
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  )
}

export default UserDisplay
