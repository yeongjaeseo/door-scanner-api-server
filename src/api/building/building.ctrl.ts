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
    const poi = await bldgDao.listBuildings(bldg_nm);
    if (poi.length === 0) {
      res.status(404).json({ success: false, message: 'No Building found' });
      return;
    }
    res.json({ success: true, message: 'bldg_nm retrieved successfully', data: bldg_nm });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving building' });
  }
};

const getBuildingById = async (req: Request, res: Response): Promise<void> => {
  const bldg_id = Number(req.params.bldg_id);
  if (!bldg_id) {
    res.status(400).json({ success: false, message: 'bldg_id is required' });
    return;
  }
  try {
    const poi = await bldgDao.getBuildingById(bldg_id);
    if (poi.length === 0) {
      res.status(404).json({ success: false, message: 'POI not found' });
      return;
    }
    res.json({ success: true, message: 'User fetched successfully', data: poi });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getPOIByBldgid' });
  }
};

const getBuildingsByRadius = async (req: Request, res: Response): Promise<void> => {
  // Access query parameters using req.query instead of req.params
  const x = Number(req.query.x);
  const y = Number(req.query.y);
  const radius = Number(req.query.radius);

  if (!x || !y || !radius) {
    res.status(400).json({ success: false, message: 'x, y, and radius are required' });
    return;
  }

  try {
    const buildings = await bldgDao.getBuildingsByRadius(x, y, radius);
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
  getBuildingById,
  getBuildingsByRadius,
};
