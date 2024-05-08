import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IUserGroup } from './user_group.model';

/**
 * Retrieves all user_group from the database.
 * @returns A Promise that resolves to an array of IUserGroup.
 */
const getAllUserGroup = async (): Promise<IUserGroup[]> => {
  const query = `
                SELECT user_group_id,
                       user_group_nm,
                       user_type_cd,
                       user_group_cd
                FROM   kor3.user_group
                `;

  try {
    const result: QueryResult = await db.query(query);
    return result.rows as IUserGroup[];
  } catch (error) {
    console.error('Error DAO getAllUsers:', error);
    throw new Error('Database operation getAllUserGroup failed');
  }
};

/**
 * Retrieves a single user_group by group code.
 * @param user_group_cd - The user_group_cd of the user_group to retrieve.
 * @returns A Promise that resolves to an array of IUser.
 */
const getUserGroupByGroupCode = async (user_group_cd: string): Promise<IUserGroup[]> => {
  const query = `
                SELECT user_group_id,
                       user_group_nm,
                       user_type_cd,
                       user_group_cd
                FROM   kor3.user_group
                WHERE  user_group_cd ilike $1 
                `;
  try {
    const result: QueryResult = await db.query(query, [user_group_cd]);
    console.log(result);
    return result.rows as IUserGroup[];
  } catch (error) {
    console.error('Error DAO getUserByUid:', error);
    throw new Error(`Database operation getUserGroupByGroupCode failed for user_group_cd: ${user_group_cd}`);
  }
};

/**
 * Creates a new user_group in the database.
 * @param user_group - The IUserGroup object to insert into the database.
 * @returns A Promise that resolves to the newly created IUserGroup.
 */
const createUserGroup = async (user_group: IUserGroup): Promise<IUserGroup> => {
  const query = `
  INSERT INTO kor3.USER_GROUP
              (
                up_user_group_id,
                user_group_nm,
                user_type_cd,
                user_group_cd
              )
              VALUES
              (
                          $1,
                          $2,
                          $3,
                          $4
              )
              returning *
  `;

  const values = [
    user_group.up_user_group_id,
    user_group.user_group_nm,
    user_group.user_type_cd,
    user_group.user_group_cd
  ];
  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows[0] as IUserGroup; // Assuming the insert returns at least one row
  } catch (error) {
    console.error('Error DAO createUserGroup:', error);
    throw new Error('Database operation createUser failed');
  }
};

export default {
  getAllUserGroup,
  getUserGroupByGroupCode,
  createUserGroup,
};