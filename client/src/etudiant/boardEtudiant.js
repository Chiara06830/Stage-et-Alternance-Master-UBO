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
        //this.setState({cv: event.target.value});
    }

    sauvLettre(event){
        //this.setState({lettre: event.target.value});
    }

    searchFile(){

    }

    handleCv(){
        console.log("Recuperation CV");
    }

    handleLettre(){

    }
    
    popAddCv(){
    const contenu = 
        <div>
            <form onSubmit={this.handleCv}>
                <input type="text" placeholder="C://" value={this.state.cv} onChange={this.sauvCV}/>
                <button type="button" onClick={this.searchFile()}>Parcourir</button><br/>
                <p>Seul le format pdf est accepté</p>
                <button type="submit">valider</button>
            </form>
            
        </div>
        return <UsePopup text='Déposer un CV' contenu = {contenu}/>;
            
    } 

    popAddLettre(){
        const contenu =
            <div>
                <form onSubmit={this.handleLettre}>
                    <input type="text" placeholder="C://" value={this.state.cv} onChange={this.sauvLettre()}/>
                    <button type="button" onClick={this.searchFile()}>Parcourir</button><br/>
                    <p>Seul le format pdf est accepté</p>
                    <p>Entreprise visée :</p>
                    <input type="text" value={this.state.cv}/>
                    <button type="submit">Valider</button>
                </form>
            </div>;
        return <UsePopup text='Déposer une lettre de motivation' contenu = {contenu}/>;
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
    constructor(props){
        super(props);
        this.state = {
            entrepriseCandidature : "",
            sourceCandidature : ""
        }
    }

    sauvEntrepriseCandidature(event){/*this.setState({entrepriseCandidature : event.target.value})*/};
    sauvSourceCandidature(event){/*this.setState({sourceCandidature : event.target.value})*/};

    handleCandidature(){

    }

    popCreerCandidature(){
        const contenu = 
                <form onSubmit={this.handleCandidature}>
                    <p>Entreprise</p>
                    <input type="text" value={this.state.entrepriseCandidature} onChange={this.sauvEntrepriseCandidature}/>
                    <a href="">Si l'entreprise n'existe pas, ajouter l'entreprise</a>
                    <p>origine de l'offre</p>
                    <form>
                        <select>
                            <option>Carrier center</option>
                            <option>Site web</option>
                            <option>Autre</option>
                        </select>
                    </form>
                    <p>Si autre, précisez</p>
                    <input type="text" value={this.state.sourceCandidature} onChange={this.sauvSourceCandidature()}/>
                    <button type="submit">Valider</button>
                </form>
        return <UsePopup text='Créer une candidature' contenu={contenu}/>
    }

    popCreerEntretien(){
        const contenu = {
            
        }
    }

    render(){
        return(
            <div class="tableauBord">
                <h2>Mes recherches de stages</h2>
                <h3>Candidatures</h3>
                {this.popCreerCandidature()}
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