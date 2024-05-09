import express from 'express';
import ctrl from './user.ctrl';

const router = express.Router();

// Define routes for various user operations
router.get('/', ctrl.getUsers);
router.post('/', ctrl.createUser);
router.get('/:user_uid', ctrl.getUserByUid);
router.patch('/:user_uid', ctrl.updateUserByUid);

export default router;
