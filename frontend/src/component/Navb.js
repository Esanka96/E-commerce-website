import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Nav, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img1 from "../images/shop.png";
import log from "../images/login.png";
import ct from "../images/cart.png";
import duser from "../images/duser.png";
import dorder from "../images/dorder.png";
import dmessage from "../images/dmessage.png";
import dlogout from "../images/dlogout.png";
import search from "../images/search.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios";


function Navbarexp(props) {
  const navigate = useNavigate();
  const [fetchData, setFetchData] = useState([]);
  const [word, setWord] = useState("");

  const handlekey= (e) =>{
    if(e.key === 'Enter'){
      handlesearch();
    }
  };

  const handleword = (e) =>{
    setWord(e.target.value)
  }

  const handlesearch = () =>{

    axios.get(`http://localhost:8000/api/total`)
    .then((response)=>{
      setFetchData(response.data);
      console.log(response.data)
      console.log(fetchData)
      const filteredData = response.data.filter(item =>item.name.toLowerCase().includes(word.toLowerCase()));
      setFetchData(filteredData)
      navigate("/search",{state:filteredData});
    })


    .catch((error)=>{
      console.error("Error fetching data:",error);
    });
  }

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      props.setFirstname("");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const customDropdownTitle = (
    <>
      <img
        src={log}
        style={{ marginLeft: "5px", height: "25px", width: "25px" }}
        className="mx-2"
      />
      Hi {props.first_name}
    </>
  );

  const handleEvenet = () => {
    if (props.first_name) {
      return (
        <>
          <Dropdown className="p-0">
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ background: "none", border: "none" }}
              align="end"
              className="p-0 m-0 d-flex align-items-center"
            >
              <div className="d-flex justify-content-center align-items-center">
                <div>
                  <img
                    src={log}
                    style={{ marginLeft: "5px", height: "30px", width: "30px" }}
                    className="mx-2"
                  />
                </div>
                <div>
                  <div className="">Hi {props.first_name}</div>
                </div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                className="d-flex align-items-center justify-content-start p-0 pb-1"
              >
                {" "}
                <img
                  src={duser}
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                  className="mx-2"
                />
                My Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/orders"
                className="d-flex align-items-center justify-content-start p-0 pb-1"
              >
                {" "}
                <img
                  src={dorder}
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                  className="mx-2"
                />
                My Orders
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="#message"
                className="d-flex align-items-center justify-content-start p-0 pb-1"
              >
                {" "}
                <img
                  src={dmessage}
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                  className="mx-2"
                />
                Message Center
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={handleLogout}
                className="d-flex align-items-center justify-content-start p-0 pb-1"
              >
                {" "}
                <img
                  src={dlogout}
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                  className="mx-2"
                />
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link as={Link} to="/cart" style={{ float: "right" }}>
            <div className="d-flex justify-content-center align-items-center">
              <div>
                <img
                  src={ct}
                  style={{ marginLeft: "5px", height: "30px", width: "30px" }}
                  className="mx-2"
                />
              </div>
              <div>
                <div
                  style={{
                    background: "#f5a623",
                    borderRadius: "10px",
                    color: "black",
                    fontSize: "12px",
                  }}
                  className="text-center"
                >
                  {props.carttotal}
                </div>
                <div className="d-flex justify-content-start">Cart</div>
              </div>
            </div>
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link
            as={Link}
            to="/register"
            className="d-flex align-items-center"
          >
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
            Login
          </Nav.Link>
        </>
      );
    }
  };
  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        sticky="top"
        className="d-flex align-items-center"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={img1}
              style={{ marginLeft: "5px", height: "30px", width: "30px" }}
              className="mx-2"
            />
            <span style={{ color: "#e91e63", fontStyle: "italic" }}>
              Online
            </span>
            <span
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#cccccc",
              }}
            >
              Shop
            </span>
            <img
              src={img1}
              style={{ marginLeft: "5px", height: "30px", width: "30px" }}
              className="mx-2"
            />
          </Navbar.Brand>
          <Nav>
            <Row>
          <Col md="auto" className="p-0">
            <Form.Control
              type="text"
              placeholder="Search"
              style={{borderRadius:'15px', background:'rgba(225,225,225,0.7)', font:'black', width:'130%'}}
              className="placeholder-text-color"
              value={word}
              onChange={handleword}
              onKeyDown={handlekey}
            />
          </Col>
          <Col md="auto" className="p-0 justify-content-end">
            <Button type="submit" style={{borderRadius:'15px', background:'none', border:'none'}} 
            onClick={handlesearch}>
            <img
                  src={search}
                  style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                  className="mx-2"
                />
            </Button>
          </Col>
        </Row>
          </Nav>
          <Nav>
            <Nav className="d-flex align-items-center">{handleEvenet()}</Nav>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navbarexp;
