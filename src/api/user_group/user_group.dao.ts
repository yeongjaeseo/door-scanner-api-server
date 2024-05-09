import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IUserGroup } from './user_group.model';

/**
 * Retrieves all user groups from the database.
 * @returns A promise that resolves to an array of IUserGroup.
 */
const getAllUserGroup = async (): Promise<IUserGroup[]> => {
  const query = `
                SELECT user_group_id, user_group_nm, user_type_cd, user_group_cd
                FROM   kor3.user_group
                `;
  try {
    const result: QueryResult = await db.query(query);
    return result.rows as IUserGroup[];
  } catch (error) {
    throw new Error('Database operation getAllUserGroup failed');
  }
};

/**
 * Retrieves a single user group by its group code.
 * @param user_group_cd - The group code to search for.
 * @returns A promise that resolves to an array of IUserGroup.
 */
const getUserGroupByGroupCode = async (user_group_cd: string): Promise<IUserGroup[]> => {
  const query = `
                SELECT user_group_id, user_group_nm, user_type_cd, user_group_cd
                FROM   kor3.user_group
                WHERE  user_group_cd ilike $1 
                `;
  try {
    const result: QueryResult = await db.query(query, [user_group_cd]);
    return result.rows as IUserGroup[];
  } catch (error) {
    throw new Error(`Database operation getUserGroupByGroupCode failed for user_group_cd: ${user_group_cd}`);
  }
};

/**
 * Inserts a new user group into the database.
 * @param user_group - The user group data to insert.
 * @returns A promise that resolves to the newly created IUserGroup.
 */
const createUserGroup = async (user_group: IUserGroup): Promise<IUserGroup> => {
  const query = `
  INSERT INTO kor3.USER_GROUP
              (
                up_user_group_id, user_group_nm, user_type_cd, user_group_cd
              )
              VALUES
              (
                $1, $2, $3, $4
              )
              returning *
  `;

  const values = [
    user_group.up_user_group_id, user_group.user_group_nm, user_group.user_type_cd, user_group.user_group_cd
  ];

  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows[0] as IUserGroup; // Assuming the insert returns at least one row
  } catch (error) {
    throw new Error('Database operation createUserGroup failed');
  }
};

export default {
  getAllUserGroup,
  getUserGroupByGroupCode,
  createUserGroup,
};
