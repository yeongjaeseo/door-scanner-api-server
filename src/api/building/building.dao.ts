import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IBldg } from './building.model';

/**
 * Retrieves users from the database, optionally filtered by name.
 * @param name - Optional. The name of the user to filter by.
 * @returns A Promise that resolves to an array of IBldg.
 */
const listBuildings = async (bldg_nm?: string): Promise<IBldg[]> => {
  let query = `
                SELECT bldg_id,
                       bldg_sn,
                       rds_sn,
                       sig_cd,
                       emd_cd,
                       lotno_addr,
                       road_nm_addr,
                       bldg_nm,
                       ST_asText(bldg_geom) as wkt,
                       gro_flo_co,
                       und_flo_co,
                       bdtyp_cd,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.BLDG
              `;

  const values: string[] = [];
  if (bldg_nm) {
    query += ` WHERE bldg_nm ILIKE $1`;  // Safe use of parameters
    values.push(`%${bldg_nm}%`);            // Parameters are passed as an array
  }

  try {
    console.log(bldg_nm);
    const result: QueryResult = await db.query(query, values);  // Using parameters safely
    return result.rows as IBldg[];
  } catch (error) {
    console.error(`Error DAO getUsers:`, error);
    throw new Error(`Database operation getUsers failed ${bldg_nm ? 'for bldg_nm: ' + bldg_nm : ''}`);
  }
};

/**
 * Retrieves a Building by bldg_id.
 * @param bldg_id - The bldg_id of the bulding to retrieve building.
 * @returns A Promise that resolves to an array of IBldg.
 */
const getBuildingByBldgid = async (bldg_id: number): Promise<IBldg[]> => {
  const query = `
                SELECT bldg_id,
                       bldg_sn,
                       rds_sn,
                       sig_cd,
                       emd_cd,
                       lotno_addr,
                       road_nm_addr,
                       bldg_nm,
                       ST_asText(bldg_geom) as wkt,
                       gro_flo_co,
                       und_flo_co,
                       bdtyp_cd,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.BLDG
                WHERE  bldg_id = $1 
                `;
  try {
    const result: QueryResult = await db.query(query, [bldg_id]);
    return result.rows as IBldg[];
  } catch (error) {
    console.error('Error DAO getBldgByBldgid:', error);
    throw new Error(`Database operation getBldgByBldgid failed for bldg_id: ${bldg_id}`);
  }
};

/**
 * Retrieves a POI details by bldg_id.
 * @param radius - The bldg_id of the POI to retrieve details.
 * @returns A Promise that resolves to an array of IBldg.
 */
const getBuildingsByRadius = async (x: number, y: number, radius: number, limit: number): Promise<IBldg[]> => {
  const query = `
                SELECT bldg_id,
                       bldg_sn,
                       rds_sn,
                       sig_cd,
                       emd_cd,
                       lotno_addr,
                       road_nm_addr,
                       bldg_nm,
                       ST_X(bldg_geom) AS x,
                       ST_Y(bldg_geom) AS y,
                       gro_flo_co,
                       und_flo_co,
                       bdtyp_cd,
                       crt_dt,
                       mdfcn_dt
                FROM   kor3.BLDG
                WHERE  ST_DWithin(
                        ST_SetSRID(bldg_geom, 4326),
                        ST_SetSRID(ST_MakePoint($1, $2), 4326),
                        $3
                        )
                LIMIT $4
                `;
  const values = [x, y, radius, limit];

  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows as IBldg[];
  } catch (error) {
    console.error('Error DAO getBldgByRadius:', error);
    throw new Error(`Database operation getBldgByRadius failed for values: ${values}`);
  }
};

export default {
  listBuildings,
  getBuildingByBldgid,
  getBuildingsByRadius,
};
