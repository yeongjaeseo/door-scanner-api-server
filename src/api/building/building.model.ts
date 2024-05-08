// Define interfaces that represent database records and update structures


/**
 * Represents a complete POI record as it appears in the kor3.POI table
 */
export interface IBldg {
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