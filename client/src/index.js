import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./general.css";
import Etudiant from"./components/etudiant/pageEtudiant";
import Enseignant from './components/enseignant/pageEnseignant';
import Inscription from './utilitaires/inscrpition';
import Admin from './components/admin/pageAdmin';
import ListeEntreprise from './components/listeEntreprise';

class Connexion extends Component {
    constructor(props){
        super(props);
        this.state = {
            charger : 0
        }
    }

    componentDidMount(){
        this.handleSubmit();
    }

    handleSubmit() {
        fetch('http://localhost:7146/login')
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    charger: data['page']
                });
            })
            .catch(error => this.setState({ error}));
    }

    render() {
        if(this.state.charger === 0){
            return (
                <div className="connexion">
                    <h1>Connexion</h1>
                    <form action="http://localhost:7146/login" method="POST" >
                        <input type="text" placeholder="Adresse mail" name="email"/><br/>
                        <input type="password" placeholder="Mot de passe" name="password"/><br/>
                        <button type="submit" onClick={this.handleSubmit()}>Se connecter</button><br/>
                    </form>
                    <a href="google.com">Mot de passe oublié</a><br/>
                    <p>Vous n'êtes pas encore inscrit ?</p>
                    <form action="http://localhost:7146/inscription" method="POST" >
                        <button className="lien" type="submit">S'inscrire</button>
                    </form>
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
        }else if(this.state.charger === 3){
            return(
                <Inscription 
                    titre="Inscription"
                    chemin="http://localhost:7146/retourLogin"
                    envoie="http://localhost:7146/inscription/creation"
                    validation="Créer le compte"
                    retour="Se connecter"
                />
            );
        }else if(this.state.charger === 4){
            return(
                <Admin />
            );
        }else if(this.state.charger === 5){
            return(
                <Inscription 
                    titre="Modification des informations personelles"
                    chemin="http://localhost:7146/retourEtudiant"
                    envoie="http://localhost:7146/inscrption/modif/etuidant"
                    validation="Modifier"
                    retour="Retour"
                />
            );
        }else if(this.state.charger === 6){
            return(
                <Inscription 
                    titre="Modification des informations personelles"
                    chemin="http://localhost:7146/retourEnseignant"
                    envoie="http://localhost:7146/inscrption/ajout/exterieur"
                    validation="Modifier"
                    retour="Retour"
                />
            );
        }else if(this.state.charger === 7){
            return (
                <ListeEntreprise />
            );
        }
    }
}

export default Connexion;

ReactDOM.render(
    <Connexion />,
    document.getElementById('root')
);
