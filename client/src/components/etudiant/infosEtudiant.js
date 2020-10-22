import React from 'react';
import "../../general.css";
import "./etudiant.css";

class InfoPerso extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            etudiants: [],
            numEtudiant : "e22006666",
            nom : "DURDEN",
            prenom : "Tyler",
            filiere : "ILIADE",
            dateNaissance : "13/06/1979",
            nationalite : "EN",
            alternance : "oui",
        }
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers() {
        fetch(`http://localhost:5000/api/etudiants`)
            .then(response => response.json())
            .then(data =>{
               this.setState({
                    etudiants: data 
                });
                console.log(data);
                this.attribution();
            })
            .catch(error => this.setState({ error}));
    }

    attribution(){
        console.log("Informations étudiant attribuées");
        this.setState({numEtudiant : this.state.etudiants['adresse_mail']});
        this.setState({nom : this.state.etudiants['nom_etudiant']});
        this.setState({prenom : this.state.etudiants['prenom_etudiant']});
        this.setState({filiere : this.state.etudiants['filiere']});
        this.setState({dateNaissance : this.state.etudiants['date_naissance']});
        this.setState({nationalite : this.state.etudiants['nationalite']});
        this.setState({alternance : this.state.etudiants['alternance']});
    }

    render(){
        return(
            <div>
                <h2>Informations personelles</h2>
                <div className="align">
                    <p>Mail : <br/>
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


class GestionEntreprise extends React.Component{
    render(){
        return (
            <div>
                <h2>Ajouter une entreprise</h2>
                <p>
                    Si l'entreprise pour laquelle vous candidatez n'existe pas dans le système, vous devez la rajouter.
                    Son existence peut être vérifier par un enseignant. 
                    S'il l'approuve pas il a le droit de la supprimer du système. 
                    Dans ce cas toutes vos candiatures, vos entretiens et vos stage en lien avec cette entreprise seront supprimé.
                </p>
                <button type="button">Ajouter une entreprise</button>
            </div>
        );
    }
}

class Info extends React.Component{
    render(){
        return (
            <div id="partieGauche">
                <InfoPerso />
                <GestionEntreprise />
            </div>
        );
    }
}

export default Info;