import React from 'react'
import { Link } from 'react-router-dom';
import { FaPlayCircle } from "react-icons/fa";

export const Topbar = (props) => {
    return (
        <div className='mt-3'>
            <nav className="navbar navbar-light justify-content-between" style={{background:"#257b23",padding:".2rem 1rem"}}>
                <Link className="navbar-brand text-white font-weight-bold" to="/home">
                <FaPlayCircle style={{marginTop:"-4px"}} /> In Play
                </Link>
                <div className="form-inline text-white">
                    <small><b>Open Bets <span className="badge badge-light">{props.open_beat_count}</span></b></small>
                </div>          
            </nav>
            
        </div>
    )
}