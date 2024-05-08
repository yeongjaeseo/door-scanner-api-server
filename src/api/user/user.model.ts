// Define interfaces that represent database records and update structures

/**
 * Utility types or enums can enhance readability and prevent common errors
 * Example: User login types could be defined as an enum
 */
export enum LoginType {
  APPLE = 1,
  GOOGLE = 2,
  KAKAO = 3
}

/**
 * Represents a complete user record as it appears in the jangso.USER table
 */
export interface IUser {
  user_id: number;
  user_group_id: number;
  user_nm: string;
  user_lgn_type_cd: LoginType;
  eml_addr: string;
  user_uid: string;           // Assuming 'user_uid' is a unique identifier like a UUID
  user_group_nm?: string;     // Optional fields should be marked as such if they can be null
  user_type_cd?: number;
}

/**
 * Represents the fields that can be updated in the jangso.USER table
 * Optional fields allow for selective updates
 */
export interface IUserUpdates {
  user_nm?: string;
  user_lgn_type_cd?: LoginType;
  eml_addr?: string;
  user_group_id?: number;
  [key: string]: string | number | undefined;  // Adding an index signature
}


/**
 * Additional structures or utilities related to the User can be defined here
 * Example: UserPayload for creating a new user might omit the user_id and user_uid
 */
export interface IUserPayload {
  user_group_id: number;
  user_nm: string;
  user_lgn_type_cd: LoginType;
  eml_addr: string;
  user_type_cd?: number;
}

/**
 * Example of using enums in interfaces
 */
export interface IUserWithEnums {
  user_id: number;
  user_group_id: number;
  user_nm: string;
  user_lgn_type_cd: LoginType;
  eml_addr: string;
  user_uid: string;
  user_group_nm?: string;
  user_type_cd?: number;
}
