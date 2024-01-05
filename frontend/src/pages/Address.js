import Navbarexp from "../component/Navb";
import { Footerone } from "../Footer/Footern";
import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { useNavigate,useParams, useLocation } from "react-router-dom";

function Address(props) {
  const navigate = useNavigate();
  const [contents,setContents] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const [formattedDate, setFormatdate] = useState("")
  const [idd, setId] = useState("")
  const [selectedDelivery, setSelectedDelivrt] = useState({});

  const [nam, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/total/${id}/`)
  //     .then((response) => {
  //       setItem(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data", error);
  //     });
  // }, [id]);

  useEffect(()=>{
    (async ()=>{
      const response = await fetch("http://localhost:8000/api/user",{
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setContents(content);
      setId(location.state.location.state.id)
      setFormatdate(location.state.location.state.formattedDate)
      setSelectedDelivrt(location.state.location.state.selectedDelivery)
    })();
  },[])

  const handleName=(e)=>{
    setName(e.target.value)
  }

  const handleTelephone=(e)=>{
    setTelephone(e.target.value)
  }

  const handleAddress=(e)=>{
    setAddress(e.target.value)
  }

  const handleDistrict=(e)=>{
    setDistrict(e.target.value)
  }

  const handleProvince=(e)=>{
    setProvince(e.target.value)
  }

  const handleCountry=(e)=>{
    setCountry(e.target.value)
  }

  const handlePostalcode=(e)=>{
    setPostalcode(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInfo = {};

    if (nam !== "") {
      updatedInfo.name = nam;
    }
    if (telephone !== "") {
      updatedInfo.telephone = telephone;
    }
    if (address !== "") {
      updatedInfo.address = address;
    }
    if (district !== "") {
      updatedInfo.district = district;
    }
    if (province !== "") {
      updatedInfo.province = province;
    }
    if (country !== "") {
      updatedInfo.country = country;
    }
    if (postalcode !== "") {
      updatedInfo.postalcode = postalcode;
    }

    const response = await fetch(
      `http://localhost:8000/api/update/${contents.id}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedInfo),
      }
    );

    const content = await response.json();
    setContents(content);
    navigate(`/buy/${id}`,
      {
        state: { selectedDelivery, formattedDate, id },
      },
    );
  };

  return (
    <>
          <Navbarexp
        first_name={props.first_name}
        setFirstname={props.setFirstname}
        carttotal={props.carttotal}
      />
      <Form className='mt-4 container p-4 mb-3' style={{background:'#f0f0f0', width:'60%'}} onSubmit={handleSubmit}>
        <h3 className="mb-4">My Shipping Address</h3>
      <Form.Group as={Row} className="mb-3" controlId="nameid">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" 
          defaultValue={contents.name}
          onChange={handleName}
          placeholder="Enter name" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="telephoneid">
        <Form.Label column sm="2">
          Telephone
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" 
          defaultValue={contents.telephone}
          onChange={handleTelephone}
          placeholder="Enter telephone" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="addressid">
        <Form.Label column sm="2">
          Address
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" 
          defaultValue={contents.address}
          onChange={handleAddress}
          placeholder="Enter Email" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="districtid">
        <Form.Label column sm="2">
          District
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"
          defaultValue={contents.district}
          onChange={handleDistrict}
           placeholder="Enter Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="provinceid">
        <Form.Label column sm="2">
          Province
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"
          defaultValue={contents.province}
          onChange={handleProvince}
           placeholder="Enter Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="countryid">
        <Form.Label column sm="2">
          Country
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"
          defaultValue={contents.country}
          onChange={handleCountry}
           placeholder="Enter Password" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="postalcodeid">
        <Form.Label column sm="2">
          Postal code
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text"
          defaultValue={contents.postalcode}
          onChange={handlePostalcode}
           placeholder="Enter Password" />
        </Col>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    <Footerone/>
    </>
  );
}

export default Address;
