import { Request, Response } from 'express';
import userDao from './user.dao';
import { IUser, IUserUpdates, LoginType } from './user.model';

/**
 * Retrieves a list of users or a specific user by name.
 * @param req - Express HTTP Request object.
 * @param res - Express HTTP Response object.
 */
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = typeof req.query.name === 'string' ? req.query.name : undefined;
    const users = await userDao.getUsers(name);

    users.length === 0
      ? res.status(404).json({ success: false, message: 'No users found' })
      : res.json({ success: true, message: 'Users retrieved successfully', data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving users' });
  }
};

/**
 * Retrieves a user by their unique UID.
 * @param req - Express HTTP Request object.
 * @param res - Express HTTP Response object.
 */
const getUserByUid = async (req: Request, res: Response): Promise<void> => {
  const uid = req.params.user_uid;
  if (!uid) {
    res.status(400).json({ success: false, message: 'User UID is required' });
    return;
  }
  try {
    const user = await userDao.getUserByUid(uid);
    user.length === 0
      ? res.status(404).json({ success: false, message: 'User not found' })
      : res.json({ success: true, message: 'User fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving user' });
  }
};

/**
 * Creates a new user with the provided data.
 * @param req - Express HTTP Request object.
 * @param res - Express HTTP Response object.
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
  const { user_nm, user_lgn_type_cd, eml_addr, user_uid } = req.body;
  if (!user_nm || user_lgn_type_cd === undefined || !eml_addr || !user_uid) {
    res.status(400).json({ success: false, message: 'Missing required user fields.' });
    return;
  }

  if (![LoginType.APPLE, LoginType.GOOGLE, LoginType.KAKAO].includes(user_lgn_type_cd)) {
    res.status(400).json({ success: false, message: 'Invalid login type. Valid types are APPLE=1, GOOGLE=2, KAKAO=3' });
    return;
  }

  try {
    const newUser = await userDao.createUser(req.body);
    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error ctrl createUser}` });
  }
};

/**
 * Updates a user's information by their UID.
 * @param req - Express HTTP Request object.
 * @param res - Express HTTP Response object.
 */
const updateUserByUid = async (req: Request, res: Response): Promise<void> => {
  const uid = req.params.user_uid;
  if (!uid) {
    res.status(400).json({ success: false, message: 'User UID is required for update' });
    return;
  }

  const updates = req.body as IUserUpdates;
  try {
    const updatedUser = await userDao.updateUserByUid(uid, updates);
    updatedUser.length === 0
      ? res.status(404).json({ success: false, message: 'User not found or no updates applied' })
      : res.json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: `Error ctrl updateUserbyUid` });
  }
};

export default {
  getUsers,
  getUserByUid,
  createUser,
  updateUserByUid
};
