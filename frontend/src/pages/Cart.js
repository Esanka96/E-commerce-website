import Navbarexp from "../component/Navb"
import { Footerone } from "../Footer/Footern";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import {Col,Row} from "react-bootstrap";
import LinesEllipsis from "react-lines-ellipsis";
function Cart (props){
  const [cartData, setCartdata] = useState([]);
  const [carttotal, setCarttotal] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cart`)
      .then((response) => {
        setCartdata(response.data);
        const filteredData = response.data.filter(item => item.uid === props.id.toString());
        setCartdata(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [props.id]);

  const handledelete = (e) =>{
    axios.post(`http://localhost:8000/api/deletecart/${e}/`)
  .then(response => {
    console.log('Item deleted successfully:', response);
    axios
      .get(`http://localhost:8000/api/cart`)
      .then((response) => {
        setCartdata(response.data);
        const filteredData = response.data.filter(item => item.uid === props.id.toString());
        setCartdata(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
      window.location.reload();
  })
  .catch(error => {
    console.error('Error deleting item:', error);
  });
  }

  const showcart = () =>{
    if(cartData.length === 0){
      return(
        <>
                  <div className="text-center">
                    <img
            src="../images/shopping-cart.png"
            style={{
              marginLeft: "5px",
              height: "200px",
              width: "200px",
            }}
            className="mx-2 mt-5"
          />
          <h1 className="">No items yet</h1>
        </div>
        </>
      )
    } else{
      const totalValue = cartData.reduce((total, item) => {
        const numericPrice = parseFloat(item.price.replace(/^Rs\.?/, ''));
        return isNaN(numericPrice) ? total : (total + numericPrice);
      }, 0);

      const savedValue = (2 / 100) * totalValue;
      const totalAmount = totalValue - savedValue;
      const dolarvalue = totalAmount/354

      return(
        <div >
                <h3 className="mt-2 mx-4">Shopping Cart ({cartData.length})</h3>
      <Row className="d-flex justify-content-center"> 
        <Col md={8} className="mt-2">
        {cartData.map((post) => (
          <Row
            className="p-3 mb-3"
            style={{
              background: "rgba(0,0,0,0.1)",
              borderRadius: "15px",
            }}
          >
            <Row>
            <Col className="mt-2" md={2}>
            <img src={post.photo} style={{ width: "100px", height: "100%" }} />
          </Col>
          <Col className="mt-2 justify-content-start p-0" md={10}>
          <h5 style={{ fontSize: "15px" }}>
                <LinesEllipsis
                      text={post.name}
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                    />
                </h5>
            <h5 style={{fontSize:'15px'}}>{post.price}</h5>
          </Col>
            </Row>
            <Row className="d-flex justify-content-end">
            <Button onClick={()=>handledelete(post.id)} style={{width:'5%', background:'none', border:'none'}} >
            <img
              src="../images/delete.png"
              style={{ marginLeft: "5px", height: "30px", width: "30px" }}
            /></Button>
          </Row>
          </Row>
        ))}
        </Col>
        <Col className="mt-2 mx-3" md={3}>
          <Row             style={{
              background: "rgba(0,0,0,0.1)",
              borderRadius: "15px",
              position: "sticky",
              top: "85px"
            }} className="p-3">
          <h2>Summary</h2>
            <h5 style={{fontSize:'15px'}}><span>Subtotal</span><span style={{float:'right'}}>Rs. {totalValue}.00</span></h5>
            <h5 style={{fontSize:'15px'}}><span>Saved</span><span style={{float:'right'}}>Rs. {savedValue.toFixed(2)}</span></h5>
            <h5 style={{fontSize:'15px'}}><span>Total</span><span style={{float:'right',fontSize:'20px', fontWeight:'bold'}}>Rs. {totalAmount.toFixed(2)}</span></h5>
            <h5 style={{fontSize:'15px'}}><span style={{float:'right'}}>(US ${dolarvalue.toFixed(2)})</span></h5>
            <Button variant="danger" style={{borderRadius:'20px'}} className="mt-2">Place Order</Button>
          </Row>
        </Col>
      </Row>
        </div>
      )
    }
  }

  return(
    <>
              <Navbarexp
        first_name={props.first_name}
        setFirstname={props.setFirstname}
        carttotal={props.carttotal}
      />
    <Container className="d-flex justify-content-center align-items-center">
      {showcart()}
    </Container>
    <Footerone/>
    </>
  )
}
export default Cart