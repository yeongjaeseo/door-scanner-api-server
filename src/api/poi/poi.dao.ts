import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IPOI } from './poi.model';

/**
 * Retrieves users from the database, optionally filtered by name.
 * @param poi_nm - Optional. The poi_nm of the user to filter by.
 * @returns A Promise that resolves to an array of IPOI.
 */
const listPOIs = async (poi_nm?: string): Promise<IPOI[]> => {
  let query = `
                SELECT poi_id,
                       bldg_id,
                       poi_nm,
                       lotno_addr,
                       road_nm_addr,
                       ctgry_nm,
                       phone,
                       origin_id,
                       origin_cd,
                       ST_X(poi_geom) as x,
                       ST_Y(poi_geom) as y,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.POI
              `;

  const values: string[] = [];

  if (poi_nm) {
    query += ` WHERE poi_nm ILIKE $1`;  // Safe use of parameters
    values.push(`%${poi_nm}%`);            // Parameters are passed as an array
  }

  try {
    const result: QueryResult = await db.query(query, values);  // Using parameters safely
    return result.rows as IPOI[];
  } catch (error) {
    console.error(`Error DAO listPoi:`, error);
    throw new Error(`Database operation  listPoi failed ${poi_nm ? 'for poi_nm: ' + poi_nm : ''}`);
  }
};

/**
 * Retrieves a POI by poi_id.
 * @param poi_id - The poi_id to retrieve POI.
 * @returns A Promise that resolves to an array of IPOI.
 */
const getPOIByPOIid = async (poi_id: number): Promise<IPOI[]> => {
  const query = `
                SELECT poi_id,
                       bldg_id,
                       poi_nm,
                       lotno_addr,
                       road_nm_addr,
                       ctgry_nm,
                       phone,
                       origin_id,
                       origin_cd,
                       ST_X(poi_geom) as x,
                       ST_Y(poi_geom) as y,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.POI
                WHERE  poi_id = $1 
                `;
  try {
    const result: QueryResult = await db.query(query, [poi_id]);
    return result.rows as IPOI[];
  } catch (error) {
    console.error('Error DAO getPOIByBldgid:', error);
    throw new Error(`Database operation getPOIByPOIid failed for poi_id: ${poi_id}`);
  }
};


/**
 * Retrieves a POIs by bldg_id.
 * @param bldg_id - The bldg_id of the bulding to retrieve POI.
 * @returns A Promise that resolves to an array of IPOI.
 */
const getPOIsByBldgid = async (bldg_id: number): Promise<IPOI[]> => {
  const query = `
                SELECT poi_id,
                       bldg_id,
                       poi_nm,
                       lotno_addr,
                       road_nm_addr,
                       ctgry_nm,
                       phone,
                       origin_id,
                       origin_cd,
                       ST_X(poi_geom) as x,
                       ST_Y(poi_geom) as y,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.POI
                WHERE  bldg_id = $1 
                `;
  try {
    const result: QueryResult = await db.query(query, [bldg_id]);
    return result.rows as IPOI[];
  } catch (error) {
    console.error('Error DAO getPOIByBldgid:', error);
    throw new Error(`Database operation getPOIByBldgid failed for bldg_id: ${bldg_id}`);
  }
};

/**
 * Retrieves a POI details by poi_id.
 * @param poi_id - The poi_id of the POI to retrieve details.
 * @returns A Promise that resolves to an array of IPOI.
 */
const getPOIDtlsByPOIid = async (poi_id: number): Promise<IPOI[]> => {
  const query = `
                SELECT poi_dtl_id,
                       poi_id,
                       user_id,
                       acsbl_cd,
                       ST_X(entrc_geom) as x,
                       ST_Y(entrc_geom) as y,
                       entrc_data,
                       fclt_data,
                       out_yn,
                       vps_acc,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.POI_DTL
                WHERE  poi_id = $1 
                `;
  try {
    const result: QueryResult = await db.query(query, [poi_id]);
    return result.rows as IPOI[];
  } catch (error) {
    console.error('Error DAO getPOIDtlByPOIid:', error);
    throw new Error(`Database operation getPOIDtlByPOIid failed for bldg_id: ${poi_id}`);
  }
};



export default {
  listPOIs,
  getPOIByPOIid,
  getPOIsByBldgid,
  getPOIDtlsByPOIid,
};
