import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// dotenv.config();

const dbConfig = {
    host: '10.140.0.2',
    user: 'root',
    password: '123456',
    database: 'dashboard',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}

const pool = mysql.createPool(dbConfig);


export const getConnection = () => pool;
