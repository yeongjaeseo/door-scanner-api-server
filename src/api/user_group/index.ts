import express from 'express';
import ctrl from './user_group.ctrl';

const router = express.Router();

router.get('/', ctrl.getAllUserGroup); // Retrieve all user groups
router.post('/', ctrl.createUserGroup); // Add a new user group
router.get('/:user_group_cd', ctrl.getUserGroupByGroupCode); // Retrieve a single user group by group code

export default router;
