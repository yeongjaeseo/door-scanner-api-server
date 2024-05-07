import userDao from './user.dao';
import { Request, Response } from "express";
import { IUser, IUserUpdates, LoginType } from './user.model';

/**
 * Get all users or users by name if a name query parameter is provided.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
      const name = typeof req.query.name === 'string' ? req.query.name : undefined;
      console.log(req);
      const users = await userDao.getUsers(name);

      if (users.length === 0) {
          res.status(404).json({ success: false, message: 'No users found' });
          return;
      }

      res.json({ success: true, message: 'Users retrieved successfully', data: users });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving users' });
  }
};

const getUserByUid = async (req: Request, res: Response): Promise<void> => {
  const uid = req.params.user_uid;
  if (!uid) {
    res.status(400).json({ success: false, message: 'User UID is required' });
    return;
  }
  try {
    const user = await userDao.getUserByUid(uid);
    if (user.length === 0) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, message: 'User fetched successfully', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl getUserbyUID' });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  // Extract data from request body
  const { user_nm, user_lgn_type_cd, eml_addr, user_uid } = req.body;

  console.log(req.body);

  // Validate the incoming request
  if (!user_nm || user_lgn_type_cd === undefined || !eml_addr || !user_uid) {
    res.status(400).json({ success: false, message: 'Missing required user fields. user fields(user_nm, user_lgn_type_cd, eml_addr, user_uid) are required' });
    return;
  }

  // Check for the correct type of user_lgn_type_cd, assuming it should be a valid enum number
  if (![LoginType.APPLE, LoginType.GOOGLE, LoginType.KAKAO].includes(user_lgn_type_cd)) {
    res.status(400).json({ success: false, message: 'Invalid user_lgn_type_cd. APPLE=1, GOOGLE=2, KAKAO=3' });
    return;
  }

  try {
    const newUser: IUser = await userDao.createUser(req.body);
    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error) {
    if (error instanceof Error) {
      // Specific error handling or logging
      console.error('Error creating user:', error.message);
      res.status(500).json({ success: false, message: `Error creating user: ${error.message}` });
    }
  }
};


const updateUserByUid = async (req: Request, res: Response): Promise<void> => {
  const uid = req.params.user_uid;
  if (!uid) {
    res.status(400).json({ success: false, message: 'User UID is required for update' });
    return;
  }

  const updates: IUserUpdates = req.body;
  try {
    const isUpdated = await userDao.updateUserByUid(uid, updates);
    if (!isUpdated) {
      res.status(404).json({ success: false, message: 'User not found or no update applied' });
      return;
    }
    res.json({ success: true, message: 'User updated successfully', data: isUpdated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error ctrl updateUserbyUid' });
  }
};

export default {
  getUsers,
  getUserByUid,
  createUser,
  updateUserByUid,
};
