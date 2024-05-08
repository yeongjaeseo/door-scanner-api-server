import express from 'express';
import ctrl from './building.ctrl';

const router = express.Router();

// Retrieve all buildings
router.get('/', ctrl.listBuildings);

// Retrieve buildings within a radius (consider including parameters like center coordinates and radius)
router.get('/map', ctrl.getBuildingsByRadius);

// Retrieve a single building by ID
router.get('/:bldg_id', ctrl.getBuildingById);



export default router;