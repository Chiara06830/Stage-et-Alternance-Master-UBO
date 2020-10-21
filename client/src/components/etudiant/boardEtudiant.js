import React from 'react';
import Tableau from "../../Tableau";
import "../../general.css";
import "./etudiant.css";
import PopAjoutEntretien from './PopUps/popAjoutEntretien';
import PopAjoutCV from './PopUps/popAjoutCv';
import PopAjoutLettre from './PopUps/popAjoutLettre';
import PopAjoutCandidature from'./PopUps/popAjoutCandidature';
import PopAjoutStage from './PopUps/popAjoutStage';


class Documents extends React.Component{
    //------------- Rendu -------------//

    render(){
        return (
            <div class="tableauBord">
                <h2>Mes documents</h2>
                <h3>CV</h3>
                <PopAjoutCV/>
                <Tableau nbColonne = {7} nomColonne = {["Date de dépôt", "CV", "Date consultation", "Enseignant consultant", "Commentaire", "   ", "   "]} />
                <h3>Lettres de motivation</h3>
                <PopAjoutLettre/>
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
                <PopAjoutCandidature />
                <Tableau nbColonne = {5} nomColonne = {["n° de candidature", "Entreprise", "Origine de l'offre", "", ""]}/>
                <h3>Entretiens</h3>
                <PopAjoutEntretien />
                <Tableau nbColonne = {6} nomColonne = {["Personel", "Entreprise", "Intervenant", "Date", "", ""]}/>
                <h3>Stage</h3>
                <PopAjoutStage />
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