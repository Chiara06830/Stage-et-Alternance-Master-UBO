import React from 'react';
import Tableau from "../general/Tableau";
import "../style/general.css";
import "../style/etudiant.css";

class Documents extends React.Component{
    render(){
        return (
            <div class="tableauBord">
                <h2>Mes documents</h2>
                <h3>CV</h3>
                <Tableau nbColonne = {7} nomColonne = {["Date de dépôt", "CV", "Date consultation", "Enseignant consultant", "Commentaire", "   ", "   "]} />
                <h3>Lettres de motivation</h3>
                <Tableau nbColonne = {9} nomColonne = {["Date de dépôt", "Entreprise", "Lettre", "Validé/A refaire", "Date de consultation", "Enseignant consultant", "Commentaire", "   ", "   "]}/>
            </div>
        );
    }
}

class RechercheStage extends React.Component {
    render(){
        return(
            <div class="tableauBord">
                <h2>Mes recherches de stages</h2>
                <h3>Candidatures</h3>
                <Tableau nbColonne = {5} nomColonne = {["n° de candidature", "Entreprise", "Origine de l'offre", "", ""]}/>
                <h3>Entretiens</h3>
                <Tableau nbColonne = {6} nomColonne = {["Personel", "Entreprise", "Intervenant", "Date", "", ""]}/>
                <h3>Stage</h3>
                <Tableau nbColonne = {5} nomColonne = {["Entreprise", "Type de contrat", "Posibilité d'alternance", "", ""]}/>
            </div>
        );
    }
}

class TableauBord extends React.Component{
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