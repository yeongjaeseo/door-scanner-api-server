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
  user_id: number;
}