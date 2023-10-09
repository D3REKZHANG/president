import express, { Request } from 'express';
import { home } from './service';
const router = express.Router(); 

router.get('/', home); 

router.post('/lobby', (req, res) => {
  console.log(req.body);
  res.status(200).json({roomName: req.body.roomName});
}); 

export { router };
