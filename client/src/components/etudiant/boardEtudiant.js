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
                <PopAjoutCV class="btnPlus" bouton="+" getIdUtilisateur={this.props.getIdUtilisateur}/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/cv'
                    nbColonne = {7} 
                    nomColonne = {["Date de dépôt", "CV", "Date consultation", "Enseignant consultant", "Commentaire", "Modifier", "Supprimer"]} 
                    post="http://localhost:7146/upload/etudiant/cv"
                    pop={<PopAjoutCV class="btnPlus" bouton="+"/>}
                    getIdUtilisateur={this.props.getIdUtilisateur}/>
                <h3 className="align">Lettres de motivation</h3>
                <PopAjoutLettre class="btnPlus" bouton="+" getIdUtilisateur={this.props.getIdUtilisateur}/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/lettre'
                    nbColonne = {9} 
                    nomColonne = {["Date de dépôt", "Entreprise", "Lettre", "Validé/A refaire", "Date de consultation", "Enseignant consultant", "Commentaire", "Modifier", "Supprimer"]}
                    post="http://localhost:7146/upload/etudiant/lettre"
                    pop={<PopAjoutLettre class="btnPlus" bouton="+"/>}
                    getIdUtilisateur={this.props.getIdUtilisateur}/>
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
                <PopAjoutCandidature class="btnPlus" bouton="+" getIdUtilisateur={this.props.getIdUtilisateur}/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/candidature'
                    nbColonne = {5} 
                    nomColonne = {["n° de candidature", "Entreprise", "Origine de l'offre", "Modifier", "Supprimer"]}
                    post="http://localhost:7146/api/etudiant/candidature"
                    pop={<PopAjoutCandidature class="btnPlus" bouton="+"/>}
                    getIdUtilisateur={this.props.getIdUtilisateur}/>
                <h3 className="align">Entretiens</h3>
                <PopAjoutEntretien class="btnPlus" bouton="+" getIdUtilisateur={this.props.getIdUtilisateur}/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/entretien'
                    nbColonne = {6} 
                    nomColonne = {["Personel", "Entreprise", "Intervenant", "Date", "Modifier", "Supprimer"]}
                    post="http://localhost:7146/api/etudiant/entretien"
                    pop={<PopAjoutEntretien class="btnPlus" bouton="+"/>}
                    getIdUtilisateur={this.props.getIdUtilisateur}/>
                <h3 className="align">Stage</h3>
                <PopAjoutStage class="btnPlus" bouton="+" getIdUtilisateur={this.props.getIdUtilisateur}/>
                <Tableau 
                    chemin = 'http://localhost:7146/api/tableau/stage'
                    nbColonne = {5} 
                    nomColonne = {["Entreprise", "Type de contrat", "Posibilité d'alternance", "Modifier", "Supprimer"]}
                    pop={<PopAjoutStage class="transparent" bouton="+"/>}
                    post="http://localhost:7146/api/etudiant/stage"
                    getIdUtilisateur={this.props.getIdUtilisateur}/>
            </div>
        );
    }
}

class TableauBord extends Component{
    render(){
        return(
            <div >
                <Documents getIdUtilisateur={this.props.getIdUtilisateur}/>
                <RechercheStage getIdUtilisateur={this.props.getIdUtilisateur}/>
            </div>
        );
    }
}

export default TableauBord;