import React from 'react';
import ReactDOM from 'react-dom';
import "./general.css";
import Etudiant from"./components/etudiant/pageEtudiant";
import Enseignant from './components/enseignant/pageEnseignant';

class Connexion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mail : '',
            mdp: '',
            charger : 1
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
            this.setState({charger : 1});
        }else if(this.state.mail.match(/^.*@univ-brest.fr$/)){
            console.log("Enseignant");
            this.setState({charger : 2});
        }else{
            
        }
            
        event.preventDefault();
    }

    render() {
        if(this.state.charger === 0){
            return (
                <div className="connexion">
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
        }else if(this.state.charger === 1){
            return(
                <Etudiant />
            );
        }else if(this.state.charger === 2){
            return(
                <Enseignant />
            );
        }
        
    }
}

ReactDOM.render(
    <Connexion />,
    document.getElementById('root')
);
