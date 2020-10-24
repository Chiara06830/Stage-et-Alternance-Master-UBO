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

//-----------Infos page etudiant-----------

app.get('/api/etudiants', (req, res) => {
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

//-----------Tableaux page etudiant-----------

app.get('/api/tableau/cv', (req, res) => {
    const contenu ={};

    res = res.json(contenu);
});

app.get('/api/tableau/lettre', (req, res) => {
    const contenu ={};

    res = res.json(contenu);
});

app.get('/api/tableau/candidature', (req, res) => {
    const contenu ={};

    res = res.json(contenu);
});

app.get('/api/tableau/entretien', (req, res) => {
    const contenu ={};

    res = res.json(contenu);
});

app.get('/api/tableau/stage', (req, res) => {
    const contenu ={
        0:{"Entreprise":"prout", "Type de contrat":"pouet", "Posibilité d'alternance": "woop"},
        1:{"Entreprise":"prout", "Type de contrat":"pouet", "Posibilité d'alternance": "woop"}
    };

    res = res.json(contenu);
});


//-----------lancement du serveur-----------

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});