import { Container } from "react-bootstrap";
import Navbarexp from "../component/Navb";
import { Footerone } from "../Footer/Footern";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Button, Table, Form, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function Buy(props) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 21);
  const location = useLocation();

  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [cardnumber, setCardnumber] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvv, setCvv] = useState("");
  const { id1, name } = useParams();

  const [contents, setContents] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [sppiner, setSpinner] = useState(false);

  const [showfinal, setShowfinal] = useState(false);
  const [showload, setshowload] = useState(false);
  const [showerror, setShowerror] = useState(false);
  const [showepayment, setShowpayment] = useState(false);

  const [orderid, setOrderid] = useState("");
  const [esdate, setEsdate] = useState("");
  const [ordate, setOrdate] = useState("");
  const [userid, setUserid] = useState("");

  const handlepaymentClose = () => setShowpayment(false);
  const handleerrorClose = () => setShowerror(false);
  const handleClose = () => setShow(false);
  const handlefinalClose = () => {
    const updatedInfo = {};

    updatedInfo.name = item.name;
    updatedInfo.price = item.price;
    updatedInfo.count = count;
    updatedInfo.total = total;
    updatedInfo.orderid = orderid;
    updatedInfo.esdate = location.state.formattedDate;
    updatedInfo.ordate = ordate;
    updatedInfo.photourl = decodeURIComponent(item.photo);
    updatedInfo.userid = userid;
    updatedInfo.itemid = location.state.id;

    const response = fetch(`http://localhost:8000/api/createlast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedInfo),
    });

    navigate("/orders");
    setShowfinal(false);
  };

  const handleFinish = () => {
    setshowload(true);
    setSpinner(true);

    setTimeout(() => {
      if (cardnumber === "") {
        setSpinner(false);
        setShowerror(true);
      } else {
        setSpinner(false);
        setShowfinal(true);
      }
    }, 3000);
  };

  useEffect(() => {
    setOrderid(Math.floor(8000000000 + Math.random() * 90000000));
    setEsdate(nextDay.toLocaleDateString(undefined, options));
    setOrdate(today.toLocaleDateString(undefined, options));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/total/${location.state.id}/`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [location.state.id]);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setContents(content);
      setUserid(content.id);
    })();
  }, []);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const newone = () => {
    if (contents.address) {
      return (
        <>
          <h3 className="mb-3 mt-2">Shipping Address</h3>
          <h5>
            {contents.name}{" "}
            <span
              style={{
                fontSize: "20px",
                fontStyle: "italic",
                fontWeight: "bold",
              }}
            >
              {contents.telephone}
            </span>
          </h5>
          <h5>{contents.address}.</h5>
          <h5>
            {contents.district}, {contents.province}, {contents.country}.
          </h5>
          <h5>{contents.postalcode}</h5>
          <Button
            onClick={() =>
              navigate(`/address/${item.id}`, {
                state: { location },
              })
            }
            className="btn btn-primary mb-3"
            style={{ float: "right" }}
          >
            Change
          </Button>
        </>
      );
    } else {
      return (
        <>
          <h4 className="mb-3 mt-2">
            You have to give address and other details
          </h4>
          <Button
            onClick={() =>
              navigate(`/address/${item.id}`, {
                state: { location },
              })
            }
            className="btn btn-primary mb-3"
            style={{ float: "right" }}
          >
            Add details
          </Button>
        </>
      );
    }
  };

  const handleCardnumber = (e) => {
    setCardnumber(e.target.value);
  };

  const handleMm = (e) => {
    setMm(e.target.value);
  };

  const handleYy = (e) => {
    setYy(e.target.value);
  };

  const handleCvv = (e) => {
    setCvv(e.target.value);
  };

  const handleCheck = (e) => {
    setIsChecked(!isChecked);
  };

  const handleCard = () => {
    if (cardnumber === "") {
      return (
        <>
          <Nav.Link className="mx-5" onClick={handleShow}>
            &#128179;{" "}
            <span style={{ fontWeight: "bold" }} className="mx-2">
              Add a new card
            </span>
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <h5 style={{ fontSize: "17px" }} className="mx-4">
            Your card number:{" "}
            <span style={{ color: "#676767" }}>****{cardnumber.slice(-4)}</span>
          </h5>
          <h5
            style={{ fontSize: "13px" }}
            className="mx-4 d-flex justify-content-start"
          >
            If you want to change
            <Nav.Link
              onClick={handleShow}
              className="d-flex justify-content-center"
            >
              <span
                style={{
                  fontWeight: "bold",
                  color: "#0693e3",
                  textDecoration: "underline",
                }}
                className="mx-2"
              >
                Click here
              </span>
            </Nav.Link>
          </h5>
        </>
      );
    }
  };

  const handlesaveClose = async (e) => {
    const updatedInfo = {};

    if (cardnumber !== "") {
      updatedInfo.cardnumber = cardnumber;
    }
    if (mm !== "") {
      updatedInfo.mm = mm;
    }
    if (yy !== "") {
      updatedInfo.yy = yy;
    }
    if (cvv !== "") {
      updatedInfo.cvv = cvv;
    }

    if (
      cardnumber === "" ||
      mm === "" ||
      yy === "" ||
      cvv === "" ||
      !Number(cardnumber) ||
      !Number(mm) ||
      !Number(yy) ||
      !Number(cvv)
    ) {
      setCardnumber("");
      setMm("");
      setYy("");
      setCvv("");
      setShow(false);
      setShowpayment(true);
    } else {
      if (isChecked) {
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
      } else {
        const response = await fetch(
          `http://localhost:8000/api/update/${contents.id}/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              cardnumber: null,
              mm: null,
              yy: null,
              cvv: null,
            }),
          }
        );
        const content = await response.json();
        setContents(content);
      }
      setShow(false);
    }
  };

  const getprice = (e, count) => {
    if (typeof e === "string") {
      const matchResult = (parseFloat(e.replace(/\D/g, "")) / 100) * count;
      return matchResult || 0;
    } else {
      return 0;
    }
  };
  const total =
    getprice(item.price, count) -
    (getprice(item.price, count) * (2 / 100)).toFixed(2) +
    location.state.selectedDelivery.price;

  const checkfree = () => {
    if (location.state.selectedDelivery.method === "") {
      return <>Free Shipping</>;
    } else {
      return <>{location.state.selectedDelivery.method}</>;
    }
  };

  return (
    <>
      <Navbarexp
        first_name={props.first_name}
        setFirstname={props.setFirstname}
        carttotal={props.carttotal}
      />
      <Container>
        <Row className="gridRow justify-content-center mb-3">
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
            <Row
              style={{ background: "#d4dde4", borderRadius: "15px" }}
              className="mt-3"
            >
              <div className="">{newone()}</div>
            </Row>
            <Row
              style={{ background: "#d4dde4", borderRadius: "15px" }}
              className="mt-3 pb-3"
            >
              <h3 className="mb-3 mt-2">Payment Methods</h3>
              <>{handleCard()}</>
              <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showepayment}
              >
                <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
                  <img
                    src="../images/payment.png"
                    style={{
                      marginLeft: "5px",
                      height: "150px",
                      width: "150px",
                    }}
                    className="mx-2"
                  />
                </Modal.Body>
                <Modal.Body className="text-center mb-3 p-0">
                  <h3>Checkout</h3>
                  <h5 className="p-1" style={{ color: "#eb144c" }}>
                    Unfortunately an error has occured and your payment cannot
                    be processed at this time, please veify your payment details
                    or try again later.
                  </h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handlepaymentClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                size="xl"
                centered
                aria-labelledby="contained-modal-title-vcenter"
                show={show}
                onHide={handleClose}
              >
                <Modal.Header
                  className="d-flex justify-content-center"
                  closeButton
                >
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                  <h4 className="m-0" style={{ textDecoration: "underline" }}>
                    Provide further information
                  </h4>
                </Modal.Body>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                  <img
                    src="../images/shield.png"
                    style={{ marginLeft: "5px", height: "20px", width: "20px" }}
                    className="mx-2"
                  />
                  <span style={{ color: "#367656", fontWeight: "bold" }}>
                    Your payment information is safe with us
                  </span>
                </Modal.Body>
                <Modal.Body
                  style={{ background: "#f0d4d7", borderRadius: "10px" }}
                  className="mx-4 d-flex align-items-center"
                >
                  <h5
                    className="mx-5 d-flex align-items-center"
                    onClick={handleShow}
                  >
                    &#128179;{" "}
                    <span style={{ fontWeight: "bold" }} className="mx-2">
                      Add a new card
                    </span>
                    <img
                      src="../images/bank4.png"
                      style={{
                        marginLeft: "5px",
                        height: "20px",
                        width: "20px",
                      }}
                      className="mx-2"
                    />
                    <img
                      src="../images/bank3.png"
                      style={{
                        marginLeft: "5px",
                        height: "20px",
                        width: "20px",
                      }}
                      className="mx-2"
                    />
                    <img
                      src="../images/bank1.png"
                      style={{
                        marginLeft: "5px",
                        height: "20px",
                        width: "20px",
                      }}
                      className="mx-2"
                    />
                    <img
                      src="../images/bank2.png"
                      style={{
                        marginLeft: "5px",
                        height: "20px",
                        width: "20px",
                      }}
                      className="mx-2"
                    />
                  </h5>
                </Modal.Body>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Row>
                          <Col>
                            <FloatingLabel
                              label="Card number"
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="text"
                                defaultValue={contents.cardnumber}
                                placeholder="Card number"
                                onChange={handleCardnumber}
                                autoFocus
                              />
                            </FloatingLabel>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="text"
                                defaultValue={contents.mm}
                                onChange={handleMm}
                                placeholder="MM"
                                autoFocus
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="text"
                                defaultValue={contents.yy}
                                onChange={handleYy}
                                placeholder="YY"
                                autoFocus
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <FloatingLabel
                              label="Cardholder name"
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="text"
                                value={contents.name}
                                autoFocus
                              />
                            </FloatingLabel>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Control
                                type="text"
                                defaultValue={contents.cvv}
                                onChange={handleCvv}
                                placeholder="CVV"
                                autoFocus
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Form.Check
                      checked={isChecked}
                      onChange={handleCheck}
                      label="Save card details"
                    />
                  </Form>
                  <h5
                    style={{ fontSize: "15px", marginBottom: "60px" }}
                    className="mt-3 mx-4"
                  >
                    Your order will be processed in USD
                  </h5>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <Button
                    variant="danger"
                    type="submit"
                    className="px-5"
                    onClick={handlesaveClose}
                  >
                    Save & confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </Row>
            <Row
              style={{ background: "#d4dde4", borderRadius: "15px" }}
              className="mt-3 p-3"
            >
              <div className="d-flex justify-items-center">
                <img
                  src={item.photo}
                  style={{ width: "20%", height: "70%" }}
                  className="image-box"
                />
                <div>
                  <h5 className="mx-4">{item.name}</h5>
                  <h5 className="mx-4" style={{ fontSize: "15px" }}>
                    {item.price}
                  </h5>
                  <h5 className="d-flex justify-content-end align-items-center mt-2 mb-0">
                    <Button
                      style={{
                        background: "none",
                        color: "black",
                        border: "none",
                        borderRadius: "20px",
                      }}
                      onClick={handlePlus}
                    >
                      <img
                        src="../images/plus.png"
                        style={{
                          marginLeft: "5px",
                          height: "25px",
                          width: "25px",
                        }}
                        className="mx-2"
                      />
                    </Button>
                    <span className="">{count}</span>
                    <Button
                      style={{
                        background: "none",
                        color: "black",
                        border: "none",
                        borderRadius: "20px",
                      }}
                      onClick={handleMinus}
                    >
                      <img
                        src="../images/minus.png"
                        style={{
                          marginLeft: "5px",
                          height: "25px",
                          width: "25px",
                        }}
                        className="mx-2"
                      />
                    </Button>
                  </h5>
                </div>
              </div>
              <div className="mt-0">
                <h5 style={{ fontSize: "18px" }}>
                  Shopping : {location.state.selectedDelivery.method}
                </h5>
                <h5 style={{ fontSize: "15px", color: "#494b4a" }}>
                  Estimated delivery on date
                </h5>
              </div>
            </Row>
          </Col>
          <Col xxl={5} xl={5} lg={5} md={5} sm={12} xs={12}>
            <Row
              style={{ background: "#d4dde4", borderRadius: "15px" }}
              className="mt-3 p-2 d-flex justify-content-center align-items-center"
            >
              <h5 style={{ fontSize: "25px" }}>Summary</h5>
              <h5 style={{ fontSize: "15px" }} className="mt-2">
                <span>Total item costs</span>
                <span style={{ float: "right" }}>
                  Rs. {getprice(item.price, count).toFixed(2)}
                </span>
              </h5>
              <h5 style={{ fontSize: "15px" }} className="mb-0 mt-2">
                <span>Saved</span>
                <span style={{ float: "right" }}>
                  Rs. {(getprice(item.price, count) * (2 / 100)).toFixed(2)}
                </span>
              </h5>
              <h5
                style={{ fontSize: "12px", color: "#b56227" }}
                className="m-0"
              >
                ( Discounts auto-applied )
              </h5>
              <h5 style={{ fontSize: "15px" }} className="mb-3 mt-2">
                <span>Total shipping ({checkfree()})</span>
                <span style={{ float: "right" }}>
                  Rs. {location.state.selectedDelivery.price}.00
                </span>
              </h5>
              <hr></hr>
              <h5 style={{ fontSize: "20px" }} className="mt-2 mb-1">
                <span>Total</span>
                <span style={{ float: "right" }}>Rs. {total}</span>
              </h5>
              <h5
                style={{ fontSize: "14px", color: "#b56227" }}
                className="m-0"
              >
                <span style={{ float: "right" }}>
                  (US $
                  {(
                    (getprice(item.price, count) -
                      (getprice(item.price, count) * (2 / 100)).toFixed(2)) /
                    354
                  ).toFixed(2)}
                  )
                </span>
              </h5>
              <Button
                className="mt-3 mb-2 d-flex justify-content-center align-items-center"
                variant="danger"
                style={{ width: "50%", borderRadius: "20px" }}
                onClick={handleFinish}
              >
                Place order
              </Button>
              {sppiner && (
                <Modal
                  {...props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={showload}
                >
                  <Modal.Body className="d-flex justify-content-center align-items-center p-0 mt-3">
                    <Spinner animation="border" variant="primary" />
                  </Modal.Body>
                  <Modal.Body className="d-flex justify-content-center align-items-center p-0 mt-3">
                    <h5>Please wait.</h5>
                  </Modal.Body>
                  <Modal.Body className="text-center mb-3 p-0">
                    <h5>
                      We're checking your informations. It'll just take a
                      moment.
                    </h5>
                  </Modal.Body>
                </Modal>
              )}
              <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showerror}
              >
                <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
                  <img
                    src="../images/error.png"
                    style={{
                      marginLeft: "5px",
                      height: "150px",
                      width: "150px",
                    }}
                    className="mx-2"
                  />
                </Modal.Body>
                <Modal.Body className="text-center mb-3 p-0">
                  <h5>
                    Payment Authorization Failed. Please verify your information
                    and try again, or try another payment method.
                  </h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleerrorClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showfinal}
                onHide={handlefinalClose}
              >
                <Modal.Body className="d-flex align-items-center justify-content-center mt-3">
                  <img
                    src="../images/order.png"
                    style={{
                      marginLeft: "5px",
                      height: "150px",
                      width: "150px",
                    }}
                    className="mx-2"
                  />
                </Modal.Body>
                <Modal.Body
                  className="d-flex align-items-center justify-content-center"
                  style={{ fontSize: "30px" }}
                >
                  Order Confirmed Successfully
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handlefinalClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <h5 className="text-center mt-1" style={{ fontSize: "16px" }}>
                Upon click 'Place order' I confirm I have read and acknowledged
                <span className="mx-1" style={{ color: "#1273de" }}>
                  all terms and policies
                </span>
                .
              </h5>
            </Row>
            <Row
              style={{ background: "#d4dde4", borderRadius: "15px" }}
              className="mt-3 p-2 d-flex justify-content-center align-items-center"
            >
              <h5 className="d-flex align-items-center mt-2">
                {" "}
                <img
                  src="../images/last1.png"
                  style={{ marginLeft: "5px", height: "25px", width: "25px" }}
                  className="mx-2"
                />
                <img
                  src="../images/shop.png"
                  style={{ marginLeft: "5px", height: "25px", width: "25px" }}
                  className="mx-2"
                />
                <span style={{ color: "#e91e63", fontStyle: "italic" }}>
                  Online
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#19324d",
                  }}
                >
                  Shop
                </span>
                <img
                  src="../images/shop.png"
                  style={{ marginLeft: "5px", height: "25px", width: "25px" }}
                  className="mx-2"
                />
              </h5>
              <h5 className="mt-2 text-center" style={{ fontSize: "15px" }}>
                OnlineShop keeps your information and payment safe
              </h5>
              <div className="mt-3">
                <img
                  src="../images/last2.png"
                  style={{ marginLeft: "5px", height: "100px", width: "100px" }}
                  className="mx-2"
                />
                <img
                  src="../images/last3.png"
                  style={{ marginLeft: "5px", height: "100px", width: "100px" }}
                  className="mx-2"
                />
                <img
                  src="../images/last4.png"
                  style={{ marginLeft: "5px", height: "100px", width: "100px" }}
                  className="mx-2"
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footerone/>
    </>
  );
}
export default Buy;
