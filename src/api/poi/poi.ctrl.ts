import { Request, Response } from 'express';
import poiDao from './poi.dao';

/**
 * Lists all POIs or filters them by name if provided.
 * @param req - Express HTTP Request
 * @param res - Express HTTP Response
 */
const listPOIs = async (req: Request, res: Response): Promise<void> => {
    try {
        const poi_nm = typeof req.query.poi_nm === 'string' ? req.query.poi_nm : undefined;
        const pois = await poiDao.listPOIs(poi_nm);
        pois.length === 0
            ? res.status(404).json({ success: false, message: 'No POI found' })
            : res.json({ success: true, message: 'POI retrieved successfully', data: pois });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving POI' });
    }
};

/**
 * Retrieves a specific POI by its unique ID.
 * @param req - Express HTTP Request
 * @param res - Express HTTP Response
 */
const getPOIByPOIid = async (req: Request, res: Response): Promise<void> => {
    const poi_id = Number(req.params.poi_id);
    if (!poi_id) {
        res.status(400).json({ success: false, message: 'poi_id is required' });
        return;
    }
    try {
        const poi = await poiDao.getPOIByPOIid(poi_id);
        poi.length === 0
            ? res.status(404).json({ success: false, message: 'POI not found' })
            : res.json({ success: true, message: 'User fetched successfully', data: poi });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving POI' });
    }
};

/**
 * Retrieves POIs by building ID.
 * @param req - Express HTTP Request
 * @param res - Express HTTP Response
 */
const getPOIsByBldgid = async (req: Request, res: Response): Promise<void> => {
    const bldg_id = Number(req.params.bldg_id);
    if (!bldg_id) {
        res.status(400).json({ success: false, message: 'bldg_id is required' });
        return;
    }
    try {
        const pois = await poiDao.getPOIsByBldgid(bldg_id);
        pois.length === 0
            ? res.status(404).json({ success: false, message: 'POI not found' })
            : res.json({ success: true, message: 'POIs fetched successfully', data: pois });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving POIs' });
    }
};

/**
 * Retrieves details of a specific POI by its ID.
 * @param req - Express HTTP Request
 * @param res - Express HTTP Response
 */
const getPOIDtlsByPOIid = async (req: Request, res: Response): Promise<void> => {
    const poi_id = Number(req.params.poi_id);
    if (!poi_id) {
        res.status(400).json({ success: false, message: 'poi_id is required' });
        return;
    }
    try {
        const poiDetail = await poiDao.getPOIDtlsByPOIid(poi_id);
        poiDetail.length === 0
            ? res.status(404).json({ success: false, message: 'POI Detail not found' })
            : res.json({ success: true, message: 'POI Detail fetched successfully', data: poiDetail });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving POI Detail' });
    }
};

export default {
    listPOIs,
    getPOIByPOIid,
    getPOIsByBldgid,
    getPOIDtlsByPOIid
};
