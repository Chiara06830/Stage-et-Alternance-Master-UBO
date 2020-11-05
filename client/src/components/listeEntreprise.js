import React, { Component } from 'react';
import Tableau from '../utilitaires/Tableau';

export default class ListeEntreprise extends Component{
    render(){
        return(
            <div className="element">
                <h2 className="align">Liste des entreprises</h2>
                <form action="http://localhost:7146/retourEnseignant" method="POST">
                    <button className="transparent droite" type="submit">
                    <img src="/img/689672_arrows_512x512.png" alt="bouton modifier" width="20" height="20"/>
                    </button>
                </form>
                <Tableau 
                    chemin="http://localhost:7146/entreprise/liste"
                    nbColonne={4}
                    nomColonne={["Nom", "Site web", "Adresse", "Supprimer"]}
                    post="http://localhost:7146/api/entretien/liste"
                />
            </div>
        );
    }
}