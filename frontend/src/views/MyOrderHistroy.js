import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const MyOrderHistroy = () => {
    const API_URL = 'http://localhost:4000';
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geterror, setError] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : "";
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : "";
    var cartButton = document.getElementById("cartCount");
    if(cart.length > 0 && cartButton){
        cartButton.innerHTML = cart.length;  
    }
    const navigate = useNavigate();
    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/home");
        }
        console.log(token);
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(API_URL + '/api/user/order/getOrderDetailByUserId', { user_id: user._id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },

                    }
                );
                if (response.data.success === true) {
                    setData(response.data.data);
                    console.log(response.data.data.length)
                    // console.log("fdf");
                } else {
                    setError(response.data.message);
                    if (response.data.message === 'Token expired') {
                        localStorage.setItem("token", "");
                        localStorage.setItem("user", "");
                        localStorage.setItem("isLoggedIn", JSON.stringify(false));
                    } else {
                        // localStorage.setItem("token", "");
                        // localStorage.setItem("user", "");
                        // localStorage.setItem("isLoggedIn", JSON.stringify(false));
                    }
                    alert(response.data.message);
                    // navigate("/home");
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
    }, [token, isLoggedIn, navigate, user._id]);


    return (
        <Layout>
            <div className='row'>
                <h5 className='text-center mt-4'>My Order History</h5>
                <Link className='btn btn-warning ml-2 mt-4 ml-auto' to="/">Back</Link>
                <table className='table table-striped mt-4'>
                    <thead className='thead'>
                        <tr>
                            <th>S No</th>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Order Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            (loading) ? <tr><td colSpan='6' className='text-center'>Loading...</td></tr> : ""
                        }
                        {

                            (getData.length > 0) && getData.map((order, key) => {
                                // console.log(product);
                                return (

                                    <tr key={order._id}>
                                        <td>{1 + key}</td>
                                        <td>{order._id}</td>
                                        <td>{order.order_date}</td>
                                        <td>{order.total_amount}</td>
                                        <td>{order.order_status === 1 ? "Shipped" : "Confirm"}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={`/orderproducts/${order?._id}`}>Products</Link>

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
                </table>
            </div>
        </Layout>
    )
}
