const http = require("http");
const mysql = require('mysql');
const host = 'localhost';
const port = 8100;



const connexion = mysql.createConnection({

   host: "localhost",

   user: "root",

   password: "motdepasse",

   database : "test"

 });

  connexion.connect((err)=> {

   if (err) throw err;

   console.log("Connecté à la base de données MariaDB!");

   connexion.query("SELECT * FROM entreprise", (err, result)=> {

       if (err) throw err;

       console.log(result);

     });

 });
 const requestListener =  (req, res)=> {
     res.writeHead(200);
     let resultat ="";
     connexion.connect((err)=> {

      if (err) throw err;

      console.log("Connecté à la base de données MariaDB!");

      connexion.query("SELECT count(*) FROM entreprise", (err, result)=> {

          if (err) throw err;

          console.log(result);
          resultat = result;

        });

    });
     res.end("<h1>" + resultat + "</h1>");
 };
 const server = http.createServer(requestListener);
 server.listen(port, host, () => {
     console.log(`Server is running on http:${host}:${port}`);
 });
