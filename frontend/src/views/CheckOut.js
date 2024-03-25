import React, { useCallback, useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CheckOut = () => {
    const API_URL = 'http://localhost:4000';

    const [getData, setData] = useState([]);
    const [address, setAddress] = useState([]);
    const [totalamount, setTotalAmount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geterror, setError] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : "";
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
    var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                toast.error("Please login to checkout");
            }, 700);
            navigate("/login");
            // return false;
        } else {
            var cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
            var total_amount = 0;
            if (cart.length > 0) {
                cart.map((o) => {
                    console.log(o.mrp);
                    total_amount += parseFloat(o.mrp);
                    return true;
                });
                console.log(total_amount);
                setTotalAmount(total_amount);
                // return false;
            } else {
                setTimeout(() => {
                    toast.error("Cart is empty");
                }, 700);
                navigate("/home");
            }

        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(API_URL + '/api/user/order/placeOrder', {
                created_by: user._id,
                products: cart,
                address,
                payment_type: 'cash',
                customer_name: user.name,
                total_amount: totalamount,
                order_status: 1,//confirm
                order_date: Date.now()
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },

                }
            );
            // console.log(response.data.data); return false;
            if (response.data.success === true) {
                // console.log("fdf");
                setLoading(false);
                // setData(response.data);
                setTimeout(() => {
                    toast.success(response.data.message);
                }, 700);
                navigate("/myorderhistory");
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
                toast.error(response.data.message);
                // navigate("/home");
            }
            // console.log(JSON.stringify(response.data.message));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            console.log("error");
        }
    }
    return (
        <Layout>
            <div className='row col-md-6 formCenter mt-5'>
                <h3 className='text-center'>Order Shipping Details</h3>
                <br />
                <div className='border p-5'>
                    <p>Customer Name : {user ? user.name : ""}</p>
                    <p>Email : {user ? user.email : ""}</p>
                    <p>Total Order Amount : {totalamount} Rs</p>
                    <p>Payment Details : Cash</p>
                    <form onSubmit={handleSubmit}>

                        <label>Shipping Address</label>
                        <input className='form-control' id="address" type='text' placeholder='Shipping Address' name="text" onChange={(e) => setAddress(e.target.value)} value={address} required minLength="6" />
                        <button type="submit" className='btn btn-warning mt-3'>Place Order </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
