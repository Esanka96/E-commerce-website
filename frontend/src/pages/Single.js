import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams, Outlet } from "react-router-dom";
import image_1 from "../images/delivery.png";
import image_2 from "../images/location.png";
import image1 from "../images/1.webp";
import image2 from "../images/2.webp";
import image3 from "../images/3.webp";
import image4 from "../images/4.webp";
import image5 from "../images/5.webp";
import err from "../images/errorre.png";
import Navbarexp from "../component/Navb";
import { Footerone } from "../Footer/Footern";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "react-bootstrap";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";

function Singleview(props) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const navigate = useNavigate();
  const imageArray = [image1, image2, image3, image4, image5];

  const [recount, setRecount] = useState("");
  const [reaverage, setReaverage] = useState(0);

  const [selectedDelivery, setSelectedDelivery] = useState({
    method: "",
    price: 0,
  });

  const [showcart, setShowcart] = useState(false);

  const { id, name } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showerrorreg, setShowerrorreg] = useState(false);
  const [contents, setContents] = useState({});
  const [cartData, setCartdata] = useState([]);
  const [dayvalue, setDayvalue] = useState(28);
  const [revirewData, setReviewData] = useState([]);
  const [ordate, setOrdate] = useState("");

  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + dayvalue);

  const handlerrorreg = () => {
    setShowerrorreg(false);
    navigate("/register");
  };

  const handleBuy = () => {
    if (props.first_name) {
      navigate(`/buy/${id}`, {
        state: { selectedDelivery, formattedDate, id },
      });
    } else {
      setShowerrorreg(true);
    }
  };

  const handlecartclose = () => {
    window.location.reload();
    setShowcart(false);
  };

  useEffect(() => {
    setOrdate(today.toLocaleDateString(undefined, options));
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setContents(content);
    })();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/total/${id}/`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/review").then(
      (response) => {
        setReviewData(response.data);
        const filteredData = response.data.filter((item) => item.iid === id);
        setReviewData(filteredData);
        setRecount(filteredData.length);

        const totalRating = filteredData.reduce((accumulator, post) => {
          const digits = post.rating.toString().split("").map(Number);
          const digitSum = digits.reduce((sum, digit) => sum + digit, 0);
          return accumulator + digitSum;
        }, 0);
        setReaverage((totalRating / filteredData.length).toFixed(1));
      },
      [id]
    );

    const postData = {
      recount: recount,
      avreview: reaverage,
    };
    axios
      .post(`http://localhost:8000/api/totalupdate/${id}/`, postData)
      .then((response) => {
        console.log(response.data);
      });
  }, [recount, id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cart`)
      .then((response) => {
        setCartdata(response.data);
        const filteredData = response.data.filter(
          (item) => item.uid === props.id.toString()
        );
        setCartdata(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [props.id]);

  if (loading) {
    return (
      <div className="container text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const handlecart = async () => {
    const updatedInfo = {};

    updatedInfo.name = item.name;
    updatedInfo.price = item.price;
    updatedInfo.photo = item.photo;
    updatedInfo.iid = id;
    updatedInfo.uid = contents.id;

    try {
      const response = await fetch("http://localhost:8000/api/cartcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedInfo),
      });

      const newresponse = await axios.get(`http://localhost:8000/api/cart`);
      setCartdata(newresponse.data);
      const filteredData = newresponse.data.filter(
        (item) => item.uid === contents.id.toString()
      );
      setCartdata(filteredData.reverse());
      setShowcart(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formattedDate = nextDay.toLocaleDateString(undefined, options);

  const showaddress = () => {
    if (contents.address === null) {
      return (
        <>
          <Row className="d-flex justify-content-center">
            <Col xxl={1} lg={1} md={1}>
              <img
                src={image_2}
                style={{
                  marginLeft: "5px",
                  height: "20px",
                  width: "20px",
                  marginRight: "5px",
                }}
              />
            </Col>
            <Col xxl={11} lg={11} md={11}>
              <h5 style={{ fontSize: "18px" }}>No Address</h5>
              <h5 style={{ fontSize: "18px", textDecoration: "underline" }}>
                Note:
              </h5>
              <h5 style={{ fontSize: "15px" }}>
                After "Buy now" you can add your address.
              </h5>
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row className="d-flex justify-content-center">
            <Col xxl={1} lg={1} md={1}>
              <img
                src={image_2}
                style={{
                  marginLeft: "5px",
                  height: "20px",
                  width: "20px",
                  marginRight: "5px",
                }}
              />
            </Col>
            <Col xxl={11} lg={11} md={11}>
              <h5 style={{ fontSize: "18px" }}>{contents.name}</h5>
              <h5 style={{ fontSize: "15px" }}>{contents.address}</h5>
              <h5 style={{ fontSize: "15px" }}>
                {contents.district}, {contents.province}, {contents.country}.
              </h5>
              <h5 style={{ fontSize: "15px" }}>{contents.postalcode}.</h5>
            </Col>
          </Row>
        </>
      );
    }
  };

  const showphoto = (e) => {
    if (e) {
      return (
        <>
          <Col className="mt-2">
            <img src={e} style={{ width: "150px", height: "100%" }} />
          </Col>
        </>
      );
    }
  };

  const renderStars = (rating) => {
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
  };

  const totalRating = revirewData.reduce((accumulator, post) => {
    const digits = post.rating.toString().split("").map(Number);
    const digitSum = digits.reduce((sum, digit) => sum + digit, 0);
    return accumulator + digitSum;
  }, 0);

  const totalrating = (total, count) => {
    return <>{(total / count).toFixed(1)}</>;
  };

  const checkreview = () => {
    if (revirewData.length > 0) {
      const stars = totalrating(totalRating, revirewData.length);
      const numericValue = parseFloat(stars.props.children);
      return (
        <>
          {stars}
          <h2>{renderStars(numericValue)}</h2>
        </>
      );
    }
  };

  return (
    <>
      <Navbarexp
        first_name={props.first_name}
        setFirstname={props.setFirstname}
        carttotal={props.carttotal}
      />
      <div>
        <div className="background-layer">
          <Container className="p-5 mt-2" style={{ color: "#D9E3F0" }}>
            <Row className="">
              <Col xxl={4} lg={4} md={4}>
                <img
                  src={item.photo}
                  style={{ width: "80%", height: "80%" }}
                  className="image-box"
                />
              </Col>
              <Col xxl={8} lg={8} md={8}>
                <Row style={{ fontSize: "30px", color: "black" }}>
                  <strong>{item.name}</strong>
                </Row>
                <hr style={{ borderColor: "black" }}></hr>
                <Row>
                  <Col
                    className="p-3 mx-3"
                    xxl={5}
                    lg={5}
                    md={5}
                    style={{
                      color: "black",
                      background: "#fcb900",
                      borderRadius: "10px",
                    }}
                  >
                    <h5 style={{ fontSize: "15px" }}>
                      &#8226; Fast delivery by {formattedDate}
                    </h5>
                    <h5 style={{ fontSize: "15px" }}>
                      &#8226; Free shipping available
                    </h5>
                    <Form>
                      <Form.Group>
                        <Form.Label style={{ textDecoration: "underline" }}>
                          Select Delivery Method:
                        </Form.Label>
                        <Form.Check
                          type="radio"
                          label="Free Shipping"
                          name="deliveryMethod"
                          id="freeShipping"
                          onChange={() => {
                            setSelectedDelivery({
                              method: "Free Shipping",
                              price: 0,
                            });
                            setDayvalue(28);
                          }}
                        />
                        <Form.Check
                          type="radio"
                          label="Standard Shipping  (Rs. 450.00)"
                          name="deliveryMethod"
                          id="standardShipping"
                          onChange={() => {
                            setSelectedDelivery({
                              method: "Standard Shipping",
                              price: 450.0,
                            });
                            setDayvalue(10);
                          }}
                        />
                        <Form.Check
                          type="radio"
                          label="Express Shipping (Rs. 300.00)"
                          name="deliveryMethod"
                          id="expressShipping"
                          onChange={() => {
                            setSelectedDelivery({
                              method: "Express Shipping",
                              price: 300.0,
                            });
                            setDayvalue(20);
                          }}
                        />
                        <Form.Check
                          type="radio"
                          label="Next Day Delivery  (Rs. 1550.00)"
                          name="deliveryMethod"
                          id="nextDayDelivery"
                          onChange={() => {
                            setSelectedDelivery({
                              method: "Next Day Delivery",
                              price: 1550.0,
                            });
                            setDayvalue(1);
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col
                    className="p-3"
                    xxl={{ span: 5, offset: 1 }}
                    lg={{ span: 5, offset: 1 }}
                    md={{ span: 5, offset: 1 }}
                    style={{
                      color: "black",
                      background: "#abb8c3",
                      borderRadius: "10px",
                    }}
                  >
                    <h5 style={{ fontSize: "15px", fontStyle: "italic" }}>
                      <img
                        src={image_1}
                        style={{
                          marginLeft: "5px",
                          height: "20px",
                          width: "20px",
                          marginRight: "5px",
                        }}
                      />
                      Ship to
                    </h5>
                    {showaddress()}
                    <h5 style={{ fontSize: "15px" }}></h5>
                  </Col>
                </Row>
                <hr style={{ borderColor: "black" }}></hr>
                <Row>
                  <Carousel
                    responsive={responsive}
                    autoPlay={true}
                    infinite={true}
                  >
                    {imageArray.map((image, index) => (
                      <Navbar.Brand
                        key={index}
                        className="mx-2"
                        as={Link}
                        to={item.photo}
                      >
                        <img
                          className="single-com"
                          src={item.photo}
                          style={{
                            height: "100px",
                            width: "100px",
                          }}
                          alt={`image${index + 1}`}
                        />
                      </Navbar.Brand>
                    ))}
                  </Carousel>
                </Row>
                <Row className="container mt-3 d-flex justify-content-center">
                  <Col
                    className="d-flex justify-content-end mb-3"
                    xxl={5}
                    xl={5}
                    lg={5}
                    md={5}
                    sm={6}
                  >
                    <Button onClick={handleBuy} variant="info">
                      Buy now
                    </Button>
                  </Col>
                  <Col xxl={2} xl={2} lg={2} md={2} sm={0}></Col>
                  <Col
                    className="d-flex justify-content-start mb-3"
                    xxl={5}
                    xl={5}
                    lg={5}
                    md={5}
                    sm={6}
                  >
                    <Button onClick={handlecart} variant="warning">
                      Add to cart
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showerrorreg}
            >
              <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
                <img
                  src={err}
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
                  You are not registered.
                </h5>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlerrorreg}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showcart}
              onHide={handlecartclose}
              className=""
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Your Cart
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {cartData.map((post) => (
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center mx-3"
                    >
                      <img
                        src={post.photo}
                        style={{ width: "50px", height: "50%" }}
                        className="image-box d-flex justify-content-center align-items-center"
                      />
                    </Col>
                    <Col>
                      <h4 style={{ fontSize: "20px" }}>{post.name}</h4>
                      <h4
                        style={{
                          fontSize: "15px",
                          background: "rgba(0,0,0,0.1)",
                          width: "15%",
                          padding: "5px",
                          borderRadius: "8px",
                        }}
                        className="text-center"
                      >
                        {post.price}
                      </h4>
                    </Col>
                    <hr></hr>
                  </Row>
                ))}
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      </div>
      <Container>
        <h3 className="m-0">Customer Reviews ({revirewData.length})</h3>

        <h1 className="mb-5">{checkreview()}</h1>

        {revirewData.map((post) => (
          <Row
            className="p-3 mb-3"
            style={{
              background: "rgba(0,0,0,0.1)",
              borderRadius: "15px",
            }}
          >
            <Row>
              <Col>
                <h5 style={{ fontSize: "15px" }}>{post.odate}</h5>
              </Col>
              <Col>
                <h5 style={{ float: "right", fontSize: "15px" }}>
                  {post.cfname.slice(0, 1)}****
                  {post.clname.slice(-1)}
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-2">{renderStars(post.rating)}</Col>
            </Row>
            <Row>
              <Col md={12}>
                <h5 className="" style={{ fontSize: "15px" }}>
                  {post.comments}
                </h5>
              </Col>
            </Row>
            <Row>{showphoto(post.photo)}</Row>
          </Row>
        ))}
      </Container>
      <Footerone/>
    </>
  );
}

export default Singleview;
