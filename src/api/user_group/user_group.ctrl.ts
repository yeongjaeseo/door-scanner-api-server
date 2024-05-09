import { Request, Response } from "express";
import userDao from './user_group.dao';
import { IUserGroup, IUserGroupPayload } from './user_group.model';

/**
 * Fetches all user groups from the database and sends them in the response.
 * @param req - The request object.
 * @param res - The response object.
 */
const getAllUserGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUserGroup[] = await userDao.getAllUserGroup();
    res.json({ success: true, message: 'All user groups fetched successfully', data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving all user groups' });
  }
};

/**
 * Fetches a single user group by group code.
 * @param req - The request object, containing the group code as a route parameter.
 * @param res - The response object.
 */
const getUserGroupByGroupCode = async (req: Request, res: Response): Promise<void> => {
  const user_group_cd = req.params.user_group_cd;
  if (!user_group_cd) {
    res.status(400).json({ success: false, message: 'User group code is required' });
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
    res.status(500).json({ success: false, message: 'Error retrieving user group by code' });
  }
};

/**
 * Creates a new user group with the data provided in the request body.
 * @param req - The request object.
 * @param res - The response object.
 */
const createUserGroup = async (req: Request, res: Response): Promise<void> => {
  const { up_user_group_id, user_group_nm, user_type_cd, user_group_cd }: IUserGroupPayload = req.body;
  if (!up_user_group_id || !user_group_nm || !user_type_cd || !user_group_cd) {
    res.status(400).json({ success: false, message: 'All fields are required for user group creation' });
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
    res.status(500).json({ success: false, message: 'Error creating user group' });
  }
};

export default {
  getAllUserGroup,
  getUserGroupByGroupCode,
  createUserGroup,
};
