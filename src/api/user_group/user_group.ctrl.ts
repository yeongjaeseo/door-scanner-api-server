import userDao from './user_group.dao';
import { Request, Response } from "express";
import { IUserGroup, IUserGroupPayload } from './user_group.model';

const getAllUserGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUserGroup[] = await userDao.getAllUserGroup();
    res.json({ success: true, message: 'All User Groups fetched successfully', data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getAllUserGroup' })
  }
};

const getUserGroupByGroupCode = async (req: Request, res: Response): Promise<void> => {
  const user_group_cd = req.params.user_group_cd;
  if (!user_group_cd) {
    res.status(400).json({ success: false, message: 'user_group_cd is required' });
    return;
  }
  try {
    const user = await userDao.getUserGroupByGroupCode(user_group_cd);
    if (!user) {
      res.status(404).json({ success: false, message: 'User group not found' });
      return;
    }
    res.json({ success: true, message: 'User group fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getUserGroupByGroupCode' });
  }
};

const createUserGroup = async (req: Request, res: Response): Promise<void> => {
  const { up_user_group_id, user_group_nm, user_type_cd, user_group_cd }: IUserGroupPayload = req.body;

  if (!up_user_group_id || !user_group_nm || !user_type_cd || !user_group_cd) {
    res.status(400).json({ success: false, message: 'All user group fields are required: up_user_group_id, user_group_nm, user_type_cd, user_group_cd' });
    return;
  }

  try {
    const existingGroup = await userDao.getUserGroupByGroupCode(user_group_cd);
    if (existingGroup.length > 0) {
      res.status(409).json({ success: false, message: 'User group code already exists' });
      return;
    }
    const newUserGroup = await userDao.createUserGroup(req.body);
    res.status(201).json({ success: true, message: 'User group created successfully', data: newUserGroup });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error creating user group` });
  }
};

export default {
  getAllUserGroup,
  getUserGroupByGroupCode,
  createUserGroup,
};
