import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';

export const Carts = () => {
    const API_URL = 'http://localhost:4000';
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geterror, setError] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : "";
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
    
    const navigate = useNavigate();

    const getCart = useCallback(() => {

      const fetchData = async () => {
          try {
              setLoading(true);
              var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : ""; 
              if (cart.length > 0) {
                  setData(cart);
                  console.log(cart)
                  // console.log("fdf");
              } else {
                setData([]);
                  setError("Cart Is Empty");
                  
              }
              var  cartCountElement = document.getElementById("cartCount");
              cartCountElement.innerHTML = cart.length;
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

    useEffect(()=>{
      getCart();
    },[getCart]);
    const deleteProducts = async (id) => {
        // console.log(e);
        if (window.confirm("Are You sure you want to delete from cart") === true) {
            try {
              var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : ""; 
                var objectTOdelete = cart.findIndex(o => o.product_id === id );
                // console.log(objectTOdelete);return false;
                objectTOdelete !== -1 && cart.splice(objectTOdelete ,1);
                localStorage.setItem('cart',JSON.stringify(cart));
                getCart();
                alert("Product deleted successfully from cart");
                
                // navigate("/carts");
                // console.log(cart);


                // if (response.data.success === true) {
                //     // console.log("fdf");
                //     setLoading(false);
                //     // setData(response.data);
                //     alert(response.data.message);
                //     console.log("fdf");
                //     navigate("/myproducts");
                // } else {
                //     setError(response.data.message);
                //     if (response.data.message === 'Token has expired') {
                //         localStorage.setItem("token", "");
                //         localStorage.setItem("user", "");
                //         localStorage.setItem("isLoggedIn", JSON.stringify(false));
                //     } else {
                //         // localStorage.setItem("token", "");
                //         // localStorage.setItem("user", "");
                //         // localStorage.setItem("isLoggedIn", JSON.stringify(false));
                //     }
                //     alert(response.data.message);
                //     navigate("/home");
                // }
                // console.log(JSON.stringify(response.data.message));
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
                console.log("error");
                // setError(error);
            }
        } else {
            return false;
        }
        return false;


    }

    return (
        <Layout>
            <div className='row'>
                <h5 className='text-center mt-4'>Cart Lists</h5>
                <Link className='btn btn-warning ml-2 mt-4 ml-auto' to="/">Back</Link>
                <table className='table table-striped mt-4'>
                    <thead className='thead'>
                        <tr>
                            <th>S No</th>
                            <th>Product Name</th>
                            <th>Product Discription</th>
                            <th>Category Name</th>
                            <th>Mrp</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            (loading) ? <tr><td colSpan='6'>Loading...</td></tr> : ""
                        }
                        {

                            (getData.length > 0) && getData.map((product, key) => {
                                // console.log(product);
                                return (

                                    <tr key={product.product_id}>
                                        <td>{1 + key}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_description}</td>
                                        <td>{product.category_description}</td>
                                        <td>{product.mrp}</td>
                                        <td>
                                            {/* <Link className="btn btn-primary" to={`/editproduct/${product?._id}`}>Edit</Link> */}
                                            <button type='button' className="btn btn-danger ml-2" onClick={() => deleteProducts(product?.product_id)}>Delete</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                        {
                            getData.length === 0 ? <tr><td colSpan='6' className='text-center'>{geterror}</td></tr> : ""
                        }
                        <tr></tr>
                    </tbody>
                    <tfoot>
                      
                      <tr>
                        <td colSpan={6}>
                          <Link to="/checkout" className='btn btn-warning'>Checkout</Link>
                        </td>
                      </tr>
                    </tfoot>
                </table>
            </div>
        </Layout>
    )
}
