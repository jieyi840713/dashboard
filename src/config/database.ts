import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// dotenv.config();

const dbConfig = {
    host: 'localhost',
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
