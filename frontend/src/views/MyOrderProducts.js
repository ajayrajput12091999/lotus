import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const MyOrderProducts = () => {
    const API_URL = 'http://localhost:4000';
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : "";
    var cartButton = document.getElementById("cartCount");
    if (cart.length > 0 && cartButton) {
        cartButton.innerHTML = cart.length;
    }
    const { id } = useParams();

    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geterror, setError] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : "";
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
    const navigate = useNavigate();
    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/home");
        }
        console.log(token);
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(API_URL + '/api/user/order/getOrderDetailById', { order_id: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },

                    }
                );
                // console.log(response.data.data); return false;
                if (response.data.success === true) {
                    setData(response.data.data[0].products);
                    console.log(response.data.data);
                    // console.log(getData);
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
                    navigate("/home");
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
    }, [token, isLoggedIn, navigate, id]);


    return (
        <Layout>
            <div className='row'>
                <h5 className='text-center mt-4'>Order Product Details</h5>
                {user && user.role_type === "admin" ? <Link className='btn btn-warning ml-2 mt-4 ml-auto' to="/orders">Back</Link>
                    : <Link className='btn btn-warning ml-2 mt-4 ml-auto' to="/myorderhistory">Back</Link>
                }

                <table className='table table-striped mt-4'>
                    <thead className='thead'>
                        <tr>
                            <th>S No</th>
                            <th>Order Id</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Categroy Name</th>
                            <th>Mrp</th>

                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            (loading) ? <tr><td colSpan='6' className='text-center'>Loading...</td></tr> : ""
                        }
                        {

                            (getData.length > 0) && getData.map((product, key) => {
                                // console.log(product);
                                return (

                                    <tr key={product._id}>
                                        <td>{1 + key}</td>
                                        <td>{id}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_description}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.mrp}</td>
                                    </tr>

                                )
                            })
                        }
                        {
                            getData.length === 0 ? <tr><td colSpan='6'>{geterror}</td></tr> : ""
                        }
                        <tr></tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
