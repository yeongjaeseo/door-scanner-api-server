import poiDao from './poi.dao';
import { Request, Response } from "express";
import { IPOI } from './poi.model';

/**
 * Get all POI or specific POI if a poi_nm query parameter is provided.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
const listPOIs = async (req: Request, res: Response): Promise<void> => {
  try {
      const poi_nm = typeof req.query.poi_nm === 'string' ? req.query.poi_nm : undefined;
      const poi = await poiDao.listPOIs(poi_nm);
      if (poi.length === 0) {
          res.status(404).json({ success: false, message: 'No POI found' });
          return;
      }
      res.json({ success: true, message: 'POI retrieved successfully', data: poi });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving POI' });
  }
};

const getPOIByPOIid = async (req: Request, res: Response): Promise<void> => {
  const poi_id = Number(req.params.poi_id);
  if (!poi_id) {
    res.status(400).json({ success: false, message: 'poi_id is required' });
    return;
  }
  try {
    const poi = await poiDao.getPOIByPOIid(poi_id);
    if (poi.length === 0) {
      res.status(404).json({ success: false, message: 'POI not found' });
      return;
    }
    res.json({ success: true, message: 'User fetched successfully', data: poi });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getPOIByPOIid' });
  }
};

const getPOIsByBldgid = async (req: Request, res: Response): Promise<void> => {
  const bldg_id = Number(req.params.bldg_id);
  if (!bldg_id) {
    res.status(400).json({ success: false, message: 'bldg_id is required' });
    return;
  }
  try {
    const poi = await poiDao.getPOIsByBldgid(bldg_id);
    if (poi.length === 0) {
      res.status(404).json({ success: false, message: 'POI not found' });
      return;
    }
    res.json({ success: true, message: 'User fetched successfully', data: poi });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getPOIByBldgid' });
  }
};

const getPOIDtlsByPOIid = async (req: Request, res: Response): Promise<void> => {
  const poi_id = Number(req.params.poi_id);
  if (!poi_id) {
    res.status(400).json({ success: false, message: 'poi_id is required' });
    return;
  }
  try {
    const poi = await poiDao.getPOIDtlsByPOIid(poi_id);
    if (poi.length === 0) {
      res.status(404).json({ success: false, message: 'POI Detail not found' });
      return;
    }
    res.json({ success: true, message: 'User fetched successfully', data: poi });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getPOIDtlByPOIid' });
  }
};


export default {
  listPOIs,
  getPOIByPOIid,
  getPOIsByBldgid,
  getPOIDtlsByPOIid,
};
