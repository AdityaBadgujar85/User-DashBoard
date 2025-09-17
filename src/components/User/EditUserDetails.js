import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function EditUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
    company: { name: "", catchPhrase: "", bs: "" },
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    } else {
      alert("No user found");
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("User updated!!!");
    navigate("/", { state: { updatedUser: { ...user, id: Number(id) } } });
  };

  return (
    <Container className="py-5" style={{ marginTop: "3rem" }}>
      <div className="card shadow-lg p-4 border-0" style={{ borderRadius: "15px" }}>
        <h2 className="mb-4 text-center text-danger">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <h5 className="text-secondary mb-3">Basic Info</h5>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="form-control" placeholder="Enter full name" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })} className="form-control" placeholder="Enter username" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" value={user.email} 
                 onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control" placeholder="Enter email" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" value={user.phone} 
                 onChange={(e) => setUser({ ...user, phone: e.target.value })} className="form-control" placeholder="Enter phone"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Website</label>
                <input type="text" value={user.website}
                  onChange={(e) => setUser({ ...user, website: e.target.value })}className="form-control" placeholder="Enter website"/>
              </div>
            </Col>
            <Col md={4}>
              <h5 className="text-secondary mb-3">Address</h5>
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input type="text" value={user.address.street}
                  onChange={(e) => setUser({...user,address: { ...user.address, street: e.target.value },})}className="form-control" placeholder="Enter street"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Suite</label>
                <input type="text" value={user.address.suite}
                  onChange={(e) => setUser({...user,address: { ...user.address, suite: e.target.value },})}className="form-control" placeholder="Enter suite" />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" value={user.address.city}
                  onChange={(e) => setUser({...user,address: { ...user.address, city: e.target.value },})}className="form-control" placeholder="Enter city"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Zipcode</label>
                <input type="text" value={user.address.zipcode}
                  onChange={(e) => setUser({...user,address: { ...user.address, zipcode: e.target.value },})}className="form-control" placeholder="Enter zipcode"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Latitude</label>
                <input type="text" value={user.address.geo.lat}
                  onChange={(e) => setUser({...user,address: {...user.address,geo: { ...user.address.geo, lat: e.target.value },},})}className="form-control" placeholder="Enter latitude"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Longitude</label>
                <input type="text" value={user.address.geo.lng}
                  onChange={(e) => setUser({...user,address: {...user.address,geo: { ...user.address.geo, lng: e.target.value },},})}className="form-control" placeholder="Enter longitude"/>
              </div>
            </Col>
            <Col md={4}>
              <h5 className="text-secondary mb-3">Company Info</h5>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input type="text" value={user.company.name}
                  onChange={(e) => setUser({...user,company: { ...user.company, name: e.target.value },})}className="form-control" placeholder="Enter company name"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Catch Phrase</label>
                <input type="text" value={user.company.catchPhrase}
                  onChange={(e) => setUser({...user,company: {...user.company,catchPhrase: e.target.value,},})}className="form-control" placeholder="Enter catch phrase"/>
              </div>
              <div className="mb-3">
                <label className="form-label">BS</label>
                <input type="text" value={user.company.bs}
                  onChange={(e) => setUser({...user,company: { ...user.company, bs: e.target.value },})}className="form-control" placeholder="Enter BS"/>
              </div>
            </Col>
          </Row>
          <Row>
            <Button type="submit" className="btn w-100 fw-bold" style={{ fontSize: "18px", padding: "10px" }} variant="danger">
              Update User
            </Button>
          </Row>
        </form>
      </div>
    </Container>
  );
}

export default EditUserDetails;
