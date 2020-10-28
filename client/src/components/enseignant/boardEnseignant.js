import React, {Component} from 'react';
import Tableau from "../../utilitaires/Tableau";
import "../../general.css";
import "../etudiant/etudiant.css";


class Documents extends Component{
    render(){
        return (
            <div className="tableauBord">
                <h2>Documents à traiter</h2>
                <h3 className="align">CV étudiants</h3>
                <Tableau 
                    chemin = 'http://localhost:7146/tableau/ensseignant/cv'
                    nbColonne = {5} 
                    nomColonne = {["Nom", "Prénom", "Filière", "CV", "Traiter"]} />
                <h3 className="align">Lettres de motivations étudiants</h3>
                <Tableau 
                    chemin = 'http://localhost:7146/tableau/enseignant/lettre'
                    nbColonne = {6} 
                    nomColonne = {["Nom", "Prénom", "Filière", "Entreprise", "Lettre", "Traiter"]}/>
            </div>
        );
    }
}



class TableauBord extends Component{
    render(){
        return(
            <div >
                <Documents />
            </div>
        );
    }
}

export default TableauBord;