import React, {Component} from 'react';
import "../general.css";

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

export default class Inscription extends Component{
    constructor(props){
        super(props);
        this.state = {
            password:'',
            passwordVerif : ''
        }
    }

    sauvPassword(event){this.setState({password : event.target.value})}
    sauvPassVerif(event){this.setState({passwordVerif : event.target.value})}

    secuMotDePasse(){
        const password = this.state.password;
        
        let maj = false;
        for(let i=0; i<password.length; i++){
            if(password.charAt(i).toUpperCase() === password.charAt(i)){
                maj = true;
            }
        }

        let spe = false;
        let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\';,/{}|\":<>\?]/);
        if(pattern.test(password)){
            spe = true;
        }

        if(password.length > 0){
            if(password.length > 8 && maj && spe){
                return(<label className="soustexte bon"> Sécurité : Bonne </label>);
            }else if(maj || spe || password.length > 8){
                return(<label className="soustexte moyen"> Sécurité : Moyenne </label>);
            }else {
                return(<label className="soustexte mauvais"> Sécurité : Mauvaise </label>);
            }
        } 
    }

    verifMotDePasse(){
        const password = this.state.password;
        const verif = this.state.passwordVerif;

        if(verif.length > 0 && password != verif){
            return(<label className="soustexte mauvais"> Les mots de passe ne sont pas identiques </label>);
        }else{
            return(<label></label>);
        }
    }

    render(){
        if(this.props.enseignant){
            return (
                <div className="centre element">
                    <h2 >{this.props.titre}</h2>
                    <form action={this.props.envoie} method="POST">
                        <div className="">
                            <div className=" gauche perso align">
                                <h3>Informations personelles</h3>
                                <Saisie text="Prénom *" name="prenom"/>
                                <Saisie text="Nom *" name="nom"/>
                            </div>
                            <div className="gauche">
                                <h3>Informations de connexion</h3>
                                <Saisie text="Identifiant (adresse mail UBO) *" name="mailUBO"/>
                                <label>Mot de passe *</label><br/>
                                <input type="password" value={this.state.password} onChange={(event) => this.sauvPassword(event)} name="password"/>
                                {this.secuMotDePasse()}<br/>
                                <p className="soustexte">Doit obligatoirement contenir 8 caractères comprenant lettres, chiffres et caractère spéciaux</p>
                                <label>Confirmation du mot de passe *</label><br/>
                                <input type="password" value={this.state.passwordVerif} onChange={(event) => this.sauvPassVerif(event)} name="passwordVerif"/><br/>
                                {this.verifMotDePasse()}
                            </div>
                        </div>
                        <input type="checkbox" id="infoMail" name="infoMail"/> <label htmlFor="infoMail">J'autorise l'application à m'informer par mail</label> <br/>
                        <input type="checkbox" id="exact" name="exact"/> <label htmlFor="exact">Je certifie sur l'honneur l'exactitude des renseignements fournis *</label><br/>
                        <button type="submit" onClick={() => this.props.chargerEtat(this.props.chemin)}>{this.props.retour}</button>
                    </form>

                    <p>Les champs * sont obligatoire</p>
                    <button className="lien" type="button" onClick={() => this.props.chargerEtat(this.props.chemin)}>{this.props.retour}</button>
                    </div>
                );
        }else{
            return (
                <div className="centre element">
                    <h2 >{this.props.titre}</h2>
                    <form action={this.props.envoie} method="POST">
                        <div className="display">
                            <div className="align gauche perso">
                                <h3>Informations personelles</h3>
                                <Saisie text="Prénom *" name="prenom"/>
                                <Saisie text="Nom *" name="nom"/>
                                <Saisie text="Adresse mail (personelle)" name="mail"/>
                                <label>Date de naissance *</label><br/>
                                <input type="date" name="dateNaissance"/><br/>
                                <label>Nationalité *</label><br/>
                                <select name="nationalite">
                                    <option>Française</option>
                                    <option>Autre</option>
                                    </select>
                                </div>
                                <div className="gauche">
                                    <h3>Informations de connexion</h3>
                                    <Saisie text="Identifiant (adresse mail UBO) *" name="mailUBO"/>
                                    <label>Mot de passe *</label><br/>
                                    <input type="password" value={this.state.password} onChange={(event) => this.sauvPassword(event)} name="password"/>
                                    {this.secuMotDePasse()}<br/>
                                    <p className="soustexte">Doit obligatoirement contenir 8 caractères comprenant lettres, chiffres et caractère spéciaux</p>
                                    <label>Confirmation du mot de passe *</label><br/>
                                    <input type="password" value={this.state.passwordVerif} onChange={(event) => this.sauvPassVerif(event)} name="passwordVerif"/><br/>
                                    {this.verifMotDePasse()}
                                </div>
                            </div>
                            <input type="checkbox" id="infoMail" name="infoMail"/> <label htmlFor="infoMail">J'autorise l'application à m'informer par mail</label> <br/>
                            <input type="checkbox" id="exact" name="exact"/> <label htmlFor="exact">Je certifie sur l'honneur l'exactitude des renseignements fournis *</label><br/>
                            <button type="submit" onClick={() => this.props.chargerEtat(this.props.chemin)}>{this.props.validation}</button>
                        </form>

                        <p>Les champs * sont obligatoire</p>
                        <button className="lien" type="button" onClick={() => this.props.chargerEtat(this.props.chemin)}>{this.props.retour}</button>
                    </div>
                );
            }
    }
}