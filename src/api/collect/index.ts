import express from 'express';
import ctrl from './collect.ctrl';

const router = express.Router();

// 
router.get('/', ctrl.getPOI);


export default router;