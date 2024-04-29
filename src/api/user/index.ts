import express from 'express';
import ctrl from './user.ctrl';

const router = express.Router();

// Retrieve all users or specific users by name using a query parameter
router.get('/', ctrl.getUsers);

// 회원가입 (User registration)
router.post('/', ctrl.createUser);

// 회원조회 (Retrieve a single user by UID)
router.get('/:user_uid', ctrl.getUserByUid);

// 회원정보 수정 (Update a user by UID)
router.patch('/:user_uid', ctrl.updateUserByUid);

export default router;