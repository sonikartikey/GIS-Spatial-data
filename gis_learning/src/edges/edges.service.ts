import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class EdgesService {
	async getAllEdges() {
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
                'name', name,
                'from_node', from_node,
                'to_node', to_node
              )
            )
          ),
          '[]'::json
        )
      ) AS geojson
      FROM edges;
    `;

		const result = await pool.query(query);
		return result.rows[0].geojson;
	}
}
