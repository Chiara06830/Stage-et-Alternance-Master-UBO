import React from 'react';

/*const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'obiwan2.univ-brest.fr/adminbdd/', 
    user:'zrelevach', 
    password: 'tq494ej8',
    connectionLimit: 5
});*/

class Connexion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mail : '',
            mdp: ''
        };

        this.sauvMdp = this.sauvMdp.bind(this);
        this.sauvMail = this.sauvMail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sauvMdp(event) {
        this.setState({mdp: event.target.value});
    }

    sauvMail(event){
        this.setState({mail: event.target.value})
    }

    handleSubmit(event) {
        if(this.state.mail.match(/^.*@etudiant.univ-brest.fr$/)){
            console.log("etudiant");
        }else if(this.state.mail.match(/^.*@univ-brest.fr$/)){
            console.log("Enseignant");
        }else{
            
        }
            
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Connexion</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Adresse mail" value={this.state.mail} onChange={this.sauvMail}/><br/>
                    <input type="text" placeholder="Mot de passe" value={this.state.mdp} onChange={this.sauvMdp}/><br/>
                    <button type="submit">Se connecter</button><br/>
                </form>
                <a href="">Mot de passe oublié</a><br/>
                <p>Vous n'êtes pas encore inscrit ?</p>
                <a href="">S'inscrire</a>
            </div>
            
        );
    }
}

export default Connexion;