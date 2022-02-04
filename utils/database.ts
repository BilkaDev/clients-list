
import * as mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: '31.170.167.1',
    user: 'u661936104_bilkadev',
    database: 'u661936104_hosting',
    password: '12345678aA',
    namedPlaceholders: true,
});


