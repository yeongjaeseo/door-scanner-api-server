// Define interfaces that represent database records and update structures


/**
 * Represents a complete POI record as it appears in the kor3.POI table
 */
export interface IPOI {
  poi_id: number;
  bldg_id: number;
  poi_nm: string;
  lotno_addr: string;
  road_nm_addr: string;
  ctgry_nm: string;
  phone: string;
  origin_id: number;
  origin_cd: string;
  x: number;
  y: number;
}

/**
 * Represents a complete POI record as it appears in the kor3.POI_DTL table
 */
export interface IPOIDtl {
  poi_dt_id: number;
  poi_id: number;
  intg_clct_id: number;
  acsbl_cd: number;
  entrc_data: JSON;
  fclt_data: JSON;
  out_yn: boolean;
  vps_acc: JSON;
  x: number;
  y: number;
}

/**
 * Represents the fields that can be updated in the jangso.USER table
 * Optional fields allow for selective updates
 */
export interface IUserUpdates {
  user_nm?: string;
  user_lgn_type_cd?: string;
  eml_addr?: string;
  user_group_id?: number;
  user_type_cd?: number;
  [key: string]: string | number | undefined;  // Adding an index signature
}


/**
 * Additional structures or utilities related to the User can be defined here
 * Example: UserPayload for creating a new user might omit the user_id and user_uid
 */
export interface IUserPayload {
  user_group_id: number;
  user_nm: string;
  user_lgn_type_cd: string;
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
  user_lgn_type_cd: string;
  eml_addr: string;
  user_uid: string;
  user_group_nm?: string;
  user_type_cd?: number;
}
