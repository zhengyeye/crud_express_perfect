/**
 * Created by Administrator on 2016/3/27.
 */
// 连接MySql
var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : '192.168.20.132',
    user     : 'root',
    password : 'root',
    database:"test"
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