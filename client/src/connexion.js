import React, {Component} from 'react';

export default class Connexion extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password: ""
        }
    }

    handleSubmit() {
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
                <form action="http://localhost:7146/login" method="POST" >
                    <input type="text" placeholder="Adresse mail" name="email" value={this.state.email} onChange={(event) => this.changeEmail(event)}/><br/>
                    <input type="password" placeholder="Mot de passe" name="password" value={this.state.password} onChange={(event) => this.changePassword(event)}/><br/>
                    <button type="submit" onClick={() => this.handleSubmit()}>Se connecter</button><br/>
                </form>
                <a href="google.com">Mot de passe oublié</a><br/>
                <p>Vous n'êtes pas encore inscrit ?</p>
                <button className="lien" type="button" onClick={() => this.props.chargerEtat(3)}>S'inscrire</button>
            </div>
        );
    }
}