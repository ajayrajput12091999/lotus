import React, { useEffect, useState } from 'react';
// import { Topbar } from '../../components/Topbar';
import axios from 'axios';
// import { BiSolidCricketBall } from "react-icons/bi";
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { get } from 'mongoose';

export const Dashboard = () => {
    const API_URL = 'http://localhost:4000';
    const [getData, setData] = useState([]);
    const [totalSale, setTotalSale] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
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
                const response = await axios.post(API_URL + '/api/user/order/getAdminDashboardDetails', {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },

                    }
                );
                // console.log(response.data.data); return false;
                if (response.data.success === true) {
                    setData(response.data.data);
                    console.log(response.data.data);
                    setTotalOrder(response.data.total_order);
                    setTotalProduct(response.data.total_product);
                    setTotalSale(response.data.total_sale);
                    // console.log(totalOrder);
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
                    console.log(response.data);
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
    }, [token, isLoggedIn, navigate]);
    
    return (
        <Layout>
            <h4 className='text-center mt-5'>Dashboard</h4>
            <div className='row justify-content-center'>
                
                {
                    (loading) ? <div className='col-md-12 text-center'>Loading...</div> : ""
                }
                <br/>
                <hr/>
                <br/>
                <div className='col-3 mt-4 formCenter'>
                    <div className="card dashboardCard_3 formCenter" style={{ maxWidth: "20rem", maxHeight: "30rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Sale</h5>
                            <p className="card-text"></p>
                            <p className="card-text">{getData.total_sale ? getData.total_sale : 0}</p>
                        </div>
                    </div>
                </div>
                <div className='col-3 mt-4 formCenter'>
                    <div className="card dashboardCard_2 formCenter" style={{ maxWidth: "20rem", maxHeight: "30rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Orders</h5>
                            <p className="card-text"></p>
                            <p className="card-text">{ getData.total_order ? getData.total_order : 0}</p>
                        </div>
                    </div>
                </div>
                <div className='col-3 mt-4 formCenter'>
                    <div className="card dashboardCard_1 formCenter" style={{ maxWidth: "20rem", maxHeight: "30rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Total Product</h5>
                            <p className="card-text"></p>
                            <p className="card-text">{getData.total_product ? getData.total_product : 0}</p>
                        </div>
                    </div>
                </div>
                {
                    getData.length === 0 ? <div className='mt-5'>{geterror}</div> : ""
                }

            </div>
        </Layout>
    )
}
