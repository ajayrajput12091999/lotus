import React from 'react';
import { Layout } from '../components/Layout';
import { Link } from 'react-router-dom';

export const MyProfile = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    return (
        <Layout>
            <div className='row col-md-6 formCenter mt-5'>
                <h3 className='text-center'>Welcome Back</h3>
                <br/>
                <div className='border p-5'>
                    <p>Name : {user && user.name ? user.name : ""} </p> 
                    <p>Email : {user && user.email ? user.email : ""} </p> 
                    <p>Role : {user && user.role_type ? user.role_type : ""} </p> 
                </div>  
                <Link className='btn btn-primary mt-2' to="/">Back </Link>
                
            </div>
        </Layout>
    )
}
