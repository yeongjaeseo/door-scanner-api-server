import db from '../../config/dbConfig';
import { QueryResult } from 'pg';
import { IBldg } from './building.model';

/**
 * Retrieves a list of buildings from the database, optionally filtered by building name.
 * 
 * @param bldg_nm - Optional. The name of the building to filter by.
 * @returns A Promise that resolves to an array of IBldg objects representing buildings.
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
  const values: any[] = [];
  if (bldg_nm) {
    query += ` WHERE bldg_nm ILIKE $1`;
    values.push(`%${bldg_nm}%`);
  }

  try {
    const result: QueryResult = await db.query(query, values);
    return result.rows as IBldg[];
  } catch (error) {
    console.error(`Error at DAO listBuildings:`, error);
    throw new Error(`Database operation listBuildings failed ${bldg_nm ? 'for bldg_nm: ' + bldg_nm : ''}`);
  }
};

/**
 * Retrieves a building by its ID from the database.
 * 
 * @param bldg_id - The ID of the building to retrieve.
 * @returns A Promise that resolves to an array of IBldg objects representing the building.
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
    console.error('Error at DAO getBuildingByBldgid:', error);
    throw new Error(`Database operation getBuildingByBldgid failed for bldg_id: ${bldg_id}`);
  }
};

/**
 * Retrieves buildings within a specified radius based on coordinates.
 * 
 * @param x - The X coordinate.
 * @param y - The Y coordinate.
 * @param radius - The radius within which to find buildings.
 * @param limit - The maximum number of buildings to return.
 * @returns A Promise that resolves to an array of IBldg objects representing buildings.
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
  try {
    const result: QueryResult = await db.query(query, [x, y, radius, limit]);
    return result.rows as IBldg[];
  } catch (error) {
    console.error('Error at DAO getBuildingsByRadius:', error);
    throw new Error(`Database operation getBuildingsByRadius failed for x: ${x}, y: ${y}, radius: ${radius}, limit: ${limit}`);
  }
};

export default {
  listBuildings,
  getBuildingByBldgid,
  getBuildingsByRadius,
};
