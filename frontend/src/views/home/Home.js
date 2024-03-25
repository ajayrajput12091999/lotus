import React, { useEffect, useState } from 'react';
// import { Topbar } from '../../components/Topbar';
import axios from 'axios';
// import { BiSolidCricketBall } from "react-icons/bi";
import { Layout } from '../../components/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
  const API_URL = 'http://localhost:4000';
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geterror, setError] = useState();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
  // const [show, setShow] = useState(true);
  var  cartCountElement = document.getElementById("cartCount");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL + '/api/user/product/getProduct',
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.data.success === true) {
          setData(response.data.data);
        } else {
          setError(response.data.message);
          toast.error(response.data.message);
          
        }
        // console.log(JSON.stringify(response.data.message));
        setLoading(false);

      } catch (error) {
        console.log(error);
        setLoading(false);
        console.log("error");
        // setError(error);
      }
    };
    fetchData();
  }, []);

  const addToCart = async (product_id,product_name,product_description,category_description,mrp) => {
    console.log(product_id);

    if(user && user.role_type !== "user"){
      
      toast.error("You are admin ! Cannot add product");
      return false;
    }
    // return false;
    if (window.confirm("Are You sure you want to add product in cart") === true) {
      var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : ""; 
      console.log(cart);
      // var  cartCountElement = document.getElementById("cartCount");
      var temp_cart_array = {};
      if(cart === ""){
        var cart_array = [];
        temp_cart_array = {

          product_id : product_id,
          product_name: product_name,
          product_description : product_description,
          category_description : category_description,
          mrp:mrp
        };
        var hide_button = document.getElementById(product_id);
        console.log(hide_button.className = "displayNone btn btn-success");
        hide_button.innerHTML = "Added";
        // this.setState = false;
        // setShow(false);
        // console.log(show);        // temp_cart_array.
        // temp_cart_array['product_name'] = product_name;
        // temp_cart_array['product_description'] = product_description;
        // temp_cart_array['category_description'] =category_description;
        // temp_cart_array['mrp'] = mrp;
        cart_array.push(temp_cart_array);
        cartCountElement.innerHTML = cart_array.length
        console.log(JSON.stringify(cart_array));
        localStorage.setItem('cart',JSON.stringify(cart_array));
        toast.success("Product added to cart");
      }else{
        console.log("Not empty");
        console.log(cart);
        // var cart_array = [];
        temp_cart_array = {

          product_id : product_id,
          product_name: product_name,
          product_description : product_description,
          category_description : category_description,
          mrp:mrp
        };
        hide_button = document.getElementById(product_id);
        console.log(hide_button.className = "displayNone btn btn-danger");
        hide_button.innerHTML = "Added";
        cart.push(temp_cart_array);
        cartCountElement.innerHTML = cart.length
        console.log(JSON.stringify(cart));
        localStorage.setItem('cart',JSON.stringify(cart));
        toast.success("Product added to cart");
      }
      console.log(cart);
    }
  }
  return (
    <Layout>

      <div className='row justify-content-center'>
        {
          (loading) ? <div className=''>Loading...</div> : ""
        }
        {
          (getData.length > 0) && getData.map(product => {
            var display_flag = true;
            console.log(display_flag+"-"+product._id)
            var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : ""; 
            if(cart.length > 0){
              if(cartCountElement){
                cartCountElement.innerHTML = cart.length;  
              }
              var findRes = cart.map((o)=>{
                return o.product_id;
                // consoldisplay_flag = false;
                  // console.log("Product matched"+o.product_id);
                  // console.log(display_flag);e.log(o.product_id)
                // if(o.product_id === product._id){
                  
                  // return false
                // }else{
                  // return true
                // }
              });
            }
            // var  cartCountElement = document.getElementById("cartCount");
            
            if(cart.length > 0 &&  findRes.includes(product._id,findRes)){
              display_flag = false;
            }
            if(user && user.role_type === "admin"){
              display_flag = false;
            }
            var file_path = API_URL+"/uploads/"+product.product_image;
            return (
              <div className='col-4 mt-4 formCenter' key={product._id}>
                <div className="card formCenter" style={{maxWidth: "20rem",maxHeight:"30rem"}}>
                  <img className="card-img-top img-responsive"
                   src={file_path}
                    height={150} width={150} style={{objectFit:"contain"}}  alt="..."/>
                    <div className="card-body">
                      <h5 className="card-title">{product.product_name  }</h5>
                      <p className="card-text">{product.product_description}</p>
                      <p className="card-text">{product.mrp} Rs</p>
                      
                      {display_flag && display_flag === true  ? 
                      <button onClick={()=>addToCart(product?._id,product?.product_name,product?.product_description,product?.category_name,product?.mrp)} className="btn btn-warning " id={`${product?._id}`}>Add To Cart</button> 
                      : ((user && user.role_type === "user") || (!user)) ? <button className='btn btn-danger displayNone'>Added</button> : ""}
                      
                    </div>
                </div>
              </div>

            )
          })
        }
        {
          getData.length === 0 ? <div className='mt-5'>{geterror}</div> : ""
        }

      </div>
    </Layout>
  )
}
