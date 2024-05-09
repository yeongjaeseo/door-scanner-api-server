import express from 'express';
import ctrl from './building.ctrl';

const router = express.Router();

/**
 * Routes definitions for building operations.
 * Sets up endpoints for retrieving buildings in various ways: all buildings, by ID, and by proximity.
 */
router.get('/', ctrl.listBuildings);
router.get('/map', ctrl.getBuildingsByRadius);
router.get('/:bldg_id', ctrl.getBuildingByBldgid);

export default router;
