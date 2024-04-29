import express from 'express';
import ctrl from './user_group.ctrl';

const router = express.Router();

// 모든 그룹 조회 (Retrieve all users)
router.get('/', ctrl.getAllUserGroup);

// 그룹 추가 (User registration)
router.post('/', ctrl.createUserGroup);

// 팀코드로 그룹 조회 (Retrieve a single user group by group code)
router.get('/:user_group_cd', ctrl.getUserGroupByGroupCode);

export default router;