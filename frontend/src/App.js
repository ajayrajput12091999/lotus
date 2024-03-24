import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import { Home } from './views/home/Home';
import { PageNotFound } from './views/home/PageNotFound';
import { Login } from './views/home/Login';
import { SignUp } from './views/home/SignUp';
import { Carts } from './views/home/Carts';
import { MyProfile } from './views/MyProfile';
import { MyProduct } from './views/MyProduct';
import { ProductEdit } from './views/ProductEdit';
import { AddProduct } from './views/AddProduct';
import { CheckOut } from './views/CheckOut';
import { MyOrderHistroy } from './views/MyOrderHistroy';
import { MyOrderProducts } from './views/MyOrderProducts';
import { Order } from './views/Order';
import { Dashboard } from './views/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/carts' element={<Carts/>} />
        <Route path='/myproducts' element={<MyProduct/>} />
        <Route path='/profile' element={<MyProfile/>} />
        <Route path='/editproduct/:id' element={<ProductEdit/>} />
        <Route path='/orderproducts/:id' element={<MyOrderProducts/>} />
        <Route path='*' element={<PageNotFound/>} />
        <Route path='/addproducts' element={<AddProduct/>} />
        <Route path='/checkout' element={<CheckOut/>} />
        <Route path='/myorderhistory' element={<MyOrderHistroy/>} />
        <Route path='/orders' element={<Order/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes> 
    </Router>
  );
}

export default App;
