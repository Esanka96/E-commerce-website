import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbarexp from "../component/Navb";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Modal } from "react-bootstrap";

function Login(props) {
  const navigate = useNavigate();

  const [showepayment, setShowpayment] = useState(false);
  const [showlogin, setShowlogin] = useState(false);

  const handlepaymentClose = () => setShowpayment(false);

  const handleloginClose = () =>{
    setShowlogin(false)
    navigate("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data to be sent to the server", {
        email,
        password,
      });

      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        props.setFirstname("Unknow");
        setShowlogin(true)
        
      } else {
        setShowpayment(true)
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("../images/loginbg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbarexp />'
        <Form
          className="mt-5 container p-4 text-center"
          style={{ background: "rgba(217,217,217,0.4)", width: "50%",borderRadius:'20px' }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            {" "}
            <img
              src="../images/loginpg.png"
              style={{ marginLeft: "5px", height: "80px", width: "80px" }}
            />
            <h3 className="mt-2">Login</h3>
          </div>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label
              column
              sm="2"
              className="text-start"
              style={{ color: "black" }}
            >
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
            <Form.Label
              column
              sm="2"
              className="text-start"
              style={{ color: "black" }}
            >
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder=" Enter Password"
              />
            </Col>
          </Form.Group>
          <Button
            className="mt-2"
            style={{ width: "50%", borderRadius: "20px" }}
            variant="info"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showepayment}
      >
        <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
          <img
            src="../images/loginer.png"
            style={{
              marginLeft: "5px",
              height: "170px",
              width: "170px",
            }}
            className="mx-2"
          />
        </Modal.Body>
        <Modal.Body className="text-center mb-3 p-0">
          <h5 className="p-1" style={{ color: "#eb144c" }}>
            The email address or password that you've entered doesn't match any account. Register for an account.
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlepaymentClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showlogin}
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
            Login Success!
          </h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleloginClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
