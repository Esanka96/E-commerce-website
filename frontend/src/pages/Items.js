import {
  Button,
  Row,
  Col,
  Table,
  Form,
  Card,
  Container,
  Nav,
  Navbar
} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Navbarexp from '../component/Navb';
import { Footerone } from "../Footer/Footern";
import axios from 'axios';
import { Link, Outlet,useParams } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import { useLocation } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Layoutitem(props) {
  const location=useLocation();
  console.log(location)
   
  const { id,name } = useParams();
  const [fetchData, setFetchData] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/total`)
      .then((response)=>{
        setFetchData(response.data);

        const filteredData = response.data.filter(item => item.iname === `${location.state.itemName}`);
        setFetchData(filteredData);
        
      })

      .catch((error)=>{
        console.log(name)
        console.error("Error fetching data:",error);
      });
  },[]);

  const averagereview = (e) =>{
    if (e === null){
      return(
        <>
          0
        </>
      )
    }else{
      return(
        <>
          {e}
        </>
      )
    }
  }

  const renderStars = (rating,e) => {
    if(e === null || e=== "0"){
      const greyStars = Array.from({ length: 5 }, (_, index) => (
        <FaStar key={`empty-${index}`} color="grey" />
      ));
      return greyStars;
    }else{
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
  
      const stars = [];
  
      for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={i} color="#ffc107" />);
      }
  
      if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" color="#ffc107" />);
      }
  
      const remainingStars = 5 - stars.length;
  
      for (let i = 0; i < remainingStars; i++) {
        stars.push(<FaStar key={`empty-${i}`} color="grey" />);
      }
  
      return stars;
    }
  };

  return (
    <div>
      <Navbarexp first_name={props.first_name} setFirstname={props.setFirstname} carttotal={props.carttotal}/>
    <div className="container my-3">
      <Container>
        <Row >
          {fetchData.map((post) => (
            <Col as={Link} to={`/single/${post.id}`} key={post.id} xxl={2} xl={3} lg={3} md={4} sm={6} xs={6} style={{ textDecoration: 'none', }}>
              <Card className="my-2 single-com">
                <Card.Img
                  variant="top"
                  src={post.photo}
                  style={{ width: "100%", height: "200px" }}
                />
                <Card.Body>
                  <Card.Title className="card-title" style={{ fontSize: '15px', width: "100%",color:'#1192e4' }}>
                    <LinesEllipsis
                      text={post.name}
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                    />
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
                    <p className="m-0" style={{color:'#ef9600'}}>{renderStars(parseFloat(post.avreview),post.recount)}<span style={{fontSize:'13px'}}> ({averagereview(post.recount)})
                      </span></p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    <Footerone/>
    </div>
  );
}

export default Layoutitem;
