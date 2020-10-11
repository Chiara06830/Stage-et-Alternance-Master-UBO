import React from 'react';
import "../style/general.css";
import "../style/etudiant.css";

class Tableau extends React.Component{
    constructor(props){
        super(props);
        this.nbCol = 0;
    }
    createRow(){
        let infos = "";
        for(let i=0; i<this.nbCol-2; i++){
            infos += "<td> </td>";
        }
        infos += "<td/> <img src=\"/img/crayon_376363.png\" alt=\"bouton modifier\" width=\"20\" height=\"20\">";
        infos += "<td/> <img src=\"/img/trash-bin-symbol_318-10194.jpg\" alt=\"bouton modifier\" width=\"20\" height=\"20\">";
        return <tr dangerouslySetInnerHTML={{ __html: infos }}/>; 
    }

    createTable(nbColonne, tab){
        let col = "";
        this.nbCol = nbColonne;
        for(let i=0; i<nbColonne; i++){
            let nom = tab[i];
            col += "<td>" + nom + "</td>";
        }

        return <tr dangerouslySetInnerHTML={{ __html: col }}/>;
    }

    render(){
        return(
            <table>
                {this.createTable(this.props.nbColonne, this.props.nomColonne)}
                {this.createRow()}
            </table>
        );
    }
}

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