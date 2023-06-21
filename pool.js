import mysql from "mysql2";

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",

    database: "academia",
    waitForConnections: true, //tempo de conexão
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;