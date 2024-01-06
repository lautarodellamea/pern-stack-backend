import pg from 'pg'

export const pool = new pg.Pool({
  port: 5433,
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'tasksdb',
})

// el pool tiene eventos, por ejemplo cuando se conecta
pool.on('connect', () => {
  console.log('Database connected')
})
