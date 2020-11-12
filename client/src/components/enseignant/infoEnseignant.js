import React, {Component} from 'react';
import PopAjoutEntreprise from '../popAjoutEntreprise';
import "../../general.css";
import "../etudiant/etudiant.css";

class InfoPerso extends Component {
    constructor(props){
        super(props);
        this.state = {
            etudiants: [],
            nom : "DURDEN",
            prenom : "Tyler"
        }
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers() {
        fetch('http://localhost:7146/api/enseigant/info')
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    etudiants: data 
                });
                this.attribution();
            })
            .catch(error => this.setState({ error}));
    }

    attribution(){
        this.setState({numEtudiant : this.state.etudiants['adresse_mail']});
        this.setState({nom : this.state.etudiants['nom_enseignant']});
        this.setState({prenom : this.state.etudiants['prenom_enseignant']});
    }

    render(){
        return(
            <div>
                <h2>Informations personelles</h2>
                <div className="align">
                    <p>Nom : <br/>
                        Prénom : 
                    </p>
                </div>
                <div id="info">
                    <p>{this.state.nom}<br/>
                        {this.state.prenom}
                    </p>
                </div><br />
                <button className="btnInfo" type="button" onClick={() => this.props.chargerEtat(8)}>Modifier</button>
            </div>
        );
    }
}


class GestionEntreprise extends Component{
    render(){
        return (
            <div>
                <h2>Gestion des entreprises</h2>

                <p>
                    Si l'entreprise pour laquelle vous candidatez n'existe pas dans le système, vous devez la rajouter.
                    Son existence peut être vérifier par un enseignant. 
                    S'il l'approuve pas il a le droit de la supprimer du système. 
                    Dans ce cas toutes vos candiatures, vos entretiens et vos stage en lien avec cette entreprise seront supprimé.
                </p>
                <PopAjoutEntreprise class="btnInfo" bouton="Ajouter une entreprise"/>

                <p>
                    Les étudiants peuvent rajouter des entreprises quand elle ne sont pas déjà dans le système.
                    Vous pouvez consulter la liste des entreprises et éventuellement retirer les entreprises si elles ne correspondent pas à vos critères.
                    Dans ce cas les candiatures, entretiens et stage des élèves en lien avec cette entreprise seront supprimés.
                </p>
                <button className="btnInfo" type="button" onClick={() => this.props.chargerEtat(7)}>Consulter la liste des entreprises</button>
            </div>
        );
    }
}

class GestionUser extends Component{
    render(){
        const commun = <div>
                <h2>Gestion des utilisateurs</h2>
                <p>Vous pouvez ajouter des comptes étudiants.</p>
                <button className="btnInfo" type="button" onClick={() => this.props.chargerEtat(6)}>Ajouter un étudiant</button>
            </div>
        if(!this.props.admin){
            return(commun);
        }else {
            return(
                <div>
                    {commun}
                    <button className="btnInfo" type="button">Ajouter un enseignant</button>
                </div>
            );
        }
    }
}

export default class Info extends Component{
    render(){
        return (
            <div id="partieGauche">
                <InfoPerso chargerEtat={this.props.chargerEtat}/>
                <GestionEntreprise chargerEtat={this.props.chargerEtat}/>
                <GestionUser admin={this.props.admin} chargerEtat={this.props.chargerEtat}/>
            </div>
        );
    }
}