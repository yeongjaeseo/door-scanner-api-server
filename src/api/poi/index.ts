import express from 'express';
import ctrl from './poi.ctrl';

const router = express.Router();

router.get('/', ctrl.listPOIs);
router.get('/:poi_id', ctrl.getPOIByPOIid);
router.get('/:bldg_id/building', ctrl.getPOIsByBldgid);
router.get('/:poi_id/detail', ctrl.getPOIDtlsByPOIid);

export default router;
