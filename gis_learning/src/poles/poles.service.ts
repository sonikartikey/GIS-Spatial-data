import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class PolesService {
	async getAllPoles() {
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
              'status', status
            )
          )
        )
      ) AS geojson
      FROM poles;
    `;

		const result = await pool.query(query);
		return result.rows[0].geojson;
	}

	async getPolesByBbox(
		minLng: number,
		minLat: number,
		maxLng: number,
		maxLat: number,
	) {
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
              'status', status
            )
          )
        ),
        '[]'::json
      )
    ) AS geojson
    FROM poles
    WHERE ST_Intersects(
      geom,
      ST_MakeEnvelope($1, $2, $3, $4, 4326)
    );
  `;

		const result = await pool.query(query, [
			minLng,
			minLat,
			maxLng,
			maxLat,
		]);
		return result.rows[0].geojson;
	}
}
