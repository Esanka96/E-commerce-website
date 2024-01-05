import Navbarexp from "../component/Navb";
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row,Col,Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


function Home (props){
  const [fetchData, setFetchData] = useState([]);
  const [word, setWord] = useState("");

  const handleword = (e) =>{
    setWord(e.target.value)
  }

  const handlesearch = () =>{

    axios.get(`http://localhost:8000/api/total`)
    .then((response)=>{
      console.log(fetchData)
      const filteredData = response.data.filter(item =>item.name.toLowerCase().includes(word.toLowerCase()));
      setFetchData(filteredData)
    })

    .catch((error)=>{
      console.error("Error fetching data:",error);
    });
  }


  return(
    <>
    <Navbarexp first_name={props.first_name} setFirstname={props.setFirstname}/>
    <Container>
    <Row>
          <Col md="auto" className="p-0">
            <Form.Control
              type="text"
              placeholder="Search"
              style={{borderRadius:'15px', background:'rgba(225,225,225,0.7)', font:'black', width:'130%'}}
              className="placeholder-text-color"
              value={word}
              onChange={handleword}
            />
          </Col>
          <Col md="auto" className="p-0 justify-content-end">
            <Button type="submit" style={{borderRadius:'15px', background:'none', border:'none'}} 
            onClick={handlesearch}>Search
            </Button>
          </Col>
        </Row>
        <Row >
          {fetchData.map((post) => (
            <Col  key={post.id} xxl={2} xl={3} lg={3} md={4} sm={6} xs={6} style={{ textDecoration: 'none', }}>
              <Card className="my-2 single-com">
                <Card.Img
                  variant="top"
                  src={post.photo}
                  style={{ width: "100%", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title className="card-title" style={{ fontSize: '15px', width: "100%",color:'#1192e4' }}>

                      text={post.name}

                  </Card.Title>
                  <Card.Text className="mb-2" style={{ fontSize: '14px', color:'#d36d26' }}>
                    {post.price}
                  </Card.Text>
                  <p className="m-0" style={{ fontSize: '13px', display: 'flex', alignItems: 'center',color:'#999999' }}>
                      <span style={{background:'#27a968', padding:'2px 8px',color:'white', borderRadius:'4px'}}>Free Shipping</span>
                      <img
                        src='../images/shipping.png'
                        style={{ marginLeft: "5px", height: "30px", width: "30px" }}
                      />
                    </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </Container>
    </>
  )
}
export default Home;