import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css"
import Layout from "./pages/Layout";
import Singleview from "./pages/Single";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Address from "./pages/Address";
import Layoutitem from "./pages/Items";
import Last from "./pages/Last";
import New from "./pages/New";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import { Footerone } from "./Footer/Footern";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cartData, setCartdata] = useState([]);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [id, setId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [carttotal, setCarttotal] = useState("");

  useEffect(() => {
    (
      async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();

      setFirstname(content.first_name);
      setLastname(content.last_name);
      console.log(content.first_name,content.last_name)

      setId(content.id)
      setUserDetails(content)
      console.log(first_name);

      if(response.status===200){
        const newresponse = await axios.get(`http://localhost:8000/api/cart`);
        const filteredData = newresponse.data.filter(item => item.uid === content.id.toString());
        setCartdata(filteredData)
        setCarttotal(filteredData.length)
      }
      
    })();
  },[first_name]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout carttotal={carttotal} first_name={first_name} setFirstname={setFirstname} last_name={last_name}/>
          }
        />
          <Route path="/home" element={<Home carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
          <Route path="/register"  element={<Register />} />
          <Route path="/buy/:id"  element={<Buy carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
          <Route
            path="/login"
            element={<Login setFirstname={setFirstname} />}
          />
          <Route path="/single/:id"  element={<Singleview carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
          <Route path="address/:id" element={<Address carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
          <Route path="/:name" element={<Layoutitem  carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
          <Route path="/orders"  element={<Last carttotal={carttotal} first_name={first_name} last_name={last_name}
          setFirstname={setFirstname}/>}/>
          <Route path="/new" element={<New />}/>
          <Route path="/cart" element={<Cart id={id} carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
          <Route path="/search" element={<Search carttotal={carttotal} first_name={first_name} setFirstname={setFirstname}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
