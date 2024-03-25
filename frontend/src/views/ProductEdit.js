import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductEdit = () => {
    const API_URL = 'http://localhost:4000';
    const { id } = useParams();

    const [getData, setData] = useState([]);
    const [product_name, setProductName] = useState("");
    const [product_discription, setProductDiscription] = useState("");
    const [mrp, setMrp] = useState("");
    const [category_name, setProductCategoryName] = useState("");
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
                const response = await axios.post(API_URL + '/api/user/product/getAdminProductByProductId', { product_id: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },

                    }
                );
                // console.log(response.data.data); return false;
                if (response.data.success === true) {
                    setProductName(response.data.data[0].product_name);
                    setProductDiscription(response.data.data[0].product_description);
                    setProductCategoryName(response.data.data[0].category_name);
                    setMrp(response.data.data[0].mrp);

                    setData(response.data.data);
                    console.log(response.data.data.length)

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
    }, [token, isLoggedIn, navigate, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(API_URL + '/api/user/product/updateAdminProductByProductId', {
                product_id: id,
                product_description: product_discription,
                product_name: product_name,
                category_name,
                mrp,
                created_by: user._id

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
                // alert(response.data.message);
                setTimeout(() => {
                    toast.success(response.data.message);
                }, 700);

                navigate("/myproducts");
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
                // alert(response.data.message);
                toast.error(response.data.message);

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

    }

    return (
        <Layout>
            <div className='container row col-12'>

                <form onSubmit={handleSubmit} className='col-12'>
                    <h5 className='text-center mt-3'>Edit Product</h5>

                    {loading && loading === true ? <div className='col-md-8 formCenter mt-2 warning'> Loading </div> : ""}
                    {geterror && geterror !== '' ? <div className='col-md-8 formCenter mt-2 text-danger'> {geterror} </div> : ""}

                    <div className='col-md-8 formCenter mt-2'>
                        <label>Product Name</label>
                        <input className='form-control' type="text" name="product_name" id="product_name" onChange={(e) => setProductName(e.target.value)} value={product_name} required />
                    </div>
                    <div className='col-md-8 formCenter mt-2'>
                        <label>Product Discription</label>
                        <input className='form-control' id="product_discription" type='text' name="email" onChange={(e) => setProductDiscription(e.target.value)} value={product_discription} required />
                    </div>
                    <div className='col-md-8 formCenter mt-2'>
                        <label>Category Discription</label>
                        <input className='form-control' id="product_category_name" type='text' name="product_category_name" onChange={(e) => setProductCategoryName(e.target.value)} value={category_name} required />
                    </div>
                    <div className='col-md-8 formCenter mt-2'>
                        <label>Mrp</label>
                        <input className='form-control' id="product_category_name" type='text' name="mrp" onChange={(e) => setMrp(e.target.value)} value={mrp} required maxLength="7" />
                    </div>
                    <div className='col-md-8 formCenter mt-3'>
                        <button type='submit' className='btn btn-primary'>Update</button>
                        <Link className='btn btn-success ml-2' to="/myproducts">Back</Link>
                    </div>
                </form>

            </div>
        </Layout>
    )
}
