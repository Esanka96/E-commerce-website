import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import Navbarexp from "../component/Navb";
import axios from "axios";
import { Modal } from "react-bootstrap";

function Register(props) {
  const navigate = useNavigate();
  const [showepayment, setShowpayment] = useState(false);
  const [showerrorreg, setShowerrorreg] = useState(false);

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlerrorreg = () => setShowerrorreg(false);

  const handlepaymentClose = () => {
    setShowpayment(false);
    navigate("/login");
  }

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data to be sent to the server:", {
        firstName,
        lastName,
        email,
        password,
      });

      // Use Axios for the API request
      const response = await axios.post("http://localhost:8000/api/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      console.log("e")
      console.log(response.status)
      console.log("es")
      if (response.status === 200) {
        setShowpayment(true)
      } 
    } catch (error) {
      setShowerrorreg(true)
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("../images/re.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbarexp />
        <Form
          className="container mt-5 container p-4 text-center"
          onSubmit={handleSubmit}
          style={{ background: "rgba(217,217,217,0.6)", width: "50%" , borderRadius:'20px'}}
        >
          <div className="mb-3">
            {" "}
            <img
              src="../images/registerfr.png"
              style={{ marginLeft: "5px", height: "80px", width: "80px" }}
            />
            <h3 className="mt-2">Register</h3>
          </div>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2" className="text-start" style={{ color: "black" }}>
              First Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={firstName}
                onChange={handleFirstname}
                placeholder="Enter First Name"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2" className="text-start" style={{ color: "black" }}>
              Last Name
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={lastName}
                onChange={handleLastname}
                placeholder="Enter Last Name"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2" className="text-start" style={{ color: "black" }}>
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmail}
                placeholder="Enter Email"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2" className="text-start" style={{ color: "black" }}>
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="Enter Password"
              />
            </Col>
          </Form.Group>
          <Button
            className="mt-2"
            style={{ width: "50%", borderRadius: "20px" }}
            variant="info"
            type="submit"
          >
            Register
          </Button>
        </Form>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showepayment}
      >
        <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
          <img
            src="../images/completed.png"
            style={{
              marginLeft: "5px",
              height: "150px",
              width: "150px",
            }}
            className="mx-2"
          />
        </Modal.Body>
        <Modal.Body className="text-center mb-3 p-0">
          <h3 className="p-1" style={{ color: "black" }}>
            Thank You for Registration
          </h3>
          <h5 className="p-1" style={{ color: "black" }}>
            Congratulations your account has been successfully created. 
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlepaymentClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showerrorreg}
      >
        <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
          <img
            src="../images/errorre.png"
            style={{
              marginLeft: "5px",
              height: "150px",
              width: "150px",
            }}
            className="mx-2"
          />
        </Modal.Body>
        <Modal.Body className="text-center mb-3 p-0">
          <h3 className="p-1" style={{ color: "#eb144c" }}>
            Error
          </h3>
          <h5 className="p-1" style={{ color: "#eb144c" }}>
            Email address is already exists. 
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerrorreg}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default Register;
