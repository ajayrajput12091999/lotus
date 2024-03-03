import express from 'express';
import { getOngoingMatches } from '../controller/cricket';


const router = express.Router();
router.get('/', async(req, res) => {
    res.send('Hello World', 200);
});

router.get('/getOngoingMatches', getOngoingMatches);










export default router;