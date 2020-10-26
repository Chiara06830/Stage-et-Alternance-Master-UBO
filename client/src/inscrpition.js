import React, {Component} from 'react';
import Connexion from './index';
import "./general.css";

class Saisie extends Component{
    render(){
        return (
            <div>
                <label>{this.props.text}</label><br/>
                <input type="text" name={this.props.name}/>
            </div>
        );
    }
}

class Inscription extends Component{
    constructor(props){
        super(props);
        this.state = {
            page : 3
        }
    }
    
    handleSubmit() {
        fetch('http://localhost:7146/login')
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    page: data['page']
                });
            })
            .catch(error => this.setState({ error}));
    }

    render(){
        if(this.state.page === 3){
            return (
                <div >
                    <h2 className="centre">Inscription</h2>
                    <form action="http://localhost:7146/inscription/creation" method="POST">
                        <div className="align">
                            <h3>Informations personelles</h3>
                            <Saisie text="Prénom *" name="prenom"/>
                            <Saisie text="Nom *" name="nom"/>
                            <Saisie text="Adresse mail (personelle)" name="mail"/>
                            <label>Date de naissance *</label><br/>
                            <input type="date" name="dateNaissance"/><br/>
                            <label>Nationalité *</label><br/>
                            <select>
                                <option>Française</option>
                                <option>Autre</option>
                            </select>
                        </div>
                        <div>
                            <h3>Informations de connexion</h3>
                            <Saisie text="Identifiant (adresse mail UBO) *" name="mailUBO"/>
                            <label>Mot de passe</label><br/>
                            <input type="password" name="password"/>
                            <p className="soustexte">Doit obligatoirement contenir 8 caractères comprenant lettres, chiffres et caractère spéciaux</p>
                            <label>Confirmation du mot de passe</label><br/>
                            <input type="password" name="passwordVerif"/><br/>
                            <input type="checkbox" id="infoMail" name="infoMail"/> <label htmlFor="infoMail">J'autorise l'application à m'informer par mail</label> <br/>
                            <input type="checkbox" id="exact" name="exact"/> <label htmlFor="exact">Je certifie sur l'honneur l'exactitude des renseignements fournis</label>
                        </div>
                        <button type="submit" onClick={() => this.handleSubmit()}>Créer le compte</button>
                    </form>

                    <p>Les champs * sont obligatoire</p>
                    <form action="http://localhost:7146/retourLogin" method="POST">
                        <button className="lien" type="submit" onClick={() => this.handleSubmit()}>Se connecter</button>
                    </form>
                    
                </div>
            );
        }else{
            return (
                <Connexion/>
            );
        }
        
    }
}

export default Inscription;