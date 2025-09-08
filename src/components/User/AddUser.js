import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddUser() {
  const navigate = useNavigate();

  // State for inputs
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !username || !email) {
      alert("Please fill in Name, Username, and Email.");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      alert("Please enter a valid email.");
      return;
    }

    const finalUser = {
      name,
      username,
      email,
      phone,
      website,
      address: {
        street,
        suite,
        city,
        zipcode,
        geo: { lat, lng },
      },
      company: {
        name: companyName,
        catchPhrase,
        bs,
      },
    };

    Axios.post("https://jsonplaceholder.typicode.com/users", finalUser)
      .then((response) => {
        alert("User added successfully!");
        navigate("/", { state: { newUser: response.data } });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong.");
      });
  };

  return (
    <Container className="py-5" style={{marginTop:'3rem'}}>
      <div className="card shadow-lg p-4 border-0" style={{ borderRadius: "15px" }}>
        <h2 className="mb-4 text-center text-primary">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <h5 className="text-secondary mb-3">Basic Info</h5>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Website</label>
                <input type="text" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Enter website"/>
              </div>
            </Col>
            <Col md={4}>
              <h5 className="text-secondary mb-3">Address</h5>
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input type="text" className="form-control" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Enter street"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Suite</label>
                <input type="text" className="form-control" value={suite} onChange={(e) => setSuite(e.target.value)} placeholder="Enter suite"/>
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Zipcode</label>
                <input type="text" className="form-control" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="Enter zipcode"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Latitude</label>
                <input type="text" className="form-control" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Enter latitude"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Longitude</label>
                <input type="text" className="form-control" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Enter longitude"/>
              </div>
            </Col>
             <Col>
              <h5 className="text-secondary mb-3">Company Info</h5>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name"/>
              </div>
              <div className="mb-3">
                <label className="form-label">Catch Phrase</label>
                <input type="text" className="form-control" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} placeholder="Enter catch phrase"/>
              </div>
              <div className="mb-3">
                <label className="form-label">BS</label>
                <input type="text" className="form-control" value={bs} onChange={(e) => setBs(e.target.value)} placeholder="Enter BS"/> 
              </div>
            </Col>
          </Row>
          <Row>
             <button type="submit" className="btn btn-success w-100 fw-bold" style={{ fontSize: "18px", padding: "10px" }}>Submit User </button>
            </Row>
        </form>
      </div>
    </Container>
  );
}

export default AddUser;
