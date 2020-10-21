import React from 'react';
import UsePopup from '../../../PopUp';

class PopAjoutLettre extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lettre : ""
        }
    }

    //------------- Sauvegarde des données -------------//

    sauvLettre(event){
        //this.setState({lettre: event.target.value});
    }

    //------------- Envoie des données -------------//
    handleLettre(){

    }

    //------------- Fonction utilitaires -------------//

    searchFile(){

    }

    render(){
        const contenu =
            <div>
                <form onSubmit={this.handleLettre}>
                    <input type="text" placeholder="C://" value={this.state.cv} onChange={this.sauvLettre()}/>
                    <button type="button" onClick={this.searchFile()}>Parcourir</button><br/>
                    <p>Seul le format pdf est accepté</p>
                    <p>Entreprise visée :</p>
                    <input type="text" value={this.state.cv}/>
                    <button type="submit">Valider</button>
                </form>
            </div>;
        return <UsePopup text='Déposer une lettre de motivation' contenu = {contenu}/>;
    }
}

export default PopAjoutLettre;