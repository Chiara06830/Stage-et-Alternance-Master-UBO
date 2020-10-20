import React from 'react';
import Tableau from "../general/Tableau";
import "../style/general.css";
import "../style/etudiant.css";
import UsePopup from '../general/PopUp';

class Documents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cv : "",
            lettre : ""
        }
    }

    sauvCV(event){
        this.setState({cv: event.target.value});
    }

    sauvLettre(event){
        this.setState({lettre: event.target.value});
    }

    searchFile(){

    }

    handleCv(){
        console.log("Recuperation CV");
    }
    
    popAddCv(){
    const contenu = 
        <div>
            <input type="text" placeholder="C://" value={this.state.cv} onChange={this.sauvCV()}/>
            <button type="button" onClick={this.searchFile()}>Parcourir</button><br/>
            <p>Seul le format pdf est accepté</p>
        </div>
        return <UsePopup text='Déposer un CV' contenu = {contenu} btnClose = {<button type="button" onClick={this.handleCv()}>valider</button>}/>;
            
    } 

    popAddLettre(){
        const contenu =
            <div>
                <input type="text" placeholder="C://" value={this.state.cv} onChange={this.sauvLettre()}/>
                <button type="button" onClick={this.searchFile()}>Parcourir</button><br/>
                <p>Seul le format pdf est accepté</p>
                <p>Entreprise visée :</p>
                <input type="text" value={this.state.cv}/>
            </div>;
        return <UsePopup text='Déposer une lettre de motivation' contenu = {contenu} btnClose = {<button type="button" onClick={this.handleCv()}>valider</button>}/>;
    }

    render(){
        return (
            <div class="tableauBord">
                <h2>Mes documents</h2>
                <h3>CV</h3>
                {this.popAddCv()}
                <Tableau nbColonne = {7} nomColonne = {["Date de dépôt", "CV", "Date consultation", "Enseignant consultant", "Commentaire", "   ", "   "]} />
                <h3>Lettres de motivation</h3>
                {this.popAddLettre()}
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
                <button type="button">+</button>
                <Tableau nbColonne = {5} nomColonne = {["n° de candidature", "Entreprise", "Origine de l'offre", "", ""]}/>
                <h3>Entretiens</h3>
                <button type="button">+</button>
                <Tableau nbColonne = {6} nomColonne = {["Personel", "Entreprise", "Intervenant", "Date", "", ""]}/>
                <h3>Stage</h3>
                <button type="button">+</button>
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