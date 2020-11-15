import React, {Component} from 'react';
import "../general.css";
import axios from 'axios';

class Saisie extends Component{
    render(){
        return (
            <div>
                <label>{this.props.text}</label><br/>
                <input type="text" value={this.props.value} onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default class Inscription extends Component{
    constructor(props){
        super(props);
        this.state = {
            prenom : '',
            nom : '',
            mailUBO : '',
            mailPerso : '',
            password:'',
            dateNaissance : '',
            passwordVerif : ''
        }
    }

    sauvPrenom(event){this.setState({prenom : event.target.value})}
    sauvNom(event){this.setState({nom : event.target.value})}
    sauvMailUBO(event){this.setState({mailUBO: event.target.value})}
    sauvMailPerso(event){this.setState({mailPerso : event.target.value})}
    sauvDateNaissance(event){this.setState({dateNaissance : event.target.value})}
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

    handleSubmit = (e) => {
        const select = document.getElementById('nationalite');
        const infoMail = document.querySelector('#infoMail:checked') !== null ? 'on' : '';
        const infoExact = document.querySelector('#exact:checked') !== null ? 'on' : '';

        e.preventDefault();
        const etudiant = {
            prenom : this.state.prenom,
            nom : this.state.nom,
            mailUBO : this.state.mailUBO,
            mailPerso : this.state.mailPerso,
            nationalite : select.value,
            password: this.state.password,
            dateNaissance : this.state.dateNaissance,
            infoMail: infoMail,
            infoExact: infoExact
        };

        axios.post(this.props.envoie, {etudiant})
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            if(err) throw err;
        })

        this.props.chargerEtat(this.props.chemin);
    }

    render(){
        if(this.props.enseignant){
            return (
                <div className="centre element">
                    <h2 >{this.props.titre}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="">
                            <div className=" gauche perso align">
                                <h3>Informations personelles</h3>
                                <Saisie text="Prénom *"value={this.state.prenom} onChange={(event) => this.sauvPrenom(event)}/>
                                <Saisie text="Nom *"value={this.state.nom} onChange={(event) => this.sauvNom(event)}/>
                            </div>
                            <div className="gauche">
                                <h3>Informations de connexion</h3>
                                <Saisie text="Identifiant (adresse mail UBO) *" value={this.state.mailUBO} onChange={(event) => this.sauvMailUBO(event)}/>
                                <label>Mot de passe *</label><br/>
                                <input type="password" value={this.state.password} onChange={(event) => this.sauvPassword(event)}/>
                                {this.secuMotDePasse()}<br/>
                                <p className="soustexte">Doit obligatoirement contenir 8 caractères comprenant lettres, chiffres et caractère spéciaux</p>
                                <label>Confirmation du mot de passe *</label><br/>
                                <input type="password" value={this.state.passwordVerif} onChange={(event) => this.sauvPassVerif(event)}/><br/>
                                {this.verifMotDePasse()}
                            </div>
                        </div>
                        <input type="checkbox" id="infoMail"/> <label htmlFor="infoMail">J'autorise l'application à m'informer par mail</label> <br/>
                        <input type="checkbox" id="exact"/> <label htmlFor="exact">Je certifie sur l'honneur l'exactitude des renseignements fournis *</label><br/>
                        <button type="submit">{this.props.validation}</button>
                    </form>

                    <p>Les champs * sont obligatoire</p>
                    <button className="lien" type="button" onClick={() => this.props.chargerEtat(this.props.chemin)}>{this.props.retour}</button>
                </div>
                );
        }else{
            return (
                <div className="centre element">
                    <h2 >{this.props.titre}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="display">
                            <div >
                                <div className="align gauche perso">
                                    <h3>Informations personelles</h3>
                                    <Saisie text="Prénom *"value={this.state.prenom} onChange={(event) => this.sauvPrenom(event)}/>
                                    <Saisie text="Nom *"value={this.state.nom} onChange={(event) => this.sauvNom(event)}/>
                                    <Saisie text="Adresse mail (personelle)" value={this.state.mailPerso} onChange={(event) => this.sauvMailPerso(event)}/>
                                    <label>Date de naissance *</label><br/>
                                    <input type="date" value={this.state.dateNaissance} onChange={(event) => this.sauvDateNaissance(event)}/><br/>
                                    <label>Nationalité *</label><br/>
                                    <select id="nationalite">
                                        <option value="francaise">Française</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="gauche">
                                <h3>Informations de connexion</h3>
                                <Saisie text="Identifiant (adresse mail UBO) *" value={this.state.mailUBO} onChange={(event) => this.sauvMailUBO(event)}/>
                                <label>Mot de passe *</label><br/>
                                <input type="password" value={this.state.password} onChange={(event) => this.sauvPassword(event)}/>
                                {this.secuMotDePasse()}<br/>
                                <p className="soustexte">Doit obligatoirement contenir 8 caractères comprenant lettres, chiffres et caractère spéciaux</p>
                                <label>Confirmation du mot de passe *</label><br/>
                                <input type="password" value={this.state.passwordVerif} onChange={(event) => this.sauvPassVerif(event)}/><br/>
                                {this.verifMotDePasse()}
                            </div>
                        </div>
                        <input type="checkbox" id="infoMail" /> <label htmlFor="infoMail">J'autorise l'application à m'informer par mail</label> <br/>
                        <input type="checkbox" id="exact" /> <label htmlFor="exact">Je certifie sur l'honneur l'exactitude des renseignements fournis *</label><br/>
                        <button type="submit">{this.props.validation}</button>
                    </form>

                    <p>Les champs * sont obligatoire</p>
                    <button className="lien" type="button" onClick={() => this.props.chargerEtat(this.props.chemin)}>{this.props.retour}</button>
                </div>
            );
        }
    }
}