import React, {Component} from 'react';
import axios from 'axios';
import UsePopup from '../../../utilitaires/PopUp';
import PopAjoutEntreprise from '../../popAjoutEntreprise';

class PopAjoutStage extends Component{
    constructor(props){
        super(props);
        this.state = {
            entreprise : ""
        }
    }

    sauvEntreprise(event){this.setState({entreprise : event.target.value})}

    handleSubmit = (e) => {
        e.preventDefault();

        const select = document.getElementById('contrat');

        const stage = {
            id : this.props.getIdUtilisateur,
            entreprise : this.state.entreprise,
            contrat : select.value
        }

        axios.post(`http://localhost:7146/api/etudiant/stage`, {stage})
            .catch(err =>{
                if(err) throw err;
            });
    }

    render(){
        const contenu = 
            <form>
                <p>Entreprise</p>
                <input type="text" value={this.state.entreprise} onChange={(event) => this.sauvEntreprise(event)}/>
                <button className="lien" type="button">Si l'entreprise n'existe pas, ajouter l'entreprise</button>
                <p>Type de contrat</p>
                <select id="contrat">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <p>Possibilité alternance l'année suivante<input type="checkbox" name="alternance"/></p>
                <button type="button" onClick={this.handleSubmit}>Valider</button>
            </form>
        return (
            <UsePopup text="Déclarer mon stage" contenu={contenu} class={this.props.class} bouton={this.props.bouton}/>
        );
    }
}

export default PopAjoutStage;