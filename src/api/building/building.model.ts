/**
 * Represents a building as it appears in the database schema.
 * This interface is used to ensure type safety and to define the structure of building data throughout the application.
 */
export interface IBldg {
  bldg_id: number;
  bldg_sn: string;
  rds_sn: string;
  sig_cd: string;
  emd_cd: string;
  lotno_addr: string;
  road_nm_addr: string;
  bldg_nm: string;
  wkt: string; // Well-Known Text representation of the building geometry
  gro_flo_co: number;
  und_flo_co: number;
  bdtyp_cd: string;
  crt_dt: Date;
  mdfcn_dt: Date;
}
