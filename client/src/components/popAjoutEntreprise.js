import React, {Component} from 'react';
import UsePopup from "../utilitaires/PopUp";
import axios from 'axios'

class PopAjoutEntreprise extends Component{
    constructor(props){
        super(props);
        this.state = {
            nom : "",
            adresse : "",
            site : ""
        }
    }

    sauvNom(event){this.setState({nom : event.target.value})}
    sauvAdresse(event){this.setState({adresse : event.target.value})}
    sauvSite(event){this.setState({site : event.target.value})}
    

    handleSubmit = (e) => {
        e.preventDefault();

        const entreprise ={
            nom : this.state.nom,
            adresse : this.state.adresse,
            site : this.state.site
        }

        axios.post("http://localhost:7146/entreprise/ajout", {entreprise})
            .catch(err =>{
                if(err) throw err;
            });
    }

    render(){
        const contenu = 
            <form>
                <p>Raison Social (nom)</p>
                <input type="text" value={this.state.nom} onChange={(event) => this.sauvNom(event)}/>
                <p>Adresse</p>
                <input type="text" value={this.state.adresse} onChange={(event) => this.sauvAdresse(event)}/>
                <p>Site web</p>
                <input type="text" value={this.state.site} onChange={(event) => this.sauvSite(event)}/><br/>
                <button type="button" onClick={this.handleSubmit}>Valider</button>
            </form>
        
        return(
            <UsePopup text='Ajouter une entrerpise' contenu={contenu} class={this.props.class} bouton={this.props.bouton}/>
        );
    }
}

export default PopAjoutEntreprise;