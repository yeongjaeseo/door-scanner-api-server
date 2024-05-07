import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IPOI } from './collect.model';

/**
 * Retrieves users from the database, optionally filtered by name.
 * @param name - Optional. The name of the user to filter by.
 * @returns A Promise that resolves to an array of IPOI.
 */
const getPOI = async (name?: string): Promise<IPOI[]> => {
  let query = `
                SELECT user_id,
                       user_group_id,
                       user_nm,
                       user_lgn_type_cd,
                       eml_addr,
                       user_uid,
                       user_group_nm,
                       user_type_cd
                FROM   kor3.USER
                JOIN   kor3.user_group USING (user_group_id)
              `;

  const values: string[] = [];

  if (name) {
    query += ` WHERE user_nm ILIKE $1`;  // Safe use of parameters
    values.push(`%${name}%`);            // Parameters are passed as an array
  }

  try {
    const result: QueryResult = await db.query(query, values);  // Using parameters safely
    return result.rows as IPOI[];
  } catch (error) {
    console.error(`Error DAO getUsers:`, error);
    throw new Error(`Database operation getUsers failed ${name ? 'for user name: ' + name : ''}`);
  }
};

/**
 * Retrieves a POIs by bldg_id.
 * @param bldg_id - The bldg_id of the bulding to retrieve POI.
 * @returns A Promise that resolves to an array of IPOI.
 */
const getPOIByBldgid = async (bldg_id: number): Promise<IPOI[]> => {
  const query = `
                SELECT poi_id,
                       bldg_id,
                       poi_nm,
                       lotno_addr,
                       road_nm_addr,
                       ctgry_nm,
                       phone,
                       origin_id,
                       orgin_cd,
                       poi_geom,
                       crt,dt
                       mdfcn,dt
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
const getPOIDtlByPOIid = async (poi_id: number): Promise<IPOI[]> => {
  const query = `
                SELECT poi_dtl_id,
                       poi_id,
                       intg_clct_id,
                       acsbl_cd,
                       entrc_geom,
                       entrc_data,
                       flct_id,
                       out_yn,
                       vps_acc,
                       crt_dt,
                       mdfcn,dt
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
  getPOI,
  getPOIByBldgid,
  getPOIDtlByPOIid,
};
