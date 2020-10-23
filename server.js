const cors = require('cors');
const express = require('express');
const app = express();
const port = 7146;

const mysql = require('mysql');  

let connection = mysql.createConnection({
    host     : 'obiwan2.univ-brest.fr',
    user     : 'zrelevach',
    password : 'tq494ej8',
    database : 'zil3-zrelevach'
});


app.use(cors());
app.get('/api/etudiants', (req, res) => {
    console.log("passage");

    const etudiants =
        {"adresse_mail" : 'jean.dupont@etudiant.univ-brest.fr', 
        "nom_etudiant" : "Dupont", 
        "prenom_etudiant" : "Jean", 
        "filiere" : "ILIADE",
        "date_naissance" : "12-05-2000",
        "nationalite" : "FR",
        "alternance" : "oui"}
    ;

    /*connection.connect();
    let userId = 1;

    let query ='SELECT ETUDIANT.adresse_mail, UTILISATEUR.nom_utilisateur as nom_etudiant, UTILISATEUR.prenom_utilisateur as prenom_etudiant, ETUDIANT.filiere, ETUDIANT.date_naissance, ETUDIANT.nationalite_fr, ETUDIANT.alternance\
                FROM ETUDIANT, UTILISATEUR\
                WHERE UTILISATEUR.id_utilisateur = ETUDIANT.UTILISATEUR_id_utilisateur AND ETUDIANT.id_etudiant = ?';


    connection.query(query, [userId], function (error, results, fields) {
        if (error) throw error;
        console.log('le resultat de la requête est : ', results[0]);
        res = res.json(etudiant);
    });*/

    res = res.json(etudiants);
});

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});