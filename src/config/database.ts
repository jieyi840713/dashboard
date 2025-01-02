import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 4000
}

const pool = mysql.createPool(dbConfig);

export const getConnection = () => pool;