import { Injectable } from '@nestjs/common';
import { pool } from '../database';

@Injectable()
export class NetworkService {
	async traceNetwork(startNodeId: number) {
		const visitedNodes = new Set<number>();
		const visitedEdges = new Set<number>();

		const queue: number[] = [startNodeId];

		while (queue.length > 0) {
			const currentNode = queue.shift();

			if (!currentNode || visitedNodes.has(currentNode)) continue;

			visitedNodes.add(currentNode);

			const result = await pool.query(
				`
        SELECT id, from_node, to_node
        FROM edges
        WHERE from_node = $1 OR to_node = $1
        `,
				[currentNode],
			);

			for (const edge of result.rows) {
				visitedEdges.add(edge.id);

				const nextNode =
					edge.from_node === currentNode
						? edge.to_node
						: edge.from_node;

				if (!visitedNodes.has(nextNode)) {
					queue.push(nextNode);
				}
			}
		}

		const nodesGeo = await pool.query(
			`
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
      FROM nodes
      WHERE id = ANY($1)
      `,
			[Array.from(visitedNodes)],
		);

		const edgesGeo = await pool.query(
			`
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
      FROM edges
      WHERE id = ANY($1)
      `,
			[Array.from(visitedEdges)],
		);

		return {
			nodes: nodesGeo.rows[0].geojson,
			edges: edgesGeo.rows[0].geojson,
		};
	}
}
