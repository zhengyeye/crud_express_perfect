/**
 * Created by Administrator on 2017-02-14.
 */
// 连接MySql
var mysql = require('mysql');
var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud'
});

function query(sql,callback){
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query( sql, function(err, rows) {
            // And done with the connection.
            callback(err, rows);
            connection.release();       //释放链接
        });
    });
}

exports.query = query;