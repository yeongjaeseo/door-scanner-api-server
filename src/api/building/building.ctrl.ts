import bldgDao from './building.dao';
import { Request, Response } from "express";

/**
 * Controller to handle requests to list buildings.
 * Lists all buildings or filters by name if a query parameter is provided.
 * 
 * @param req - The HTTP request object containing query parameters.
 * @param res - The HTTP response object used to send responses.
 */
const listBuildings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bldg_nm = typeof req.query.bldg_nm === 'string' ? req.query.bldg_nm : undefined;
    const buildings = await bldgDao.listBuildings(bldg_nm);
    if (buildings.length === 0) {
      res.status(404).json({ success: false, message: 'No buildings found' });
      return;
    }
    res.json({ success: true, message: 'Buildings retrieved successfully', data: buildings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving buildings' });
  }
};

/**
 * Controller to handle request to retrieve a building by its ID.
 * 
 * @param req - The HTTP request object containing the building ID as a route parameter.
 * @param res - The HTTP response object used to send responses.
 */
const getBuildingByBldgid = async (req: Request, res: Response): Promise<void> => {
  const bldg_id = Number(req.params.bldg_id);
  if (!bldg_id) {
    res.status(400).json({ success: false, message: 'Building ID is required' });
    return;
  }
  try {
    const building = await bldgDao.getBuildingByBldgid(bldg_id);
    if (building.length === 0) {
      res.status(404).json({ success: false, message: 'Building not found' });
      return;
    }
    res.json({ success: true, message: 'Building fetched successfully', data: building });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching building' });
  }
};

/**
 * Controller to handle request to retrieve buildings within a specified radius.
 * 
 * @param req - The HTTP request object containing the coordinates, radius, and limit as query parameters.
 * @param res - The HTTP response object used to send responses.
 */
const getBuildingsByRadius = async (req: Request, res: Response): Promise<void> => {
  const x = Number(req.query.x);
  const y = Number(req.query.y);
  const radius = Number(req.query.radius);
  const limit = Number(req.query.limit);
  if (!x || !y || !radius || !limit) {
    res.status(400).json({ success: false, message: 'All parameters (x, y, radius, limit) are required' });
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
    res.status(500).json({ success: false, message: 'Error fetching buildings by radius' });
  }
};

export default {
  listBuildings,
  getBuildingByBldgid,
  getBuildingsByRadius
};
