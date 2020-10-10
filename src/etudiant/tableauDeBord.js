import React from 'react';
import "../style/general.css";
import "../style/etudiant.css";

class Tableau extends React.Component{
    createColonnes(nbColonne, tab){
        let col = "";
        for(let i=0; i<nbColonne; i++){
            let nom = tab[i];
            col += "<td>" + nom + "</td>";
        }
        return <tr dangerouslySetInnerHTML={{ __html: col }}/>;
        ;
    }

    render(){
        return(
            <table>
                {this.createColonnes(this.props.nbColonne, this.props.nomColonne)}
            </table>
        );
    }
}

class Documents extends React.Component{
    render(){
        return (
            <div>
                <h2>Mes documents</h2>
                <h3>CV</h3>
                <Tableau nbColonne = {7} nomColonne = {["Date de dépôt", "CV", "Date consultation", "Enseignant consultant", "Commentaire", "", ""]} />
                <h3>Lettres de motivation</h3>
                <Tableau nbColonne = {9} nomColonne = {["Date de dépôt", "Entreprise", "Lettre", "Validé/A refaire", "Date de consultation", "Enseignant consultant", "Commentaire", "", ""]}/>
            </div>
        );
    }
}

class TableauBord extends React.Component{
    render(){
        return(
            <div id="case" class="tableauBord">
                <Documents />
            </div>
        );
    }
}

export default TableauBord;