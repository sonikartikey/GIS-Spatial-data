import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class LinesService {
	async getAllLines() {
		const query = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geom)::json,
            'properties', json_build_object(
              'id', id,
              'name', name,
              'type', type
            )
          )
        )
      ) AS geojson
      FROM lines;
    `;

		const result = await pool.query(query);
		return result.rows[0].geojson;
	}

	async getNearbyPoles(id: number) {
		const query = `
    SELECT json_build_object(
      'type', 'FeatureCollection',
      'features', json_agg(
        json_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(p.geom)::json,
          'properties', json_build_object(
            'id', p.id,
            'name', p.name
          )
        )
      )
    ) AS geojson
    FROM poles p
    JOIN lines l
      ON ST_DWithin(p.geom, l.geom, 0.01)
    WHERE l.id = $1;
  `;

		const result = await pool.query(query, [id]);
		return result.rows[0].geojson;
	}
}
