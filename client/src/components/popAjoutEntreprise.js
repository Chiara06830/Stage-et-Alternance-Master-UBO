import React, {Component} from 'react';
import UsePopup from "../utilitaires/PopUp";

class PopAjoutEntreprise extends Component{
    
    render(){
        const contenu = 
        <form action="http://localhost:7146/entreprise/ajout" method="POST">
            <p>Raison Social (nom)</p>
            <input type="text" name="entreprise"/>
            <p>Adresse</p>
            <input type="text" name="adresse"/>
            <p>Site web</p>
            <input type="text" name="site"/><br/>
            <button type="submit">Valider</button>
        </form>
        
        return(
            <UsePopup text='Ajouter une entrerpise' contenu={contenu} class={this.props.class} bouton={this.props.bouton}/>
        );
    }
}

export default PopAjoutEntreprise;