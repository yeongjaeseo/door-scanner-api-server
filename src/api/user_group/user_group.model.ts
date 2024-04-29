// Define interfaces that represent database records and update structures


/**
 * Represents a complete user record as it appears in the jangso.USER table
 */
export interface IUserGroup {
  user_group_id: number;
  user_group_nm: string;
  user_type_cd: number;
  user_group_cd: string;
}



/**
 * Additional structures or utilities related to the User can be defined here
 * Example: UserPayload for creating a new user might omit the user_id and user_uid
 */
export interface IUserGroupPayload {
  user_group_id: number;
  user_group_nm: string;
  user_type_cd: number;
  user_group_cd: string;
}

/**
 * Example of using enums in interfaces
 */
export interface IUserGroupWithEnums {
  user_group_id: number;
  user_group_nm: string;
  user_type_cd: number;
  user_group_cd: string;
}
