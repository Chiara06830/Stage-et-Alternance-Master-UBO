import React from 'react';
import "../style/general.css";
import "../style/etudiant.css";

class InfoPerso extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numEtudiant : "e22006666",
            nom : "DURDEN",
            prenom : "Tyler",
            filiere : "ILIADE",
            dateNaissance : "12/06/1979",
            nationalite : "EN",
            alternance : "oui",
        }
        this.chargerInfoPerso();
    }

    chargerInfoPerso = () =>{
        this.setState({numEtudiant : "e00000000"});
    }

    render(){
        return(
            <div>
                <h2>Informations personelles</h2>
                <div class="align">
                    <p>Numéro étudiant : <br/>
                        Nom : <br/>
                        Prénom : <br/>
                        Filière : <br/>
                        Date de naissance : <br />
                        Nationalité : <br />
                        Candidat à l'alternance : </p>
                </div>
                <div id="info">
                    <p>{this.state.numEtudiant}<br/>
                        {this.state.nom}<br/>
                        {this.state.prenom}<br/>
                        {this.state.filiere}<br/>
                        {this.state.dateNaissance}<br />
                        {this.state.nationalite}<br />
                        {this.state.alternance}</p>
                </div><br />
                <button type="button">Modifier</button>
            </div>
        );
    }
}

class TableauEtudiant extends React.Component {
    render(){
        return(
            <div id="partieGauche">
                <InfoPerso />
            </div>
        );
    }
}

export default TableauEtudiant;