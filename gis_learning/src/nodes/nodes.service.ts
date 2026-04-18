import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class NodesService {
	async getAllNodes() {
		const query = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', COALESCE(
          json_agg(
            json_build_object(
              'type', 'Feature',
              'geometry', ST_AsGeoJSON(geom)::json,
              'properties', json_build_object(
                'id', id,
                'name', name
              )
            )
          ),
          '[]'::json
        )
      ) AS geojson
      FROM nodes;
    `;

		const result = await pool.query(query);
		return result.rows[0].geojson;
	}
}
