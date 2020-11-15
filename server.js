const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const port = 7146;

const mysql = require('mysql');  

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'motdepasse',
    database : 'test'
});


app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
    

//-------------------------GENERAL-------------------------//

//-----------Identification-----------
let idUser = -1;
app.post('/login', (req, res) => {
    
    let columns = [req.body.infos.email, req.body.infos.password];

    let query ='SELECT UTILISATEUR.id_utilisateur\
                FROM UTILISATEUR \
                WHERE UTILISATEUR.email = \"' + columns[0] + '\" \
                AND UTILISATEUR.mot_de_passe = \"' + columns[1] + '\"';

    connection.connect();

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        if(results.length != 0){
            idUser = results[0].id_utilisateur;
        }
    });

    console.log(idUser);
});

//-----------Inscription-----------

app.post('/inscription/creation', (req, res) => {
    let columns = [req.body.etudiant.prenom, 
        req.body.etudiant.nom, 
        req.body.etudiant.mailPerso, 
        req.body.etudiant.dateNaissance, 
        req.body.etudiant.nationalite,
        req.body.etudiant.mailUBO, 
        req.body.etudiant.password];

    let query = "INSERT INTO UTILISATEUR (`nom_utilisateur`, `prenom_utilisateur`, `mot_de_passe`, `email`) \
        VALUES(\"" + columns[1] + "\", \"" + columns[0] + "\",\
        \"" + columns[6] + "\", \
        \"" + columns[5] + "\")";

    connection.connect();

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
    });
});

app.post('/inscrption/ajout/exterieur', (req, res) => {
    console.log(req.body);
});

app.post('inscrption/modif/etuidant', (req, res) => {
    console.log(req.body);
});

app.post('inscrption/modif/enseignant', (req, res) => {
    console.log(req.body);
});

//-----------Ajout entreprise----------
app.post('/entreprise/ajout', (req, res) =>{
    console.log(req.body);
});

app.get('/entreprise/liste', (req, res) => {
    let contenu ={};

    let query = "SELECT ENTREPRISE.id_entreprise, ENTREPRISE.nom_entreprse, ENTREPRISE.site_web ,ENTREPRISE.adresse_entreprise\
                FROM ENTREPRISE, ETUDIANT\
                WHERE ETUDIANT.ENTREPRISE_id_entreprise = ENTREPRISE.id_entreprise \
                AND ETUDIANT.id_etudiant = " + idUser;

    connection.connect();

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(results);  
        contenu = results; 
    });

    res = res.json(contenu);
});

app.post('/api/entretien/liste', (req, res) => {
    console.log(req.body);
});

//-------------------------ETUDIANT-------------------------//

//-----------Récupération infos perso-----------

app.get('/api/etudiant/info', (req, res) => {
    let etudiants;

    connection.connect();

    let query ='SELECT UTILISATEUR.email, UTILISATEUR.nom_utilisateur as nom_etudiant, UTILISATEUR.prenom_utilisateur as prenom_etudiant, ETUDIANT.filiere, ETUDIANT.date_naissance, ETUDIANT.nationalite_fr, ETUDIANT.alternance\
                FROM ETUDIANT, UTILISATEUR\
                WHERE UTILISATEUR.id_utilisateur = ETUDIANT.UTILISATEUR_id_utilisateur AND ETUDIANT.id_etudiant = ' + idUser;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        etudiants = results[0];
    });

    res = res.json(etudiants);
});

//-----------Récupération CV et Lettre-----------
/*app.post('/upload/etudiant/cv', (res, req) =>{
    console.log(req.body);
    if(req.files === null){ //si on essaie de récuperer rien du tout
        return res.statusCode(400).json({msg : 'Auncun fihcier chargé'});
    }

    const file = req.files.cv;

    file.mv(`${__dirname}/client/public/uploads/cv/${file.name}`, err =>{
        if(err){
            console.error(err);
            return res.statusCode(500).send(err);
        }

        res.json({fileName: file.name, filePath: `/uploads/cv/${file.name}`})
    });
});

app.post('/upload/etudiant/lettre', (res, req) =>{
    if(req.files === null){ //si on essaie de récuperer rien du tout
        return res.statusCode(400).json({msg : 'Auncun fihcier chargé'});
    }

    const file = req.files.lettre;

    file.mv(`${__dirname}/client/public/uploads/cv/${file.name}`, err =>{
        if(err){
            console.error(err);
            return res.statusCode(500).send(err);
        }

        res.json({fileName: file.name, filePath: `/uploads/cv/${file.name}`})
    });
});*/

//-----------Récupération Candidature Entretien et Stage-----------

app.post('/api/etudiant/candidature', (req, res) =>{
    console.log(req.body);
});

app.post('/api/etudiant/entretien', (req, res) =>{
    console.log(req.body);
});

app.post('/api/etudiant/stage', (req, res) =>{
    console.log(req.body);
});

//-----------Transmettre tableaux page etudiant-----------

app.get('/api/tableau/cv', (req, res) => {
    const contenu ={
        0:{"id" : 12, "Date de dépôt" : "prout", "CV" : "woop", "Date consultation": "pilou", "Enseignant consultant" : "pata", "Commentaire" : "pouet"}
    };

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
        0:{"id" : 46, "Entreprise":"prout", "Type de contrat":"pouet", "Posibilité d'alternance": "woop"},
        1:{"id" : 25, "Entreprise":"prout", "Type de contrat":"pouet", "Posibilité d'alternance": "woop"}
    };

    res = res.json(contenu);
});

//-------------------------ENSEIGNANT-------------------------//
//-----------Récupération infos perso-----------
app.get('/api/enseigant/info', (req, res) => {
    const enseignant = {
        adresse_mail : "laurence.duval@univ-brest.fr",
        nom_enseignant : "Duval",
        prenom_enseignant : "Laurence"
    }

    res = res.json(enseignant);
});

//-----------Transmettre tableaux page endeignant-----------

app.get('/tableau/ensseignant/cv', (req, res) => {
    const contenu ={
        0:{"Nom":"prout", "Prénom":"pouet", "Filière": "woop", "Entreprise": "poop", "Lettre" : "boop", "Traiter": ""}
    };

    res = res.json(contenu);
});

app.get('/tableau/ensseignant/lettre', (req, res) => {
    const contenu = {}

    res = res.json(contenu);
});

app.get('/tableau/ensseignant/historique', (req, res) => {
    const contenu = {}

    res = res.json(contenu);
});

//----------LANCEMENT DU SERVEUR-----------//

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});