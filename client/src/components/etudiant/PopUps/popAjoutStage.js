import React from 'react';
import UsePopup from '../../../PopUp';

class PopAjoutStage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            entreprise : ""
        }
    }

    //------------- Sauvegarde des données -------------//
    sauvEntreprise(event){}

    render(){
        const contenu = 
            <form>
                <p>Entreprise</p>
                <input type="text" value={this.state.entreprise} onChange={this.sauvEntreprise}/>
                <a href="">Si l'entreprise n'existe pas, ajouter l'entreprise</a>
                <p>Type de contrat</p>
                <form>
                    <select>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </form>
                <p>Possibilité alternance l'année suivante<input type="checkbox" id="alternance" value="1"/></p>
                <button type="submit">Valider</button>
            </form>
        return (
            <UsePopup text="Déclarer mon stage" contenu={contenu}/>
        );
    }
}

export default PopAjoutStage;