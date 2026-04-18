import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class ServiceAreasService {
	async getAllAreas() {
		const query = `
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(
          json_build_object(
            'type', 'Feature',
            'geometry', ST_AsGeoJSON(geom)::json,
            'properties', json_build_object(
              'id', id,
              'name', name
            )
          )
        )
      ) AS geojson
      FROM service_areas;
    `;

		const result = await pool.query(query);
		return result.rows[0].geojson;
	}

	async getPolesInArea(id: number) {
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
    JOIN service_areas s
      ON ST_Within(p.geom, s.geom)
    WHERE s.id = $1;
  `;

		const result = await pool.query(query, [id]);
		return result.rows[0].geojson;
	}
}
