const cors = require('cors');
const express = require('express');
const mysql = require('mysql'); 
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const app = express();
const port = 7146;

const pool = mysql.createPool({
    connectionLimit : 10,
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
            }
        });
    });
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
        VALUES(\"" + columns[1] + "\",\
        \"" + columns[0] + "\",\
        \"" + columns[6] + "\", \
        \"" + columns[5] + "\")";

    let queryID = "SELECT UTILISATEUR.id_utilisateur FROM UTILISATEUR WHERE UTILISATEUR.email = \"" + columns[5] + "\"";

    let natio = columns[4] === "francaise"? 1 : 0;
    let queryAddEtud = "";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, (err, result)=> {
            if (err) throw err;
        });
        connection.query(queryID, (err, result) => {
            if (err) throw err;
            id = result[0].id_utilisateur;
            queryAddEtud = "INSERT INTO ETUDIANT(`nationalite_fr`, `date_naissance`, `UTILISATEUR_id_utilisateur`, `alternance`, `email_perso`)\
                VALUES (" + natio + ",\
                DATE(\"" + columns[3] + "\"),\
                " + result[0].id_utilisateur + ",\
                0, \
                \"" + columns[2] +"\")";
            connection.query(queryAddEtud, (err, result) => {
                if(err) throw err;
            });
        });
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

    const {id} = req.query;

    if(id > 0){
        let query ='SELECT UTILISATEUR.email, UTILISATEUR.nom_utilisateur as nom_etudiant, UTILISATEUR.prenom_utilisateur as prenom_etudiant, ETUDIANT.filiere, ETUDIANT.date_naissance, ETUDIANT.nationalite_fr, ETUDIANT.alternance\
                FROM ETUDIANT, UTILISATEUR\
                WHERE utilisateur.id_utilisateur = ' + id;

        pool.getConnection(function (err, connection) {
            if(err) throw err;
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                etudiants = {
                    adresse_mail : results[0].email,
                    nom_etudiant : results[0].nom_etudiant,
                    prenom_etudiant : results[0].prenom_etudiant,
                    filiere : results[0].filiere,
                    date_naissance : results[0].date_naissance.toISOString().split("T")[0],
                    nationalite : results[0].nationalite_fr === 1 ? "Francaise" : "Non Francaise",
                    alternance : results[0].alternance === 1 ? "Oui" : "Non"
                }
                return res.json(etudiants);
            });
        });
    }
});

//-----------Récupération CV et Lettre-----------
app.post('/upload/etudiant/cv', (res, req) =>{
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
});

//-----------Récupérer Candidature Entretien et Stage-----------

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
    /*const {id} = req.query;

    let contenu = {};

    let query = "SELECT DOCUMENT.date_depot, DOCUMENT.lien, DOCUMENT.date_consultation, UTILISATEUR.nom_utilisateur, UTILISATEUR.prenom_utilisateur, DOCUMENT.commentaire \
        FROM DOCUMENT, UTILISATEUR, ETUDIANT \
        WHERE DOCUMENT.ETUDIANT_id_etudiant = ETUDIANT.id_etudiant AND ETUDIANT.UTILISATEUR_id_utilisateur = " + id + " \
        AND DOCUMENT.ENSEIGNANT_id_enseignant = ENSEIGNANT.id_enseignant\
        AND UTILISATEUR.id_utilisateur = ENSEIGNANT.UTILISATEUR_id_utilisateur";
    
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, function (error, results, fields){
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "Date de dépôt" : results[i].date_depot.toISOString().split("T")[0],
                    "CV" : results[i].lien,
                    "Date consultation" : results[i].date_consultation.toISOString().split("T")[0],
                    "Enseignant consultant" : results[i].nom_utilisateur + " " + results[i].prenom_utilisateur,
                    "Commentaire" : results[i].commentaire
                }
            }
            res = res.json(contenu);
        });
    });*/
});

app.get('/api/tableau/lettre', (req, res) => {
    const contenu ={};

    res = res.json(contenu);
});

app.get('/api/tableau/candidature', (req, res) => {
    const {id} = req.query;

    let contenu = {};

    let query = "SELECT CANDIDATURE.id_candidature, ENTREPRISE.nom_entreprse, CANDIDATURE.origine_offre\
        FROM CANDIDATURE, ENTREPRISE, ETUDIANT\
        WHERE CANDIDATURE.ETUDIANT_id_etudiant = " + id + " AND CANDIDATURE.ENTREPRISE_id_entreprise = ENTREPRISE.id_entreprise ";
    
        pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, function (error, results, fields){
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "n° de candidature" : results[i].id_candidature,
                    "Entreprise" : results[i].nom_entreprse,
                    "Origine de l'offre" : results[i].origine_offre
                }
            }
            res = res.json(contenu);
        });
    });
});

app.get('/api/tableau/entretien', (req, res) => {
    const {id} = req.query;

    let contenu = {};

    let query = "SELECT ENTREPRISE.nom_entreprse, INTERVENANT.nom_intervenant,INTERVENANT.prenom_intervenant, ENTRETIEN.date_entretien\
        FROM ENTRETIEN, ENTREPRISE, INTERVENANT \
        WHERE ENTRETIEN.ETUDIANT_id_etudiant = " + id + " AND ENTRETIEN.INTERVENANT_id_intervanant = INTERVENANT.id_intervanant AND INTERVENANT.ENTREPRISE_id_entreprise = ENTREPRISE.id_entreprise";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, function (error, results, fields){
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "Personel" : "Oui",
                    "Entreprise" : results[i].nom_entreprse,
                    "Intervenant" : results[i].nom_intervenant + " " + results[i].prenom_intervenant,
                    "Date" : results[i].date_entretien.toISOString().split("T")[0]
                }
            }
            res = res.json(contenu);
        });
    });
});

app.get('/api/tableau/stage', (req, res) => {
    const {id} = req.query;

    let contenu = {
        0 : {
        Entreprise : "",
        "Type de contrat" : "",
        "Posibilité d'alternance" : ""}
    };

    let queryEntreprise = "SELECT ENTREPRISE.id_entreprise, ENTREPRISE.nom_entreprse, ENTREPRISE.site_web ,ENTREPRISE.adresse_entreprise\
                FROM ENTREPRISE, ETUDIANT\
                WHERE ETUDIANT.ENTREPRISE_id_entreprise = ENTREPRISE.id_entreprise \
                AND ETUDIANT.id_etudiant = " + id;

    let queryEtuidant = "SELECT ETUDIANT.type_contrat, ETUDIANT.alternance FROM ETUDIANT WHERE ETUDIANT.id_etudiant = " + id;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryEntreprise, function (error, results, fields){
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu[0]["Entreprise"] = results[i].nom_entreprse;
            }
            connection.query(queryEtuidant, function (error, results, fields){
                if (error) throw error;
                for(let i=0; i<results.length; i++){
                    contenu[0]["Type de contrat"] = results[i].type_contrat;
                    contenu[0]["Posibilité d'alternance"] = results[i].alternance === 0 ? "Non" : "Oui";
                }
                res = res.json(contenu);
            });
        });
    });
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