const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
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
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//-------------------------GENERAl-------------------------//

//-----------Identification-----------
let page = 0; //0: connexion, 1: etudiant, 2:enseignant, 3: inscrption, 4:admin, 5:modif inscrtion
let idUser = -1;
app.post('/login', (req, res) => {
    //******TO DO****** 
    //<Attribuer idUser>
    
    if(req.body.email.match(/^.*@etudiant.univ-brest.fr$/)){
        page = 1;
    }else if(req.body.email.match(/^.*@univ-brest.fr$/)){
        page = 2;
    }else if(req.body.email.match("admin")){
        page = 4;
    }
});

app.get('/login', (req, res) =>{
    res = res.json({"page" : page});
});

app.post('/retourLogin', (req, res) =>{
    page = 0;
});

app.post('/retourEtudiant', (req, res) =>{
    page = 1;
});

//-----------Inscription-----------
app.post('/inscription', (req, res) => {
    page = 3;
});

app.post('/inscription/modif', (req, res) => {
    page = 5;
});

app.post('/inscription/creation', (req, res) => {
    console.log(req.body);
    page = 0;
});

//-----------Ajout entreprise----------
app.post('/entreprise/ajout', (req, res) =>{
    console.log(req.body);
    page = 1;
});

//-------------------------ETUDIANT-------------------------//

//-----------Récupération infos perso-----------

app.get('/api/etudiant/info', (req, res) => {
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

//-----------Récupération CV et Lettre-----------
app.post('/upload/etudiant/cv', (res, req) =>{
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
});

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
        0:{"Date de dépôt" : "prout", "CV" : "woop", "Date consultation": "pilou", "Enseignant consultant" : "pata", "Commentaire" : "pouet"}
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
        0:{"Entreprise":"prout", "Type de contrat":"pouet", "Posibilité d'alternance": "woop"},
        1:{"Entreprise":"prout", "Type de contrat":"pouet", "Posibilité d'alternance": "woop"}
    };

    res = res.json(contenu);
});

//-------------------------ENSEIGNANT-------------------------//
app.get('/api/enseigant/info', (req, res) => {
    const enseignant = {
        adresse_mail : "laurence.duval@univ-brest.fr",
        nom_enseignant : "Duval",
        prenom_enseignant : "Laurence"
    }

    res = res.json(enseignant);
});

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

//-----------lancement du serveur-----------

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});