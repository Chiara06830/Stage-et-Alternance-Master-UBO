import React, {Component} from 'react';
import UsePopup from '../../../utilitaires/PopUp';

class PopAjoutStage extends Component{
    render(){
        const contenu = 
            <form action="http://localhost:7146/api/etudiant/stage" method="POST">
                <p>Entreprise</p>
                <input type="text" name="entreprise"/>
                <a href="google.com">Si l'entreprise n'existe pas, ajouter l'entreprise</a>
                <p>Type de contrat</p>
                <select name="contrat">
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <p>Possibilité alternance l'année suivante<input type="checkbox" name="alternance"/></p>
                <button type="submit">Valider</button>
            </form>
        return (
            <UsePopup text="Déclarer mon stage" contenu={contenu} class="btnPlus" bouton="+"/>
        );
    }
}

export default PopAjoutStage;