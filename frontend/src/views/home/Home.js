import React, { useEffect, useState } from 'react';
import { Topbar } from '../../components/Topbar';
import axios from 'axios';
import { BiSolidCricketBall } from "react-icons/bi";
// import * as  Moment  from 'moment';

export const Home = () => {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [geterror, setError] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('https://app.toddapples.com/getCricketData',
          { 'url': "https://dream.bagpackkar.com/d110923/shyamp/getMatches?series_id=10693181&game_id=4" }
        );
        console.log(response.data);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        // setError(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className='container-fluid' style={{ paddingRight: "11px", paddingLeft: "11px" }}>
      <Topbar open_beat_count="9" />
      <hr></hr>
      <div className='row justify-content-center'>
        <div className='col-12 mt-1' style={{ fontSize: "18px", fontWeight: "600" }}><BiSolidCricketBall size={22} color='#257b23' /> Cricket</div>
        {/* <div className='col-5'>
          <div className='row'>
            <div className='col-4 mt-1'><small>1</small></div>
            <div className='col-4 mt-1'><small>X</small></div>
            <div className='col-4 mt-1'><small>2</small></div>
          </div>
        </div> */}
      </div>
      <div className='row justify-content-center mt-2'>
        <div className='col-12'><h6>{(getData.length > 0) ? getData[0].competition.name : ''}</h6></div>
      </div>
      <table className='table table-hover'>
        <thead className='thead'>
          <tr>
            <th>Matches</th>
            <th>Timing</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {
            (loading) ? <tr><td colSpan={2}>Loading...</td></tr> : ''
          }
          {
            (getData.length > 0) && getData.map(matches => {
              // console.log(matches.event);\
              return (
                <tr key={matches.event.id}>
                  <td style={{ width: "50%" }}>
                    {matches.event.name}
                  </td>
                  <td style={{ width: "50%" }}>
                    {/* { moment(matches.event.openDate).format('YYYY/DD/MM') } */}
                    {matches.event.openDate}
                  </td>
                </tr>
              )
            })
          }
          {
            // (geterror) ? <tr><td colSpan={2}>Internal Server Error</td></tr> : ''
            (loading === false &&  getData.length === 0) ? <tr className='text-center'><td colSpan={2}>No matches found</td></tr> : ''
          }
        </tbody>
      </table>
    </div>
  )
}
