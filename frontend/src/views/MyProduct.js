import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MyProduct = () => {
    const API_URL = 'http://localhost:4000';
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [geterror, setError] = useState();
    const isLoggedIn = localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : "";
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "";
    const navigate = useNavigate();
    const getProduct = useCallback(() => {

        if (!isLoggedIn) {
            navigate("/home");
        }
        console.log(token);
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(API_URL + '/api/user/product/getAdminProductByUserId', { user_id: user._id },
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
                    setTimeout(() => {
                        toast.error(response.data.message);
                    }, 700);
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
    }, [token, isLoggedIn, navigate, user._id]);

    useEffect(()=>{
        getProduct();
    },[getProduct]);

    const deleteProducts = async (id) => {
        // console.log(e);
        if (window.confirm("Are You sure you want to delete") === true) {
            try {
                setLoading(true);
                const response = await axios.post(API_URL + '/api/user/product/deleteAdminProductByProductId', {
                    product_id: id
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
                    getProduct();
                    // setData(response.data);
                    setTimeout(() => {
                        toast.success(response.data.message);
                    }, 700);
                    console.log("fdf");
                    
                } else {
                    setError(response.data.message);
                    if (response.data.message === 'Token has expired') {
                        localStorage.setItem("token", "");
                        localStorage.setItem("user", "");
                        localStorage.setItem("isLoggedIn", JSON.stringify(false));
                        navigate("/home");
                    } else {
                        // localStorage.setItem("token", "");
                        // localStorage.setItem("user", "");
                        // localStorage.setItem("isLoggedIn", JSON.stringify(false));
                    }
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
        } else {
            return false;
        }
        return false;


    }

    return (
        <Layout>
            <div className='row'>
                <h5 className='text-center mt-4'>Product Lists</h5>
                <Link className='btn btn-warning ml-2 mt-4 ml-auto' to="/addproducts">Add Product</Link>
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

                                    <tr key={product._id}>
                                        <td>{1 + key}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.product_description}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.mrp}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={`/editproduct/${product?._id}`}>Edit</Link>
                                            <button type='button' className="btn btn-danger ml-2" onClick={() => deleteProducts(product?._id)}>Delete</button>
                                        </td>
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
