import React, {Component} from 'react';
import axios from 'axios';

export default class Connexion extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const infos = {
            email : this.state.email,
            password : this.state.password
        };

        axios.post('http://localhost:7146/login', {infos})
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            if(err) throw err;
        })

        if(this.state.email.match(/^.*@etudiant.univ-brest.fr$/)){
            this.props.chargerEtat(1)
        }else if(this.state.email.match(/^.*@univ-brest.fr$/)){
            this.props.chargerEtat(2);
        }else if(this.state.email.match("admin")){
            this.props.chargerEtat(4);
        }
    }

    changeEmail(event){
        this.setState({
            email : event.target.value
        })
    }

    changePassword(event){
        this.setState({
            password : event.target.value
        })
    }

    render(){
        return (
            <div className="connexion">
                <h1>Connexion</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Adresse mail" value={this.state.email} onChange={(event) => this.changeEmail(event)}/><br/>
                    <input type="password" placeholder="Mot de passe" value={this.state.password} onChange={(event) => this.changePassword(event)}/><br/>
                    <button type="submit">Se connecter</button><br/>
                </form>
                <button className="lien" type="button">Mot de passe oublié</button><br/>
                <p>Vous n'êtes pas encore inscrit ?</p>
                <button className="lien" type="button" onClick={() => this.props.chargerEtat(3)}>S'inscrire</button>
            </div>
        );
    }
}