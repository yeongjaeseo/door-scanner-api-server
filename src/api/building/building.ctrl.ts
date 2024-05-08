import bldgDao from './building.dao';
import { Request, Response } from "express";
import { IBldg } from './building.model';

/**
 * Get all building or specific building if a bldg_nm query parameter is provided.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
const listBuildings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bldg_nm = typeof req.query.bldg_nm === 'string' ? req.query.bldg_nm : undefined;
    const bldg = await bldgDao.listBuildings(bldg_nm);
    if (bldg.length === 0) {
      res.status(404).json({ success: false, message: 'No Building found' });
      return;
    }
    res.json({ success: true, message: 'building retrieved successfully', data: bldg });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving building' });
  }
};

const getBuildingByBldgid = async (req: Request, res: Response): Promise<void> => {
  const bldg_id = Number(req.params.bldg_id);
  if (!bldg_id) {
    res.status(400).json({ success: false, message: 'bldg_id is required' });
    return;
  }
  try {
    const bldg = await bldgDao.getBuildingByBldgid(bldg_id);
    if (bldg.length === 0) {
      res.status(404).json({ success: false, message: 'bldg not found' });
      return;
    }
    res.json({ success: true, message: 'User fetched successfully', data: bldg });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getBuildingByBldgid' });
  }
};

const getBuildingsByRadius = async (req: Request, res: Response): Promise<void> => {
  const x = Number(req.query.x);
  const y = Number(req.query.y);
  const radius = Number(req.query.radius);
  const limit = Number(req.query.limit);
  if (!x || !y || !radius || !limit) {
    res.status(400).json({ success: false, message: 'x, y, radius, limit are required' });
    return;
  }

  try {
    const buildings = await bldgDao.getBuildingsByRadius(x, y, radius, limit);
    if (buildings.length === 0) {
      res.status(404).json({ success: false, message: 'No buildings found within the specified radius' });
      return;
    }
    res.json({ success: true, message: 'Buildings fetched successfully', data: buildings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving buildings by radius' });
  }
};



export default {
  listBuildings,
  getBuildingByBldgid,
  getBuildingsByRadius,
};
