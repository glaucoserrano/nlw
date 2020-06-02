import knex from 'knex';
import path from 'path';

const connection = knex({
   client: 'mssql',
   connection: {
      host : 'localhost',
      user : 'sa',
      password : '123456',
      database : 'database'
   },
);

export default connection;