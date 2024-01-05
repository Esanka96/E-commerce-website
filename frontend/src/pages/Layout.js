import {
  Button,
  Row,
  Col,
  Table,
  Form,
  Card,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbarexp from "../component/Navb";
import { Footerone } from "../Footer/Footern";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function Layout(props) {
  const navigate = useNavigate();
  const item_lsit_1=['Handsfree','Pen Drive','Power Bank','USB OTG','Router','Data Cable','Back Cover']
  const item_lsit_2=['Mouse','Keyboard','Speakers','Laptop','Desktop','Monitor','UPS']
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/total`)
      .then((response) => {
        const shuffledData = response.data.sort(() => Math.random() - 0.5);
  
        const selectedData = shuffledData.slice(0, 36);
  
        setFetchData(selectedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
          <Navbarexp
        first_name={props.first_name}
        setFirstname={props.setFirstname}
        carttotal={props.carttotal}
      />
      <div className="container my-3">
        <Container>
          <h3>Phones & Telecommunications</h3>
          <Carousel responsive={responsive} autoPlay={true} infinite={true}
          itemClass="carousel-item-padding-40-px"
          >
            {item_lsit_1.map((item, index) => (
              <Col
                key={index}
                onClick={() => navigate(`/${item}`, { state: { itemName: item } })}
                style={{cursor:'pointer'}}
              >
                <Card
                  className="m-2 single-com"
                  style={{ background: "#cccccc", border:'none' }}
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/images/C%3A/Users/SMTC%20PVT%20LTD/Desktop/New%20folder/myproject/static/images/fnt_${item}.jpg`}
                    className="p-3"
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "120px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="card-title text-center"
                      style={{
                        fontSize: "15px",
                        width: "100%",
                        color: "#1192e4",
                      }}
                    >
                      <LinesEllipsis
                        text={item}
                        maxLine="2"
                        ellipsis="..."
                        trimRight
                      />
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Carousel>
          <h3 className="mt-3">Computer, Office & Education</h3>
          <Carousel responsive={responsive} autoPlay={true} infinite={true}
          itemClass="carousel-item-padding-40-px"
          >
            {item_lsit_2.map((item, index) => (
              <Col
                key={index}
                onClick={() => navigate(`/${item}`, { state: { itemName: item } })}
                style={{cursor:'pointer'}}
              >
                <Card
                  className="m-2 single-com"
                  style={{ background: "#cccccc", border:'none' }}
                >
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8000/images/C%3A/Users/SMTC%20PVT%20LTD/Desktop/New%20folder/myproject/static/images/fnt_${item}.jpg`}
                    className="p-3"
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "120px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="card-title text-center"
                      style={{
                        fontSize: "15px",
                        width: "100%",
                        color: "#1192e4",
                      }}
                    >
                      <LinesEllipsis
                        text={item}
                        maxLine="2"
                        ellipsis="..."
                        trimRight
                      />
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Carousel>
          <h3 className="mt-3">More to love</h3>
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

export default Layout;
