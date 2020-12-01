const cors = require('cors');
const express = require('express');
const mysql = require('mysql'); 
const fileUpload = require('express-fileupload');
const fetch = require('node-fetch');
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

    let id = -2;
    
    fetch(`http://localhost:6146/login?email=${email}&password=${password}`)
        .then(res => res.json())    
        .then(result => {
            return res.json({
                data : result.data
            });
        })
        .catch(err =>{if(err) throw err;});
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

    fetch(`http://localhost:6146/inscription/creation/utilisateur?nom=${columns[1]}&prenom=${columns[0]}&password=${columns[6]}&mailUBO=${columns[5]}`)
        .catch(err =>{if(err) throw err;});
    fetch(`http://localhost:6146/inscription/creation/id?mail=${columns[5]}`)
        .then(res => res.json())  
        .then(resun => {
            fetch(`http://localhost:6146/inscription/creation/etudiant?nationalite=${columns[4]}&dateNaissance=${columns[3]}&id=${resun.data}&mail=${columns[2]}`)
                .catch(err =>{if(err) throw err;});
        })
        .catch(err =>{if(err) throw err;});
});

app.post('inscrption/modif/etuidant', (req, res) => {
    //DOIT AJOUTER ID A INSCRPTION QUAND C'EST POSSIBLE
    //FIliere + candidature alternance

    const queryU = "UPDATE UTILISATEUR \
        SET UTILISATEUR.nom_utilisateur = \"" + req.body.nom + "\", \
        UTILISATEUR.prenom_utilisateur = \"" + req.body.prenom + "\", \
        UTILISATEUR.mot_de_passe = \"" + req.body.password + "\", \
        UTILISATEUR.email=\"" + req.body.mailUBO + "\" \
        WHERE UTILISATEUR.id_utilisateur = " + req.body.id;

    const queryE ="UPDATE ETUDIANT\
        SET ETUDIANT.nationalite_fr=" + req.body.nationalite + ", \
        ETUDIANT.date_naissance = DATE(\"" + req.body.dateNaissance + "\") \
        WHERE ETUDIANT.UTILISATEUR_id_utilisateur = " + req.body.id;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryU, (err, result)=> {
            if (err) throw err;
        });
        connection.query(queryE, (err, result)=> {
            if (err) throw err;
        });
    });
});

app.post('inscrption/modif/enseignant', (req, res) => {
    const queryU = "UPDATE UTILISATEUR \
        SET UTILISATEUR.nom_utilisateur = \"" + req.body.nom + "\", \
        UTILISATEUR.prenom_utilisateur = \"" + req.body.prenom + "\", \
        UTILISATEUR.mot_de_passe = \"" + req.body.password + "\", \
        UTILISATEUR.email=\"" + req.body.mailUBO + "\" \
        WHERE UTILISATEUR.id_utilisateur = " + req.body.id;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryU, (err, result)=> {
            if (err) throw err;
        });
    });
});

//-----------Ajout entreprise----------
app.post('/entreprise/ajout', (req, res) =>{
    const query = "INSERT INTO entreprise (`nom_entreprse`, `adresse_entreprise`, `site_web`)\
    VALUES (\"" + req.body.entreprise.nom + "\", \"" + req.body.entreprise.adresse + "\", \"" + req.body.entreprise.site +"\")";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, (err, result)=> {
            if (err) throw err;
        });
    });
});

app.get('/entreprise/liste', (req, res) => {
    let contenu ={};

    let query = "SELECT ENTREPRISE.id_entreprise, ENTREPRISE.nom_entreprse, ENTREPRISE.site_web ,ENTREPRISE.adresse_entreprise\
                FROM ENTREPRISE";

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(query, (err, results)=> {
            if (err) throw err;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "Nom" : results[i].nom_entreprse,
                    "Site web" : results[i].site_web,
                    "Adresse" : results[i].adresse_entreprise,
                }
            }  
            res = res.json(contenu);
        });
    });
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

//-----------Récupérer Candidature Entretien et Stage-----------

app.post('/api/etudiant/candidature', (req, res) =>{
    const queryID = "SELECT entreprise.id_entreprise, etudiant.id_etudiant \
        FROM entreprise, etudiant \
        WHERE entreprise.nom_entreprse = \"" + req.body.candidature.entreprise + "\" \
        AND etudiant.UTILISATEUR_id_utilisateur = " + req.body.candidature.id;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryID, function (error, results, fields){
            if (error) throw error;
            const query = "INSERT INTO candidature (`origine_offre`, `ETUDIANT_id_etudiant`, `ENTREPRISE_id_entreprise`)\
                VALUES (\"" +  req.body.candidature.origine + "\", " + results[0].id_etudiant + ", " + results[0].id_entreprise + ");";
            connection.query(query, function(error, results, fileds){
                if (error) throw error;
            });
        });
    });
});

app.post('/api/etudiant/entretien', (req, res) =>{
    let query = "INSERT INTO ENTRETIEN(`date_entretien`, `est_annulle`)\
        VALUES (DATE(\"" + req.body.date + "\", " + (req.body.candidature === 'on' ? 1 : 0) + ")"

    console.log(req.body.entretien);
    //for(let i=0; i<req.body.length)
});

app.post('/api/etudiant/stage', (req, res) =>{
    const queryID = "SELECT ENTREPRISE.id_entreprise, ETUDIANT.id_etudiant \
        FROM ENTREPRISE, ETUDIANT \
        WHERE ENTREPRISE.nom_entreprse = \"" + req.body.stage.entreprise + "\" \
        AND ETUDIANT.UTILISATEUR_id_utilisateur = " + 1;

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(queryID, function (error, results, fields){
            if (error) throw error;
            const query = "UPDATE ETUDIANT \
                SET ETUDIANT.date_obtention_stage = NOW(), \
                type_contrat = \"" + req.body.stage.contrat + "\", \
                ENTREPRISE_id_entreprise = " + results[0].id_entreprise + " \
                WHERE ETUDIANT.id_etudiant = " + results[0].id_etudiant;
            connection.query(query, function(error, results, fileds){
                if (error) throw error;
            });
        });
    });
});

//-----------Transmettre tableaux page etudiant-----------

app.get('/api/tableau/cv', (req, res) => {
    //FAUT RECTIFIER LA CLEF ETRANGERE ENSEIGNANT.id_enseignant

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

    let query = "SELECT DISTINCT CANDIDATURE.id_candidature, ENTREPRISE.nom_entreprse, CANDIDATURE.origine_offre \
        FROM CANDIDATURE, ENTREPRISE, etudiant, UTILISATEUR \
        WHERE CANDIDATURE.ENTREPRISE_id_entreprise = ENTREPRISE.id_entreprise \
        AND utilisateur.id_utilisateur = " + id;
    
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

    let contenu = {};

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
                contenu[i + ''] = {
                    "Entreprise" : results[i].nom_entreprse,
                    "Type de contrat" : "",
                    "Posibilité d'alternance" : ""
                }
            }
            connection.query(queryEtuidant, function (error, results, fields){
                if (error) throw error;
                for(let i=0; i<results.length; i++){
                    contenu[i]["Type de contrat"] = results[i].type_contrat;
                    contenu[i]["Posibilité d'alternance"] = results[i].alternance === 0 ? "Non" : "Oui";
                }
                res = res.json(contenu);
            });
        });
    });
});

//-------------------------ENSEIGNANT-------------------------//
//-----------Récupération infos perso-----------
app.get('/api/enseigant/info', (req, res) => {
    const {id} = req.query;

    let query = "SELECT UTILISATEUR.email, UTILISATEUR.nom_utilisateur, UTILISATEUR.prenom_utilisateur \
        FROM UTILISATEUR\
        WHERE UTILISATEUR.id_utilisateur = " + id ;

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            let enseignant = {
                adresse_mail : results[0].email,
                nom_enseignant : results[0].nom_utilisateur,
                prenom_enseignant : results[0].prenom_utilisateur
            }
            res = res.json(enseignant);
        });
    });
});

//-----------Transmettre tableaux page endeignant-----------

app.get('/tableau/ensseignant/cv', (req, res) => {
    const contenu = {};

    let query = "SELECT UTILISATEUR.nom_utilisateur, UTILISATEUR.prenom_utilisateur, ETUDIANT.filiere, DOCUMENT.lien\
        FROM UTILISATEUR, ETUDIANT, DOCUMENT, CV\
        WHERE DOCUMENT.ETUDIANT_id_etudiant = ETUDIANT.id_etudiant\
        AND UTILISATEUR.id_utilisateur = ETUDIANT.UTILISATEUR_id_utilisateur\
        AND DOCUMENT.ENSEIGNANT_id_enseignant = 0\
        AND CV.DOCUMENT_id_document = DOCUMENT.id_document";

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "Nom" : results[i].nom_utilisateur,
                    "Prénom" : results[i].prenom_utilisateur,
                    "Filière" : results[i].fliere,
                    "CV" : results[i].lien
                }
            }
            res = res.json(contenu);
        });
    });
});

app.get('/tableau/ensseignant/lettre', (req, res) => {
    const contenu = {};

    let query = "SELECT UTILISATEUR.nom_utilisateur, UTILISATEUR.prenom_utilisateur, ETUDIANT.filiere, DOCUMENT.lien, LETTRE_MOTIVATION.entreprise\
        FROM UTILISATEUR, ETUDIANT, DOCUMENT, LETTRE_MOTIVATION\
        WHERE DOCUMENT.ETUDIANT_id_etudiant = ETUDIANT.id_etudiant\
        AND UTILISATEUR.id_utilisateur = ETUDIANT.UTILISATEUR_id_utilisateur\
        AND DOCUMENT.ENSEIGNANT_id_enseignant = 0\
        AND LETTRE_MOTIVATION.DOCUMENT_id_document = DOCUMENT.id_document";

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "Nom" : results[i].nom_utilisateur,
                    "Prénom" : results[i].prenom_utilisateur,
                    "Filière" : results[i].fliere,
                    "Entreprise" : results[i].lien,
                    "Lettre" : results[i].entreprise
                }
            }
            res = res.json(contenu);
        });
    });
});

app.get('/tableau/ensseignant/historique', (req, res) => {
    const contenu = {};

    let query = "SELECT DOCUMENT.date_consultation, UTILISATEUR.nom_utilisateur, UTILISATEUR.prenom_utilisateur, ETUDIANT.filiere, DOCUMENT.lien, DOCUMENT.id_document \
        FROM DOCUMENT, UTILISATEUR, ETUDIANT \
        INNER JOIN UTILISATEUR prof \
        ON (prof.id_utilisateur = 1) \
        WHERE DOCUMENT.ETUDIANT_id_etudiant = ETUDIANT.id_etudiant \
        AND ETUDIANT.UTILISATEUR_id_utilisateur = UTILISATEUR.id_utilisateur \
        AND DOCUMENT.ENSEIGNANT_id_enseignant != 0 ";

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            for(let i=0; i<results.length; i++){
                contenu['' + i] = {
                    "Date" : results[i].date_consultation,
                    "Nom" : results[i].nom_utilisateur,
                    "Prenom" : results[i].prenom_utilisateur,
                    "Filiere" : results[i].filiere,
                    "CV/Lettre" : "",
                    "Document" : results[i].lien
                }

                let queryLettre = "SELECT LETTRE_MOTIVATION.id_lettre_motivation \
                    FROM LETTRE_MOTIVATION, DOCUMENT \
                    WHERE LETTRE_MOTIVATION.DOCUMENT_id_document = " + results[i].id_document;
                connection.query(queryLettre, function (error, results, fields){
                    if (error) throw error;
                    if(results.length != 0){
                        contenu['' + i]["CV/Lettre"] = "Lettre";
                        res = res.json(contenu);
                    }
                });

                let queryCV = "SELECT CV.id_CV \
                    FROM CV, DOCUMENT \
                    WHERE CV.DOCUMENT_id_document = " + results[i].id_document;
                connection.query(queryCV, function (error, results, fields){
                    if (error) throw error;
                    if(results.length != 0){
                        contenu['' + i]["CV/Lettre"] = "CV";
                        res = res.json(contenu);
                    }
                });
            }
        });
    });
});

//-----------Transmettre les stats page endeignant-----------

app.get('/stats/demandeAlternance', (req, res) => {
    const query = "SELECT COUNT(*) as nbDemandeAlternance\
        FROM ETUDIANT \
        WHERE ETUDIANT.alternance = 1";

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function(error, results, fields) {
            if(error) throw error;
            res = res.json({
                data : results[0].nbDemandeAlternance
            });
        });
    });
});

app.get('/stats/stage', (req, res) => {
    const query = "SELECT COUNT(*) as nbStage\
        FROM ETUDIANT \
        WHERE ETUDIANT.ENTREPRISE_id_entreprise <> 0 ";

    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function(error, results, fields) {
            if(error) throw error;
            res = res.json({
                data : results[0].nbStage
            });
        });
    });
});


//----------LANCEMENT DU SERVEUR-----------//

app.listen(port, () =>{
    console.log(`Server demarrer sur le port ${port}`);
});