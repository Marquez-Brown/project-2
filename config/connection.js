// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "klhdql7w0dteckro",
  password: "u92dm7fpkkn30b1g",
  database: "vyzbnqr99at6wtua"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;