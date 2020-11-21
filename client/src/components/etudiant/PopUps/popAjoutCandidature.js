import axios from 'axios';
import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutCandidature extends Component {
    constructor(props){
        super(props);
        this.state = {
            entreprise : "",
            origine : ""
        }
    }

    sauvEntreprise(event){this.setState({entreprise : event.target.value})}
    sauvOrigine(event){this.setState({origine : event.target.value})}

    handleSubmit = (e) => {
        e.preventDefault();

        const select = document.getElementById('origine');
        const origine = select.value === "Autre" ? this.state.origine : select.value;

        const candidature = {
            id : this.props.getIdUtilisateur,
            entreprise : this.state.entreprise,
            origine : origine
        }

        axios.post(`http://localhost:7146/api/etudiant/candidature`, {candidature})
            .catch(err =>{
                if(err) throw err;
            });
    }

    render(){
        const contenu = 
                <form>
                    <p>Entreprise :<br/>
                        <input type="text" value={this.state.entreprise} onChange={(event) => this.sauvEntreprise(event)}/> <br/>
                        <button className="lien" type="button">Si l'entreprise n'existe pas, ajouter l'entreprise</button>
                    </p>
                    <p>Origine de l'offre :<br/>
                        <select id="origine">
                            <option>Carrier center</option>
                            <option>Site web</option>
                            <option>Autre</option>
                        </select>
                    </p>
                    <p>Si autre, précisez :<br/>
                        <input type="text" name="orgine_autre" value={this.state.value} onChange={(event) => this.sauvOrigine(event)}/><br/>
                    </p><br/>
                    <button type="button" onClick={this.handleSubmit}>Valider</button>
                </form>
        return <UsePopup text='Créer une candidature' contenu={contenu} class={this.props.class} bouton={this.props.bouton}/>
    }
}

export default PopAjoutCandidature;