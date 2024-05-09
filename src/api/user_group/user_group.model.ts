/**
 * Represents a complete user group record as it appears in the database.
 */
export interface IUserGroup {
  user_group_id: number;
  up_user_group_id: number;
  user_group_nm: string;
  user_type_cd: number;
  user_group_cd: string;
}

/**
 * Structure for creating a new user group.
 */
export interface IUserGroupPayload {
  up_user_group_id: number;
  user_group_nm: string;
  user_type_cd: number;
  user_group_cd: string;
}
