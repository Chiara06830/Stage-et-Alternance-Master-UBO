const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

const mysql = require('mysql');  

    /*let connection = mysql.createConnection({
        host     : 'obiwan2.univ-brest.fr',
        user     : 'zrelevach',
        password : 'tq494ej8',
        database : 'zil3-zrelevach'
    });

    connection.connect();*/
app.use(cors());
app.get('/api/etudiants', (req, res) => {
    
    /*
    let query = 'SELECT ETUDIANT.adresse_mail, UTILISATEUR.nom_utilisateur as nom_etudiant, UTILISATEUR.prenom_utilisateur as prenom_etudiant, ETUDIANT.filiere\
            FROM ETUDIANT, UTILISATEUR\
            WHERE UTILISATEUR.id_utilisateur = ETUDIANT.UTILISATEUR_id_utilisateur \
            AND ETUDIANT.id_etudiant = 1';

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('le resultat de la requête est : ', results[0].valeur);
    });

    connection.end();*/

    const etudiants =
        {"adresse_mail" : 'jean.dupont@etudiant.univ-brest.fr', 
        "nom_etudiant" : "Dupont", 
        "prenom_etudiant" : "Jean", 
        "filiere" : "ILIADE",
        "date_naissance" : "12-05-2000",
        "nationalite" : "EN",
        "alternance" : "oui"}
    ;

    res = res.json(etudiants);
});

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});