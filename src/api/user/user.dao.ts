import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IUser, IUserUpdates } from './user.model';

/**
 * Retrieves users from the database, optionally filtered by their name.
 * @param name - Optional name to filter users by.
 * @returns A Promise that resolves to an array of IUser.
 */
const getUsers = async (name?: string): Promise<IUser[]> => {
  let query = `SELECT user_id, user_group_id, user_nm, user_lgn_type_cd, eml_addr, user_uid, user_group_nm, user_type_cd FROM kor3.USER JOIN kor3.user_group USING (user_group_id)`;
  const values: string[] = [];
  if (name) {
    query += ` WHERE user_nm ILIKE $1`;
    values.push(`%${name}%`);
  }

  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows as IUser[];
  } catch (error) {
    console.error(`Error DAO getUsers:`, error);
    throw new Error(`Database operation getUsers failed ${name ? 'for user name: ' + name : ''}`);
  }
};

/**
 * Retrieves a single user by their UID.
 * @param uid - The UID of the user to retrieve.
 * @returns A Promise that resolves to an array of IUser.
 */
const getUserByUid = async (uid: string): Promise<IUser[]> => {
  const query = `SELECT user_id, user_group_id, user_nm, user_lgn_type_cd, eml_addr, user_uid, user_group_nm, user_type_cd, A.crt_dt, A.mdfcn_dt FROM kor3.USER A JOIN kor3.user_group B using (user_group_id) WHERE user_uid = $1`;
  try {
    const result: QueryResult = await db.query(query, [uid]);
    return result.rows as IUser[];
  } catch (error) {
    console.error('Error DAO getUserByUid:', error);
    throw new Error(`Database operation getUserByUid failed for UID: ${uid}`);
  }
};

/**
 * Creates a new user in the database.
 * @param user - The IUser object to insert into the database.
 * @returns A Promise that resolves to the newly created IUser.
 */
const createUser = async (user: IUser): Promise<IUser> => {
  const query = `INSERT INTO kor3.USER (user_group_id, user_nm, user_lgn_type_cd, eml_addr, user_uid) VALUES (1, $1, $2, $3, $4) returning *`;
  const values = [user.user_nm, user.user_lgn_type_cd, user.eml_addr, user.user_uid];
  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows[0] as IUser; // Assuming the insert returns at least one row
  } catch (error) {
    console.error('Error DAO createUser:', error);
    throw new Error('Database operation createUser failed');
  }
};

/**
 * Updates a user in the database by their UID.
 * @param uid - The UID of the user to update.
 * @param updates - An object with fields to update.
 * @returns A Promise that resolves to an array of updated IUser objects.
 */
const updateUserByUid = async (uid: string, updates: IUserUpdates): Promise<IUser[]> => {
  const setString = Object.keys(updates)
    .filter(key => updates[key] !== undefined)
    .map((key, index) => `"${key}" = $${index + 2}`)
    .join(', ');

  if (!setString) {
    throw new Error('No valid updates provided.');
  }

  const query = `UPDATE kor3.USER SET ${setString}, mdfcn_dt = NOW() WHERE user_uid = $1 returning *`;
  const values = [uid, ...Object.values(updates).filter(value => value !== undefined)];
  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows as IUser[];
  } catch (error) {
    console.error('Error DAO updateUserByUid:', error);
    throw new Error(`Database operation updateUserByUid failed for UID: ${uid}`);
  }
};

export default {
  getUsers,
  getUserByUid,
  createUser,
  updateUserByUid
};
