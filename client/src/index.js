import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./general.css";
import Etudiant from"./components/etudiant/pageEtudiant";
import Enseignant from './components/enseignant/pageEnseignant';
import Inscription from './utilitaires/inscrpition';
import Admin from './components/admin/pageAdmin';
import ListeEntreprise from './components/listeEntreprise';
import Connexion from './connexion';

class Gestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            charger : 0
        }
    }

    chargerEtat = (valeur) => {
        this.setState({
            charger : valeur
        });
    }

    render() {
        if(this.state.charger === 0){
            return (
                <Connexion chargerEtat={this.chargerEtat}/>
            )
        }else if(this.state.charger === 1){
            return(
                <Etudiant chargerEtat={this.chargerEtat}/>
            );
        }else if(this.state.charger === 2){
            return(
                <Enseignant chargerEtat={this.chargerEtat}/>
            );
        }else if(this.state.charger === 3){
            return(
                <Inscription 
                    titre="Inscription"
                    chemin={0}
                    envoie="http://localhost:7146/inscription/creation"
                    validation="Créer le compte"
                    retour="Se connecter"
                    chargerEtat={this.chargerEtat}
                />
            );
        }else if(this.state.charger === 4){
            return(
                <Admin chargerEtat={this.chargerEtat}/>
            );
        }else if(this.state.charger === 5){
            return(
                <Inscription 
                    titre="Modification des informations personelles"
                    chemin={1}
                    envoie="http://localhost:7146/inscrption/modif/etuidant"
                    validation="Modifier"
                    retour="Retour"
                    chargerEtat={this.chargerEtat}
                />
            );
        }else if(this.state.charger === 6){
            return(
                <Inscription 
                    titre="Modification des informations personelles"
                    chemin={2}
                    envoie="http://localhost:7146/inscrption/ajout/exterieur"
                    validation="Modifier"
                    retour="Retour"
                    chargerEtat={this.chargerEtat}
                />
            );
        }else if(this.state.charger === 7){
            return (
                <ListeEntreprise chargerEtat={this.chargerEtat}/>
            );
        }else if(this.state.charger === 8){
            return(
                <Inscription 
                    titre="Modification des informations personelles"
                    chemin={4}
                    envoie="http://localhost:7146/inscrption/modif/enseignant"
                    validation="Modifier"
                    retour="Retour"
                    chargerEtat={this.chargerEtat}
                />
            );
        }
    }
}

export default Connexion;

ReactDOM.render(
    <Gestion />,
    document.getElementById('root')
);
