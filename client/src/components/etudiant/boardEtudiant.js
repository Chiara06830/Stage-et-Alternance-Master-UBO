import React, {Component} from 'react';
import Tableau from "../../utilitaires/Tableau";
import "../../general.css";
import "./etudiant.css";
import PopAjoutEntretien from './PopUps/popAjoutEntretien';
import PopAjoutCV from './PopUps/popAjoutCv';
import PopAjoutLettre from './PopUps/popAjoutLettre';
import PopAjoutCandidature from'./PopUps/popAjoutCandidature';
import PopAjoutStage from './PopUps/popAjoutStage';


class Documents extends Component{
    render(){
        return (
            <div className="tableauBord">
                <h2>Mes documents</h2>
                <h3 className="align">CV</h3>
                <PopAjoutCV/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/cv'
                    nbColonne = {7} 
                    nomColonne = {["Date de dépôt", "CV", "Date consultation", "Enseignant consultant", "Commentaire", "Modifier", "Supprimer"]} />
                <h3 className="align">Lettres de motivation</h3>
                <PopAjoutLettre/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/lettre'
                    nbColonne = {9} 
                    nomColonne = {["Date de dépôt", "Entreprise", "Lettre", "Validé/A refaire", "Date de consultation", "Enseignant consultant", "Commentaire", "Modifier", "Supprimer"]}/>
            </div>
        );
    }
}

class RechercheStage extends Component {
    render(){
        return(
            <div className="tableauBord">
                <h2>Mes recherches de stages</h2>
                <h3 className="align">Candidatures</h3>
                <PopAjoutCandidature />
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/candidature'
                    nbColonne = {5} 
                    nomColonne = {["n° de candidature", "Entreprise", "Origine de l'offre", "Modifier", "Supprimer"]}/>
                <h3 className="align">Entretiens</h3>
                <PopAjoutEntretien />
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/entretien'
                    nbColonne = {6} 
                    nomColonne = {["Personel", "Entreprise", "Intervenant", "Date", "Modifier", "Supprimer"]}/>
                <h3 className="align">Stage</h3>
                <PopAjoutStage />
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/stage'
                    nbColonne = {5} 
                    nomColonne = {["Entreprise", "Type de contrat", "Posibilité d'alternance", "Modifier", "Supprimer"]}/>
            </div>
        );
    }
}

class TableauBord extends Component{
    render(){
        return(
            <div >
                <Documents />
                <RechercheStage/>
            </div>
        );
    }
}

export default TableauBord;