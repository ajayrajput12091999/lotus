import axios from "axios";

export const getOngoingMatches = async (req, res) => {

    axios.post('https://app.toddapples.com/getCricketData', {'url': "https://dream.bagpackkar.com/d110923/shyamp/getSeries?sport_id=4"}).then((res) =>
    {
        return res.status(200).send(res.data);
    } 
    ).catch((er) => {
        return res.status(200).send(er);
    })
   
}