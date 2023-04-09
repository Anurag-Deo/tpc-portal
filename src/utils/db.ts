var mysql      = require('mysql');

export function connectToSql(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'tpc'
  });
  connection.connect();
  return connection;
}

export function disconnect(connection: any) {
  connection.end();
}

