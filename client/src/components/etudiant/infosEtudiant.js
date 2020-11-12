import React, {Component} from 'react';
import PopAjoutEntreprise from "../popAjoutEntreprise"
import "../../general.css";
import "./etudiant.css";

class InfoPerso extends Component {
    constructor(props){
        super(props);
        this.state = {
            etudiants: [],
            nom : "DURDEN",
            prenom : "Tyler",
            filiere : "ILIADE",
            dateNaissance : "18-12-1963",
            nationalite : "EN",
            alternance : "oui"
        }
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('http://localhost:7146/api/etudiant/info')
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    etudiants: data 
                });
                console.log("Etudiant : ", data);
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
                    <p>Nom : <br/>
                        Prénom : <br/>
                        Filière : <br/>
                        Date de naissance : <br />
                        Nationalité : <br />
                        Candidat à l'alternance : </p>
                </div>
                <div id="info">
                    <p>{this.state.nom}<br/>
                        {this.state.prenom}<br/>
                        {this.state.filiere}<br/>
                        {this.state.dateNaissance}<br />
                        {this.state.nationalite}<br />
                        {this.state.alternance}</p>
                </div><br />
                <button className="btnInfo" type="button" onClick={() => this.props.chargerEtat(5)}>Modifier</button>
            </div>
        );
    }
}


class GestionEntreprise extends Component{
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
                <PopAjoutEntreprise class="btnInfo" bouton="Ajouter une entreprise"/>
            </div>
        );
    }
}

export default class Info extends Component{
    render(){
        return (
            <div id="partieGauche">
                <InfoPerso chargerEtat={this.props.chargerEtat}/>
                <GestionEntreprise chargerEtat={this.props.chargerEtat}/>
            </div>
        );
    }
}