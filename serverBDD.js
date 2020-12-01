const cors = require('cors');
const express = require('express');
const app = express();
const port = 6146;

const mysql = require('mysql');  

const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'motdepasse',
    database : 'test'
});


app.use(cors());

//-------------------------GENERAL-------------------------//

//-----------Identification-----------
app.get('/login', (req, res) => {
    const {email, password} = req.query;

    let query =`SELECT UTILISATEUR.id_utilisateur
                FROM UTILISATEUR 
                WHERE UTILISATEUR.email = "${email}"
                AND UTILISATEUR.mot_de_passe = "${password}"`;

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            if(results.length != 0){
                let id = results[0].id_utilisateur
                console.log("ID user : " + id);
                return res.json({
                    data : id
                });
            }else{
                return res.json({
                    data : -1
                });
            }
        });
    });
});

//-----------Inscription-----------

app.get('/inscription/creation/utilisateur', (req, res) => {
    const {nom, prenom, password, mailUBO} = req.query;

    let query = "INSERT INTO UTILISATEUR (`nom_utilisateur`, `prenom_utilisateur`, `mot_de_passe`, `email`) \
        VALUES(\"" + nom + "\",\
        \"" + prenom + "\",\
        \"" + password + "\", \
        \"" + mailUBO + "\")";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, (err, result)=> {
            if (err) throw err;
        });
    });
});

app.get('/inscription/creation/id', (req, res) => {
    const {mail} = req.query;

    let queryID = "SELECT UTILISATEUR.id_utilisateur FROM UTILISATEUR WHERE UTILISATEUR.email = \"" + mail + "\"";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryID, (err, result) => {
            if (err) throw err;
            id = result[0].id_utilisateur;
            return res.json({
                data : id
            });
        });
    });
});

app.get('/inscription/creation/etudiant', (req, res) => {
    const {nationalite, dateNaissance, id, mail} = req.query;

    let natio = nationalite === "francaise"? 1 : 0;
    let queryAddEtud = "INSERT INTO ETUDIANT(`nationalite_fr`, `date_naissance`, `UTILISATEUR_id_utilisateur`, `alternance`, `email_perso`)\
        VALUES (" + natio + ",\
        DATE(\"" + dateNaissance + "\"),\
        " + id + ",\
        0, \
        \"" + mail +"\")";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryAddEtud, (err, result)=> {
            if (err) throw err;
        });
    });
});

//----------LANCEMENT DU SERVEUR-----------//

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});