/**
 * Interface defining the structure of a POI object.
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
* Interface defining the structure of a POI Detail object.
*/
export interface IPOIDtl {
  poi_dtl_id: number;
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
