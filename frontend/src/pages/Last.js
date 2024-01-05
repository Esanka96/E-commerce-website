import { Container } from "react-bootstrap";
import Navbarexp from "../component/Navb";
import { Footerone } from "../Footer/Footern";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Row, Col, Button, Table, Form, Nav, Navbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FaStar } from "react-icons/fa";

function Last(props) {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [uid, setUid] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const modalClose = () => setModalShow(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [iid, setIid] = useState("");
  const [orderdate, setOrderdate] = useState("");
  const [showorder, setShoworder] = useState(true);
  const handleshoworder = () => {
    setShoworder(false);
  };

  const [comments, setComments] = useState("");
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [userResponse, lastResponse] = await Promise.all([
          fetch("http://localhost:8000/api/user", {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }).then((response) => response.json()),
          axios.get("http://localhost:8000/api/last"),
        ]);

        setUid(userResponse.id);
        setShoworder(true);

        const filteredData = lastResponse.data.filter(
          (item) => item.userid === `${userResponse.id}`
        );
        setContents(filteredData.reverse());

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const handleComment = (e) => {
    setComments(e.target.value);
  };

  const handlePhoto = (e) => {
    const files = e.target.files;
    // setPhotos(files[0]);
    if (files) {
      setPhotos(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (photos !== null) {
      formData.append("photo", photos);
    }
    formData.append("rating", rating);
    formData.append("comments", comments);
    formData.append("odate", orderdate);
    formData.append("iname", "sdfsdfds");
    formData.append("iid", iid);
    formData.append("cfname", props.first_name);
    formData.append("clname", props.last_name);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await fetch("http://localhost:8000/api/reviewcreate", {
        method: "POST",
        body: formData,
      });

      console.log(response);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setModalShow(false);
    navigate(`/single/${iid}`);
  };

  const showingorder = () => {
    if (contents.length === 0) {
      return (
        <div className="text-center">
                    <img
            src="../images/Noorders.png"
            style={{
              marginLeft: "5px",
              height: "200px",
              width: "200px",
            }}
            className="mx-2 mt-5"
          />
          <h1 className="">No orders</h1>
        </div>
      );
    } else {
      return (
        <>
          <h3 className="mt-2">Your orders</h3>

          {contents.map((post) => (
            <Row
              className="p-3 mb-3"
              style={{
                background: "rgba(0,0,0,0.1)",
                borderRadius: "15px",
              }}
            >
              <Row>
                <Col>
                  <p>Order date : {post.ordate}</p>
                </Col>
                <Col>
                  <p style={{ float: "right" }}>
                    Estimated delivery : {post.esdate}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={8} sm={12} xs={12} className="">
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={post.photourl}
                        style={{ width: "100px", height: "50%" }}
                        className="image-box"
                      />
                    </Col>
                    <Col md={10}>
                      <div className="justify-content-center">
                        <h5 className="mx-4">{post.name}</h5>
                        <h5 className="mx-4" style={{ fontSize: "15px" }}>
                          {post.price} {" x "} {post.count}
                        </h5>
                        <h5 className="mx-4">Total: Rs. {post.total}</h5>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row className="d-flex justify-content-center align-items-center mb-2">
                    <Button
                      variant="danger"
                      style={{ width: "250px" }}
                      className=""
                      onClick={() => {
                        setModalShow(true);
                        setIid(post.itemid);
                        setOrderdate(post.ordate);
                      }}
                    >
                      Add review
                    </Button>
                  </Row>
                  <Row className="d-flex justify-content-center align-items-center  mb-2">
                    <Button
                      style={{
                        width: "250px",
                        background: "#ff6400",
                        border: "none",
                      }}
                    >
                      Trace order
                    </Button>
                  </Row>
                  <Row className="text-center">
                    <h5 style={{ fontSize: "18px" }}>
                      Order ID: {post.orderid}
                    </h5>
                  </Row>
                </Col>
              </Row>
            </Row>
          ))}
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={modalClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add your review
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <h5>Add your rating</h5>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label>
                      <input
                        type="ratio"
                        name="rating"
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        className="star mb-3"
                        size={30}
                        color={
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
                {/* <h5>Your rating is {rating}</h5> */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <h5>My Feedback</h5>
                  <Form.Control
                    as="textarea"
                    value={comments}
                    onChange={handleComment}
                    rows={3}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <h5>Upload Pictures</h5>
                  <Form.Control type="file" onChange={handlePhoto} />
                </Form.Group>
                <Button type="submit" style={{ float: "right" }}>
                  Submit
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      );
    }
  };

  return (
    <div>
      <Navbarexp
        first_name={props.first_name}
        setFirstname={props.setFirstname}
        carttotal={props.carttotal}
      />
      <Container>{showingorder()}</Container>
      <Footerone/>
    </div>
  );
}

export default Last;
