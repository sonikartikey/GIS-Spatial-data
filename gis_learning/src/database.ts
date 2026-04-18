import { Pool } from 'pg';

export const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'gis_learning',
	password: 'Chaand@2305',
	port: 5435,
});
